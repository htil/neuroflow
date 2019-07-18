const id = "CustomNode";
const group = "GRAPH";

module.exports = [
	{
		id: id,
		group: group,

		name:          "graph",
		friendly_name: "Plot Graph",

		dependencies: [{
			names: ["WindowDeclaration", "WindowManager"],
			path: "../Utility/WindowManager"
		}],

		inputs: [
			{
				name: "data_in",
				description: "Array<Number>",
				type: "Array"
			}
		],

		worker: `
			let save_to = WindowManager.fetch("flow_data");
			console.log(inputs["data_in"]);
			save_to.set(inputs["data_in"][0]);
		`
	}
];