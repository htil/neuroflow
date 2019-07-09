/** Declaration file generated by dts-gen */

type band_t = number | "delta" | "theta" | "alpha" | "beta" | "gamma";
type array_2d = Array<Array<number>>;

declare module "bcijs/browser" {
	function averageBandPowers(
		samples: array_2d,
		sampleRate: number,
		bands: Array<number> | Array<band_t>,
		fftSize?: number
	): Array<number>;

	function confusionMatrix(predictedClasses: Array<number>, actualClasses: Array<number>): array_2d;

	function cspLearn(class1: array_2d, class2: array_2d): object;

	function psd(
		signal: Array<number>,
		options?: { fftSize?: number, truncate?: boolean }
	): Array<number>;

	function psdBandPower(
		psd: Array<number>, sampleRate: number,
		band: Array<Number> | band_t,
		fftSize?: number
	): number;

	function signalBandPower(
		samples: array_2d,
		sampleRate: number,
		bands: Array<Number> | band_t | array_2d | Array<band_t>,
		options?: { fftSize?: number }
	): number | Array<number>;
	// class LDA {
	// 	constructor(class1: number[][], class2: number[][]);
	// 	static project(point: number[]): number;
	// }

	// namespace network {
	// 	function addEEGListener(oscAddress: string, oscPort: number, eegAddress: string, callback: (data: (string | number)[]) => void): void;
	// }

	// namespace signal {
	// 	class CSP {
	// 		constructor(class1: number[][], class2: number[][]);
	// 		static project(data: number[][], dimensions?: number): number[][];
	// 	}

	// 	class EEGWindow {
	// 		constructor(size: number, numChannels: number, callback: (sample: (string | number)[]) => void);
	// 		addData(data: number[]): void;
	// 		clear(): void;
	// 	}

	// 	function generate(amplitudes: number[], frequencies: number[], sampleRate: number, duration: number): number[];
	// 	function getBandPower(size: number, psd: number[], sampleRate: number, band: (number[] | string)): number;
	// 	function getPSD(size: number, signal: number[]): number[];
	// }
}
