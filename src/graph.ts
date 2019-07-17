import {Chart, ChartDataSets} from "chart.js";
import {WindowDeclaration, WindowManager} from "./Utility/WindowManager";
import { dictionary } from "./Playground";

// Alpha transparency component in hex
const alpha_component = "88";

// Maximum sliding window size
const WINDOW_SIZE = 64;

/**
 * @class Graph
 *
 * A simple {Chart} wrapper with dynamic dataset handles.
 */
export class Graph {
	ctx: CanvasRenderingContext2D;
	handle: WindowDeclaration;
	chart: Chart;
	map: dictionary<ChartDataSets>;

	private add_dataset(name: string, colors: Array<string>, i: number) {
		let cap = name[0].toLocaleUpperCase() + name.substr(1);
		return <ChartDataSets>{
			label: cap,
			xLabels: Array.apply(null, {length: WINDOW_SIZE}).map(Number.call, Number),
			data: [],
			backgroundColor: colors[i] + alpha_component
		};
	}

	/**
	 * @constructor
	 *
	 * Creates a {Chart} with dynamic handles to datasets.
	 *
	 * @param {String} id - The ID of the canvas to bind to.
	 * @param {String[]} datasets - An array of names of window declarations to use as datasets.
	 * @param {String[]} colors - The colors to use on each dataset.
	 */
	constructor(id: string, handle: WindowDeclaration, colors: Array<string>) {
		this.ctx = (<HTMLCanvasElement>document.getElementById(id)).getContext('2d');
		this.handle = handle;
		let datasets: dictionary<Array<number>> = this.handle.get();
		let keys = Object.keys(datasets);

		let ds = new Array(keys.length);
		for (let i = 0; i != ds.length; ++i) {
			let name = keys[i];
			this.map[name] = ds[i] = this.add_dataset(name, colors, i);
		}

		this.chart = new Chart(this.ctx, {
			type: 'line',
			data: {
				datasets: ds
			},
			options: {
				scales: {
					xAxes: [{
						type: "category",
						// labels: []
					}],
					yAxes: [{
						ticks: {
							beginAtZero: true,
							min: 0,
							max: 1
						}
					}]
				},
				responsive: true,
				maintainAspectRatio: false
			}
		});
	}

	update() {
		let dec = this.handle.get();
		let keys = Object.keys(dec);
		let updated: dictionary<boolean> = {};

		// this.chart.data.datasets.forEach((ds, index) => {
		for (let i = 0; i != keys.length; ++i) {
			let data = dec[i];
			if (data.length == 0)
				return;

			let ds = this.map[keys[i]];
			(<number[]>ds.data).push(...data);
			if (ds.data.length > WINDOW_SIZE)
				ds.data.splice(0, ds.data.length - WINDOW_SIZE - 1);
				// ds.data = ds.data.slice(ds.data.length - WINDOW_SIZE - 1);

			updated[name] = true;
		}

		// Make sure that there aren't new ones
		let updated_keys = Object.keys(updated);
		for (let i = 0; i != updated_keys.length; ++i) {
			if (!updated[updated_keys[i]]) {
				this.chart.data.datasets.push(this.add_dataset(keys[i], ["#ffffff"], 0));
			}
		}

		this.chart.update(<any>0);
	}
};

export default Graph;