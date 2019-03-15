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

class fastICAComponent extends Rete.Component {

    constructor(){
        super("fastICA");
        this.data.component = CustomNode;
    }

    builder(node) {
        var in1 = new Rete.Input('in1', "signals", sockets.Object);
        var out1 = new Rete.Output('out1','source',sockets.Object);
        var out2 = new Rete.Output('out2','weights',sockets.Object);
        var out3 = new Rete.Output('out3','whitening',sockets.Object);
        var out4 = new Rete.Output('out4','iterations',sockets.Object);
        return node.addOutput(out1).addInput(in1).addOutput(out2).addOutput(out3).addOutput(out4);
    }

    worker(node, inputs, outputs) {
        if(inputs['in1'].length === 1){ 
            var x = bci.fastICA(inputs['in1'][0]);
            outputs['out1'] = x.source;
            outputs['out2'] = x.weights;
            outputs['out3'] = x.whitening;
            outputs['out4'] = x.iterations;
        }     
    }
}

export default class fastICA{
  constructor(editor,engine){
      this.editor = editor;
      this.engine = engine;
      
    
  }
  async initialize() {
      var component = new fastICAComponent();
      this.editor.register(component);
      this.engine.register(component);
      this.node = await component.createNode({});
      this.editor.addNode(this.node);
      
   }
 
   static async create(editor,engine,window) {
      const o = new fastICA(editor,engine);
      await o.initialize(window);
      return o;
   }
  setPosition(x,y){
      this.node.position = [x,y];
  }


}