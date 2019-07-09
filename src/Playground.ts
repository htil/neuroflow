import { WindowManager } from "./Utility/WindowManager";
import { Sprite } from "./Sprite";

export interface dictionary<T> {
	[index: string]: T;
}

export type load_callback = (sprite: Sprite) => void;

/**
 * @interface ShaderBundle
 * 
 * A simple shader bundle to contain the shaders in a program.
 */
export interface ShaderBundle {
	vertex: string[];
	fragment: string[];

	attributes?: string[];
	uniforms?: string[];
}

/**
 * @class Playground
 * 
 * A simpole WebGL playground.
 */
export class Playground {
	gl: WebGLRenderingContext;
	
	program:    WebGLProgram;
	attributes: dictionary<number> = {};
	uniforms:   dictionary<WebGLUniformLocation> = {};

	sprite_quad_buffer: WebGLBuffer;
	sprite_quad_tex: WebGLBuffer;

	/**
	 * @constructor
	 * 
	 * Default constructor.
	 * 
	 * @param {HTMLCanvasElement} element - The HTML canvas for rendering.
	 * @param {ShaderBundle} [bundle] - A set of shaders to use instead of the defaults.
	 * @throws {Error} Throws an error if the web browser does not allow for WebGL.
	 */
	constructor(element: HTMLCanvasElement, bundle?: ShaderBundle) {
		this.gl = element.getContext("webgl");
		if (!this.gl) {
			throw new Error("Could not create a WebGL instance!");
		}

		// Fix sizing
		this.gl.canvas.width = this.gl.canvas.clientWidth;
		this.gl.canvas.height = this.gl.canvas.clientHeight;

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		// Compile the shaders (custom)
		this.program = this.gl.createProgram();
		if (bundle) {
			// Vertex shaders
			for (let i = 0; i < bundle.vertex.length; ++i) {
				let v = Shader.compile(this.gl, bundle.vertex[i], this.gl.VERTEX_SHADER);
				this.gl.attachShader(this.program, v);
			}

			// Fragment shaders
			for (let i = 0; i < bundle.vertex.length; ++i) {
				let v = Shader.compile(this.gl, bundle.vertex[i], this.gl.FRAGMENT_SHADER);
				this.gl.attachShader(this.program, v);
			}
		} else {
			this.gl.attachShader(this.program, Shader.compile(this.gl, Shader.default_vertex, this.gl.VERTEX_SHADER));
			this.gl.attachShader(this.program, Shader.compile(this.gl, Shader.default_fragment, this.gl.FRAGMENT_SHADER));
		}

		// Link the program
		this.gl.linkProgram(this.program);
		if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
			throw new Error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.program));
		}

		// Get locations
		let attribs, uniforms;
		if (bundle) {
			attribs  = bundle.attributes;
			uniforms = bundle.uniforms;
		} else {
			attribs  = Shader.default_attributes;
			uniforms = Shader.default_uniforms;
		}

		// Attributes
		for (let attr of attribs) {
			this.attributes[attr] = this.gl.getAttribLocation(this.program, attr);
		}

		// Uniforms
		for (let uni of uniforms) {
			this.uniforms[uni] = this.gl.getUniformLocation(this.program, uni);
		}

		// Fill the needed buffers
		this.sprite_quad_buffer = this.gl.createBuffer();
		this.sprite_quad_tex = this.gl.createBuffer();

		// Fill background
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
			-1.0,  1.0,
			-1.0, -1.0,
			 1.0, -1.0,
			 1.0, -1.0,
			 1.0,  1.0,
			-1.0,  1.0
		]), this.gl.STATIC_DRAW);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_tex);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
			0.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			1.0, 1.0,
			1.0, 0.0,
			0.0, 0.0
		]), this.gl.STATIC_DRAW);
	}

	/**
	 * @function create_sprite
	 * 
	 * @param {String} id - The unique identifier of the sprite.
	 * @param {String} name - The name for the sprite.
	 * @param {String} type - The type of sprite.
	 * @param {String} path - The path to the image for the sprite.
	 * @param {load_callback} cb - A callback to run after loading the sprite.
	 * @returns {Sprite} - The newly created sprite.
	 */
	create_sprite(id: string, name: string, type: string, path: string, cb: load_callback): Sprite {
		let s = new Sprite(id, name, type);
		let i = document.createElement("img");
		
		// Allow for CORS images
		i.crossOrigin = "anonymous";

		// Load image data into the WebGL texture
		i.onload = () => {
			let t = this.gl.createTexture();
			this.gl.bindTexture(this.gl.TEXTURE_2D, t);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, i);

			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
			this.gl.generateMipmap(this.gl.TEXTURE_2D);

			s.set_texture(t);
			cb(s);
		};

		// Start the loading of the image
		i.src = WindowManager.origin() + "/" + path;
	
		return s;
	}

	/**
	 * @function draw
	 * 
	 * Draws the given sprites in order.
	 * 
	 * @param {Sprite[]} sprites - The sprites to draw.
	 */
	draw(sprites: Sprite[]): void {
		this.gl.viewport(0, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.enable(this.gl.BLEND);

		this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

		this.gl.useProgram(this.program);

		for (let index in sprites) {
			let sprite = sprites[index];

			// Bind the texture
			this.gl.bindTexture(this.gl.TEXTURE_2D, sprite.get_texture());

			// Set the scale
			let scale = sprite.get_scale();
			this.gl.uniform2f(this.uniforms["uScale"], scale.x, scale.y);

			// Set the position
			let pos = sprite.get_position();
			this.gl.uniform2f(this.uniforms["uOffset"], pos.x, pos.y);

			// Draw the coordinates
			this.gl.enableVertexAttribArray(this.attributes["aVertexPosition"]);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_buffer);
			this.gl.vertexAttribPointer(this.attributes["aVertexPosition"],
				2,             // size
				this.gl.FLOAT, // type
				false,         // normalize
				0,             // stride
				0              // offset
			);

			// Draw the texture
			this.gl.enableVertexAttribArray(this.attributes["aTextureCoordinate"]);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_tex);
			this.gl.vertexAttribPointer(this.attributes["aTextureCoordinate"],
				2,
				this.gl.FLOAT,
				false,
				0,
				0
			);

			// Actually draw
			this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
		}
	}
}

export namespace Shader {
	export const default_attributes: string[] = [
		"aVertexPosition",
		"aTextureCoordinate"
	];

	export const default_uniforms: string[] = [
		"uOffset",
		"uScale",
		"uTexture"
	];

	export const default_vertex = `
		attribute vec2 aVertexPosition;
		attribute vec2 aTextureCoordinate;

		uniform vec2 uScale;
		uniform vec2 uOffset;

		varying vec2 TexCoord0;

		void main() {
			gl_Position = vec4(aVertexPosition[0] * uScale[0] + uOffset[0], aVertexPosition[1] * uScale[1] + uOffset[1], 0.0, 1.0);
			TexCoord0 = aTextureCoordinate;
		}
	`;

	export const default_fragment = `
		precision mediump float;

		uniform sampler2D uTexture;
		varying vec2 TexCoord0;

		void main() {
			//gl_FragColor = vec4(TexCoord0, 0.0, 1.0);
			gl_FragColor = texture2D(uTexture, TexCoord0);
		}
	`;

	export function compile(gl: WebGLRenderingContext, code: string, type: number): WebGLShader {
		let sha = gl.createShader(type);
		
		gl.shaderSource(sha, code);
		gl.compileShader(sha);

		if (!gl.getShaderParameter(sha, gl.COMPILE_STATUS)) {
			let msg = "Could not compile shader: " + gl.getShaderInfoLog(sha);
			
			gl.deleteShader(sha);
			throw new Error(msg);
		}

		return sha;
	}
}