import { dictionary } from "../Playground";

/**
 * @class InterpManager
 *
 * A class to manage multiple threads based on Neil Fraser's JS Interpreter example. See {@link https://neil.fraser.name/software/JS-Interpreter/docs.html | this link for additional information}
 */
export class InterpManager {
  interpreters: Array<Object>;
  currentInterpreterID: Number;
  eventCode: dictionary<any>;
  handlerDelay: Number;
  workspaceCode: String;
  /**
   * @constructor
   *
   * @param {Number} handlerDelay - The amount of time between each interpreter step.
   *
   * Default constructor
   */
  constructor(handlerDelay: Number, workspaceCode: String) {
    this.interpreters = [];
    this.currentInterpreterID = 0;
    this.handlerDelay = handlerDelay;
    this.workspaceCode = workspaceCode;
    this.eventCode = {};
    this._handleSourceCode();
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
   *
   */
  _handleSourceCode(): void {
    var topBlocks = Blockly.mainWorkspace.getTopBlocks(true);

    for (let block in topBlocks) {
      let curBlock = topBlocks[block];
      let type = this._getBlockType(curBlock);
      if (type == "event") {
        let key = curBlock.inputList[0].fieldRow[1].value_;
        let code = Blockly.JavaScript.blockToCode(curBlock);
        this._setEventCode(key, code);
      } else {
        console.log("non event");
      }
    }
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
   * @function addInterpreter
   *
   * Add interpreter to list of interpreters
   *
   * @param {Any} interpreter - The interpreter to add
   * @param {String} type - The interpreter type
   * @param {String} code - The source code associated with the new interpreter
   */
  addInterpreter(interpreter: any, type: string, code: string): void {
    let obj = {
      interp: interpreter,
      isDone: false,
      type,
      code
    };
    this.interpreters.push(obj);
  }
}
