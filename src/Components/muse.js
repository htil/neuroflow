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
  
class MuseComponent extends Rete.Component{
    constructor(){
        super("Muse Device");
        this.data.component = CustomNode;
    }
    builder(node){
        var out1 = new Rete.Output('arr1',"AF7",sockets.Number);
        var out2 = new Rete.Output('arr2',"AF8",sockets.Number);
        var out3 = new Rete.Output('arr3',"TP9",sockets.Number);
        var out4 = new Rete.Output('arr4',"TP10",sockets.Number);
        var out5 = new Rete.Output('num1',"sampleRate",sockets.Number);

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


export default class muse{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new MuseComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({arr1: 0,arr2 : 0,arr3 : 0,arr4: 0,num1: 0});
        this.editor.addNode(this.node);
        window.node = this.node;
        this.bci_device = new BCIDevice((sample) => {
            //Select Control Name based on electrode
            var arr_name = '-1';
            if (sample.electrode === ScalpElectrodes.AF7) {
                arr_name = 'arr1';
            }  
            if (sample.electrode === ScalpElectrodes.AF8) {
                arr_name = 'arr2';
            }  
            if (sample.electrode === ScalpElectrodes.TP9) {
                arr_name = 'arr3';
            }
            if (sample.electrode === ScalpElectrodes.TP10) {
                arr_name = 'arr4';
            }  

            if(arr_name !== '-1'){
                // Add to the buffer
                sample.data.forEach(el => {
                    this.node.data[arr_name] = el;
                    this.editor.trigger('process');
                });
                this.node.data.num1 = sample.sampleRate;
            }
        
        }, (status) => {
            this.battery = status.batteryLevel;
            this.temperature = status.temperature;
        });

    this.node.vueContext.$el.getElementsByClassName('bt_btn')[0].onclick = async ()=>{this.bci_device.connect();}
     }
   
     static async create(editor,engine,window) {
        const o = new muse(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}