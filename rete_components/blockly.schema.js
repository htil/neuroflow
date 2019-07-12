const id = "CustomNode";
const group = "BLOCKLY";

module.exports = [
	// {
	// 	id: id,
	// 	group: group,

	// 	name: "blocklyStart",
	// 	friendly_name: "Block Start",

	// 	outputs: [
	// 		{
	// 			name: "blockly_enter",
	// 			description: "Start!",
	// 			type: "Any",
	// 			is_unique: true
	// 		}
	// 	],

	// 	worker: `
	// 		console.log("Starting custom block with input...", "TODO");
	// 	`
	// },
	{
		id: id,
		group: group,

		name: "blocklyEnd",
		friendly_name: "Output",

		dependencies: [{
			names: ["WindowDeclaration", "WindowManager"],
			path: "../Utility/WindowManager"
		}],

		inputs: [
			{
				name: "blockly_end",
				description: "End!",
				type: "Any",
				is_unique: true,
				optional: true // Optional so that the value will get set to undefined
			}
		],

		worker: `
			let name = this.editor.id;
			let final = WindowManager.fetch("blockly_final");
			let as_any: any = final.get();

			as_any[name] = inputs["blockly_end"][0];
			final.set(as_any);
		`
	}
]