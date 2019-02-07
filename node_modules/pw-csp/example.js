var CSP = require('./index.js');

var a = [
	[-1, -1],
	[1, 1]
];

var b = [
	[-1, 1],
	[1, -1]
];

var csp = new CSP(a, b);

var ap = csp.project(a, 2);
var bp = csp.project(b, 2);

console.log(ap);
/* [
	[ 1.414, 0 ],
	[ -1.414, 0 ]
] */

console.log(bp);
/* [
	[ 0, -1.414 ],
	[ 0, 1.414 ]
] */
