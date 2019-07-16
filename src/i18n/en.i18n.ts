import { locale } from "./type_def";

let messages: locale = {
  bci: {
    block: "BCI",
    tooltip: "The corresponding brain frequency.",

    alpha: "Alpha",
    beta: "Beta",
    theta: "Theta",
    delta: "Delta",
    gamma: "Gamma",

    engagement: "Engagement"
  },
  bluetooth: {
    error: {
      connection: "Could not connect..."
    }
  },
  category: {
    bci: "BCI",
    events: "Events",
    flow: "Flow",
    loops: "Loops",
    logic: "Logic",
    math: "Math",
    players: "Players",
    text: "Text",
    variables: "Variables"
  },
  flow: {
    add: "Add Flow Block",
    already_exists: (name: string) =>
      `A flow block named '${name}' already exists.`,
    prompt: "New flow block name",
    tooltip: "A flow component. Click the gear to edit me."
  },
  player: {
    create: "Create a player",
    new: "New Player Name",
    none: "No available players",

    amoeba: "Amoeba",
    bacteria: "Bacteria"
  },
  help: {
    no_players: "There aren't any players. Press the + to add one!"
  },

  events: {
    "32": "Space",
    "48": "0",
    "49": "1",
    "50": "2",
    "51": "3",
    "52": "4",
    "53": "5",
    "54": "6",
    "55": "7",
    "56": "8",
    "57": "9",
    "97": "A",
    "98": "B",
    "99": "C",
    "100": "D",
    "101": "E",
    "102": "F",
    "103": "G",
    "104": "H",
    "105": "I",
    "106": "J",
    "107": "K",
    "108": "L",
    "109": "M",
    "110": "N",
    "111": "O",
    "112": "P",
    "113": "Q",
    "114": "R",
    "115": "S",
    "116": "T",
    "117": "U",
    "118": "V",
    "119": "W",
    "120": "X",
    "121": "Y",
    "122": "Z"
  }
};

export default messages;
