declare interface LocaleType {
	bci: {
		block: string,
		tooltip: string,

		alpha: string,
		beta: string,
		theta: string,
		delta: string,
		gamma: string,

		engagement: string
	},
	bluetooth: {
		error: {
			connection: string
		}
	},
	category: {
		bci: string,
		flow: string,
		loops: string,
		logic: string,
		math: string,
		players: string,
		text: string,
		variables: string
	},
	flow: {
		add: string,
		already_exists: (name: string) => string,
		prompt: string,
		tooltip: string
	},
	player: {
		create: string,
		new: string,
		none: string,

		amoeba: string,
		bacteria: string
	},
	help: {
		no_players: string
	}
};

export default LocaleType;