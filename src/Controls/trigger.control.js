var VueTriggerControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: `<button v-on:click="toggle" v-bind:class="classObject"> {{ value }}</button>`,
    data() {
      return {
        value: 'Set'
      }
    },
    computed: {
        classObject: function () {
            if(this.value == 'Set') return 'trigger_set';
            else return 'trigger_ready';
        }
    },
    methods: {
      toggle(val){
          this.value = this.value=='Ready'?'Set':'Ready';
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
  
  
  export default class TriggerControl extends Rete.Control {
  
    constructor(emitter, key, readonly) {
      super(key);
      this.component = VueTriggerControl;
      this.props = { emitter, ikey: key, readonly };
    }
  
    trigerred() {
      this.vueContext.toggle();
    }
  }