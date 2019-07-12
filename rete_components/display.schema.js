const group = "PRINT";

module.exports = [
	{
		"id": "OperatorNode",
		"group": group,

		"name":          "display",
		"friendly_name": "Print String",

		"controls": [{
			"name": "StringControl",
			"path": "../Controls/String.control",
			"alias": "str"
		}],

		"inputs": [
			{
				"name": "any_in",
				"description": "Any",
				"type": "Any"
			}
		],

		"worker": `
			let as_string = JSON.stringify(inputs["any_in"].length == 1 ? inputs["any_in"][0] : inputs["any_in"]) || "undefined";
			let control: any = this.data.controls["str"];
			let str_control: StringControl = control;

			str_control.setValue(as_string);
		`
	}
]