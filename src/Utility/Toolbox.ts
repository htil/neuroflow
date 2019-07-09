//-----------------------------------------------------
// Exported members
//-----------------------------------------------------

export type module_type = (string | Category | Label | Button | Separator)[];

/**
 * @interface Label
 *
 * A simple label for Blockly.
 */
export interface Label {
	text: string;
}

/**
 * @interface Seperator
 *
 * A simple separator.
 */
export interface Separator {
	gap: number;
}

/**
 * @interface Button
 *
 * A simple button for Blockly.
 */
export interface Button {
	text: string;
	callbackKey: string;
}

/**
 * @interface Category
 *
 * A {Blockly.Toolbox} category. Can be passed into a Toolbox in order to categorize blocks
 * under a single namespace. The colour option is an HSV number.
 */
export interface Category {
	name: string;

	colour?: number | string;
	custom?: "VARIABLE" | "PROCEDURE" | string;

	modules: module_type;
}

/**
 * @class Toolbox
 *
 * A simple wrapper for Blockly's Toolbox
 */
export class Toolbox {
	modules: module_type;

	/**
	 * @constructor
	 *
	 * Generates a toolbox with the given modules. The supplied modules can either be
	 * module names themselves or Categories with submodules.
	 *
	 * @param {module_type} modules - The modules to load.
	 */
	constructor(modules: module_type) {
		this.modules = modules;
	}

	/**
	 * @function toString
	 *
	 * Returns a string representation of the toolbox XML needed by {Blockly.Toolbox}
	 *
	 * @returns {string} Returns the XML tree as a string
	 */
	toString(): string {
		let res: string = "<xml style=\"display: none;\">";

		res += unwind(this.modules);
		res += "</xml>";

		return res;
	}
}

//-----------------------------------------------------
// File-level functions
//-----------------------------------------------------

// Attempts to build an XML string from a given list of Modules or Categories.
export function unwind(arg: module_type, prepend_xml: boolean = false): string {
	let res = (prepend_xml) ? "<xml>" : "";

	let cur: any;
	for (let what of arg) {
		if ((<Category>what).modules) {
			// The argument is a category
			cur = <Category>what;

			// Create the category header
			res += "<category name=\"" + cur.name + "\" colour=\"" + cur.colour + "\"";

			// Aloow for custom category types
			if (cur.custom) {
				res += " custom=\"" + cur.custom + "\"";
			}

			res += ">";
			res += unwind(cur.modules);

			// Close the category
			res += "</category>"

		} else if ((<Button>what).callbackKey) {
			// The argument is a button
			cur = <Button>what;

			res += `<button text="${cur.text}" callbackKey="${cur.callbackKey}"></button>`;

		} else if ((<Label>what).text) {
			// The argument is a label
			cur = <Label>what;

			res += "<label text=\"" + cur.text + "\"></label>";

		} else if ((<Separator>what).gap !== undefined) {
			// The argument is a separator
			cur = <Separator>what;

			res += "<sep gap=\"" + cur.gap + "\"></sep>";

		} else {
			// The argument is a block
			res += "<block type=\"" + what + "\"></block>";
		}
	}

	if (prepend_xml) res += "</xml>";

	return res;
}