import NumControl from '../Controls/Num.control';
import sockets from './sockets.rete';

var template = document.querySelector('#SimSigNode').innerHTML;

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

  class SimSigComponent extends Rete.Component {

    constructor(){
        super("Simulate Signal");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num_out', "Frequency", sockets.Number);
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
      //  console.log(inputs['num_in']);
        if(node.data.num != 0){
        
        outputs['num_out'] = Math.sin(2*Math.PI*(new Date().getMilliseconds()/1000)*node.data.num);
        }
    }
}
export default class simSig{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new SimSigComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({num: 0});
        this.editor.addNode(this.node);
        window.num = this.node;
        var cnt = 0;
        var ed = this.editor;

var interval = setInterval(function() {
    ed.trigger('process');
    if(cnt === 100) clearInterval(interval);
}, 10);
     }
   
     static async create(editor,engine,window) {
        const o = new simSig(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}