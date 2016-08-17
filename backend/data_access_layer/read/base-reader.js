import isNumeric from '../../helpers/isNumeric'

export default class BaseReader {
	constructor(model) {
		this.model = model;
	}
	read() {
		let cleaned    = {};
		let parameters = this.readModel();

		for (var key in parameters) { cleaned[key] = this.clean(parameters[key]) }

		return cleaned;
	}
	clean(value) {
		if (isNumeric(value)) {
			return _.round(value, 2);
		} else {
			return value
		}
	}
}
