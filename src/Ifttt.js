import IftttComponent from './Components/Ifttt.component';
export default class Ifttt{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new IftttComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({trigger: 'Set'});
        this.editor.addNode(this.node);
        window.ifttt = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new Ifttt(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}