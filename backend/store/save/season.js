export default class Season {
	constructor(season) {
		this.season = season;
	}
	data() {
		return {
			name: this.season.name
		}
	}
}
