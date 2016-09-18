let store = require('store');
import { helpers } from '../../helpers/helpers';

export default class Load {
	static isSavePresent() {
		return !(helpers.isUndefined(store.get('version')));
	}
	constructor() {
		this.key    = store.get('key');
		this.params = store.getAll();
	}
	data() {
		return {
			weather : this.params.weather,
			season  : this.params.season,
			people  : this.params.people,
			farmland: this.params.farmland
		}
	}
	decrypt(value) {
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}
	load(data) {
		return _.isObject(data) ? this.loadObject(data) : this.loadValue(data);
	}
	loadObject(data) {
		if (Array.isArray(data)) {
			return _.map(data, this.load.bind(this));
		} else if (data.hasOwnProperty("type") && data.hasOwnProperty("encryptedMessage")) {
			return this.loadValue(data);
		} else {
			return _.mapValues(data, this.load.bind(this));
		}
	}
	loadValue(value) {
		if (value['type'] == 'null') {
			return null
		} else {
			console.log(value['encryptedMessage']);
			let decryptedString = this.decrypt(value['encryptedMessage']);
			return this.typecastString(decryptedString, value['type']);
		}
	}
	saveData() {
		return _.mapValues(this.data(), this.load.bind(this));
	}
	typecastString(string, type) {
		if (type == 'number') {
			return parseFloat(string);
		} else if (type == 'boolean') {
			return JSON.parse(string);
		} else {
			return string;
		}
	}
}

