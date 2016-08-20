import isNumeric from '../../helpers/is-numeric'

export default class BaseReader {
	constructor(model) {
		this.model = model;
	}
	read() {
		let cleaned    = {};
		let parameters = this.readModel();

		for (var key in parameters) { cleaned[key] = this._clean(parameters[key]) }

		return cleaned;
	}
	_clean(value) {
		if (isNumeric(value)) {
			return _.round(value, 2);
		} else {
			return value
		}
	}
}
