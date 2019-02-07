import MuseComponent from './Components/muse.component';
export default class Muse{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new MuseComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({arr1: [],arr2 : [],arr3 : [],arr4: [],num1: 0});
        this.editor.addNode(this.node);
        window.node = this.node;
        this.bci_device = new BCIDevice((sample) => {
            // This is here to only read data from AF7
            console.log(sample.electrode);
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
                    this.node['controls'].get(arr_name).push_sample(el);
                });
                this.node.data.num1 = sample.sampleRate;
            }
        
        }, (status) => {
            this.battery = status.batteryLevel;
            this.temperature = status.temperature;
        });

    this.node.vueContext.$el.getElementsByClassName('btn')[0].onclick = async ()=>{this.bci_device.connect();}
     }
   
     static async create(editor,engine,window) {
        const o = new Muse(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}