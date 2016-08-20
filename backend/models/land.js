export default class Land {
	constructor(parent, size) {
		this.parent    = parent;
		this.size      = size;
		this.available = this.parent.fallowRate * this.size;
		this.used      = this.available;
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
