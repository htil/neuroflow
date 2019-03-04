
var VuePlotControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: '<div class="chart_container"><div class="y_axis"></div><div class="demo_chart"></div></div>',
 // template: '<div id="wrapper"></div>',
    data() {
      return {
        plot: 0,
        num: 0
      }
    },
    methods: {
      update() {
        if (this.ikey)
          this.putData(this.ikey, this.game)
        this.emitter.trigger('process');
      }
    },
    mounted() {
      this.game = this.getData(this.ikey);
    }
    
  }
  
  
  export default class PlotControl extends Rete.Control {
  
    constructor(emitter, key, readonly) {
      super(key);
      this.component = VuePlotControl;
      this.props = { emitter, ikey: key, readonly };
    }
  
    
  }