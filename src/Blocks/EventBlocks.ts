import { Category } from "../Utility/Toolbox";
import { CustomBlock } from "../Utility/CustomBlock";
import config from "../config";
import * as i18n from "../i18n/i18n";
let locale = i18n.set_locale(config.LOCALE);
Blockly.Msg.EVENT_HUE = 70;

/**
 * generateEventDropDown
 *
 * A function that returns array list of supported events
 */

let generateEventDropDown = () => {
  let events = locale.events;
  let out = [];

  for (let event in locale.events) {
    let val = event;
    let key = events[event];
    out.push([key, val]);
  }

  return out;
};

/**
 * Keypress
 *
 * A custom block used to capture keypress events.
 */

export let Keypress = new CustomBlock(
  "event_keypress",
  (b: Blockly.Block) => {
    b.appendStatementInput("keypress_input")
      .appendField("On Keypress")
      .appendField(
        new Blockly.FieldDropdown(generateEventDropDown()),
        "FIELDNAME"
      );

    b.setNextStatement(true, null);
    b.setStyle("hat_blocks");
    b.setColour(Blockly.Msg.EVENT_HUE);
    b.setPreviousStatement(false);

    //b.setColour(Blockly.Msg.PLAYER_HUE);
  },
  (b: Blockly.Block) => {
    var code = Blockly.JavaScript.statementToCode(
      b,
      "keypress_input",
      Blockly.JavaScript.ORDER_NONE
    );

    return code;
  }
);

/**
 * Event Blockly Category
 *
 * Creates a Blockly Category with the specified title.
 *
 * @param title The title to use in the flyout menu in Blockly.
 */
export let EventCategory = (title: string): Category => {
  return {
    name: title,
    // FIXME: Figure out why %{Blockly.Msg.BCI_HUE} doesn't work here
    colour: Blockly.Msg.EVENT_HUE,

    modules: [Keypress.name]
  };
};
