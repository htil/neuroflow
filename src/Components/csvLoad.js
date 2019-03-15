import sockets from './sockets.rete';
import CSVLoader from '../Controls/csvLoad.control'

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

class csvLoadComponent extends Rete.Component {

    constructor(){
        super("CSV Load");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('arr_out', "Data", sockets.Array);
        return node.addControl(new CSVLoader(this.editor, 'CSV')).addOutput(out1);
    }
    

    worker(node, inputs, outputs) {
        outputs['arr_out'] = node.data.CSV.data;
        
    }
}
export default class csvLoad{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new csvLoadComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({CSV: {value: "Empty", data: []}});
        this.editor.addNode(this.node);
        window.csv = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new csvLoad(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}