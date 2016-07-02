// Returns a random int from min to max (exclusive)
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomBool() {
	return [true, false][Math.round(Math.random())]
}
export { randomInt, randomBool }
