
var VueArrayControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    data() {
      return {
        buffer: [0],
        size: 0
      }
    },
    methods: {
      push_sample(el){
        if(isNaN(el)) return;
        if (this.buffer.length > this.size) 
        this.buffer.shift();
        this.buffer.push(el);
        if (this.buffer.length > this.size)
        this.update();
      },
      update() {
        
        this.emitter.trigger('process');
      }
    },
    mounted() {
      this.buffer = this.getData(this.ikey).buffer;
      this.size = this.getData(this.ikey).size;
    }
  }
  
  export default class ArrayControl extends Rete.Control {
  
    constructor(emitter, key, readonly,val) {
      super(key);
      this.component = VueArrayControl;
      this.props = { emitter, ikey: key, readonly };
      
    }
  
    push_sample(val) {
      this.vueContext.push_sample(val);
    }
  }
