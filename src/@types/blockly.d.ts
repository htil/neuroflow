declare module Blockly {
	// Constants
	const ALIGN_CENTER: any;
	const ALIGN_LEFT: any;
	const ALIGN_RIGHT: any;

	const TOOLBOX_AT_LEFT: "start";
	const TOOLBOX_AT_RIGHT: "end";

	// Members
	let Blocks: dictionary<Block>;
	let Msg: dictionary<number>;

	// Types
	type field_options_type = [object, number] | object;
	type generator_type = (
		block: Block
	) => (string | number)[] | (string | number);

	// Enums

	// Classes
	class Block {
		data?: string;
		id?: number;
		init(): void;
		workspace?: Workspace;

		isInFlyout?: boolean;
		RTL?: boolean;
		svgPath_?: SVGElement;

		setStyle?(name: string): void;
		appendDummyInput?(name: string): Input;
		appendStatementInput?(name: string): Input;
		appendValueInput?(name: string): Input;
		dispose?(healStack: boolean): void;
		getFieldValue?(name: string): any;
		getInput?(name: string): Input;
		jsonInit?(def: block_def): void;
		setColour?(color: number | string): void;
		setInputsInline?(enabled: boolean): void;
		setNextStatement?(enabled: boolean, ...opt_check: string[]): void;
		setOutput?(enabled: boolean, ...opt_check: string[]): void;
		setPreviousStatement?(enabled: boolean, ...opt_check: string[]): void;
	}

	class Bubble {
		bubbleGroup_: SVGElement;

		constructor(
			workspace: WorkspaceSvg,
			content: SVGElement,
			shape: Element,
			anchorXY: { x: number; y: number },
			bubbleWidth: number,
			bubbleHeight: number
		);
		dispose(): void;
		setBubbleSize(width: number, height: number): void;
		setSvgId(id: number): void;
		setVisible(visible: boolean): void;
	}

	class Connection {
		//
	}

	class Field {
		//
	}

	class FieldDropdown extends Field {
		constructor(
			menuGenerator: field_options_type | (() => field_options_type),
			opt_validator?: (val: string | number) => string | number
		);
	}

	class Icon {
		iconXY_: { x: number; y: number };
		isVisible(): boolean;
		updateColour(): void;
	}

	class Input {
		align: number;
		connection: Connection;
		fieldRow: Field[];
		name: string;
		type: number;

		constructor(
			type: number,
			name: string,
			block: Block,
			connection?: Connection
		);

		appendField(field: string | Field, opt_name?: string): Input;
		setAlign(align: any): Input;
		setCheck(...types: string[]): Input;
	}

	class Mutator extends Icon {
		block_: Block;
		bubble_: Bubble;
		quarkNames_: Array<string>;
		svgDialog_: SVGElement;
		workspace_?: WorkspaceSvg;

		workspaceWidth_: number;
		workspaceHeight_: number;

		constructor(quarkNames: Array<string>);
		getFlyoutMetrics_(): flyout_metrics;
		setVisible(visible: boolean): void;

		resizeBubble_(): void;
	}

	class variableDB {
		constructor(workspace: Workspace);

		setVariableMap(variable_map: VariableMap): void;
	}

	class VariableMap {
		//
	}

	class Workspace {
		options: blockly_options;

		constructor(options: blockly_options);

		addChangeListener(listener: (event: HTMLElementEventMap) => void): void;
		clear(): void;
		clearUndo(): void;
		fireChangeListener(event: Blockly.Events.Abstract): void;
		getAllBlocks(ordered: boolean): Array<Blockly.Block>;
		getBlockById(id: string): Block;
		getBlocksByType(type: string, ordered: boolean): Array<Blockly.Block>;
		getVariableMap(): VariableMap;
		highlightBlock(id: string): void;
		refreshToolboxSelection(): void;
		registerButtonCallback(
			name: string,
			callback: (e: HTMLElement) => void
		): void;
		registerToolboxCategoryCallback(
			name: string,
			callback: (workspace: Blockly.Workspace) => Array<Node>
		): void;
		render(): void;
		updateToolbox(tree: Node | string): void;
	}

	class WorkspaceSvg {
		isMutator: boolean;
		svgBlockCanvas_: Node;
		RTL?: boolean;

		addFlyout_(name: string): SVGElement;

		constructor(options: workspace_svg_options);
		addChangeListener(listener: (e: Blockly.Events.Abstract) => void): void;
		createDom(name: string): Element;
		getCanvas(): SVGGraphicsElement;
		resize(): void;
	}

	// Modules
	module Bubble {
		const BORDER_WIDTH: number;
	}

	module Events {
		class Abstract {
			group: string;
			recordUndo: boolean;
			workspaceId: string | undefined;

			constructor();
			fromJson(json: Object): void;
			isNull(): boolean;
			run(_forward: boolean): void;
			toJson(): Object;

			protected getEventWorkspace_(): Blockly.Workspace;
		}

		class Create extends Abstract {
			blockId: string;
			type: string;

			constructor(block: Blockly.Block | null);
		}

		class Ui extends Abstract {
			type: string;

			constructor(
				block: Blockly.Block,
				element: string,
				oldValue: any,
				newValue: any
			);
		}

		function disableOrphans(e: Abstract): void;
		function fire(e: Abstract): void;
	}

	module Extensions {
		function register(name: string, initFn: () => void): void;
		function registerMutator(
			name: string,
			mixinObj: mixin_object,
			opt_helperF: () => void | null,
			opt_blockList?: string[]
		): void;
	}

	module mainWorkspace {
		function getTopBlocks(ordered: boolean): dictionary<any>;
	}

	module JavaScript {
		function addReservedWords(words: string): void;
		function valueToCode(
			block: Block,
			handle: string,
			order: number | boolean
		): string;
		function statementToCode(
			block: Block,
			handle: string,
			order: number | boolean
		): string;
		function workspaceToCode(workspace: Workspace): string;
		function blockToCode(block: Block): string;
		function init(workspace: Workspace): void;

		let STATEMENT_PREFIX: string;
		let variableDB_: variableDB;

		let definitions_: dictionary<unknown>;

		const ONE_BASED_INDEXING: boolean;
		const ORDER_ADDITION: number;
		const ORDER_ASSIGNMENT: number;
		const ORDER_ATOMIC: number;
		const ORDER_BITWISE_AND: number;
		const ORDER_BITWISE_NOT: number;
		const ORDER_BITWISE_OR: number;
		const ORDER_BITWISE_SHIFT: number;
		const ORDER_BITWISE_XOR: number;
		const ORDER_COMMA: number;
		const ORDER_CONDITIONAL: number;
		const ORDER_DECREMENT: number;
		const ORDER_DELETE: number;
		const ORDER_DIVISION: number;
		const ORDER_EQUALITY: number;
		const ORDER_FUNCTION_CALL: number;
		const ORDER_IN: number;
		const ORDER_INCREMENT: number;
		const ORDER_INSTANCEOF: number;
		const ORDER_LOGICAL_AND: number;
		const ORDER_LOGICAL_NOT: number;
		const ORDER_LOGICAL_OR: number;
		const ORDER_MEMBER: number;
		const ORDER_MODULUS: number;
		const ORDER_MULTIPLICATION: number;
		const ORDER_NEW: number;
		const ORDER_NONE: number;
		const ORDER_OVERRIDES: number[];
		const ORDER_RELATIONAL: number;
		const ORDER_SUBTRACTION: number;
		const ORDER_TYPEOF: number;
		const ORDER_UNARY_NEGATION: number;
		const ORDER_UNARY_PLUS: number;
		const ORDER_VOID: number;
	}

	module utils {
		function createSvgElement(
			name: string,
			attrs: object,
			parent: Element
		): SVGElement;
		function isRightButton(e: MouseEvent): boolean;
	}

	module Variables {
		function createVariableButtonHandler(
			workspace: Blockly.Workspace,
			opt_callback: (name: string | null) => void,
			opt_type?: string
		): void;
	}

	module Xml {
		function domToText(dom: XMLDocument): string;
		function domToWorkspace(dom: XMLDocument, ws: Workspace): void;
		function textToDom(text: string): XMLDocument;
		function workspaceToDom(ws: Workspace): XMLDocument;

		module utils {
			function createElement(name: string): Element;
		}
	}

	// Interfaces
	interface block_arg {
		type: string;

		name?: string;
		text?: string;
		check?: string;
		options?: string[] | Array<Array<string | number | image_def>>;
		variable?: string | null;
		variableTypes?: string[];
	}

	interface block_def {
		message0: string;
		args0: block_arg[];

		output?: string;
		colour?: number | string;
		tooltip?: string;
		helpUrl?: string;

		mutator?: string;
	}

	interface blockly_options {
		collapse?: boolean;
		comments?: boolean;
		css?: boolean;
		disable?: boolean;
		disabledPatternId?: number;

		grid?: grid_options;
		horizontal_layout?: boolean;
		maxBlocks?: number;
		media?: string;
		oneBasedIndex?: boolean;
		pathToMedia?: string;
		readOnly?: boolean;
		rtl?: boolean;
		scrollbars?: boolean;
		sounds?: boolean;

		toolbox: XMLDocument | string;

		toolboxPosition?: "start" | "end";
		trashcan?: boolean;
		zoom?: zoom_options;
	}

	interface dictionary<T> {
		[index: string]: T;
	}

	interface flyout_metrics {
		viewHeight: number;
		viewWidth: number;
		absoluteTop: number;
		absoluteLeft: number;
	}

	interface grid_options {
		spacing?: number;
		length?: number;
		colour?: string;
		snap?: boolean;
	}

	interface image_def {
		src: string;
		width: number;
		height: number;
		alt: string;
	}

	interface mixin_object {
		mutationToDom: () => void;
		domToMutation: (e: XMLDocument) => void;
	}

	interface workspace_svg_options {
		disable: boolean;
		disabledPatternId?: number;
		getMetrics: () => flyout_metrics;
		horizontalLayout: boolean;
		languageTree: Element;
		parentWorkspace: Workspace;
		pathToMedia?: string;
		RTL?: boolean;
		setMetrics?: () => void;
		toolboxPosition?: "start" | "end";
	}

	interface zoom_options {
		controls?: boolean;
		wheel?: boolean;
		startScale?: number;
		maxScale?: number;
		minScale?: number;
		scaleSpeed?: number;
	}

	// Functions
	function inject(
		element: HTMLElement | string,
		opt_options?: blockly_options
	): Workspace;
	function svgResize(workspace: Workspace): void;
}
