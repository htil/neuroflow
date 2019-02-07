import NumControl from '../Controls/Num.control';
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

export default class NumComponent extends Rete.Component {

    constructor(){
        super("Number");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num_out', "Number", sockets.Number);
        var input1 = new Rete.Input('num_in',"Number",sockets.Number);
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1).addInput(input1);
    }

    worker(node, inputs, outputs) {
        console.log(inputs['num_in']);
        if(inputs['num_in'].length === 1)
        node.data.num = inputs['num_in'][0];
        this.editor.nodes.find(n => n.id == node.id).controls.get('num').setValue(node.data.num);
        outputs['num_out'] = node.data.num;

    }
}