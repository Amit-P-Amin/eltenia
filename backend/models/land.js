export default class Land {
	constructor(params, parent) {
		this.parent    = parent;
		this.size      = params.size;
		this.used      = params.used;
	}
	available() {
		return this.parent.fallowRate * this.size;
	}
	fallowPercent() {
		return this.used / this.size;
	}
	remove(amount) {
		this.size -= amount;
	}
	add(amount) {
		this.size += amount;
	}
}
