# pw-lda
Linear discriminant analysis in JavaScript

## Installation

```bash
npm install pw-lda
```

## Getting Started

Two-dimensions are used in the below example, but any number of dimensions may be used. The returned projection will be less than 0 for class 1, equal to 0 if exactly inbetween, and greater than 0 for class 2.

```javascript
var LDA = require('pw-lda');

var class1 = [
	[0, 0],
	[1, 2],
	[2, 2],
	[1.5, 0.5]
];

var class2 = [
	[8, 8],
	[9, 10],
	[7, 8],
	[9, 9]
];

var classifier = new LDA(class1, class2);

var unknownPoints = [
	[-1, 0],
	[1.5, 2],
	[3, 3],
	[5, 5],
	[7, 9],
	[10, 12]
];

var predictions = [];

for(var i = 0; i < unknownPoints.length; i++){
	var projection = classifier.project(unknownPoints[i]);
	predictions.push(Math.sign(projection));
}

console.log(predictions); // [ -1, -1, -1, 1, 1, 1 ]
```

## Documentation

Documentation is available at [http://pwstegman.me/pw-lda/](http://pwstegman.me/pw-lda/)
