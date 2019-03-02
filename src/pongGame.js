import PongComponent from './Components/pong.component';
import Pong from './pong_old';
export default class PongGame{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;
        
      
    }
    async initialize() {
        var component = new PongComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({pong: Pong});
        this.editor.addNode(this.node);
        this.node.data.pong.initialize();
     }
   
     static async create(editor,engine,window) {
        const o = new PongGame(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}