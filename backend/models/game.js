import Person from './person.js';
import Farmland from './farmland';
import Weather from './weather';
import { mix }  from '../mixins/mixin-builder';
import { Subscribable } from '../mixins/subscribable'

import { shared } from '../../shared/shared'

class Game {
	constructor() {
		this.weather  = new Weather();
		this.farmland = new Farmland(this.weather);
		this.people   = _.tap({}, (people) => { _.times(5, () => { people[uuid.v4()] = new Person(this.farmland) }); });
		this.year     = 0;

		this.subscribers = [];
		this.run();
	}
	run() {
		setInterval(() => { this.update(); }, shared.constants.TICK);
	}
	runTicks(ticks) {
		setTimeout(() => {
			this.update();
			if (ticks > 1) { this.runTicks(ticks - 1); }
		}, 20)
	}
	update() {
		this.year = _.round(this.year + 1.0 / shared.constants.DAYS_IN_YEAR, 6);

		_.mapValues(this.people, (person) => { person.update() });
		this.farmland.update();
		if (this.year % 1 == 0)    { this.weather.change();   }
		// if (this.year % 0.25 == 0) { this.farmland.nextSeason(); }
		this._notifySubscribers();
	}
}

export default mix(Game).with(Subscribable)
