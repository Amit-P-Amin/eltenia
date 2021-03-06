import { mix }          from '../mixins/mixin-builder';
import { Subscribable } from '../mixins/subscribable'

class Season {
	constructor(params) {
		this.SEASONS     = ["Winter", "Spring", "Summer", "Fall"];
		this.name        = params.name;
		this.subscribers = [];
	}
	change() {
		this._changeSeason();
		this._notifySubscribers();
	}
	_changeSeason() {
		let index = this.SEASONS.indexOf(this.name);
		this.name = (index == 3 ? this.SEASONS[0] : this.SEASONS[index + 1]);
	}
}

export default mix(Season).with(Subscribable)
