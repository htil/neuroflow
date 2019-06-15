import { Control } from "rete";

const VueNumControl = {
	props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
	template: '<input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop=""/>',

	data() {
		return {
			value: 0,
		}
	},

	methods: {
		change(e: any) {
			this.value = +e.target.value; // FIXME: why the unary plus?
			this.update();
		},

		update() {
			if (this.ikey)
				this.putData(this.ikey, this.value)

			this.emitter.trigger('process');
		}
	},

	mounted() {
		this.value = this.getData(this.ikey);
	}
}


export default class NumberControl extends Control {
	component: any;
	props: any;
	vueContext: any;

	constructor(emitter: any, ikey: string, readonly: boolean = false) {
		super(ikey);

		this.component = VueNumControl;
		this.props = { emitter, ikey, readonly };
	}

	setValue(val: any) {
		this.vueContext.value = val;
	}
}