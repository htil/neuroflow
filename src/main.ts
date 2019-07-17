// main.ts
// -------
// Main entry point for this web application

// =============================================================================
// Imports
// =============================================================================
import { WindowManager } from "./Utility/WindowManager";
import { InterpManager } from "./Utility/InterpManager";
import { Toolbox, Category, Separator } from "./Utility/Toolbox";
import { Playground, dictionary } from "./Playground";
import { Sprite, Point } from "./Sprite";
import { Interpreter } from "JS-Interpreter/acorn_interpreter";

// Custom blocks
import { Device, BCICategory } from "./Blocks/BCIBlocks";
import { EventCategory } from "./Blocks/EventBlocks";
import {
	FlowCategory,
	AddFlowBlock,
	FlowCategoryCallback,
	flow_window_list,
	flow_window_type,
	FlowMutator,
	flow_block,
	flow_block_data,
	get_flow_api
} from "./Blocks/FlowBlocks";
import {
	PlayerCategory,
	player_window_list,
	player_list_type,
	PlayerCategoryCallback,
	PlayerSet,
	player_list_item,
	PlayerUpdateX,
	PlayerUpdateY
} from "./Blocks/PlayerBlocks";

// Configuration
import config from "./config";

// Import language
import * as i18n from "./i18n/i18n";
import { DeviceState } from "bci-device";
let locale = i18n.set_locale(config.LOCALE);

// Charting
import Graph from "./graph";
import { CustomBlock } from "./Utility/CustomBlock";
let g = new Graph("graph", WindowManager.fetch("flow_data"), ["#ffe119"]);
setInterval(() => g.update(), 100);

// =============================================================================
// Initial set up
// =============================================================================
// References to window elements
let blockly_div = WindowManager.eById("workspace");
let code_div = WindowManager.eById("codeText");
let webgl_div = <HTMLCanvasElement>WindowManager.eById("webgl");

// Highligh blocks
Blockly.JavaScript.STATEMENT_PREFIX = "__highlightBlock(%1);\n";
Blockly.JavaScript.addReservedWords("__highlightBlock");

// =============================================================================
// WebGL set up
// =============================================================================
// Set up WebGL
let playground = new Playground(webgl_div);
let players: dictionary<Sprite> = {};

// Players
let background = playground.create_sprite(
	"__background",
	"__background",
	"background",
	config.paths.background,
	() => __drawFrame()
);
players["__background"] = background;

// Draw
Blockly.JavaScript.addReservedWords("__drawFrame");

// Draw all sprites
function __drawFrame() {
	return new Promise(resolve => {
		playground.draw(Object.values(players));
		resolve("Drawn");
	});
}

// Set up the player blocks to draw after
PlayerSet.set_suffix("__drawFrame();\n");
PlayerUpdateX.set_suffix("__drawFrame();\n");
PlayerUpdateY.set_suffix("__drawFrame();\n");

// =============================================================================
// Mouse interactions for playground
// =============================================================================
// Set up mouse events
let trash = WindowManager.eById("canvas-trash");
let mouse = { point: { x: 0, y: 0 }, down: false, shouldDelete: false };
let selected = "";
webgl_div.onmousedown = (event: MouseEvent) => {
	mouse.down = true;
};
webgl_div.onmouseup = (event: MouseEvent) => {
	mouse.down = false;

	let delete_modal = WindowManager.eById("delete-modal");
	if (mouse.shouldDelete) {
		delete_modal.click();

		trash.style.color = "white";
		trash.style.transform = "scale(1, 1)";
		trash.style.right = "-1em";
		mouse.shouldDelete = false;
	}
};
webgl_div.onmousemove = (event: MouseEvent) => {
	let bounds = webgl_div.getBoundingClientRect();
	let in_range = (val: number, ref: number, range: number) =>
		val > ref - range && val < ref + range;

	// FIXME: Figure out why there is a 64 pixel offset
	mouse.point = {
		x: (event.clientX / bounds.width) * 2 - 1.0,
		y: ((event.clientY - 64) / bounds.height) * -2 + 1.0
	};

	// Move if selected
	if (mouse.down) {
		if (selected === "") return;

		players[selected].set_position(mouse.point);
		let windows = <player_list_type>player_window_list.get();
		let find_player = (id: string) => {
			for (let i = 0; i != windows.length; ++i) {
				if (windows[i][1] == id) return windows[i];
			}

			throw "PLAYER NOT FOUND: " + name;
		};

		let found = find_player(selected);
		found[2] = mouse.point;
		player_window_list.set(windows);

		// Draw
		__drawFrame();

		// Define the trash region as being in [0.85, 0.95], [-0.85, -0.95]
		if (
			in_range(mouse.point.x, 0.9, 0.05) &&
			in_range(mouse.point.y, -0.9, 0.06)
		) {
			trash.style.transform = "scale(1.1, 1.1)";
			trash.style.color = "red";
			mouse.shouldDelete = true;
		} else {
			trash.style.color = "white";
			trash.style.transform = "scale(1, 1)";
			mouse.shouldDelete = false;
		}
	} else {
		let show_cursor = false;
		for (let player in players) {
			if (player == "__background") continue;

			let pos = players[player].get_position();
			if (
				in_range(mouse.point.x, pos.x, 0.1) &&
				in_range(mouse.point.y, pos.y, 0.1)
			) {
				show_cursor = true;
				selected = player;
			}
		}

		if (!show_cursor) {
			trash.style.right = "-1em";
			selected = "";
		} else {
			trash.style.right = "0";
			WindowManager.eById("selected-player").innerHTML = players[selected].name;
		}

		webgl_div.style.cursor = show_cursor ? "pointer" : "default";
	}
};

// =============================================================================
// Blockly workspace set up
// =============================================================================
// Set up toolbox categories
let cat_loops: Category = {
	name: locale.category.loops,
	colour: "%{BKY_LOOPS_HUE}",

	modules: ["controls_whileUntil", "controls_repeat_ext", "controls_repeat"]
};

let cat_text: Category = {
	name: locale.category.text,
	colour: "%{BKY_TEXTS_HUE}",

	modules: ["text", "text_print"]
};

let cat_logic: Category = {
	name: locale.category.logic,
	colour: "%{BKY_LOGIC_HUE}",

	modules: [
		"controls_if",
		"logic_compare",
		"logic_operation",
		"logic_negate",
		"logic_boolean",
		"logic_ternary"
	]
};

let cat_math: Category = {
	name: locale.category.math,
	colour: "%{BKY_MATH_HUE}",

	modules: [
		"math_number",
		"math_single",
		"math_round",
		"math_trig",
		"math_constrain",
		"math_arithmetic",
		"math_modulo",
		"math_random_int"
	]
};

let cat_vars: Category = {
	name: locale.category.variables,
	colour: 330,
	custom: "VARIABLE",

	modules: []
};

// Set up the workspace
let toolbox = new Toolbox([
	cat_loops,
	cat_logic,
	cat_text,
	cat_math,
	cat_vars,
	EventCategory(locale.category.events),
	<Separator>{ gap: 0 },

	BCICategory(locale.category.bci),
	FlowCategory(locale.category.flow),
	PlayerCategory(locale.category.players)
]);
let workspace = Blockly.inject(blockly_div, {
	toolbox: toolbox.toString()
});

// Resize on window change
let onresize = function(e?: Event) {
	let area = WindowManager.eById("workspace-area");

	// Position blocklyDiv over blocklyArea.
	blockly_div.style.left = 0 + "px";
	blockly_div.style.top = 0 + "px";
	blockly_div.style.width = area.offsetWidth + "px";
	blockly_div.style.height = area.offsetHeight + "px";

	Blockly.svgResize(workspace);
};
window.addEventListener("resize", onresize, false);
onresize();

// Highlight the blocks
function __highlightBlock(id: string) {
	workspace.highlightBlock(id);
}

// Add link between WebGL players and Blockly
workspace.registerToolboxCategoryCallback("PLAYERS", PlayerCategoryCallback);

// Add link between flow and blockly
workspace.registerToolboxCategoryCallback("FLOWS", FlowCategoryCallback);

// Allow for auto-updating
workspace.addChangeListener(
	(event: HTMLElementEventMap): void => {
		let code = Blockly.JavaScript.workspaceToCode(workspace);

		code_div.innerHTML = code;
	}
);

// =============================================================================
// Flow blocks
// =============================================================================
// Register a mutator for showing the flow overlay
Blockly.Extensions.registerMutator(
	"flow_mutator",
	FlowMutator.get_serialize(),
	function() {
		this.setMutator(new FlowMutator());
	},
	null
);

// Allow for new blocks to be created
workspace.registerButtonCallback("add_flow", (e: HTMLElement) => {
	// Get the requested name
	let name = prompt(locale.flow.prompt);

	// Do nothing if the user canceled or gave a non-valid name
	if (name == undefined || name.length == 0) return;

	let fl = <flow_window_type>flow_window_list.get();

	// If the variable already exists, retry indefinetly
	while (name != undefined && fl[name] != undefined) {
		alert(locale.flow.already_exists(name));
		name = prompt(locale.flow.prompt);
	}

	// Last check
	if (name == undefined || name.length == 0) return;

	// Create the block and save its info to the window
	AddFlowBlock(name);

	// Redraw player toolbox
	workspace.refreshToolboxSelection();
});

// =============================================================================
// Player manipulation
// =============================================================================
// Add a player to the scene
let player_count: dictionary<number> = {};
let addPlayer = (
	type: string,
	init: { id: string; name: string; position: Point } = undefined
) => {
	// Hide the modal
	let modal_close = <HTMLElement>document.getElementsByClassName("close")[0];
	modal_close.click();

	// Keep track of how many players of each type for naming
	if (!player_count[type]) player_count[type] = 1;

	let name: string, id: string, position: Point;
	if (init) {
		name = init.name;
		id = init.id;
		position = init.position;

		// Update count if needed
		let count = Number(name.match(/-([0-9]+)$/)[1]);
		if (player_count[type] < count) player_count[type] = count;
	} else {
		name = type + "-" + player_count[type];
		id = "PLAYER_" + name;
		position = { x: 0, y: 0 };
	}
	let path = (<dictionary<string>>config.paths)[type];

	// Increment player count
	++player_count[type];

	// Create the player
	players[id] = playground.create_sprite(id, name, type, path, () =>
		__drawFrame()
	);
	players[id].set_scale({ x: 0.1, y: 0.1 });
	players[id].set_position(position);
	player_window_list.set(
		(<player_list_type>player_window_list.get()).concat([[name, id, position]])
	);

	// Redraw player toolbox
	workspace.refreshToolboxSelection();

	__drawFrame();
};
let removePlayer = (id: string) => {
	// See if player is valid
	let player = players[id];

	if (!player) {
		console.warn("Invalid player specified.", id);
		return;
	}

	// Remove the sprite
	player.delete();
	delete players[id];

	// Remove the Blockly link to the sprite
	let pl = <player_list_type>player_window_list.get();
	player_window_list.set(
		pl.filter(pair => {
			if (pair[1] === id) {
				return false;
			}
		})
	);

	// Redraw player toolbox
	workspace.refreshToolboxSelection();

	selected = "";
	mouse.shouldDelete = false;
	__drawFrame();
};
let clear_players = () => {
	let keys = Object.keys(players);
	for (let i = 0; i != keys.length; ++i) {
		// Don't get rid of the background
		if (players[keys[i]].type == "background") continue;

		removePlayer(players[keys[i]].id);
	}

	// Clear the player info
	player_count = {};
};

// =============================================================================
// DOM bindings
// =============================================================================
// Handle Code execution
let exec = WindowManager.eById("play_arrow_handler");
let run_icon = WindowManager.eById("play_arrow_icon");
let interpManger: InterpManager = new InterpManager(workspace, {
	__drawFrame,
	__highlightBlock,
	__get_flow: get_flow_api
});

exec.onclick = () => {
	let code = Blockly.JavaScript.workspaceToCode(workspace);
	let should_block = workspace.getBlocksByType("event_keypress", false).length != 0;

	if (run_icon.innerHTML === "play_arrow") {
		// UI changes
		run_icon.innerHTML = "stop";
		interpManger.run(code, () => run_icon.innerHTML = "play_arrow", should_block);
	} else {
		interpManger.stop();
		run_icon.innerHTML = "play_arrow"; // UI changes
	}
};

// Handle saving and loading
let save_handler = WindowManager.eById("save_handler");
save_handler.onclick = () => {
	let as_dom = Blockly.Xml.workspaceToDom(workspace);

	// Save player info
	let players_as_dom = document.createElement("players");
	let player_keys = Object.keys(players);
	for (let i = 0; i != player_keys.length; ++i) {
		let pla = players[player_keys[i]];
		if (pla.type == "background") continue;

		let player_as_dom = document.createElement("player");
		player_as_dom.setAttribute("position", JSON.stringify(pla.get_position()));
		player_as_dom.setAttribute("type", pla.type);
		player_as_dom.setAttribute("name", pla.name);
		player_as_dom.setAttribute("id", pla.id);

		players_as_dom.appendChild(player_as_dom);
	}
	as_dom.appendChild(players_as_dom);

	// Save flow info
	let flows_as_dom = document.createElement("flows");
	let flows = flow_window_list.get();
	let flow_keys = Object.keys(flows);
	for (let i = 0; i != flow_keys.length; ++i) {
		let flo = flows[flow_keys[i]];

		let flow_as_dom = document.createElement("flow");
		flow_as_dom.setAttribute("data", flo.data);
		flow_as_dom.setAttribute("name", flo.name);

		flows_as_dom.appendChild(flow_as_dom);
	}
	as_dom.appendChild(flows_as_dom);

	let as_text = Blockly.Xml.domToText(as_dom);

	function download(filename: string, text: string) {
		var element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(text)
		);
		element.setAttribute("download", filename);

		element.style.display = "none";
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	download("workspace.txt", as_text);
};

let load_handler = WindowManager.eById("open_in_browser_handler");
let load_input = WindowManager.eById("load_file_input");

load_handler.onclick = () => load_input.click();
load_input.onchange = e => {
	let file = (<HTMLInputElement>e.target).files[0];
	if (!file) {
		return;
	}

	// Clear the players for the new loaded space
	clear_players();

	// Remove all blocks currently placed
	workspace.clear();
	workspace.clearUndo();

	// Remove the flow blocks
	let flows = flow_window_list.get() as flow_window_type;
	let keys = Object.keys(flows);
	for (let i = 0; i != keys.length; ++i) {
		let flo = flows[keys[i]];
		let name = `flow_block_${flo.name}`;
		let block = Blockly.Blocks[name] as flow_block;

		block.editor_.destroy();
		block.editor_ = undefined;
		CustomBlock.dispose(`flow_block_${flo.name}`, true);
	}
	flow_window_list.set({});

	let reader = new FileReader();
	reader.onload = e => {
		let contents = (<FileReader>e.target).result.toString();

		// Convert to XML
		let as_xml = Blockly.Xml.textToDom(contents);

		// Create all flow blocks not yet made
		let flow_blocks = as_xml.querySelector("flows");
		flow_blocks.querySelectorAll("flow").forEach(flow => {
			let block = AddFlowBlock(flow.getAttribute("name"));

			let as_flow = block.block() as flow_block;
			let data = JSON.parse(flow.getAttribute("data")) as flow_block_data;
			as_flow.data = flow.getAttribute("data");
			as_flow.editor_.get_editor().fromJSON(data.editor);
		});

		let player_blocks = as_xml.querySelector("players");
		player_blocks.querySelectorAll("player").forEach(player => {
			let type = player.getAttribute("type");
			let init = {
				id: player.getAttribute("id"),
				name: player.getAttribute("name"),
				position: JSON.parse(player.getAttribute("position"))
			};

			// Create the player
			addPlayer(type, init);
		});

		Blockly.Xml.domToWorkspace(as_xml, workspace);
	};

	reader.readAsText(file);
};

// Handle displaying battery
let battery_icon = WindowManager.eById("battery_icon");
let present_battery = () => {
	return;

	let battery_level = WindowManager.fetch("battery").get();
	if (battery_level < 0) return;

	let interval = Math.round(battery_level / 10) * 10;

	if (interval < 20) battery_icon.innerHTML = "battery_alert";
	else if (interval > 90) battery_icon.innerHTML = "battery_full";
	else battery_icon.innerHTML = "battery_" + interval;
};

setInterval(present_battery, 30 * 1000);

// Handle Bluetooth
let connector = WindowManager.eById("bluetooth_handler");
let connector_icon = WindowManager.eById("bluetooth_icon");
connector.onclick = async () => {
	connector.setAttribute("disabled", "true");

	if (Device.state == DeviceState.CONNECTED) {
		await Device.disconnect();
		connector_icon.innerText = "bluetooth";
	} else {
		try {
			connector_icon.classList.add("blink");
			connector_icon.innerText = "bluetooth_searching";
			await Device.connect();

			console.log("Connected device.");
			connector_icon.classList.remove("blink");
			connector_icon.innerText = "bluetooth_connected";

			setTimeout(present_battery, 10 * 1000);
		} catch (e) {
			connector_icon.classList.remove("blink");
			console.log(locale.bluetooth.error.connection, e);
			connector_icon.innerText = "bluetooth";
		}
	}

	connector.removeAttribute("disabled");
};

// Handle adding / removing players
for (let type in config.paths) {
	if (type === "background") continue;

	let ele = <HTMLImageElement>WindowManager.eById("add_" + type);
	ele.onclick = () => addPlayer(type);
	ele.src = (<dictionary<string>>config.paths)[type];

	let del = WindowManager.eById("delete-character");
	del.onclick = () => removePlayer(selected);
}
