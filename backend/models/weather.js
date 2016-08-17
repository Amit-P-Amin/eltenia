import { mix }  from '../mixins/mixin-builder';
import { Subscribable } from '../mixins/subscribable'

class Weather {
	constructor() {
		this.WEATHER_OPTIONS   = {
			0: { description: "Amazing", probability: 0.05 },
			1: { description: "Great", probability: 0.15 },
			2: { description: "Normal", probability: 0.5 },
			3: { description: "Poor", probability: 0.1 },
			4: { description: "Terrible", probability: .05 },
			5: { description: "Drought", probability: .05 },
			6: { description: "Locust Swarms", probability: .05 },
			7: { description: "Deep Freeze", probability: .05 }
		};
		this.description = "Normal";
		this.subscribers = [];
	}
	change() {
		this._changeWeather();
		this._notifySubscribers();
	}
	_changeWeather() {
		let roll                  = Math.random();
		let cumulativeProbability = 0.0;

		for (let i = 0; i < _.size(this.WEATHER_OPTIONS); i++) {
			cumulativeProbability += this.WEATHER_OPTIONS[i].probability;

			if (roll < cumulativeProbability) {
				this.description     = this.WEATHER_OPTIONS[i].description;
				break;
			}
		}
	}
}

export default mix(Weather).with(Subscribable)
