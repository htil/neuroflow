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

export default class PsdBandPowerComponent extends Rete.Component {

    constructor(){
        super("PSD Band Power");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num_out1', "Alpha", sockets.Number);
        var out2 = new Rete.Output('num_out2', "Beta", sockets.Number);
        var out3 = new Rete.Output('num_out3', "Theta", sockets.Number);
        var out4 = new Rete.Output('num_out4', "Delta", sockets.Number);
        var out5 = new Rete.Output('num_out5', "Gamma", sockets.Number);
        var input1 = new Rete.Input('arr_in1',"PSD",sockets.Array);
        var input2 = new Rete.Input('num_in1',"Sample Rate",sockets.Number);
        return node.addOutput(out1).addOutput(out2).addOutput(out3)
        .addOutput(out4).addOutput(out5).addInput(input1).addInput(input2);
    }

    worker(node, inputs, outputs) {
        console.log(inputs['num_in1']);
        console.log(inputs['arr_in1']);
        if(inputs['arr_in1'].length === 1 && inputs['num_in1'].length === 1){
        var psd = inputs['arr_in1'][0];
        var sampleRate = inputs['num_in1'][0];
        outputs['num_out1'] =  bci.psdBandPower(psd, sampleRate, "alpha");
	    outputs['num_out2'] =  bci.psdBandPower(psd, sampleRate, "beta");
	    outputs['num_out3'] =  bci.psdBandPower(psd, sampleRate, "theta");
	    outputs['num_out4'] =  bci.psdBandPower(psd, sampleRate, "delta");
        outputs['num_out5'] =  bci.psdBandPower(psd, sampleRate, "gamma");
    }

    }
}