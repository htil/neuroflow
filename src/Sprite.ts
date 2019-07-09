import { WindowDeclaration, WindowManager } from "./Utility/WindowManager";

export interface Point {
	x: number;
	y: number;
}

/**
 * @class Sprite
 *
 * A sprite which has a position and an image. Sprite positions are exposed to the window for use
 * with Blockly.
 */
export class Sprite {
	id: string;
	name: string;
	type: string;

	texture: WebGLTexture;
	scale: Point;

	binding: WindowDeclaration;

	/**
	 * @constructor
	 *
	 * Default constructor.
	 *
	 * @param {string} id - The unique identifier of the sprite.
	 * @param {string} name - The name of the sprite.
	 * @param {string} type - The type of the sprite.
	 * @param {string} depth - The Z depth
	 *
	 * @throws {Error} Throws an error if the sprite name is not unique.
	 */
	constructor(id: string, name: string, type: string) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.scale = {x: 1, y: 1};

		this.binding = WindowManager.declare(id, <Point>{x: 0, y: 0});
	}

	/**
	 * @function delete
	 *
	 * Deletes a sprite and its bindings to the window.
	 */
	delete(): void {
		this.id = undefined;

		this.delete_texture();
		this.binding.delete();
	}

	get_position(): Point {
		return this.binding.get();
	}

	get_scale(): Point {
		return this.scale;
	}

	get_texture(): WebGLTexture {
		return this.texture;
	}

	set_position(p: Point): void {
		this.binding.set(p);
	}

	set_texture(texture: WebGLTexture): void {
		this.texture = texture;
	}

	delete_texture(): void {
		delete this.texture;
	}

	set_scale(p: Point): void {
		this.scale = p;
	}
}