import OperatorComponent from './Components/op.component';
export default class Operator{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;   
    }

    async initialize() {
        var component = new OperatorComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({op: 'add'});
        this.editor.addNode(this.node);
        window.op = this.node;
     }
   
     static async create(editor,engine,window) {
        const o = new Operator(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}