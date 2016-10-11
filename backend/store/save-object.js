let store   = require('store');

export default class SaveObject {
	static isSaveObject(object) {
		return object.hasOwnProperty("type") && (object.hasOwnProperty("encryptedMessage") || object.hasOwnProperty("message"));
	}
	static key() {
		let key = store.get('key');

		if (helpers.isUndefined(key)) {
			key = uuid.v4();
			store.set('key', key);
		}

		return key
	}
	constructor() {
		this.key  = SaveObject.key();
	}
	compose(value) {
		let type, message;

		if (typeof value === 'undefined' || typeof value === 'null') {
			return { type: 'null', message: null }
		} else if (typeof value === 'string') {
			type    = 'string';
			message = value;
		} else if (typeof value === 'number') {
			type    = 'number';
			message = value.toString();
		} else if (typeof value === 'boolean') {
			type    = 'boolean';
			message = value.toString();
		}

		return { type: type, encryptedMessage: this._encrypt(message) };
	}
	decompose(value) {
		if (value['type'] == 'null') {
			return null;
		} else {
			let decryptedString = this._decrypt(value['encryptedMessage']);
			return helpers.typecastString(decryptedString, value['type']);
		}
	}
	_encrypt(message) {
		return CryptoJS.AES.encrypt(message, this.key).toString();
	}
	_decrypt(value) {
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}
}
