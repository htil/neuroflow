const id = "CustomNode";
const group = "BLOCKLY";

module.exports = [
	{
		id: id,
		group: group,

		name: "blocklyStart",
		friendly_name: "Block Start",

		outputs: [
			{
				name: "blockly_enter",
				description: "Start!",
				type: "Any",
				is_unique: true
			}
		],

		worker: `
			console.log("Starting custom block with input...", "TODO");
		`
	}, {
		id: id,
		group: group,

		name: "blocklyEnd",
		friendly_name: "Block End",

		inputs: [
			{
				name: "blockly_end",
				description: "End!",
				type: "Any",
				is_unique: true
			}
		],

		worker: `
			console.log("Ending custom block with output...", inputs["blockly_end"]);
		`
	}
]