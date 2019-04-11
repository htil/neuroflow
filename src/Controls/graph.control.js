var VueGraphControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: '<div id="myDiv" ref="myDiv" style="width:400px;"></div>',
    data() {
      return {
        value: {
            x: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70],
            y: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            type: 'scatter',

        },
      }
    },
    methods: {
      change(e){
        this.value = +e.target.value;
        this.update();
      },
      update() {
        if (this.ikey)
          this.putData(this.ikey, this.value)
        this.emitter.trigger('process');
      },
      draw(){
          
          var out = this.$refs.myDiv;
         // console.log(this.value.x);
          Plotly.newPlot(out, [this.value]);
         setInterval(function(){Plotly.redraw(out);},100);     
      }
    },
    mounted() {
      this.value = this.getData(this.ikey);
    }
    
  }
  
  
  export default class GraphControl extends Rete.Control {
  
    constructor(emitter, key, readonly) {
      super(key);
      this.component = VueGraphControl;
      this.props = { emitter, ikey: key, readonly };
    }
  
    setValue(val) {
      this.vueContext.value = val;
    }
  }