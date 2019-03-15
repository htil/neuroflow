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

class logComponent extends Rete.Component{
    constructor(){
        super("Log to Console");
        this.data.component = CustomNode;
    }
    builder(node){
        var in1 = new Rete.Input('arr1',"Out",sockets.Number);
        
        return node.addInput(in1);          
    }
    
    worker(node, inputs, outputs) {
        console.log(inputs['arr1'][0]);
    }

}


export default class log{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new logComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({arr1: []});
        this.editor.addNode(this.node);

     }
   
     static async create(editor,engine,window) {
        const o = new log(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}