import TriggerControl from '../Controls/Trigger.control';
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

class iftttComponent extends Rete.Component {

    constructor(){
        super("IFTTT");
        this.data.component = CustomNode;
    }

    builder(node) {
        var input1 = new Rete.Input('num_in',"Number",sockets.Number);
        return node.addControl(new TriggerControl(this.editor, 'trigger')).addInput(input1);
    }

    worker(node, inputs, outputs) {
        // console.log(inputs['num_in']);
        if(node.data.trigger == 'Ready' && inputs['num_in'][0]>0){
         //   console.log(inputs['num_in']);
        fetch('https://maker.ifttt.com/trigger/neuroflow_trigger/with/key/cM8IGFpngJ00BuW6QzFruqGEjY2Sm3iKLYj_xN34LAV');
        this.editor.nodes.find(n => n.id == node.id).controls.get('trigger').trigerred();}
    }
}
export default class ifttt{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new iftttComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({trigger: 'Set'});
        this.editor.addNode(this.node);
        window.ifttt = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new ifttt(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}