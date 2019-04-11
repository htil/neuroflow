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
class PsdBandPowerComponent extends Rete.Component {

    constructor(){
        super("psdBandPower");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num_out1', "Alpha", sockets.Number);
        var out2 = new Rete.Output('num_out2', "Beta", sockets.Number);
        var out3 = new Rete.Output('num_out3', "Theta", sockets.Number);
        var out4 = new Rete.Output('num_out4', "Delta", sockets.Number);
        var out5 = new Rete.Output('num_out5', "Gamma", sockets.Number);
        var input1 = new Rete.Input('arr_in1',"psd",sockets.Array);
        var input2 = new Rete.Input('num_in1',"sampleRate",sockets.Number);
        return node.addOutput(out1).addOutput(out2).addOutput(out3)
        .addOutput(out4).addOutput(out5).addInput(input1).addInput(input2);
    }

    worker(node, inputs, outputs) {
      //  console.log(inputs['num_in1']);
     //   console.log(inputs['arr_in1']);
        if(inputs['arr_in1'].length === 1 && inputs['num_in1'].length === 1){
        var psd = inputs['arr_in1'][0];
        var sampleRate = inputs['num_in1'][0];
        var alpha =  bci.psdBandPower(psd, sampleRate, "alpha");
        var beta = bci.psdBandPower(psd, sampleRate, "beta");
        var theta =  bci.psdBandPower(psd, sampleRate, "theta");
        var gamma = bci.psdBandPower(psd, sampleRate, "gamma");
        var delta = bci.psdBandPower(psd, sampleRate, "delta");
        var sum = alpha + beta + delta + gamma + theta;
        outputs['num_out1'] = alpha / sum;
	    outputs['num_out2'] =  beta / sum;
	    outputs['num_out3'] = theta / sum;
	    outputs['num_out4'] = delta / sum;
        outputs['num_out5'] =  gamma / sum;
        
    }

    }
}
export default class psdBandPower{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new PsdBandPowerComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({num_out1: 0, num_out2: 0,num_out3: 0,num_out4: 0,num_out5: 0, arr_in1: [], num_in1: 0});
        this.editor.addNode(this.node);

     }
   
     static async create(editor,engine,window) {
        const o = new psdBandPower(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}