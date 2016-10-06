import Season           from './season';
import Person           from './person.js';
import Farmland         from './farmland';
import Weather          from './weather';
import Family           from './family';
import { mix }          from '../mixins/mixin-builder';
import { Subscribable } from '../mixins/subscribable'
import { shared }       from '../../shared/shared'

class Game {
	constructor(data) {
		this.subscribers = [];

		this.weather     = new Weather(data.weather);
		this.season      = new Season(data.season);
		this.farmland    = new Farmland(data.farmland, this.weather, this.season);
		this.resources   = { farmland: this.farmland };
		this.people      = {};
		this.families    = {};

		_.map(data.people,   (person) => { this.people[person.id] = new Person(person, this.resources) });
		_.map(data.families, (family) => { this.families[family.id] = new Family(family, this.people)});

		this.year        = 0;

		this._run();
	}
	runTicks(ticks) {
		setTimeout(() => {
			this._update();
			if (ticks > 1) { this.runTicks(ticks - 1); }
		}, 20)
	}
	_run() {
		setInterval(() => { this._update(); }, shared.constants.TICK);
	}
	_update() {
		this.year = _.round(this.year + 1.0 / shared.constants.DAYS_IN_YEAR, 6);


		_.mapValues(this.people, (person) => { person.update() });
		this.farmland.update();
		if (this.year % 1 == 0)    { this.weather.change(); }
		if (this.year % 0.25 == 0) { this.season.change(); }

		this._notifySubscribers();
	}
}

export default mix(Game).with(Subscribable)
