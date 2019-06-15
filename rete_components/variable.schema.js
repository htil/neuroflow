const id = "OperatorNode";
const group = "VARIABLE";

module.exports = [
	{
		id: id,
		group: group,

		name:          "buffer",
		friendly_name: "Buffer",

		controls: [{
			name: "NumberControl",
			path: "../Controls/Number.control",
			alias: "b_size"
		}, {
			name: "ArrayControl",
			path: "../Controls/Array.control",
			alias: "arr"
		}],

		inputs: [
			{
				name: "num_in",
				description: "Number",
				type: "Number"
			}
		],
		outputs: [
			{
				name: "arr_out",
				description: "Array<Number>",
				type: "Array"
			}
		],

		worker: `
			let control: any = this.data.controls["arr"];
			let array_control: ArrayControl = control;

			if (inputs['num_in'].length === 1)
				array_control.push_sample(inputs["num_in"]);

			outputs['arr_out'] = node.data.arr.buffer;
		`
	}, {
		id: id,
		group: group,

		name:          "number",
		friendly_name: "Number",

		controls: [{
			name: "NumberControl",
			path: "../Controls/Number.control",
			alias: "num"
		}],

		inputs: [
			{
				name: "num_in",
				description: "Number",
				type: "Number",
				optional: true
			}
		],
		outputs: [
			{
				name: "num_out",
				description: "Number",
				type: "Number"
			}
		],

		worker: `
			let control: any = this.data.controls["num"];
			let num_control: NumberControl = control;

			if (inputs.num_in.length && inputs.num_in[0] != undefined) {
				node.data.num = inputs['num_in'][0];

				// Update the control to show the input
				num_control.setValue(node.data.num);
			}

			outputs['num_out'] = node.data.num;
		`
	}, {
		id: id,
		group: group,

		name:          "string",
		friendly_name: "String",

		controls: [{
			name: "StringControl",
			path: "../Controls/String.control",
			alias: "str"
		}],

		outputs: [
			{
				name: "str_out",
				description: "String",
				type: "String"
			}
		],

		worker: `
			outputs['str_out'] = node.data.str;
		`
	}
];