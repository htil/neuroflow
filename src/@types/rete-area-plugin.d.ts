declare module 'rete-area-plugin' {
	import Rete, { NodeEditor } from "rete";
	import { Plugin } from "rete/types/core/plugin";

	class _Area implements Plugin {
		name: string;
		install: any;

		zoomAt(editor: NodeEditor): void;
	}

	const AreaPlugin: _Area;
	export default AreaPlugin;
}