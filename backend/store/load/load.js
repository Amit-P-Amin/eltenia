let store = require('store');

export default class Load {
	static isSavePresent() {
		return !(typeof store.get('version') === "undefined");
	}
	constructor() {
		this.params = store.getAll();
	}
	saveData() {
		return {
			weather: this.params.weather,
			season: this.params.season,
			people: this.params.people,
			farmland: this.params.farmland
		}
	}
}
