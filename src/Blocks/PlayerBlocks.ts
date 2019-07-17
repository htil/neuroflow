import { CustomBlock } from "../Utility/CustomBlock";
import { Label, unwind } from "../Utility/Toolbox";
import { Sprite, Point } from "../Sprite";
import { WindowDeclaration, WindowManager } from "../Utility/WindowManager";
import * as i18n from "../i18n/i18n";

import config from "../config";
import { Category } from "../Utility/Toolbox";
import { dictionary } from "../Playground";
let locale = i18n.set_locale(config.LOCALE);

// Set the color for blockly
Blockly.Msg.PLAYER_HUE = 10;

/**
 * Player List Item
 *
 * The type of a player within the player list
 */
export type player_list_item = [
	string, // name
	string, // id
	Point   // position
];

/**
 * Player List Type
 *
 * The type of the player list stored in the window.
 */
export type player_list_type = Array<player_list_item>;

/**
 * Player Window List
 *
 * The list of currently active players, stored in the window.
 */
export let player_window_list = WindowManager.declare("player_list", []);

/**
 * Player Point
 *
 * A custom block that represents the X and Y position of a player.
 */
export let PlayerPoint = new CustomBlock("player_point", {
	message0: "X %1 Y %2",
	args0: [
		{
			type: "input_value",
			name: "X",
			check: "Number"
		},
		{
			type: "input_value",
			name: "Y",
			check: "Number"
		}
	],
	output: null,
	colour: "%{BKY_PLAYER_HUE}"
}, (b: Blockly.Block) => {
	let x = Blockly.JavaScript.valueToCode(b, "X", Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
	let y = Blockly.JavaScript.valueToCode(b, "Y", Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;

	return ["{x: " + x + ", y: " + y + "}", Blockly.JavaScript.ORDER_MEMBER];
});

/**
 * Player Get
 *
 * A custom block used for fetching the X or Y position of a player.
 */
export let PlayerGet = new CustomBlock("player_get", (b: Blockly.Block) => {
	b.appendDummyInput("player_select")
		.appendField(new Blockly.FieldDropdown((): (Blockly.field_options_type) => {
			let res = <player_list_type>player_window_list.get();

			return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
		}), "PLAYER_OPTIONS")
		.appendField(new Blockly.FieldDropdown((): (Blockly.field_options_type) => {
			return [["X", "x"], ["Y", "y"]];
		}), "PLAYER_POSITION_TYPE");

	b.setOutput(true);
	b.setColour(Blockly.Msg.PLAYER_HUE);
}, (b: Blockly.Block) => {
	let player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";
	let position_type = b.getFieldValue("PLAYER_POSITION_TYPE");
	let code = `JSON.parse(${WindowDeclaration.asGetterBinding(player_handle)}).${position_type}`;

	return [code, Blockly.JavaScript.ORDER_MEMBER];
});

/**
 * Player Set
 *
 * A custom block used for setting the position of a player. Requires a {@link PlayerGet} block
 * as its input.
 */
export let PlayerSet = new CustomBlock("player_set", (b: Blockly.Block) => {
	b.appendDummyInput("player_select")
		.appendField("set")
		.appendField(new Blockly.FieldDropdown(
			(): (Blockly.field_options_type) => {
				let res = <player_list_type>player_window_list.get();

				return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
			}
		), "PLAYER_OPTIONS");

	// Allow for a connection
	b.appendValueInput("player_new_value").appendField("to").setCheck(PlayerPoint.name);

	// Allow for connecting
	b.setNextStatement(true);
	b.setPreviousStatement(true);

	b.setColour(Blockly.Msg.PLAYER_HUE);
}, (b: Blockly.Block) => {
	let player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";

	// Set new value to current value on no input
	let new_value = Blockly.JavaScript.valueToCode(b, "player_new_value", Blockly.JavaScript.ORDER_NONE) ||
		"JSON.parse(" + WindowDeclaration.asGetterBinding(player_handle) + ")";

	return WindowDeclaration.asSetterBinding(player_handle) + "JSON.stringify(" + new_value + "));\n";
});

/**
 * Player Update X
 *
 * A custom block used for updating the X position of a player using deltas.
 */
export let PlayerUpdateX = new CustomBlock("player_update_x", (b: Blockly.Block) => {
	b.appendValueInput("player_select")
		.appendField("change")
		.appendField(new Blockly.FieldDropdown(
			(): (Blockly.field_options_type) => {
				let res = <player_list_type>player_window_list.get();

				return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
			}
		), "PLAYER_OPTIONS")
		.appendField("X by");

	// Allow for connecting
	b.setNextStatement(true);
	b.setPreviousStatement(true);

	b.setColour(Blockly.Msg.PLAYER_HUE);
}, (b: Blockly.Block) => {
	let player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";

	let player_win = WindowManager.fetch(player_handle);
	let current_value = `JSON.parse(${player_win.toGetterBinding()})`;

	let delta = Blockly.JavaScript.valueToCode(b, "player_select", Blockly.JavaScript.ORDER_NONE) || 0;

	// Set new value to current value on no input
	let new_value = `{ x: (${current_value}.x + ${delta}), y: ${current_value}.y }`;
	return WindowDeclaration.asSetterBinding(player_handle) + "JSON.stringify(" + new_value + "));\n";
});

/**
 * Player Update Y
 *
 * A custom block used for updating the Y position of a player using deltas.
 */
export let PlayerUpdateY = new CustomBlock("player_update_y", (b: Blockly.Block) => {
	b.appendValueInput("player_select")
		.appendField("change")
		.appendField(new Blockly.FieldDropdown(
			(): (Blockly.field_options_type) => {
				let res = <player_list_type>player_window_list.get();

				return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
			}
		), "PLAYER_OPTIONS")
		.appendField("Y by");

	// Allow for connecting
	b.setNextStatement(true);
	b.setPreviousStatement(true);

	b.setColour(Blockly.Msg.PLAYER_HUE);
}, (b: Blockly.Block) => {
	let player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";

	let player_win = WindowManager.fetch(player_handle);
	let current_value = `JSON.parse(${player_win.toGetterBinding()})`;

	let delta = Blockly.JavaScript.valueToCode(b, "player_select", Blockly.JavaScript.ORDER_NONE) || 0;

	// Set new value to current value on no input
	let new_value = `{ x: ${current_value}.x, y: (${current_value}.y + ${delta}) }`;
	return WindowDeclaration.asSetterBinding(player_handle) + "JSON.stringify(" + new_value + "));\n";
});

/**
 * Player Collision Check
 *
 * A custom block used for setting the position of a player. Requires a {@link PlayerGet} block
 * as its input.
 */
export let PlayerCollidesWith = new CustomBlock("player_collides", (b: Blockly.Block) => {
	b.appendDummyInput("player_lhs")
		.appendField(new Blockly.FieldDropdown(
			(): (Blockly.field_options_type) => {
				let res = <player_list_type>player_window_list.get();

				return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
			}
		), "PLAYER_LHS")
		.appendField(" collides with ")
		.appendField(new Blockly.FieldDropdown(
			(): (Blockly.field_options_type) => {
				let res = <player_list_type>player_window_list.get();

				return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
			}
		), "PLAYER_RHS");

	// Allow for connecting
	b.setOutput(true);
	b.setColour(Blockly.Msg.PLAYER_HUE);
}, (b: Blockly.Block) => {
	let player_lhs = b.getFieldValue("PLAYER_LHS") || "''";
	let player_rhs = b.getFieldValue("PLAYER_RHS") || "''";

	// Short out if no player is selected
	if (player_lhs.length == 0 || player_rhs.length == 0 || player_lhs == "PLAYER_NONE" || player_rhs == "PLAYER_NONE")
		return '';

	// if we are colliding with the same thing, always return true
	if (player_lhs == player_rhs)
		return ["true", Blockly.JavaScript.ORDER_MEMBER];

	// Get the actual player coordinates
	let lhs = WindowManager.fetch(player_lhs);
	let rhs = WindowManager.fetch(player_rhs);

	// Use bounding box for collision detection
	const length = 0.15;

	// Radius Collision
	// TODO: Make this elliptical (or rectangular)
	return [
		`__distance(${lhs.toGetterBinding()}, ${rhs.toGetterBinding()}) < ${length}`,
		Blockly.JavaScript.ORDER_NONE
	];

	// See MDN on Axis-Aligned Bounding Box
	// return [
	// 	`${lhs.x} < ${rhs.x} + ${length} && ` +
	// 		`${lhs.x} + ${length} > ${rhs.x} && ` +
	// 		`${lhs.y} < ${rhs.y} + ${length} && ` +
	// 		`${rhs.y} + ${length} > ${rhs.y}`,
	// 	Blockly.JavaScript.ORDER_NONE
	// ];

});

/**
 * Player Blockly Category
 *
 * Creates a category for use in Blockly with the specified title.
 *
 * @param title The title to use in the flyout menu in Blockly.
 */
export let PlayerCategory = (title: string): Category => {
	return {
		name: title,
		custom: "PLAYERS",

		colour: Blockly.Msg.PLAYER_HUE,
		modules: []
	};
};

/**
 * Player Category Callback
 *
 * This is a callback that runs every time the category is opened in Blockly.
 * For more info, see
 * {@link https://developers.google.com/blockly/guides/configure/web/toolbox#dynamic_categories | the official Blockly docs}.
 *
 * @param ws The workspace to link to.
 */
export let PlayerCategoryCallback = (ws: Blockly.Workspace): Array<Node> => {
	let res: Array<Node> = [];
	let pl = <player_list_type>player_window_list.get();

	// Add blocks if players are available
	if (pl.length > 0) {
		res.push(Blockly.Xml.textToDom(unwind([PlayerGet.name], true)).firstChild);
		res.push(Blockly.Xml.textToDom(unwind([PlayerSet.name], true)).firstChild);
		res.push(Blockly.Xml.textToDom(unwind([PlayerCollidesWith.name], true)).firstChild);
		res.push(Blockly.Xml.textToDom(unwind([PlayerPoint.name], true)).firstChild);

		// Position Updates
		res.push(Blockly.Xml.textToDom(unwind([PlayerUpdateX.name], true)).firstChild);
		res.push(Blockly.Xml.textToDom(unwind([PlayerUpdateY.name], true)).firstChild);
	} else {
		res.push(Blockly.Xml.textToDom(unwind([<Label>{text: locale.help.no_players}], true)).firstChild);
	}

	return res;
};