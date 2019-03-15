import PongControl from '../Controls/pong.control';
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

class PongComponent extends Rete.Component {

    constructor(){
        super("Pong");
        this.data.component = CustomNode;
    }

    builder(node) {
        var input1 = new Rete.Input('num_in',"Number",sockets.Number);
        return node.addControl(new PongControl(this.editor, 'pong')).addInput(input1);
    }

    worker(node, inputs, outputs) {
      //  console.log(inputs['num_in']);
        if(inputs['num_in'].length === 1)
        var spd = inputs['num_in'][0];
        if(spd != null)
        this.editor.nodes.find(n => n.id == node.id).controls.get('pong').setValue(spd);

    }
}
import Pong from './../pong_old';
export default class pongGame{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new PongComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({pong: Pong});
        this.editor.addNode(this.node);
        this.node.data.pong.initialize();
     }
   
     static async create(editor,engine,window) {
        const o = new pongGame(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}