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
				"Amazing"  : { size: this.farmland.lands["Amazing"].size, used: this.farmland.lands["Amazing"].used },
				"Great"    : { size: this.farmland.lands["Great"].size, used: this.farmland.lands["Great"].used },
				"Normal"   : { size: this.farmland.lands["Normal"].size, used: this.farmland.lands["Normal"].used },
				"Poor"     : { size: this.farmland.lands["Poor"].size, used: this.farmland.lands["Poor"].used },
				"Terrible" : { size: this.farmland.lands["Terrible"].size, used: this.farmland.lands["Terrible"].used },
			}
		}
	}
}
