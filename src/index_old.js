require('babel-polyfill');
import MuseComponent from './Components/muse.component';
import LogComponent from './Components/log.component';

var test = (async () => {
    var container = document.querySelector('#rete');
    var components = [new MuseComponent(),new LogComponent()];
    
    var editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin);
    editor.use(AreaPlugin);
    editor.use(CommentPlugin);
    editor.use(HistoryPlugin);

    var engine = new Rete.Engine('demo@0.1.0');
    

    var n1 = await components[0].createNode({arr1: [],arr2 : [],arr3 : [],arr4: []});
    var n2 = await components[1].createNode({arr1: []});
    test.n1 = n1;
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });
    
   
    n1.position = [80, 200];
    n2.position = [150,200];
   
    
    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      console.log('process');
        await engine.abort();
        await engine.process(editor.toJSON());
    });
    editor.addNode(n1);
    editor.addNode(n2);
    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
    test.editor = editor;
    test.n1['controls'].get("arr3").push_sample(3);
})();
window.test = test;
