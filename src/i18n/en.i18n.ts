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
		keypress: "On Keypress",
		keys: {
			"32": "Space",
			"38": "Up Arrow",
			"40": "Down Arrow",
			"39": "Right Arrow",
			"37": "Left Arrow",
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
			"65": "A",
			"66": "B",
			"67": "C",
			"68": "D",
			"69": "E",
			"70": "F",
			"71": "G",
			"72": "H",
			"73": "I",
			"74": "J",
			"75": "K",
			"76": "L",
			"77": "M",
			"78": "N",
			"79": "O",
			"80": "P",
			"81": "Q",
			"82": "R",
			"83": "S",
			"84": "T",
			"85": "U",
			"86": "V",
			"87": "W",
			"88": "X",
			"89": "Y",
			"90": "Z"
		}
	}
};

export default messages;
