import Season      from './season';
import Weather     from './weather';
import People      from './people';
import Farmland    from './farmland';
import { shared }  from '../../../shared/shared.js';
let store = require('store');

export default class Save {
	constructor(game) {
		this.game = game;
	}
	run() {
		store.set('version', shared.constants.VERSION);
		store.set('weather', new Weather(this.game.weather).data());
		store.set('season', new Season(this.game.season).data());
		store.set('people', new People(this.game.people).data());
		store.set('farmland', new Farmland(this.game.farmland).data());
	}
}
