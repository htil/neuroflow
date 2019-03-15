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

class cspProjectComponent extends Rete.Component {

    constructor(){
        super("cspProject");
        this.data.component = CustomNode;
    }

    builder(node) {
        var in1 = new Rete.Input('in1', "cspParams", sockets.Object);
        var in2 = new Rete.Input('in2',"data",sockets.Object);
        var in3 = new Rete.Input('in3',"dimensions",sockets.Object);

        var out1 = new Rete.Output('out1','Projected Data',sockets.Object);

        return node.addOutput(out1).addInput(in1).addInput(in2).addInput(in3);
    }

    worker(node, inputs, outputs) {
        if(inputs['in1'].length === 1 && inputs['in2'].length ===1){ 
            if(inputs['in3'].length ===1)
            outputs['out1']=bci.cspProject(inputs['in1'][0],inputs['in2'][0],inputs['in3'][0]);
            else
            outputs['out1']=bci.cspProject(inputs['in1'][0],inputs['in2'][0]);
        }          
    }
}
export default class cspProject{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new cspProjectComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({});
        this.editor.addNode(this.node);
        
     }
   
     static async create(editor,engine,window) {
        const o = new cspProject(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}