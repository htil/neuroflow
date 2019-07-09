/**
 * @class CustomBlock
 *
 * @todo Add support for implicitly casting to string for use in modules
 *
 * A simple class for managing custom blocks in blockly.
 */
export class CustomBlock {
	name: string;

	// Since blockly does not add a way to set a statement suffix...
	suffix: string;

	// Static destroyer
	static dispose(name: string, healStack: boolean) {
		if (Blockly.Blocks[name].dispose)
			Blockly.Blocks[name].dispose(healStack);
		delete Blockly.Blocks[name];

		let unsafe = (Blockly.JavaScript as any) as Blockly.dictionary<Blockly.generator_type>;
		delete unsafe[name];
	}

	/**
	 * @constructor
	 *
	 * Creates a new Custom blockly block. Fails if the requested name for the new
	 * block is already in use.
	 *
	 * @param {string} name - The name to label the block.
	 * @param {Blockly.block_def} def - The definition information for the block.
	 * @param {Blockly.generator_type} generator - The generator for the block.
	 * @param {Function} [extra_init] = Any extra configuration steps needed. Passed a Blockly.Block
	 */
	constructor(name: string, def: (Blockly.block_def | ((block: Blockly.Block) => void)), generator: Blockly.generator_type, suffix?: string) {
		if (name in Blockly.Blocks)
			throw new Error("Requested Block name is already in use: " + name);

		this.name = name;
		this.suffix = suffix;
		Blockly.Blocks[name] = {
			init: function() {
				if ((<Blockly.block_def>def).message0) {
					this.jsonInit(def);
				} else {
					(<(b: Blockly.Block) => void>def)(<Blockly.Block>this);
				}
			}
		};

		// Need to do this unsafe cast since JavaScript is both a map and a class...
		let unsafe = (Blockly.JavaScript as any) as Blockly.dictionary<Blockly.generator_type>;
		if (name in unsafe)
			throw new Error("Specified generator already defined: " + name);

		// Create the generator
		unsafe[name] = <Blockly.generator_type>((b) => {
			let r = generator(b);

			if (this.suffix) {
				if (r instanceof Array)
					r[0] += this.suffix;
				else
					r += this.suffix;
			}

			return r;
		});
	}

	/**
	 * @function block
	 *
	 * Returns the Blockly block representation of this custom block
	 *
	 * @return {Blockly.Block} The block as a Blockly block
	 */
	block(): Blockly.Block {
		return Blockly.Blocks[this.name];
	}

	set_suffix(suffix: string): void {
		this.suffix = suffix;
	}

	dispose(): void {
		this.block().dispose(true);
	}
}