const formatter = require("esformatter");
const fs        = require("fs");
const glob      = require("glob");
const path      = require("path");

const master_dir     = path.join(__dirname, "src");
const components_dir = path.join(master_dir, "Components");

// Generate code for every schema found in the rete_components directory
glob(path.join(__dirname, "rete_components", "*.schema.js"), {}, (err, schemas) => {
	// Short out if an error was found
	if (err)
		throw err;

	// Merge all of the schemas
	let schema_defs = [];
	schemas.forEach(schema => schema_defs = schema_defs.concat(require(schema)));

	// Generate all of the blocks
	generate_blocks(schema_defs);
});

// Notice, this spits out pug code...
function generate_group_html(group, elements) {
	let elements_as_li = "";
	elements.forEach(element => {
		elements_as_li += `		li #[a(href="#", class="${element.name}Component") ${element.friendly_name}]\n`
	});

	return `
div(class="dropdown tool_menu")
	button(class="btn btn-default dropdown-toggle", type="button", id="${group}", data-toggle="dropdown", aria-haspopup="true", aria-expanded="true", data-id="${group}")
		| ${group}
		span(class="caret")
	ul(class="dropdown-menu", aria-labelledby="${group}")
${elements_as_li}
`;
}

function generate_blocks(schemas) {
	let master_include = "";
	let master_components = "";

	let groups = {};
	let types = {};

	// Generate source for each block
	for (let i = 0; i != schemas.length; ++i) {
		let block = schemas[i];
		let required_inputs = [];

		// Add it to the list of groups
		if (!groups[block.group])
			groups[block.group] = [];
		groups[block.group].push(block);

		// Get all the needed imports
		let dependency_source = "";
		for (let i = 0; block.dependencies && i != block.dependencies.length; ++i) {
			let dep = block.dependencies[i];
			dependency_source += `import ${dep.names.length > 1 ? `{ ${dep.names.join(",")} }` : dep.names[0]}${dep.as ? ` as ${dep.as} ` : ' '} from "${dep.path}";\n`;
		}

		// Get all the needed controls
		let controls_adds = "";
		let controls_def = "";
		let controls = [];
		for (let i = 0; block.controls && i != block.controls.length; ++i) {
			let dependency = block.controls[i];

			// Add import logic
			dependency_source += `\nimport ${dependency.name} from "${dependency.path}";`;

			// Add control logic
			controls.push(`${dependency.alias}: Control${dependency.alias}`);
			controls_def += `const Control${dependency.alias} = new ${dependency.name}(this.editor, "${dependency.alias}")\n`;
			controls_adds += `.addControl(Control${dependency.alias})\n`;
		}

		// Parse Inputs
		let input_source = "";
		let input_adds = "";
		for (let i = 0; block.inputs && i != block.inputs.length; ++i) {
			let input = block.inputs[i];

			// Add to the list of types (any is special)
			if (!types[input.type] && input.type !== "Any")
				types[input.type] = `${input.type}: new Rete.Socket("${input.type}")`;

			// See if optional
			if (!input.optional)
				required_inputs.push(`inputs["${input.name}"].length`);

			input_source += `let in${i} = new Rete.Input("${input.name}", "${input.description}", SocketTypes.${input.type}, ${input.is_unique == true ? false : true});\n`
			input_adds += `.addInput(in${i})\n`;
		}

		// Parse Outputs
		let output_source = "";
		let output_adds = "";
		for (let i = 0; block.outputs && i != block.outputs.length; ++i) {
			let output = block.outputs[i];

			// Add to the list of types (any is special)
			if (!types[output.type] && output.type !== "Any")
				types[output.type] = `${output.type}: new Rete.Socket("${output.type}")`;

			output_source += `let out${i} = new Rete.Output("${output.name}", "${output.description}", SocketTypes.${output.type}, ${output.is_unique == true ? false : true});\n`
			output_adds += `.addOutput(out${i})\n`;
		}

		let source = `
			// WARNING: This file is autogenerated. Please do not edit.
			import Rete, { Component, Control } from "rete";
			import SocketTypes from "./socket.types";
			import VueRenderPlugin from "rete-vue-render-plugin";

			${dependency_source}

			let template = document.querySelector("#${block.id}").innerHTML;

			let CustomSocket = {
				template: \`<div class="socket" :class="[type, socket.name, used()?'used':''] | kebab" :title="socket.name"></div>\`,

				props: ['type', 'socket', 'used']
			};

			const as_any: any = VueRenderPlugin;
			let CustomNode = {
				template,
				mixins: [as_any.mixin],
				methods:{
					used(io: any) {
						return io.connections.length;
					}
				},
				components: {
					Socket: /*VueRenderPlugin.Socket*/ CustomSocket
				}
			};

			interface dictionary<T> {
				[key: string]: T
			};

			export interface component_data {
				component: any;
				controls: dictionary<Control>;
			};

			export default class ${block.name}Component extends Component {
				data: component_data = {component: CustomNode, controls: {}};

				constructor() {
					super("${block.friendly_name}");
				}

				builder(node: any) {
					${input_source}
					${output_source}

					// Add a way to access the controls by name
					${controls_def}
					this.data.controls = {
						${controls.join(",\n")}
					}

					return node
						${input_adds}
						${output_adds}
						${controls_adds};
				}

				worker(node: any, inputs: dictionary<Array<any>>, outputs: dictionary<any>) {
					// Assert required inputs first
					if (!(${required_inputs.length ? required_inputs.join(" && ") : true}))
						return;

					${block.worker ? block.worker : "// TODO"}
				}

				static get_group() {
					return "${block.group}";
				}
			}
		`;

		let formatted_source = formatter.format(source);
		fs.writeFileSync(path.join(components_dir, `${block.name}.component.ts`), formatted_source, 'utf-8');

		master_include += `import ${block.name}Component from "./Components/${block.name}.component";\n`;
		master_components += `${block.name}Component: ${block.name}Component,\n`;
	}

	// Generate the master type list
	let master_types = `
		import Rete from "rete";

		interface dictionary<T> {
			[key: string]: T
		};

		let SocketTypes: dictionary<any> = {
			${Object.values(types).join(",\n")}
		};

		// Make an 'any' socket that accepts all types
		let any_t = new Rete.Socket("Any");
		let keys = Object.keys(SocketTypes);
		for (let i = 0; i != keys.length; ++i)
			SocketTypes[keys[i]].combineWith(any_t);

		SocketTypes["Any"] = any_t;

		export default SocketTypes;
	`;
	let formatted_types = formatter.format(master_types);
	fs.writeFileSync(path.join(components_dir, `socket.types.ts`), formatted_types, 'utf-8');

	// Generate the master include
	let master_source = `
		${master_include}

		let components = {
			${master_components}
		};

		export default components;
	`
	let formatted_master = formatter.format(master_source);
	fs.writeFileSync(path.join(master_dir, "components.ts"), formatted_master, 'utf-8');

	// Generate the final HTML
	let all_groups_html = "// WARNING: This file is autogenerated. Please do not edit.\n";
	let keys = Object.keys(groups);
	for (let i = 0; i != keys.length; ++i) {
		let grp = groups[keys[i]];
		all_groups_html += generate_group_html(keys[i], grp);
	}

	fs.writeFileSync(path.join(__dirname, "views", "rete_components.pug"), all_groups_html, 'utf-8');
}