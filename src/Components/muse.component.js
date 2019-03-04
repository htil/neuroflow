import ArrayControl from '../Controls/Array.control';
import NumberControl from '../Controls/Num.control';
import sockets from './sockets.rete';

var template = document.querySelector('#MuseNode').innerHTML;

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
  

export default class MuseComponent extends Rete.Component{
    constructor(){
        super("Muse Device");
        this.data.component = CustomNode;
    }
    builder(node){
        var out1 = new Rete.Output('arr1',"AF7",sockets.Number);
        var out2 = new Rete.Output('arr2',"AF8",sockets.Number);
        var out3 = new Rete.Output('arr3',"TP9",sockets.Number);
        var out4 = new Rete.Output('arr4',"TP10",sockets.Number);
        var out5 = new Rete.Output('num1',"Sample Rate",sockets.Number);

        node.addControl(new NumberControl(this.editor, 'arr1',0))
        .addControl(new NumberControl(this.editor, 'arr2',0))
        .addControl(new NumberControl(this.editor, 'arr3',0))
        .addControl(new NumberControl(this.editor, 'arr4',0))
        .addControl(new NumberControl(this.editor, 'num1'))
        .addOutput(out1).addOutput(out2).addOutput(out3).addOutput(out4).addOutput(out5);     
   
        return node;

    }
    
    worker(node, inputs, outputs) {
      
        outputs['arr1'] = node.data.arr1;
        outputs['arr2'] = node.data.arr2;
        outputs['arr3'] = node.data.arr3;
        outputs['arr4'] = node.data.arr4;
        outputs['num1'] = node.data.num1;
    }

}

