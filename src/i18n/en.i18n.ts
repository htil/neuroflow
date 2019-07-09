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
		already_exists: (name: string) => `A flow block named '${name}' already exists.`,
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
	}
};

export default messages;