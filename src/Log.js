import LogComponent from './Components/log.component';
export default class Log{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new LogComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({arr1: []});
        this.editor.addNode(this.node);

     }
   
     static async create(editor,engine,window) {
        const o = new Log(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}