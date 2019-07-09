declare module "plotly.js-dist" {
	export default class Plotly {
		static newPlot(graphDiv: (string | Element), data?: Array<object>, layout?: object, config?: object): void;
		static redraw(graphDiv: (string | Element)): void;
	}
}