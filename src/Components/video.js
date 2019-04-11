import VideoControl from '../Controls/video.control';
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

class VideoComponent extends Rete.Component {

    constructor(){
        super("Video");
        this.data.component = CustomNode;
    }

    builder(node) {
        var input1 = new Rete.Input('num_in',"Speed",sockets.Number);
        return node.addControl(new VideoControl(this.editor, 'num')).addInput(input1);
    }

    worker(node, inputs, outputs) {
        console.log(inputs['num_in']);
        if(inputs['num_in'].length === 1)
       this.editor.nodes.find(n => n.id == node.id).controls.get('num').vueContext.setSpeed(inputs['num_in'][0]);
     //  node.controls.get('num')
    }
}

export default class video{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new VideoComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({num: 0});
        this.editor.addNode(this.node);
        window.vid = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new video(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}