declare module "JS-Interpreter/acorn_interpreter" {
	class Interpreter {
		constructor(code: string, optInitFunc?: (interpreter: Interpreter, scope: object) => void);

		createNativeFunction(nativeFunc: object, optConstructor?: boolean): object;
		run(): void;
		setProperty(obj: object, name: string, value: any, optDescriptor?: object): object;
		step(): boolean;
	}
}