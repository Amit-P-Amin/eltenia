export default class Weather {
	constructor(weather) {
		this.weather = weather;
	}
	data() {
		return {
			description: this.weather.description
		}
	}
}
