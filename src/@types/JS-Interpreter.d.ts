declare module "JS-Interpreter/acorn_interpreter" {
	interface state {
		scope: object
	}

	class Interpreter {
		global: object;
		stateStack: Array<state>;

		constructor(code: string, optInitFunc?: (interpreter: Interpreter, scope: object) => void);

		appendCode(code: string): void;
		createNativeFunction(nativeFunc: object, optConstructor?: boolean): object;
		run(): void;
		setProperty(obj: object, name: string, value: any, optDescriptor?: object): object;
		step(): boolean;
	}
}