import isNumeric from '../../helpers/is-numeric'

export default class BaseReader {
	constructor(model) {
		this.model = model;
	}
	read() {
		let cleaned    = {};
		let parameters = this.readModel();

		for (var key in parameters) { this._validate(parameters[key]) }
		for (var key in parameters) { cleaned[key] = this._clean(parameters[key]) }

		return cleaned;
	}
	_validate(value) {
		if (typeof value === "undefined") {
			console.log("[BaseReader] Error, value in " + this.model + "missing")
		}
		// implement isNan checking
	}
	_clean(value) {
		if (isNumeric(value)) {
			return _.round(value, 2);
		} else {
			return value
		}
	}
}
