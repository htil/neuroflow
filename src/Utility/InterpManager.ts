import { dictionary } from "../Playground";
import { Interpreter } from "JS-Interpreter/acorn_interpreter";
let NON_EVENT_INTERP = "NON_EVENT_INTERP";
let EVENT_INTERP = "EVENT_INTERP";

/**
 * @class InterpManager
 *
 * A class to manage multiple threads based on Neil Fraser's JS Interpreter example. See {@link https://neil.fraser.name/software/JS-Interpreter/docs.html | this link for additional information}
 */
export class InterpManager {
  interpreters: any[]; // Current design assumes 0 => Non-event interpreter, 1 => Event interpreter.
  currentInterpreterID: number;
  eventCode: dictionary<any>;
  nonEventCode: string;
  handler: NodeJS.Timeout;
  handlerDelay: number;
  workspaceCode: String;
  workspace: Blockly.Workspace;
  api: any;
  /**
   * @constructor
   *
   * @param {Number} handlerDelay - The amount of time between each interpreter step.
   * @param {Object} workspace - Current Blockly workspace
   * @param {Object} api - Interpreter API functions
   * Default constructor
   */
  constructor(handlerDelay: number, workspace: Blockly.Workspace, api: any) {
    this.interpreters = [];
    this.currentInterpreterID = 0;
    this.handlerDelay = handlerDelay;
    this.workspaceCode = Blockly.JavaScript.workspaceToCode(workspace);
    this.eventCode = {};
    this.nonEventCode = "";
    this.api = api;
    this.handler = null;
    this.workspace = workspace;
    this._handleSourceCode();
  }

  /**
   * @function addInterpreter
   *
   * Add interpreter to list of interpreters
   *
   * @param {Any} interpreter - The interpreter to add
   * @param {String} type - The interpreter type
   * @param {String} code - The source code associated with the new interpreter
   */
  _addInterpreter(interpreter: Interpreter, type: string): void {
    let obj = {
      interp: interpreter,
      isNextStep: true,
      type
    };
    this.interpreters.push(obj);
  }

  /**
   * @function _createInterpreter
   *
   * Creates an interpreter object
   *
   * @param {String} code - The source code associated with the new interpreter
   * @returns {Object} Returns new interpreter object
   */
  _createInterpreter(code: string): Interpreter {
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

      // Add an API function for highlighting blocks.
      interpreter.setProperty(
        scope,
        "__highlightBlock",
        interpreter.createNativeFunction((id: string) => {
          return this.workspace.highlightBlock(id);
        })
      );

      // Add an API function for drawing a frame
      interpreter.setProperty(
        scope,
        "__drawFrame",
        interpreter.createNativeFunction(() => {
          return this.api.__drawFrame();
        })
      );

      // Add an API function for referencing the sessionStorage
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

    return new Interpreter(code, initAPI);
  }

  /**
   * @function _getBlockType
   *
   * Get type associated with block
   *
   * @param {Object} block - Block object.
   * @returns {string} Returns block type as a string.
   */
  _getBlockType(block: any): string {
    return block.type.split("_")[0];
  }

  /**
   * @function _handleSourceCode
   *
   * Store source code according to its type. This currently seperates event code from non-event code.
   * This function also creates event and non-event interpreters.
   *
   */
  _handleSourceCode(): void {
    let topBlocks = Blockly.mainWorkspace.getTopBlocks(true);
    let nonEventCode = "";

    for (let block in topBlocks) {
      let curBlock = topBlocks[block];
      let type = this._getBlockType(curBlock);
      if (type == "event") {
        let key = curBlock.inputList[0].fieldRow[1].value_;
        let code = Blockly.JavaScript.blockToCode(curBlock);
        this._setEventCode(key, code);
      } else {
        let code = Blockly.JavaScript.blockToCode(curBlock);
        nonEventCode += code;
      }
    }

    this._setNonEventCode(nonEventCode);
    let interp = this._createInterpreter(this.nonEventCode);
    this._addInterpreter(interp, NON_EVENT_INTERP);

    // Add dummy event interp
    let eventInterp = this._createInterpreter("");
    this._addInterpreter(eventInterp, EVENT_INTERP);
  }

  /**
   * @function _setEventCode
   *
   * Sets source code associated with specific event
   *
   */
  _setEventCode(key: string, code: string): void {
    this.eventCode[key] = code;
  }

  /**
   * @function _setNonEventCode
   *
   * Sets source code NOT associated with events
   *
   */
  _setNonEventCode(code: string): void {
    this.nonEventCode = code;
  }

  /**
   * @function executeEventCode
   *
   * Executes event code
   *
   *
   */
  executeEventCode(keyCode: string): any {
    if (this.eventCode[keyCode]) {
      let code = this.eventCode[keyCode];
      // update event interpreter
      this.interpreters[1].interp = this._createInterpreter(code);
    }
  }

  /**
   * @function getCurrentInterpreter
   *
   * Returns current Interpreter
   *
   * @returns {Object} Returns current Interpreter
   *
   */
  getCurrentInterpreter(): any {
    return this.interpreters[this.currentInterpreterID];
  }

  /**
   * @function getCurrentInterpID
   *
   *  Returns ID of current interpreter
   *
   * @returns {number} Returns ID of current interpreter
   *
   */
  getCurrentInterpID(): number {
    return this.currentInterpreterID;
  }

  /**
   * @function isNextStep
   *
   * Used to determine if all interpreters are done
   *
   * @returns{boolean} Returns boolean reflecting wheter all interpreters are done.
   */
  isNextStep(): boolean {
    return this.interpreters[0].isNextStep || this.interpreters[1].isNextStep;
  }

  /**
   * @function switchInterpreter
   *
   * Switch interpreter. Assumes only two types of interpreters (0 => Non-event interpreter, 1 => Event interpreter).
   *
   */
  switchInterpreter(): void {
    this.currentInterpreterID = this.currentInterpreterID == 0 ? 1 : 0;
  }
  /**
   * @function updateInterpreter
   *
   * Switch interpreter. Assumes only two types of interpreters (0 => Non-event interpreter, 1 => Event interpreter).
   *
   */
  updateInterpreter(isNextStep: boolean): void {
    this.interpreters[this.currentInterpreterID].isNextStep = isNextStep;
  }
}
