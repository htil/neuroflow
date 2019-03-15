import OperatorControl from '../Controls/operator.control';
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

class OperatorComponent extends Rete.Component {

    constructor(){
        super("Operator");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num_out', "Number", sockets.Number);
        var input1 = new Rete.Input('num_in1',"Number",sockets.Number);
        var input2 = new Rete.Input('num_in2',"Number",sockets.Number);
        return node.addControl(new OperatorControl(this.editor, 'op')).addOutput(out1).addInput(input1).addInput(input2);
    }

    worker(node, inputs, outputs) {
        var x = inputs['num_in1'][0];
        var y = inputs['num_in2'][0];
        var op = node.data.op;
        if(op === 'add')
        outputs['num_out'] = x+y;
        if(op === 'sub')
        outputs['num_out'] = x-y;
        if(op === 'mul')
        outputs['num_out'] = x*y;
        if(op === 'div')
        outputs['num_out'] = x/y;
        if(op === 'mod')
        outputs['num_out'] = x%y;
        if(op === 'greater')
        outputs['num_out'] = (x>y)?1:0;
        if(op === 'lesser')
        outputs['num_out'] = (x<y)?1:0;
        if(op === 'equal')
        outputs['num_out'] = (x==y)?1:0;
        if(op === 'great_eq')
        outputs['num_out'] = (x>=y)?1:0;
        if(op === 'less_eq')
        outputs['num_out'] = (x<=y)?1:0;
        if(op === 'not_eq')
        outputs['num_out'] = (x!=y)?1:0;

        
    }
}
export default class operator{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;   
    }

    async initialize() {
        var component = new OperatorComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({op: 'add'});
        this.editor.addNode(this.node);
        window.op = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new operator(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}