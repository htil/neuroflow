import ArrayControl from '../Controls/Array.control';
import sockets from './sockets.rete';

var template = document.querySelector('#CustomNode').innerHTML;

var CustomSocket = {
    template: `<div class="socket"
      :class="[type, socket.name, used()?'used':''] | kebab"
      :title="socket.name+'\\n'+socket.hint"></div>`,
    props: ['type', 'socket', 'used']
  }

var CustomNode = {
    template,
    mixins: [VueRenderPlugin.mixin],
    methods:{
      used(io){
        return io.connections.length;
      }
    },
    components: {
      Socket: /*VueRenderPlugin.Socket*/CustomSocket
    }
  }

export default class LogComponent extends Rete.Component{
    constructor(){
        super("Log to Console");
        this.data.component = CustomNode;
    }
    builder(node){
        var in1 = new Rete.Input('arr1',"Out",sockets.Array);
        
        return node.addControl(new ArrayControl(this.editor, 'arr1'))
       .addInput(in1);          
    }
    
    worker(node, inputs, outputs) {
        console.log(inputs['arr1'][0]);
    }

}

