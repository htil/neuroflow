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

class transposeComponent extends Rete.Component {

    constructor(){
        super("transpose");
        this.data.component = CustomNode;
    }

    builder(node) {
        var in1 = new Rete.Input('in1', "array", sockets.Object);
        var out1 = new Rete.Output('out1','transposed',sockets.Object);
        return node.addOutput(out1).addInput(in1);
    }

    worker(node, inputs, outputs) {
        if(inputs['in1'].length === 1){ 
                outputs['out1']=bci.transpose(inputs['in1'][0]);
        }     
    }
}

export default class transpose{
  constructor(editor,engine){
      this.editor = editor;
      this.engine = engine;
      
    
  }
  async initialize() {
      var component = new transposeComponent();
      this.editor.register(component);
      this.engine.register(component);
      this.node = await component.createNode({});
      this.editor.addNode(this.node);
      
   }
 
   static async create(editor,engine,window) {
      const o = new transpose(editor,engine);
      await o.initialize(window);
      return o;
   }
  setPosition(x,y){
      this.node.position = [x,y];
  }


}