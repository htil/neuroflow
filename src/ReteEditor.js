/* Wrapper for creating and handling Rete.js Editor*/

export default class ReteEditor {
    constructor(name= 'demo@0.1.0',container_name = '#rete'){
        var container = document.querySelector(container_name);
        this.editor = new Rete.NodeEditor('demo@0.1.0', container);
        this.editor.use(ConnectionPlugin);
        this.editor.use(VueRenderPlugin);
        this.editor.use(ContextMenuPlugin);
        this.editor.use(AreaPlugin);
        this.editor.use(CommentPlugin);
        this.editor.use(HistoryPlugin);
    }

    start(engine,events = 'process nodecreated noderemoved connectioncreated connectionremoved'){
        this.editor.on(events, async () => {
            console.log('process');
              await engine.abort();
              await engine.process(this.editor.toJSON());
          });
          this.editor.view.resize();
          AreaPlugin.zoomAt(this.editor);
          this.editor.trigger('process');
    }

    getEditor(){
        return this.editor;
    }

}
