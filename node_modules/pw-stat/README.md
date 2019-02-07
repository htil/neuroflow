# pw-stat
Statistics in JavaScript

## Installation

```bash
npm install pw-stat
```

## Getting Started

```javascript
var stat = require('pw-stat');

var a = [
	[19, 28],
	[63, 32],
	[56, 96]
];

// Compute the mean of each column
var mean = stat.mean(a);

// Compute the covariance matrix
var cov = stat.cov(a);

console.log(mean); // [ 46, 52 ]
console.log(cov); // [ [ 559, 374 ], [ 374, 1456 ] ]
```

## Documentation

Documentation is available at [http://pwstegman.me/pw-stat/](http://pwstegman.me/pw-stat/)
