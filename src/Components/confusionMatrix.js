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

 class confusionMatrixComponent extends Rete.Component {

    constructor(){
        super("confusionMatrix");
        this.data.component = CustomNode;
    }

    builder(node) {
        var in1 = new Rete.Input('in1', "predicted Class", sockets.Object);
        var in2 = new Rete.Input('in2',"actual Class",sockets.Object);
        

        var out1 = new Rete.Output('out1','Matrix',sockets.Object);
        return node.addOutput(out1).addInput(in1).addInput(in2);
    }

    worker(node, inputs, outputs) {
        if(inputs['in1'].length === 1 && inputs['in2'].length ===1){ 
                outputs['out1']=bci.confusionMatrix(inputs['in1'][0],inputs['in2'][0]);
        }     
    }
}
export default class confusionMatrix{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new confusionMatrixComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({});
        this.editor.addNode(this.node);
        
     }
   
     static async create(editor,engine,window) {
        const o = new confusionMatrix(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}