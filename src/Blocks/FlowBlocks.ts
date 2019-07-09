import { CustomBlock } from "../Utility/CustomBlock";
import { Button, Label, unwind } from "../Utility/Toolbox";
import { WindowDeclaration, WindowManager } from "../Utility/WindowManager";
import * as i18n from "../i18n/i18n";

import config from "../config";
import { Category } from "../Utility/Toolbox";
import { Data } from "rete/types/core/data";

import ReteEditor from "../ReteEditor";
import components from '../components'; // FIXME: How do we do lazy loading?

let locale = i18n.set_locale(config.LOCALE);

// Set the color for blockly
Blockly.Msg.FLOW_HUE = 140;

// All flow blocks currently in play
export interface flow_window_item {
	name: string,
	data: string
}
export interface flow_block_data {
	name: string,
	editor: Data
}
export type flow_window_type = Blockly.dictionary<flow_window_item>;
export let flow_window_list = WindowManager.declare("flow_list", {});
export let flow_final_result = WindowManager.declare("blockly_final", {});
export let flow_data = WindowManager.declare("flow_data", []);

export interface flow_block extends Blockly.Block {
	editor_?: ReteEditor,
	container_?: SVGElement
};

export let AddFlowBlock = (name: string) => {
	let editor_name = `${name}_editor@0.0.1`;

	// Create the block
	let block = new CustomBlock(`flow_block_${name}`, {
		message0: `${name} (Flow)`,
		args0: [],
		output: "Number",
		colour: "%{BKY_FLOW_HUE}",
		tooltip: locale.flow.tooltip,
		mutator: "flow_mutator",
		helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
	}, (b: Blockly.Block) => {
		let result = flow_final_result.get();

		// Make sure that there is an output for this editor
		if (result[editor_name] == undefined) {
			return ["''", Blockly.JavaScript.ORDER_MEMBER];
		}

		return [JSON.stringify(result[editor_name]), Blockly.JavaScript.ORDER_MEMBER];
	});

	// Create a container for the editor
	let container = document.createElementNS("http://www.w3.org/2000/svg", "g");
	let fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
	fo.setAttribute("x", "0");
	fo.setAttribute("y", "0");
	fo.setAttribute("width", "100%");
	fo.setAttribute("height", "100%");

	let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rect.setAttribute("width", "100%");
	rect.setAttribute("height", "100%");
	rect.classList.add("blocklyMutatorBackground");

	let wrapper = document.createElement("div");
	wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
	wrapper.style.width = "100%";
	wrapper.style.height = "100%";

	let flow_container = document.createElement("div");

	let button_template = document.querySelector("#rete_buttons");
	let buttons = document.importNode((<any>(button_template)).content, true);

	// Set up HTML chain
	wrapper.appendChild(buttons);
	wrapper.appendChild(flow_container);
	fo.appendChild(wrapper);
	container.appendChild(rect);
	container.appendChild(fo);

	// Create an editor
	let editor = new ReteEditor(editor_name, flow_container);

	// Save them to the block
	let inner_block: flow_block = block.block();
	inner_block.container_ = container;
	inner_block.editor_ = editor;
	inner_block.data = JSON.stringify({ name: name, editor: {} });

	// Save the editor and the block in the window
	let ls = flow_window_list.get() as flow_window_type;
	ls[name] = {
		name: name,
		data: "{}"
	};
	flow_window_list.set(ls);

	// Add all of the components to the dropdown menu and register them with the engine / editor
	let keys = Object.keys(components);
	for (let i = 0; i != keys.length; ++i) {
		let component = (<any>(components))[keys[i]];
		let instance = new component();
		editor.register(instance);

		let button_class = component.name;
		let button_group = component.get_group();
		let btn = wrapper.querySelector(`.${button_class}`) as HTMLButtonElement;

		btn.onclick = async () => {
			let node = await instance.createNode();
			editor.addNode(node);
		}
	}

	editor.start();

	return block;
}

export let FlowCategory = (title: string): Category => {
	return {
		name: title,
		custom: "FLOWS",

		colour: Blockly.Msg.FLOW_HUE,
		modules: []
	};
};

export let FlowCategoryCallback = (ws: Blockly.Workspace): Array<Node> => {
	let res: Array<Node> = [];
	let fl = <flow_window_type>flow_window_list.get();

	// Always have a 'New Flow' button
	let button_text = unwind([<Button>{text: locale.flow.add, callbackKey: "add_flow"}], true);
	let button = Blockly.Xml.textToDom(button_text).firstChild;

	res.push(button);

	// Add blocks if players are available
	let keys = Object.keys(fl);
	for (let i = 0; i != keys.length; ++i) {
		let flow_text = unwind([`flow_block_${fl[keys[i]].name}`], true);
		let flow = Blockly.Xml.textToDom(flow_text).firstChild;

		res.push(flow);
	}

	return res;
};

export class FlowMutator extends Blockly.Mutator {
	// Static methods needed for serializing
	static get_serialize(): Blockly.mixin_object {
		return {
			mutationToDom: function () {
				let container = document.createElement("flow_mutation");

				// TODO: Save flow info

				return container;
			},

			domToMutation: function (e: XMLDocument) {
				// TODO: Link saved flow info to block
			}
		};
	}

	constructor() {
		super([]);
	}

	// Member methods
	drawIcon_(group: Element) {
		// Square with rounded corners.
		Blockly.utils.createSvgElement(
			'rect',
			{
				'class': 'blocklyIconShape',
				'rx': '4',
				'ry': '4',
				'height': '16',
				'width': '16'
			},
			group
		);

		// TODO: Change this to a flow icon
		// Gear teeth.
		Blockly.utils.createSvgElement('path',
			{
				'class': 'blocklyIconSymbol',
				'd': 'm4.203,7.296 0,1.368 -0.92,0.677 -0.11,0.41 0.9,1.559 0.41,' +
					'0.11 1.043,-0.457 1.187,0.683 0.127,1.134 0.3,0.3 1.8,0 0.3,' +
					'-0.299 0.127,-1.138 1.185,-0.682 1.046,0.458 0.409,-0.11 0.9,' +
					'-1.559 -0.11,-0.41 -0.92,-0.677 0,-1.366 0.92,-0.677 0.11,' +
					'-0.41 -0.9,-1.559 -0.409,-0.109 -1.046,0.458 -1.185,-0.682 ' +
					'-0.127,-1.138 -0.3,-0.299 -1.8,0 -0.3,0.3 -0.126,1.135 -1.187,' +
					'0.682 -1.043,-0.457 -0.41,0.11 -0.899,1.559 0.108,0.409z'
			},
			group);

		// TODO: Change this to flow icon
		// Axle hole.
		Blockly.utils.createSvgElement(
			'circle',
			{
				'class': 'blocklyIconShape',
				'r': '2.7',
				'cx': '8',
				'cy': '8'
			},
			group
		);
	};

	createEditor_() {
		/* Create the editor.  Here's the markup that will be generated:
		<svg>
		  [Workspace]
		</svg>
		*/
		this.svgDialog_ = Blockly.utils.createSvgElement(
			'svg',
			{
				'x': Blockly.Bubble.BORDER_WIDTH,
				'y': Blockly.Bubble.BORDER_WIDTH,
				"xmlns": "http://www.w3.org/2000/svg",
				"xmlns:xlink": "http://www.w3.org/1999/xlink",
				"xmlns:xhtml": "http://www.w3.org/1999/xhtml"
			},
			null
		);

		// -- Add the flow components --
		// Get the editor for this block
		let block = this.block_ as flow_block;
		let block_info = JSON.parse(block.data) as flow_block_data;
		let name = block_info.name;
		let ls = flow_window_list.get() as flow_window_type;
		let info = ls[name];

		// Sanity check
		if (info == undefined)
			throw "INVALID FLOW BLOCK";

		// Initialize RETE.js in this container
		// FIXME: This is kind of dirty.
		let editor = block.editor_;
		let container = block.container_;
		if (block_info.editor.id != undefined)
			editor.get_editor().fromJSON(block_info.editor);

		// Add the flow area to the bubble
		this.svgDialog_.appendChild(container);
		return this.svgDialog_;
	};

	resizeBubble_() {
		let doubleBorderWidth = 2 * Blockly.Bubble.BORDER_WIDTH;
		let workspaceSize = {
			width: 600,
			height: 200,
			x: 2, // FIXME: This is a total guess
			y: 2
		};
		let width;

		// Flip for RTL users
		if (this.block_.RTL)
			width = -workspaceSize.x;
		else
			width = workspaceSize.width + workspaceSize.x;

		let height = workspaceSize.height + doubleBorderWidth * 3;
		width += doubleBorderWidth * 3;

		// Only resize if the size difference is significant.  Eliminates shuddering.
		if (Math.abs(this.workspaceWidth_ - width) > doubleBorderWidth ||
			Math.abs(this.workspaceHeight_ - height) > doubleBorderWidth) {

			// Record some layout information for getFlyoutMetrics_.
			this.workspaceWidth_ = width;
			this.workspaceHeight_ = height;

			// Resize the bubble.
			this.bubble_.setBubbleSize(
				width + doubleBorderWidth, height + doubleBorderWidth);
			this.svgDialog_.setAttribute('width', String(this.workspaceWidth_));
			this.svgDialog_.setAttribute('height', String(this.workspaceHeight_));

			let container = this.svgDialog_.querySelector("div");
			container.setAttribute("x", String(0));
			container.setAttribute("y", String(0));
			container.style.width = String(this.workspaceWidth_);
			container.style.height = String(this.workspaceHeight_);
		}

		// TODO: Fix this
		if (this.block_.RTL) {
			// Scroll the workspace to always left-align.
			let translation = 'translate(' + this.workspaceWidth_ + ',0)';
			// this.workspace_.getCanvas().setAttribute('transform', translation);
		}
	}

	setVisible(visible: boolean) {
		// If no change, do nothing
		if (visible == this.isVisible())
			return;

		// Alert everything that a mutator has opened
		Blockly.Events.fire(
			new Blockly.Events.Ui(this.block_, 'mutatorOpen', !visible, visible)
		);

		// If we should show, show...
		if (this.svgDialog_ == undefined) {
			let container = this.createEditor_();
		}

		if (visible) {
			this.svgDialog_.style.display = "block";

			// Create the bubble
			this.bubble_ = new Blockly.Bubble(
				<Blockly.WorkspaceSvg>(<unknown>(this.block_.workspace)),
				this.svgDialog_,
				this.block_.svgPath_,
				this.iconXY_,
				null,
				null
			);

			// Expose this mutator's block's ID on its top-level SVG group.
			this.bubble_.setSvgId(this.block_.id);

			// Draw
			this.resizeBubble_();
			this.updateColour();

			// Resize the display
			let block = this.block_ as flow_block;
			block.editor_.get_editor().view.resize();
		} else {
			// Save the last editor state for the next initialization
			let block: flow_block = this.block_;
			let data = JSON.parse(block.data) as flow_block_data;
			let ls = flow_window_list.get() as flow_window_type;
			let info = ls[data.name];

			// Convert editor back into a valid editor
			let editor: ReteEditor = block.editor_;
			if (info == undefined || editor == undefined)
				throw "INVALID SERIALIZATION OF FLOW COMPONENT";

			data.editor = editor.get_editor().toJSON();
			this.block_.data = JSON.stringify(data);
			info.data = this.block_.data;

			flow_window_list.set(ls);

			// Dispose of the bubble.
			this.svgDialog_.style.display = "block";
			this.bubble_.dispose();
			this.bubble_ = null;
			this.workspaceWidth_ = 0;
			this.workspaceHeight_ = 0;
		}
	}

	// Icon overrides
	iconClick_(e: MouseEvent) {
		if (!this.block_.isInFlyout && !Blockly.utils.isRightButton(e)) {
			this.setVisible(!this.isVisible());
		}
	};
};