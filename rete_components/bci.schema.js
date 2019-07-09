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

		name:          "averageBandPowerRange",
		friendly_name: "Average Range Band Power",

		dependencies: deps,

		inputs: [
			{
				name: "range_low",
				description: "Lower Range",
				type: "Number"
			}, {
				name: "range_high",
				description: "Higher Range",
				type: "Number"
			}, {
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

		worker: `
			let psd = bci.averageBandPowers(inputs['in1'][0], ${MUSE_SAMPLE_RATE}, [inputs["range_low"][0], inputs["range_high"][0]], undefined);
			outputs['out1'] = psd[0];
		`
	}, {
		id: id,
		group: group,

		name:          "averageBandPower",
		friendly_name: "Average Band Power",

		dependencies: deps,

		inputs: [
			{
				name: "in1",
				description: "Samples",
				type: "Array"
			}, {
				name: "in2",
				description: "Sample Rate",
				type: "Number"
			}, {
				name: "in3",
				description: "(FFT Size)",
				type: "Number",
				optional: true
			}
		],
		outputs: [
			{
				name: "out1",
				description: "Average Delta",
				type: "Number"
			}, {
				name: "out2",
				description: "Average Theta",
				type: "Number"
			}, {
				name: "out3",
				description: "Average Alpha",
				type: "Number"
			}, {
				name: "out4",
				description: "Average Beta",
				type: "Number"
			}, {
				name: "out5",
				description: "Average Gamma",
				type: "Number"
			}
		],

		worker: `
			let psd = bci.averageBandPowers(inputs['in1'][0], inputs['in2'][0], ['delta','theta','alpha', 'beta','gamma'], inputs['in3'][0]);
			for (let i=0; i < 5; ++i) {
				outputs['out'+ (i + 1)] = psd[i];
			}
		`
	}, {
		id: id,
		group: group,

		name:          "confusionMatrix",
		friendly_name: "Confusion Matrix",

		dependencies: deps,

		inputs: [
			{
				name: "in1",
				description: "Predicted Class",
				type: "Array"
			}, {
				name: "in2",
				description: "Actual Class",
				type: "Array"
			}
		],
		outputs: [
			{
				name: "out1",
				description: "Matrix",
				type: "Array"
			}
		],

		worker: `
			outputs["out1"] = bci.confusionMatrix(inputs['in1'], inputs['in2']);
		`
	}, {
		id: id,
		group: group,

		name:          "cspLearn",
		friendly_name: "CSP Learn",

		dependencies: deps,

		inputs: [
			{
				name: "in1",
				description: "Class 1",
				type: "Array"
			}, {
				name: "in2",
				description: "Class 2",
				type: "Array"
			}
		],
		outputs: [
			{
				name: "out1",
				description: "CSP Params",
				type: "Object"
			}
		],

		worker: `
			outputs['out1'] = bci.cspLearn(inputs['in1'], inputs['in2']);
		`
	}, {
		id: id,
		group: group,

		name:          "signalBandPower",
		friendly_name: "Signal Bands Power",

		dependencies: deps,

		inputs: [
			{
				name: "in1",
				description: "Samples",
				type: "Array"
			}, {
				name: "in2",
				description: "Sample Rate",
				type: "Number"
			}, {
				name: "in3",
				description: "Options",
				type: "Object",
				optional: true
			}
		],
		outputs: [
			{
				name: "out1",
				description: "Delta Band Power",
				type: "Number"
			}, {
				name: "out2",
				description: "Theta Band Power",
				type: "Number"
			}, {
				name: "out3",
				description: "Alpha Band Power",
				type: "Number"
			}, {
				name: "out4",
				description: "Beta Band Power",
				type: "Number"
			}, {
				name: "out5",
				description: "Gamma Band Power",
				type: "Number"
			}
		],

		worker: `
			let psd: any = bci.signalBandPower(inputs['in1'][0], inputs['in2'][0], ['delta','theta','alpha', 'beta','gamma'], inputs['in3'][0]);
			let psd_as_array: Array<number> = psd;

			for (let i=0; i < 5; ++i) {
				outputs['out'+ (i + 1)] = psd_as_array[i];
			}
		`
	}
];