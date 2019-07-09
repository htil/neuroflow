/**
 * CustomBlock
 *
 *
 * A simple class for managing custom blocks in blockly. See
 * {@link https://developers.google.com/blockly/guides/configure/web/custom-blocks | here} for info on using either
 * JSON or JavaScript to define a custom block (or check out the example blocks defined in `src/Blocks`).
 *
 * @todo Add support for implicitly casting to string for use in modules
 *
 * @example
 * Using the JSON interface.
 * ```ts
 * Blockly.Msg.SOME_HUE = 180; // This is hue from HSV
 * let custom = new CustomBlock("example", {
 *     message0: "cool block",
 *     args0: [],
 *     output: "String",
 *     colour: "%{BKY_SOME_HUE}",
 *     tooltip: "Thanks for hovering!",
 *     helpUrl: "some/help/url"
 * }, (block: Blockly.Block): (string | number)[] => {
 *     let example_code = "JSON.stringify({ hello, \"world\" })";
 *     return [example_code, Blockly.JavaScript.ORDER_MEMBER];
 * });
 * ```
 *
 * @example
 * Using the JavaScript interface.
 * ```ts
 * Blockly.Msg.EXAMPLE_HUE = 230; // This is hue from HSV
 * let custom = new CustomBlock("example_block", (b: Blockly.Block) => {
 *     b.appendDummyInput("example_input")
 *         .appendField("set");
 *
 *     // Allow for connecting
 *     b.setNextStatement(true);
 *     b.setPreviousStatement(true);
 *
 *     b.setColour(Blockly.Msg.EXAMPLE_HUE);
 * };
 * ```
 */
export class CustomBlock {
	name: string;

	// Since blockly does not add a way to set a statement suffix...
	suffix: string;

	/**
	 * Dispose
	 *
	 * Destroys a custom block created by this class.
	 *
	 * @param name The unique name of the block to dispose. Same as the name specified on creation.
	 * @param healStack Whether or not to attempt to heal holes caused by deleting the block.
	 */
	static dispose(name: string, healStack: boolean) {
		if (Blockly.Blocks[name].dispose)
			Blockly.Blocks[name].dispose(healStack);
		delete Blockly.Blocks[name];

		let unsafe = (Blockly.JavaScript as any) as Blockly.dictionary<Blockly.generator_type>;
		delete unsafe[name];
	}

	/**
	 * Constructor
	 *
	 * Creates a new Custom blockly block. Fails if the requested name for the new
	 * block is already in use.
	 *
	 * @param name The name to label the block.
	 * @param def The definition information for the block.
	 * @param generator The generator for the block.
	 * @param suffix A command to run after execution of this custom block.
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
	 * block
	 *
	 * Returns the Blockly block representation of this custom block
	 *
	 * @return The block as a Blockly block
	 */
	block(): Blockly.Block {
		return Blockly.Blocks[this.name];
	}

	/**
	 * Suffix
	 *
	 * Blockly allows for an official way to add a pre-command before execution of a block. It does not
	 * allow for running a post-command, so this is an attempt to add one.
	 *
	 * @param suffix A custom command to run after execution of this block.
	 */
	set_suffix(suffix: string): void {
		this.suffix = suffix;
	}

	/**
	 * Dispose
	 *
	 * Destroys a custom block.
	 *
	 * @param healStack Whether or not to attempt to heal holes caused by deleting the block.
	 */
	dispose(healStack: boolean): void {
		this.block().dispose(healStack);
	}
}