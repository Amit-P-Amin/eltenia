// Returns a random int from min to max (exclusive)
export default function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
