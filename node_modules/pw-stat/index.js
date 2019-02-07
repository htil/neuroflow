/**
 * Returns the covariance matrix for a given matrix.
 * @param {number[][]} x - A matrix where rows are samples and columns are variables.
 */
function cov(x) {
	// Useful variables
	let N = x.length;

	// Step 1: Find expected value for each variable (columns are variables, rows are samples)
	let E = [];
	for (let c = 0; c < x[0].length; c++) {
		let u = 0;
		for (let r = 0; r < N; r++) {
			u += x[r][c];
		}
		E.push(u / N);
	}

	// Step 2: Center each variable at 0
	let centered = [];
	for (let r = 0; r < N; r++) {
		centered.push([]);
		for (let c = 0; c < x[0].length; c++) {
			centered[r].push(x[r][c] - E[c]);
		}
	}

	// Step 3: Calculate covariance between each possible combination of variables
	let S = [];

	for (let i = 0; i < x[0].length; i++) {
		S.push([]);
	}

	for (let c1 = 0; c1 < x[0].length; c1++) {
		// Doing c2 = c1; because, for example, cov(1,2) = cov(2, 1)
		// so no need to recalculate
		for (let c2 = c1; c2 < x[0].length; c2++) {
			// Solve cov(c1, c2) = average of elementwise products of each variable sample
			let cov = 0;
			for (let r = 0; r < N; r++) {
				cov += centered[r][c1] * centered[r][c2];
			}
			cov /= (N - 1); // N-1 for sample covariance, N for population. In this case, using sample covariance
			S[c1][c2] = cov;
			S[c2][c1] = cov; // Matrix is symmetric
		}
	}

	return S;
}

/**
 * Returns the mean of each column in the provided matrix.
 * @param {number[][]} x - Two-dimensional matrix.
 */
function mean(x) {
	let result = [];
	
	for(let c = 0; c<x[0].length; c++){
		result.push(0);
	}
	
	for (let r = 0; r < x.length; r++) {
		for(let c = 0; c<x[r].length; c++){
			result[c] += x[r][c];
		}
	}
	
	for(let c = 0; c<x[0].length; c++){
		result[c] /= x.length;
	}
	
	return result;
}

exports.cov = cov;
exports.mean = mean;