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

class signalBandPowerComponent extends Rete.Component {

    constructor(){
        super("signalBandPower");
        this.data.component = CustomNode;
    }

    builder(node) {
        var in1 = new Rete.Input('in1', "samples", sockets.Object);
        var in2 = new Rete.Input('in2',"sampleRate",sockets.Object);
        var in3 = new Rete.Input('in3',"fftSize",sockets.Object);

        var out1 = new Rete.Output('out1','delta',sockets.Object);
        var out2 = new Rete.Output('out2','theta',sockets.Object);
        var out3 = new Rete.Output('out3','alpha',sockets.Object);
        var out4 = new Rete.Output('out4','beta',sockets.Object);
        var out5 = new Rete.Output('out5','gamma',sockets.Object);

        return node.addOutput(out1).addOutput(out2).addOutput(out3).addOutput(out4).addOutput(out5).addInput(in1).addInput(in2).addInput(in3);
    }

    worker(node, inputs, outputs) {
        if(inputs['in1'].length === 1 && inputs['in2'].length ===1){
            var psd = 0;
            if(inputs['in3'].length ===1)
            psd = bci.signalBandPowers(inputs['in1'][0], inputs['in2'][0], ['delta','theta','alpha', 'beta','gamma'],inputs['in3'][0]);
            else
            psd = bci.signalBandPowers(inputs['in1'][0], inputs['in2'][0], ['delta','theta','alpha', 'beta','gamma']);
            for(var i=0;i<5;i++){
                outputs['out'+(i+1)]=psd[i];
            }
        }     
    }
}
export default class signalBandPower{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
    }
    async initialize() {
        var component = new signalBandPowerComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({});
        this.editor.addNode(this.node);
        
     }
   
     static async create(editor,engine,window) {
        const o = new signalBandPower(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}