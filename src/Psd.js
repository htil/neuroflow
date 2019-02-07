import PsdComponent from './Components/Psd.component';
export default class Psd{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new PsdComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({arr_out: [],arr_in: []});
        this.editor.addNode(this.node);
        
     }
   
     static async create(editor,engine,window) {
        const o = new Psd(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}