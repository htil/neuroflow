import LocaleType from "./type_def";
import en from "./en";

export function set_locale(locale_code: string): LocaleType {
	switch (locale_code.toLocaleLowerCase()) {
		case "en":
			return en;
		default:
			throw new Error("Locale not found: " + locale_code);
	}
}