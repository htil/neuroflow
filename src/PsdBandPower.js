import PsdBandPowerComponent from './Components/PsdBandPower.component';
export default class PsdBandPower{
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
        const o = new PsdBandPower(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}