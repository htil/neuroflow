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

class PsdComponent extends Rete.Component {

    constructor(){
        super("Power Spectral Density");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('arr_out', "PSD", sockets.Array);
        var input1 = new Rete.Input('arr_in',"Signal",sockets.Array);
        return node.addOutput(out1).addInput(input1);
    }

    worker(node, inputs, outputs) {
        if(inputs['arr_in'].length === 1)
        //console.log(inputs['arr_in']);
        var psd = bci.psd(inputs['arr_in'][0]);
        outputs['arr_out'] = psd;

    }
}
export default class psd{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new PsdComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({arr_out: [],arr_in: []});
        this.editor.addNode(this.node);
        
     }
   
     static async create(editor,engine,window) {
        const o = new psd(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}