import NumControl from '../Controls/Num.control';
import ArrayControl from '../Controls/Array.control';
import sockets from './sockets.rete';

var template = document.querySelector('#OperatorNode').innerHTML;

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

  class bufferComponent extends Rete.Component {

    constructor(){
        super("Buffer");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('arr_out', "Number", sockets.Array);
        var input1 = new Rete.Input('num_in',"Number",sockets.Number);
        return node.addOutput(out1).addInput(input1).addControl(new NumControl(this.editor, 'b_size')).addControl(new ArrayControl(this.editor,'arr'));
        
    }

    worker(node, inputs, outputs) {
      //  console.log(inputs['num_in']);\
        if(inputs['num_in'].length === 1)
        this.editor.nodes.find(n => n.id == node.id).controls.get('arr').push_sample(inputs['num_in']);
        outputs['arr_out'] = node.data.arr.buffer;

    }
}
export default class buffer{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new bufferComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({b_size: 200, arr: {buffer: [0], size: 200}});
        this.editor.addNode(this.node);
        window.buffer = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new buffer(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}