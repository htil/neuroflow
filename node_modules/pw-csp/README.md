# pw-csp
Common spatial pattern in JavaScript

## Installation

```bash
npm install pw-csp
```

## Getting Started

CSP projects classes of data points so that one has high variance in one axis, and the other has high variance in the other axis.

The example below is two-dimensional, but any number of dimensions may be used. The csp.project function accepts an array of data points, projects them using CSP, and returns the requested number of dimensions, sorted by descending importance. Each array should be of size *number of samples* rows x *number of signals* columns.

```javascript
var CSP = require('pw-csp');

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
```

## Documentation

Documentation is available at [http://pwstegman.me/pw-csp/](http://pwstegman.me/pw-csp/)
