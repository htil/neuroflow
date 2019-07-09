import { Control } from "rete";

const VueNumControl = {
	props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
	template: '<input type="text" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop=""/>',

	data() {
		return {
			value: "",
		}
	},

	methods: {
		change(e: any) {
			this.value = e.target.value;
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


export default class StringControl extends Control {
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