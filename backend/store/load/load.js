import { helpers } from '../../helpers/helpers';
import SaveObject  from './../save-object';
let store = require('store');

export default class Load {
	static isSavePresent() {
		return !(helpers.isUndefined(store.get('version')));
	}
	constructor() {
		this.saveObject = new SaveObject();
		this.params     = store.getAll();
	}
	data() {
		return {
			weather : this.params.weather,
			season  : this.params.season,
			people  : this.params.people,
			farmland: this.params.farmland,
			families: this.params.families
		}
	}
	load(data) {
		return _.isObject(data) ? this.loadObject(data) : console.log("All loaded values should be an object - error: " + data);
	}
	loadObject(data) {
		if (Array.isArray(data)) {
			return _.map(data, this.load.bind(this));
		} else if (data.hasOwnProperty("type") && data.hasOwnProperty("encryptedMessage")) {
			return this.saveObject.decompose(data);
		} else {
			return _.mapValues(data, this.load.bind(this));
		}
	}
	saveData() {
		return _.mapValues(this.data(), this.load.bind(this));
	}
}

