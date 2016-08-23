import Season      from './season';
import Weather     from './weather';
let store = require('store');
import { shared }  from '../../../shared/shared.js';

export default class Save {
	constructor(game) {
		this.game = game;
	}
	run() {
		store.set('version', shared.constants.VERSION);
		store.set('weather', new Weather(this.game.weather).data());
		store.set('season', new Season(this.game.season).data());
	}
}
