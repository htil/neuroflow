import { BCIDevice, ScalpElectrodes } from "../BCIDevice";
import { Category } from "../Utility/Toolbox";
import { CustomBlock } from "../Utility/CustomBlock";
import * as bci from "bcijs/browser";
import { WindowManager } from "../Utility/WindowManager";
import * as i18n from "../i18n/i18n";

import config from "../config";
import { TelemetryData } from "muse-js";
let locale = i18n.set_locale(config.LOCALE);

const BUFFER_SIZE = 1024;
const WEIGHT = 0.90;

let buffer : number[] = [];
let weight : number[] = Array(6).fill(0);

// Add a color for these blocks
Blockly.Msg.BCI_HUE = 180;

// Declare the bands
WindowManager.clear();
let alpha = WindowManager.declare("alpha", 0);
let beta  = WindowManager.declare("beta",  0);
let theta = WindowManager.declare("theta", 0);
let delta = WindowManager.declare("delta", 0);
let gamma = WindowManager.declare("gamma", 0);
let engagement = WindowManager.declare("engagement", 0);

let battery = WindowManager.declare("battery", -1);
let temperature = WindowManager.declare("temperature", -1);

export let Device: BCIDevice = new BCIDevice((sample) => {
	if (sample.electrode !== ScalpElectrodes.AF7) return;

	sample.data.forEach(el => {
		if (buffer.length > BUFFER_SIZE) buffer.shift();
		buffer.push(el);
	});

	if (buffer.length < BUFFER_SIZE) return;

	let psd = bci.psd(buffer);

	let al = bci.psdBandPower(psd, sample.sampleRate, "alpha");
	let be = bci.psdBandPower(psd, sample.sampleRate, "beta");
	let th = bci.psdBandPower(psd, sample.sampleRate, "theta");
	let de = bci.psdBandPower(psd, sample.sampleRate, "delta");
	let ga = bci.psdBandPower(psd, sample.sampleRate, "gamma");
	let sum = al + be + th + de + ga;

	let w_alpha = al / sum;
	let w_beta = be / sum;
	let w_theta = th / sum;
	let w_delta = de / sum;
	let w_gamma = ga / sum;
	let w_engagement = be / (al + th);

	let weighted_avg = (original: number, next: number) =>
		original * WEIGHT + (next || 0) * (1 - WEIGHT);

	weight[0] = weighted_avg(weight[0], w_alpha);
	weight[1] = weighted_avg(weight[1], w_beta);
	weight[2] = weighted_avg(weight[2], w_theta);
	weight[3] = weighted_avg(weight[3], w_delta);
	weight[4] = weighted_avg(weight[4], w_gamma);
	weight[5] = weighted_avg(weight[5], w_engagement);

	alpha.set(Math.max(weight[0], 0));
	beta.set(Math.max(weight[1], 0));
	theta.set(Math.max(weight[2], 0));
	delta.set(Math.max(weight[3], 0));
	gamma.set(Math.max(weight[4], 0));
	engagement.set(Math.max(weight[5], 0));
}, (status: TelemetryData) => {
	battery.set(status.batteryLevel);
	temperature.set(status.temperature);
});

export let Alpha = new CustomBlock("Alpha", {
	message0: locale.bci.alpha,
	args0: [],
	output: "Number",
	colour: "%{BKY_BCI_HUE}",
	tooltip: locale.bci.tooltip,
	helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, (block: Blockly.Block): (string | number)[] => {
	return [alpha.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});

export let Beta = new CustomBlock("Beta", {
	message0: locale.bci.beta,
	args0: [],
	output: "Number",
	colour: "%{BKY_BCI_HUE}",
	tooltip: locale.bci.tooltip,
	helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, (block: Blockly.Block): (string | number)[] => {
	return [beta.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});

export let Theta = new CustomBlock("Theta", {
	message0: locale.bci.theta,
	args0: [],
	output: "Number",
	colour: "%{BKY_BCI_HUE}",
	tooltip: locale.bci.tooltip,
	helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, (block: Blockly.Block): (string | number)[] => {
	return [theta.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});

export let Delta = new CustomBlock("Delta", {
	message0: locale.bci.delta,
	args0: [],
	output: "Number",
	colour: "%{BKY_BCI_HUE}",
	tooltip: locale.bci.tooltip,
	helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, (block: Blockly.Block): (string | number)[] => {
	return [delta.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});

export let Gamma = new CustomBlock("Gamma", {
	message0: locale.bci.gamma,
	args0: [],
	output: "Number",
	colour: "%{BKY_BCI_HUE}",
	tooltip: locale.bci.tooltip,
	helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, (block: Blockly.Block): (string | number)[] => {
	return [gamma.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});

export let Engagement = new CustomBlock("Engagement", {
	message0: locale.bci.engagement,
	args0: [],
	output: "Number",
	colour: "%{BKY_BCI_HUE}",
	tooltip: locale.bci.tooltip,
	helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, (block: Blockly.Block): (string | number)[] => {
	return [engagement.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});

export let BCIData = (title: string): Category => {
	return {
		name: title,
		// FIXME: Figure out why %{Blockly.Msg.BCI_HUE} doesn't work here
		colour: Blockly.Msg.BCI_HUE,

		modules: [Alpha.name, Beta.name, Theta.name, Delta.name, Gamma.name, Engagement.name]
	};
};
