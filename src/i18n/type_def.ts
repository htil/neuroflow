/**
 * Locale
 *
 * This interface contains all of the needed strings in order to fully translate
 * this application into a different language. Simply create a file in this folder
 * that exports the necessary fields and add it to `src/i18n/i18n.ts`.
 */
export interface locale {
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