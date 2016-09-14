let store = require('store');
import { helpers } from '../../helpers/helpers';

export default class Load {
	static isSavePresent() {
		return !(helpers.isUndefined(store.get('version')));
	}
	constructor() {
		let key     = store.get('key');
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
		return CryptoJS.AES.decrypt(value, this.key);
	}
	parse(data) {
		_.mapValues(data, this.decrypt.bind(this));
	}
	saveData() {
		_.mapValues(this.data(), this.parse.bind(this));
	}
}

