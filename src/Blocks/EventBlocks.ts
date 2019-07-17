import { Category } from "../Utility/Toolbox";
import { CustomBlock } from "../Utility/CustomBlock";

import config from "../config";
import * as i18n from "../i18n/i18n";
let locale = i18n.set_locale(config.LOCALE);
Blockly.Msg.EVENT_HUE = 70;

/**
 * generateEventDropDown
 *
 * A function that returns array list of supported events
 */
let generateEventDropDown = () => {
	let events = locale.events.keys;
	let out = [];

	for (let event in events) {
		let val = event;
		let key = events[event];
		out.push([key, val]);
	}

	return out;
};

/**
 * Keypress
 *
 * A custom block used to capture keypress events.
 */
export let Keypress = new CustomBlock(
	"event_keypress",
	(b: Blockly.Block) => {
		// Add a label indicating the event block
		b.appendStatementInput("keypress_input")
			.appendField("On Keypress")
			.appendField(
				new Blockly.FieldDropdown(generateEventDropDown()),
				"KEY_FILTER"
			);

		// Show a hat on this block in order to show that this is an event block
		b.setStyle("hat_blocks");
		b.setColour(Blockly.Msg.EVENT_HUE);

		// Disable previous and next statements in order to fully self-contain event code.
		b.setNextStatement(false, null);
		b.setPreviousStatement(false);
	},
	(b: Blockly.Block) => {
		let key_filter = b.getFieldValue("KEY_FILTER");
		let code = `__handle_event("${key_filter}", "${b.id}")`;

		return code;
	}
);

/**
 * Event Blockly Category
 *
 * Creates a Blockly Category with the specified title.
 *
 * @param title The title to use in the flyout menu in Blockly.
 */
export let EventCategory = (title: string): Category => {
	return {
		name: title,
		colour: Blockly.Msg.EVENT_HUE,

		modules: [ Keypress.name ]
	};
};
