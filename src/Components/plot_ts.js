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

class PlotTsComponent extends Rete.Component {

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


export default class plot_ts{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;   
    }

    async initialize() {
        var component = new PlotTsComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({plot: 0, num: 0});
        this.editor.addNode(this.node);
        var time = new Date().getTime()/1000;
        var data = [{
            x: [time],
            y: [0],
            mode: 'lines',
            line: {color: '#80CAF6'}
            }];
            var graph = this.node.vueContext.$el.getElementsByClassName('demo_chart')[0];
            var chart2 = new Rickshaw.Graph({
                element: graph,
                width: "600",
                height: "80",
                renderer: "line",
                interpolation: 'cardinal',
                min: "-1000",
                max: "1000",
                series: new Rickshaw.Series.FixedDuration([{
                    name: 'one',
                    color: '#446CB3'
                }], undefined, {
                    timeInterval: 50,
                    maxDataPoints: 2*100
                })
            });
            var y_ax =  this.node.vueContext.$el.getElementsByClassName('y_axis')[0];
            var y_axis = new Rickshaw.Graph.Axis.Y({
                graph: chart2,
                orientation: 'left',
                tickFormat: function (y) {
                    return y.toFixed(2);
                },
                ticks: 5,
                element: document.getElementById('y_axis'),
            });
          this.node.data.plot = chart2;
         
     }
    
    static async create(editor,engine,window) {
        const o = new plot_ts(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}