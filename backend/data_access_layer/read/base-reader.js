export default class BaseReader {
	constructor(object) {
		this.object = object;
	}
	read() {
		let cleaned    = {};
		let parameters = this.getParameters();

		for (var key in parameters) { this._validate(parameters[key]) }
		for (var key in parameters) { cleaned[key] = this._clean(parameters[key]) }

		return cleaned;
	}
	_validate(value) {
		if (typeof value === "undefined") {
			console.log("[BaseReader] Error, value missing from " + this.object.constructor.name);
			console.log(this.object);
			console.log(this.getParameters());
		}
		// implement isNan checking
	}
	_clean(value) {
		if (helpers.isNumeric(value)) {
			return _.round(value, 2);
		} else {
			return value
		}
	}
}
