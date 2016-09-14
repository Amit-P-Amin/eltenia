import Season      from './season';
import Weather     from './weather';
import People      from './people';
import Farmland    from './farmland';
import { shared }  from '../../../shared/shared.js';
import { helpers } from '../../helpers/helpers';
let store   = require('store');

export default class Save {
	static key() {
		let key = store.get('key');

		if (helpers.isUndefined(key)) {
			key = uuid.v4();
			store.set('key', key);
		}

		return key
	}
	constructor(game) {
		this.game = game;
		this.key  = Save.key();
	}
	compose(data) {
		return _.isObject(data) ? this.composeObject(data) : this.composeValue(data);
	}
	composeObject(data) {
		return Array.isArray(data) ? _.map(data, this.compose.bind(this)) : _.mapValues(data, this.compose.bind(this));
	}
	composeValue(value) {
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

		return { type: type, encryptedMessage: this.encrypt(message) };
	}
	data() {
		return {
			'version' : { version: shared.constants.VERSION },
			'weather' : new Weather(this.game.weather).data(),
			'season'  : new Season(this.game.season).data(),
			'people'  : new People(this.game.people).data(),
			'farmland': new Farmland(this.game.farmland).data()
		}
	}
	encrypt(message) {
		return CryptoJS.AES.encrypt(message, this.key).toString();
	}
	run() {
		_.forEach(this.data(), this.set.bind(this));
	}
	set(data, object) {
		console.log(object);
		let d = this.compose(data);
		console.log(d);
		store.set(object, this.compose(data));
		console.log("  ");
		console.log("  ");
	}
}
