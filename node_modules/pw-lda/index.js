const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/matrix'));

var stat = require('pw-stat');

/**
 * An LDA object.
 * @constructor
 * @param {number[][]} class1 - Data set for class 1, rows are samples, columns are variables
 * @param {number[][]} class2 - Data set for class 2, rows are samples, columns are variables
 */
function LDA(class1, class2) {
	let mu1 = math.transpose(stat.mean(class1));
	let mu2 = math.transpose(stat.mean(class2));
	let pooledCov = math.add(stat.cov(class1), stat.cov(class2));
	let theta = math.multiply(math.inv(pooledCov), math.subtract(mu2, mu1));
	let b = math.multiply(-1, math.transpose(theta), math.add(mu1, mu2), 1 / 2);

	this.theta = theta;
	this.b = b;
}

/**
 * Predict the class of an unknown data point.
 * @param {number[]} point - The data point to be classified.
 * @returns {number} value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2
 */
LDA.prototype.project = function (point) {
	return math.add(math.multiply(point, this.theta), this.b);
}

module.exports = LDA;
