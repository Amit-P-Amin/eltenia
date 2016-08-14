// Returns a random int from min to max (exclusive)
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export { randomInt }
