import { dictionary } from "../Playground";
import { Interpreter } from "JS-Interpreter/acorn_interpreter";
import { Point } from "../Sprite";

const NON_EVENT_INTERP = "NON_EVENT_INTERP";
const EVENT_INTERP = "EVENT_INTERP";

export interface ManagedInterpreter {
  interp: Interpreter;
  isNextStep: boolean;
  type: string;
}

/**
 * InterpManager
 *
 * A class to manage multiple threads based on Neil Fraser's JS Interpreter example.
 * See {@link https://neil.fraser.name/software/JS-Interpreter/docs.html | this link for additional information}
 */
export class InterpManager {
  interpreters: dictionary<Interpreter> = {};
  sources: dictionary<string> = {};

  handler: NodeJS.Timeout = null;
  handlerDelay: number;

  workspace: Blockly.Workspace;
  api: any; // FIXME: Use type here
  main_scope: object;

  private MAIN = "__MAIN__";

  /**
   * Default InterpManager constructor
   *
   * @param workspace - Blockly parent workspace
   * @param api - Interpreter API functions
   * @param handlerDelay - The amount of time between each interpreter step. Defaults to 5 ms
   */
  constructor(
    workspace: Blockly.Workspace,
    api: any,
    handlerDelay: number = 1
  ) {
    // Save the workspace and delay for use in the step function for each interpreter
    this.workspace = workspace;
    this.handlerDelay = handlerDelay;

    // Keep references to the API for constructing the individual interpreters
    this.api = api;
  }

  /**
   * Has Next Step
   *
   * Returns whether or not this interpreter manager has any more steps to step through.
   */
  hasNextStep(): boolean {
    return Object.keys(this.interpreters).length > 0;
  }

  step(): void {
    let keys = Object.keys(this.interpreters);
    for (let i = 0; i != keys.length; ++i) {
      let interp = this.interpreters[keys[i]];

      // Remove the interpreter if it no longer can step
      if (!interp.step()) {
        delete this.interpreters[keys[i]];
      }
    }
  }

  run(code: string, cb: () => void, should_block: boolean = false): void {
    // Method for actually running each step of all interpreters
    let do_run = () => {
      if (this.hasNextStep()) {
        this.step();
        this.handler = setTimeout(do_run, this.handlerDelay);
      } else {
        this.handler = setTimeout(do_run, this.handlerDelay);
        //cb();
        //this.stop();
      }
    };

    // Prepend all the code with event handling set-up lines
    let blocks = this.workspace.getBlocksByType("event_keypress", false);
    let blocks_as_code = blocks.map(block => {
      return Blockly.JavaScript.blockToCode(block);
    });
    code = `${blocks_as_code.join(";\n")};\n${code}`;

    // Create the main interpreter code
    console.log("CODE:", code);
    this.interpreters[this.MAIN] = this.createInterpreter(code, true);

    // Store the global scope
    this.main_scope = this.interpreters[this.MAIN].global;

    // Loop forever if needed
    if (should_block) {
      this.interpreters[this.MAIN].appendCode("while (true);");
    }

    // Create the event handler
    window.onkeydown = (ev: KeyboardEvent) => {
      let key = ev.keyCode;

      if (key in this.sources) {
        //console.log("RUNNING SOURCE:", this.sources[key]);
        this.interpreters[key] = this.createInterpreter(this.sources[key]);
      }
    };

    // Start the execution
    do_run();
  }

  stop(): void {
    clearTimeout(this.handler);

    // Clear out the state data
    this.interpreters = {};
    this.sources = {};
  }

  /**
   * Create Interpreter
   *
   * Creates an interpreter object
   *
   * @param code - The source code associated with the new interpreter
   * @param is_main_thread - Whether or not to treat this as the main thread.
   *                         Non-main threads will have their global scopes replaced with the main one.
   *
   * @returns New interpreter object set up with external API calls.
   */
  createInterpreter(
    code: string,
    is_main_thread: boolean = false
  ): Interpreter {
    let initAPI = (interpreter: Interpreter, scope: object) => {
      // Add an API function for prompt / alert
      interpreter.setProperty(
        scope,
        "alert",
        interpreter.createNativeFunction((text: string) => {
          return alert(text);
        })
      );

      interpreter.setProperty(
        scope,
        "prompt",
        interpreter.createNativeFunction((text: string) => {
          return prompt(text);
        })
      );

      // Add api call for event-based code
      interpreter.setProperty(
        scope,
        "__handle_event",
        interpreter.createNativeFunction(
          (key_filter: string, root_id: string) => {
            // If this event handler uses Blockly variables, tell the handler of the available variables
            Blockly.JavaScript.variableDB_.setVariableMap(
              this.workspace.getVariableMap()
            );

            // Load the source
            this.sources[key_filter] = Blockly.JavaScript.statementToCode(
              this.workspace.getBlockById(root_id),
              "keypress_input",
              Blockly.JavaScript.ORDER_NONE
            );
          }
        )
      );

      // Add some api for Math
      interpreter.setProperty(
        scope,
        "__distance",
        interpreter.createNativeFunction((lhs: string, rhs: string) => {
          let l = <Point>JSON.parse(lhs);
          let r = <Point>JSON.parse(rhs);

          return Math.hypot(l.x - r.x, l.y - r.y);
        })
      );

      // Add any other API calls
      let api_keys = Object.keys(this.api);
      for (let i = 0; i != api_keys.length; ++i) {
        let ap = this.api[api_keys[i]];

        interpreter.setProperty(
          scope,
          api_keys[i],
          interpreter.createNativeFunction(function(...args: any) {
            return ap(...args);
          })
        );
      }

      // Add an API function for referencing the sessionStorage
      // TODO: Add the following to the constructor in main.ts
      interpreter.setProperty(
        scope,
        "__windowssSetItem",
        interpreter.createNativeFunction((id: string, val: string) => {
          return window.sessionStorage.setItem(id, val);
        })
      );

      interpreter.setProperty(
        scope,
        "__windowssGetItem",
        interpreter.createNativeFunction((id: string) => {
          return window.sessionStorage.getItem(id);
        })
      );
    };

    // Create the interpreter
    let interp = new Interpreter(code, initAPI);

    // Replace its global scope if it isn't the main thread
    if (!is_main_thread) {
      // Save the main scope, otherwise apply the global scope to
      // all subsequent threads
      interp.stateStack[0].scope = this.main_scope;
    }

    return interp;
  }
}
