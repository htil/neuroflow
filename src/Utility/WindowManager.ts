/**
 * @class WindowDeclaration
 *
 * A simple wrapper for declaring window-level variables
 */
export class WindowDeclaration {
	name: string;

	/**
	 * @constructor
	 *
	 * Default constructor
	 *
	 * @param {String} name - The window-level binding.
	 * @param {Any} val - The value to store.
	 */
	constructor(name: string, val?: any) {
		this.name = name;

		if (val || window.sessionStorage.getItem(name) == undefined)
			window.sessionStorage.setItem(this.name, val !== null ? JSON.stringify(val) : null);
	}

	/**
	 * @function delete
	 *
	 * Deletes a window binding.
	 */
	delete(): void {
		window.sessionStorage.removeItem(this.name);
	}

	/**
	 * @function get
	 *
	 * Returns the value of the window-level variable.
	 *
	 * @returns {Any} The value associated with the binding.
	 */
	get(): any {
		return JSON.parse(window.sessionStorage.getItem(this.name));
	}

	/**
	 * @function set
	 *
	 * Sets the value of the window-level variable.
	 *
	 * @param {Any} val - The value to save
	 */
	set(val: any) {
		window.sessionStorage.setItem(this.name, JSON.stringify(val));
	}

	/**
	 * @function toGetterBinding
	 *
	 * Returns a getter binding reference to eval().
	 *
	 * @returns {string} The binding reference.
	 */
	toGetterBinding(): string {
		return "__windowssGetItem(\"" + this.name + "\")";
	}

	static asGetterBinding(name: string): string {
		return "__windowssGetItem(\"" + name + "\")";
	}

	static asSetterBinding(name: string): string {
		return "__windowssSetItem(\"" + name + "\", ";
	}
}

/**
 * @class WindowManager
 *
 * A simple (static) window interface for not directly manipulating the window.
 */
export class WindowManager {
	/**
	 * @function eById
	 *
	 * Gets an element from the DOM by its associated ID.
	 *
	 * @param {string} id - The DOM ID.
	 * @returns {HTMLElement} The element corresponding to that ID.
	 * @throws {Error} Throws an error if the specified ID does not exist.
	 */
	static eById(id: string): HTMLElement {
		let res = document.getElementById(id);
		if (res == null)
			throw new Error("Could not find element with ID: " + id);

		return res;
	}

	/**
	 * @function declare
	 *
	 * Declares a new window-level variable.
	 *
	 * @param {string} name - The name of the variable to declare.
	 * @param {Any} val - The value to assign to that variable.
	 *
	 * @returns {WindowDeclaration} The declared variable.
	 * @throws {Error} Throws an error if the window-level name exists.
	 */
	static declare(name: string, val?: any): WindowDeclaration {
		if (window.sessionStorage.getItem(name) !== null) {
			throw new Error("Window attribute already declared: " + name);
		}

		return new WindowDeclaration(name, val);
	}

	/**
	 * @function fetch
	 *
	 * Fetches a window declaration by name.
	 *
	 * @param {string} name - The name fo the declared variable
	 *
	 * @return {WindowDeclaration} The declaration that matches the name.
	 * @throws {Error} Throws an error if the window-level name does not exist.
	 */
	static fetch(name: string): WindowDeclaration {
		if (window.sessionStorage.getItem(name) == undefined) {
			throw new Error("Window attribute not defined: " + name);
		}

		return new WindowDeclaration(name);
	};

	/**
	 * @function origin
	 *
	 * Returns the origin of the web page.
	 *
	 * @return {string} The origin of the web page
	 */
	static origin(): string {
		let p = location.href.split('/');
		delete p[p.length - 1];

		return p.join('/');
	}

	/**
	 * @function clear
	 *
	 * Clears the window-level variables.
	 */
	static clear(): void {
		window.sessionStorage.clear();
	}
}