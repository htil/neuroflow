var BUFFER_SIZE = 200;

var VueArrayControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    data() {
      return {
        buffer: [0]
      }
    },
    methods: {
      push_sample(el){
        if (this.buffer.length > BUFFER_SIZE) 
        this.buffer.shift();
        this.buffer.push(el);
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
