import Person from './models/person.js';
import Farmland from './models/farmland';
import Weather from './models/weather';
import { round } from './shared/utility';
let uuid = require('node-uuid');
import { DAYS_IN_YEAR, TICK }  from './shared/constants.js';

export default class Game {
	static _notifySubscriber(subscriber) {
		subscriber.update();
	}
	constructor() {
		this.weather  = new Weather();
		this.farmland = new Farmland(this.weather);
		this.people   = _.tap({}, (people) => { _.times(5, () => { people[uuid.v4()] = new Person(this.farmland) }); });
		this.year     = 0;

		this.subscribers = [];
		this.run();
	}
	run() {
		setInterval(() => { this.update(); }, TICK);
	}
	runTicks(ticks) {
		setTimeout(() => {
			this.update();
			if (ticks > 1) { this.runTicks(ticks - 1); }
		}, 20)
	}
	update() {
		this.year = round(this.year + 1.0 / DAYS_IN_YEAR, 6);

		_.mapValues(this.people, (person) => { person.update() });
		this.farmland.update();
		if (this.year % 1 == 0)    { this.weather.change();   }
		// if (this.year % 0.25 == 0) { this.farmland.nextSeason(); }
		this._notifySubscribers();
	}
	_notifySubscribers() {
		_.each(this.subscribers, this.constructor._notifySubscriber)
	}
	subscribe(object) {
		this.subscribers.push(object);
		return "yo";
	}
}

