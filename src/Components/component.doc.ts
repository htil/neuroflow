import { Control } from "rete";

/**
 * Rete Component
 *
 * This folder contains schema used in the generation of flow components for Rete.js.
 *
 * Each schema should follow the following components:
 *
 * - id: The ID of the component's template HTML.
 * - group: The name of the group a component belongs to. Groups show up as drop-down
 * menus in the rete-editor.
 * - name: The unique name used to label the component.
 * - friendly_name: The name to show to the user.
 * - dependencies (optional): An array of dependencies needed.
 *     - names: An array of the names of the imports (such as "*" or "path"). having only one will do a named import.
 *     - as (optional): What to import the named dependency as (ex. import * as xxx)
 *     - path: The path to the dependency, relative to the src/components folder.
 * - controls (optional): An array of controls to use on this component. (See src/Controls)
 *     - name: The name of the control, as it appears in the class definition.
 *     - path: The path to the control, relative to the src/Components folder.
 *     - alias: A unique alias used to refer to the control from within the worker.
 * - inputs (optional): An array of inputs for the component.
 *     - name: The unique name of the input
 *     - description: The label to show the user on the component
 *     - type: The type of input this accepts. (Valid options are Array, Number, String, and Any)
 *     - unique (optional): Whether or not the socket should accept only one input (Valid options are true and false)
 *     - is_optional (optional): Whether this input needs to have a connection or not
 * - outputs (optional): An array of outputs for the component
 *     - name: The unique name of the output
 *     - description: The label to show the user on the component
 *     - type: The type of the output. (Valid options are Array, Number, String, and Any)
 * - worker: Typescript code that is run every time this component is processed by rete. The following variables are available for use within the worker:
 *     - inputs: An array of the inputs. If any of the supplied inputs are not optional, the component will
 *       first check to see if something is connected before running the worker. The key used here is the name of the
 *       input (ex. inputs["example"] refers to the input defined with name "example"). Each input is an array
 *       with each connection being a spot in the array.
 *     - outputs: An array of the outputs. As with the inputs, the outputs are accessed by their defining name.
 *     - this.data.controls: An array of the controls specified. Look them up by their alias.
 */
export interface component_schema {
	id: string,
	group: string,
	name: string,
	friendly_name: string,

	dependencies?: Array<component_dependency>,
	controls?: Array<Control>,
	inputs?: Array<component_input>,

	worker: string
};

interface component_dependency {
	names: Array<string>,
	as?: string,
	path: string
};

interface component_input {
	name: string,
	description: string,
	type: "String" | "Number" | "Array" | "Any",

	unique?: boolean,
	is_optional?: boolean
};

interface component_output {
	name: string,
	description: string,
	type: "String" | "Number" | "Array" | "Any"
};
