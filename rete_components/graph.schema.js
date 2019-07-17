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
		}, {
			names: ["Point", ""],
			path: "../Sprite"
		}],

		inputs: [
			{
				name: "data_in",
				description: "Array<Number>",
				type: "Array"
			}, {
				name: "data_name",
				description: "Data Name",
				type: "String",
				optional: true
			}
		],

		worker: `
			let save_to = WindowManager.fetch("flow_data");
			let data_name = inputs["data_name"][0];

			let data_sets: any = save_to.get();

			// Remove data sets that are not named
			if (!data_name || data_name.length == 0) {
				delete data_sets[data_name];
			} else {
				data_sets[data_name] = inputs["data_in"][0];
			}

			save_to.set(data_sets);
		`
	}
];