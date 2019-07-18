const id = "CustomNode";
const group = "BCI.JS";
const MUSE_SAMPLE_RATE = 220;
const deps = [
	{
		names: ["*"],
		as: "bci",
		path: "bcijs/browser"
	}
];

module.exports = [
	{
		id: id,
		group: group,

		name:          "bciDevice",
		friendly_name: "BCI Device",
		dependencies: [{
			names: ["WindowDeclaration", "WindowManager"],
			path: "../Utility/WindowManager"
		}],

		outputs: [{
			name: "data",
			description: "EEG Data",
			type: "Array"
		}],

		worker: `
			let device_data = WindowManager.fetch("eeg_data");
			outputs["data"] = device_data.get();
		`
	},
	{
		id: id,
		group: group,

		name:          "averageBandPowerRange",
		friendly_name: "Average Range Band Power",

		dependencies: deps,

		inputs: [
			{
				name: "in1",
				description: "Data",
				type: "Array"
			}
		],
		outputs: [
			{
				name: "out1",
				description: "Average Band Power",
				type: "Number"
			}
		],
	controls: [
			{
				name:'range_low',
				path: "../Controls/Number.control",
			  alias: "range_low"
			},
			{
				name:'range_high',
				path: "../Controls/Number.control",
				alias: "range_high"
			}
		],

		worker: `
			console.log("PSD:", inputs["in1"][0],[node.data.range_low, node.data.range_high]);
			let psd = bci.averageBandPowers(inputs['in1'][0], ${MUSE_SAMPLE_RATE}, [node.data.range_low, node.data.range_high]);
			outputs['out1'] = psd[0];
		`
	},
	// {
	// 	id: id,
	// 	group: group,

	// 	name:          "averageBandPower",
	// 	friendly_name: "Average Band Power",

	// 	dependencies: deps,

	// 	inputs: [
	// 		{
	// 			name: "in1",
	// 			description: "Samples",
	// 			type: "Array"
	// 		}, {
	// 			name: "in2",
	// 			description: "Sample Rate",
	// 			type: "Number"
	// 		}, {
	// 			name: "in3",
	// 			description: "(FFT Size)",
	// 			type: "Number",
	// 			optional: true
	// 		}
	// 	],
	// 	outputs: [
	// 		{
	// 			name: "out1",
	// 			description: "Average Delta",
	// 			type: "Number"
	// 		}, {
	// 			name: "out2",
	// 			description: "Average Theta",
	// 			type: "Number"
	// 		}, {
	// 			name: "out3",
	// 			description: "Average Alpha",
	// 			type: "Number"
	// 		}, {
	// 			name: "out4",
	// 			description: "Average Beta",
	// 			type: "Number"
	// 		}, {
	// 			name: "out5",
	// 			description: "Average Gamma",
	// 			type: "Number"
	// 		}
	// 	],

	// 	worker: `
	// 		let psd = bci.averageBandPowers(inputs['in1'][0], inputs['in2'][0], ['delta','theta','alpha', 'beta','gamma'], inputs['in3'][0]);
	// 		for (let i=0; i < 5; ++i) {
	// 			outputs['out'+ (i + 1)] = psd[i];
	// 		}
	// 	`
	// },
	// {
	// 	id: id,
	// 	group: group,

	// 	name:          "confusionMatrix",
	// 	friendly_name: "Confusion Matrix",

	// 	dependencies: deps,

	// 	inputs: [
	// 		{
	// 			name: "in1",
	// 			description: "Predicted Class",
	// 			type: "Array"
	// 		}, {
	// 			name: "in2",
	// 			description: "Actual Class",
	// 			type: "Array"
	// 		}
	// 	],
	// 	outputs: [
	// 		{
	// 			name: "out1",
	// 			description: "Matrix",
	// 			type: "Array"
	// 		}
	// 	],

	// 	worker: `
	// 		outputs["out1"] = bci.confusionMatrix(inputs['in1'], inputs['in2']);
	// 	`
	// },
	// {
	// 	id: id,
	// 	group: group,

	// 	name:          "cspLearn",
	// 	friendly_name: "CSP Learn",

	// 	dependencies: deps,

	// 	inputs: [
	// 		{
	// 			name: "in1",
	// 			description: "Class 1",
	// 			type: "Array"
	// 		}, {
	// 			name: "in2",
	// 			description: "Class 2",
	// 			type: "Array"
	// 		}
	// 	],
	// 	outputs: [
	// 		{
	// 			name: "out1",
	// 			description: "CSP Params",
	// 			type: "Object"
	// 		}
	// 	],

	// 	worker: `
	// 		outputs['out1'] = bci.cspLearn(inputs['in1'], inputs['in2']);
	// 	`
	// },
	{
		id: id,
		group: group,

		name:          "signalBandPowerRange",
		friendly_name: "Signal Bands Power Range",

		dependencies: deps,

		inputs: [
		 {
				name: "in1",
				description: "Data",
				type: "Array"
			}
		],
		outputs: [
			{
				name: "out1",
				description: "Signal Band Power",
				type: "Number"
			}
		],
		controls: [
			{
				name:'range_low',
				path: "../Controls/Number.control",
			  alias: "range_low"
			},
			{
				name:'range_high',
				path: "../Controls/Number.control",
				alias: "range_high"
			}
		],

		worker: `
			let bands = [node.data.range_low, node.data.range_high];
			let psd: any = bci.signalBandPower(inputs['in1'][0], ${MUSE_SAMPLE_RATE}, bands);
			outputs['out1'] = psd;
		`
	}
];