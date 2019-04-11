import GraphControl from '../Controls/graph.control';
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

class GraphComponent extends Rete.Component {

    constructor(){
        super("Graph");
        this.data.component = CustomNode;
    }

    builder(node) {
        var input1 = new Rete.Input('num_in', "values", sockets.Array);
        return node.addControl(new GraphControl(this.editor, 'num')).addInput(input1);
    }

    worker(node, inputs, outputs) {
      //  console.log(inputs['num_in']);
        if(inputs['num_in'].length === 1)
        node.data.num.y = inputs['num_in'][0].slice(0,71);
    }
}

export default class graph{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        console.log('grpah');
      
    }
    async initialize() {
        var component = new GraphComponent();
        this.editor.register(component);
        this.engine.register(component);
        var val = {
            x: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70],
            y: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            type: 'scatter',

        };
        this.node = await component.createNode({num: val});
        this.editor.addNode(this.node);
       // Plotly.newPlot(this.node.controls.get('num').vueContext.$refs.myDiv,[val]);
       // setInterval(function(){Plotly.redraw(out);},50);
       this.node.controls.get('num').vueContext.draw();
        window.graph = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new graph(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}