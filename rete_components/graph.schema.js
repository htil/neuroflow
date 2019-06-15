const id = "CustomNode";
const group = "GRAPH";

module.exports = [
	{
		id: id,
		group: group,

		name:          "graph",
		friendly_name: "Plot Graph",

		controls: [{
			name: "GraphControl",
			path: "../Controls/Graph.control",
			alias: "graph_data"
		}],

		inputs: [
			{
				name: "data_in",
				description: "Array<Number>",
				type: "Array"
			}
		],

		worker: `
			let graph: any = this.data.controls["graph_data"];
			let graph_control: GraphControl = graph;

			// let x = Array.from({length: inputs["data_in"].length}, (_, i) => i);
			// let y = inputs.data_in[0];
			let x = Array.from({length: 10}, (_, i) => i);
			let y = x;

			graph_control.setValue({
				x,
				y
			});

			graph_control.setValue({x, y});
		`
	}
];