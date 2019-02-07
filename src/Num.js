import NumComponent from './Components/num.component';
export default class Num{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new NumComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({num: 0});
        this.editor.addNode(this.node);
        window.num = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new Num(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}