// Returns a random int from min to max (exclusive)
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomBool() {
	return [true, false][Math.round(Math.random())]
}

function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}

export { randomInt, randomBool, round }
