import { Control } from "rete";
import Plotly from "plotly.js-dist";

var VueGraphControl = {
	props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
	template: '<div id="myDiv" ref="myDiv" style="width:400px;"></div>',
	data() {
		return {
			value: {
				x: Array<Number>(),
				y: Array<Number>(),
				type: 'scatter'
			},
		}
	},
	methods: {
		change(e: any) {
			this.value = +e.target.value;
			this.update();
		},

		update() {
			if (this.ikey)
				this.putData(this.ikey, this.value);

			this.emitter.trigger('process');
		},

		draw() {
			let out = this.$refs.myDiv;
			// console.log(this.value.x);

			Plotly.newPlot(out, [this.value]);
		}
	},

	mounted() {
		this.value = this.getData(this.ikey);
	}
}


export default class GraphControl extends Control {
	component: any;
	props: any;
	vueContext: any;

	constructor(emitter: any, ikey: string, readonly: boolean = false) {
		super(ikey);

		this.component = VueGraphControl;
		this.props = { emitter, ikey, readonly };
	}

	setValue(val: any) {
		this.vueContext.value = val;
		this.vueContext.draw();
	}
}