export default function(values, weights) {
	let totalWeight = 0;
	let sumProduct  = 0;

	for(let i = 0; i < values.length; i++) {
		sumProduct += values[i] * weights[i];
	}

	return sumProduct / totalWeight;
}
