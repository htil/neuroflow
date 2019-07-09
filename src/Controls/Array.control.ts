const BUFFER_SIZE = 200;

import { Control } from "rete";

const VueArrayControl = {
	props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],

	data() {
		return {
			buffer: [0]
		}
	},

	methods: {
		push_sample(item: any) {
			if (this.buffer.length > BUFFER_SIZE)
				this.buffer.shift();

			this.buffer.push(item);

			if (this.buffer.length > BUFFER_SIZE)
				this.update();
		},

		update() {
			this.emitter.trigger('process');
		}
	},

	mounted() {
		this.buffer = this.getData(this.ikey);
	}
}

export default class ArrayControl extends Control {
	// FIXME: Figure out what these hidden types are
	vueContext: any;
	component: any;
	props: any;

	constructor(emitter: unknown, ikey: string, readonly: boolean = false) {
		super(ikey);

		this.component = VueArrayControl;
		this.props = { emitter, ikey, readonly };
	}

	push_sample(val: any) {
		this.vueContext.push_sample(val);
	}
}
