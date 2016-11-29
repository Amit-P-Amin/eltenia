export default class Land {
	constructor(params, parent) {
		this.parent = parent;
		this.size   = params.size;
		this.used   = params.used;
	}
	available() {
		return this.size - this.setAside();
	}
	unused() {
		return this.available() - this.used();
	}
	setAside() {
		return this.parent.fallowRate * this.size
	}
	fallowPercent() {
		return this.used / this.size;
	}
	add(amount) {
		this.size += amount;
	}
	remove(amount) {
		this.size -= amount;
	}
	updateUsed(used) {
		this.used = used;
	}
}

// Available represents all land that can be cultivated - e.g. all land that hasn't been set aside fallow
// Used is all land being used; unused is all land that isn't set aside that could be used but isn't because
// there aren't enough farmers
