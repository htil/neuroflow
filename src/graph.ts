import {Chart, ChartDataSets} from "chart.js";
import {WindowDeclaration, WindowManager} from "./Utility/WindowManager";

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
	declarations: Array<WindowDeclaration>;
	chart: Chart;

	/**
	 * @constructor
	 *
	 * Creates a {Chart} with dynamic handles to datasets.
	 *
	 * @param {String} id - The ID of the canvas to bind to.
	 * @param {String[]} datasets - An array of names of window declarations to use as datasets.
	 * @param {String[]} colors - The colors to use on each dataset.
	 */
	constructor(id: string, datasets: Array<string>, colors: Array<string>) {
		this.ctx = (<HTMLCanvasElement>document.getElementById(id)).getContext('2d');
		this.declarations = datasets.map(name => WindowManager.fetch(name));

		let ds = datasets.map((name, index) => {
			let cap = name[0].toLocaleUpperCase() + name.substr(1);
			return <ChartDataSets>{
				label: cap,
				xLabels: Array.apply(null, {length: WINDOW_SIZE}).map(Number.call, Number),
				data: [],
				backgroundColor: colors[index] + alpha_component
			};
		});

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
		let dec = this.declarations;
		this.chart.data.datasets.forEach((ds, index) => {
			let data = dec[index].get();
			if (data.length == 0)
				return;

			(<number[]>ds.data).push(...dec[index].get());
			if (ds.data.length > WINDOW_SIZE)
				ds.data.splice(0, ds.data.length - WINDOW_SIZE - 1);
				// ds.data = ds.data.slice(ds.data.length - WINDOW_SIZE - 1);
		});

		this.chart.update(<any>0);
	}
};

export default Graph;