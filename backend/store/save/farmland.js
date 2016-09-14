export default class Farmland {
	constructor(farmland) {
		this.farmland = farmland;
	}
	data() {
		return {
			id              : this.farmland.id,
			weatherModifier : this.farmland.weatherModifier,
			seasonModifier  : this.farmland.seasonModifier,
			fallowRate      : this.farmland.fallowRate,
			lands           : {
				amazing  : { size: this.farmland.lands.amazing.size, used: this.farmland.lands.amazing.used },
				great    : { size: this.farmland.lands.great.size, used: this.farmland.lands.great.used },
				normal   : { size: this.farmland.lands.normal.size, used: this.farmland.lands.normal.used },
				poor     : { size: this.farmland.lands.poor.size, used: this.farmland.lands.poor.used },
				terrible : { size: this.farmland.lands.terrible.size, used: this.farmland.lands.terrible.used },
			}
		}
	}
}
