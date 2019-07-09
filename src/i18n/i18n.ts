import { locale } from "./type_def";
import en from "./en.i18n";

/**
 * Set Locale
 *
 * Sets the locale of the program. See {@link type_def} for info on how to structure language files.
 *
 * Make sure to add to the switch statement below when you add a new language set.
 *
 * @param locale_code The {@link https://en.wikipedia.org/wiki/Language_code | language code} for the language to use.
 */
export function set_locale(locale_code: string): locale {
	switch (locale_code.toLocaleLowerCase()) {
		case "en":
			return en;
		default:
			throw new Error("Locale not found: " + locale_code);
	}
}