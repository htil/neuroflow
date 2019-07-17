import "regenerator-runtime/runtime";

/* Wrapper for creating and handling Rete.js Editor*/
import Rete, { NodeEditor, Engine, Component, Node } from "rete";

// Plugins
import AreaPlugin from "rete-area-plugin";
import CommentPlugin from "rete-comment-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import HistoryPlugin from "rete-history-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";

export default class ReteEditor {
	private raw_editor: NodeEditor;
	private raw_engine: Engine;

	constructor(name = "rete-editor@0.0.1", container?: string | HTMLElement) {
		let cont: HTMLElement;

		if (typeof container == "string")
			cont = document.querySelector<HTMLElement>(container);
		else
			cont = container;

		this.raw_editor = new Rete.NodeEditor(name, cont);
		this.raw_editor.use(AreaPlugin);
		this.raw_editor.use(CommentPlugin);
		this.raw_editor.use(ConnectionPlugin);
		this.raw_editor.use(ContextMenuPlugin);
		this.raw_editor.use(HistoryPlugin);
		this.raw_editor.use(VueRenderPlugin);

		this.raw_engine = new Rete.Engine(name);
	}

	addNode(node: Node) {
		this.raw_editor.addNode(node);
	}

	clear() {
		this.raw_editor.clear();
	}

	register(component: Component) {
		this.raw_editor.register(component);
		this.raw_engine.register(component);
	}

	start(events = "process nodecreated noderemoved connectioncreated connectionremoved") {
		// FIXME: Does not like events (even though tutorial says to use it this way)
		this.raw_editor.on(<any>events, async () => {
			await this.raw_engine.abort();
			await this.raw_engine.process(this.raw_editor.toJSON());
		});

		this.raw_editor.view.resize();
		AreaPlugin.zoomAt(this.raw_editor);
		this.raw_editor.trigger("process");
	}

	destroy() {
		this.raw_editor.destroy();
		this.raw_engine.destroy();

		this.raw_editor = undefined;
		this.raw_engine = undefined;
	}

	async process() {
		await this.raw_engine.abort();
		await this.raw_engine.process(this.raw_editor.toJSON());
	}

	get_editor() {
		return this.raw_editor;
	}

	get_engine() {
		return this.raw_engine;
	}
}
