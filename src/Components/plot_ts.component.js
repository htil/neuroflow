import PlotControl from '../Controls/plot.control';
import sockets from './sockets.rete';

var template = document.querySelector('#PlotNode').innerHTML;

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

export default class PlotTsComponent extends Rete.Component {

    constructor(){
        super("Plot");
        this.data.component = CustomNode;
    }

    builder(node) {
        var input1 = new Rete.Input('num_in',"Number",sockets.Number);
        return node.addControl(new PlotControl(this.editor, 'plot')).addInput(input1);
    }

    worker(node, inputs, outputs) {
        console.log(inputs['num_in']);
        if(inputs['num_in'].length === 1){
        var num = inputs['num_in'][0];
        var tmpData = {
            one: num
        }
        node.data.plot.series.addData(tmpData);
        var it = node.data.num 
        if(node.data.num ==5){
            node.data.num = 0;
            node.data.plot.render();
        }
        else{
            node.data.num = it +1;
        }
    }
    }


    
}

