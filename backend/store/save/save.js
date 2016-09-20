import Season      from './season';
import Weather     from './weather';
import People      from './people';
import Farmland    from './farmland';
import Families    from './families';
import { shared }  from '../../../shared/shared.js';
import SaveObject  from './../save-object';
let store   = require('store');

export default class Save {
	constructor(game) {
		this.game       = game;
		this.saveObject = new SaveObject();
	}
	compose(data) {
		return _.isObject(data) ? this.composeObject(data) : this.saveObject.compose(data);
	}
	composeObject(data) {
		return Array.isArray(data) ? _.map(data, this.compose.bind(this)) : _.mapValues(data, this.compose.bind(this));
	}
	data() {
		return {
			'version' : shared.constants.VERSION,
			'weather' : new Weather(this.game.weather).data(),
			'season'  : new Season(this.game.season).data(),
			'people'  : new People(this.game.people).data(),
			'farmland': new Farmland(this.game.farmland).data(),
			'families': new Families(this.game.families).data()
		}
	}
	run() {
		_.forEach(this.data(), this.set.bind(this));
	}
	set(data, object) {
		store.set(object, this.compose(data));
	}
}
