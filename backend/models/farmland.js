var gaussian = require('gaussian');
let uuid = require('node-uuid');
import { DAYS_IN_YEAR }  from '../shared/constants.js'

export default class Farmland {
	constructor(weather) {
		this.id                      = uuid.v4();

		this.amazingQuality          = 20;
		this.greatQuality            = 50;
		this.normalQuality           = 100;
		this.poorQuality             = 200;
		this.terribleQuality         = 500;
		this.soilModifier            = 1;
		this.BEST_TO_WORST_QUALITIES = ["amazing", "great", "normal", "poor", "terrible"];
		this.QUALITY_MODIFIERS       = {
			amazing:  2.0,
			great:    1.25,
			normal:   1.0,
			poor:     0.75,
			terrible: 0.5
		};
		this.SOIL_CHANGE_CONFIGURATION    = {
			amazing:  { equilibrium: .60, changeIfOver: .0000, changeIfUnder: -.0100, variance: .020 },
			great:    { equilibrium: .50, changeIfOver: .0010, changeIfUnder: -.0050, variance: .010 },
			normal:   { equilibrium: .40, changeIfOver: .0015, changeIfUnder: -.0075, variance: .015 },
			poor:     { equilibrium: .35, changeIfOver: .0020, changeIfUnder: -.0100, variance: .020 },
			terrible: { equilibrium: .30, changeIfOver: .0025, changeIfUnder: -.0000, variance: .025 }
		};

		this.weather            = weather;
		this.weatherModifier    = 0;
		this.WEATHER_MODIFIERS  = {
			"Amazing"      : 2.0,
			"Great"        : 1.5,
			"Normal"       : 1,
			"Poor"         : .7,
			"Terrible"     : .5,
			"Drought"      : .3,
			"Locust Swarms": .25,
			"Deep Freeze"  : .15
		};
		this.weather.subscribe(this.id, this.updateWeather.bind(this));
		this.updateWeather();

		this.seasonID          = 0;
		this.season            = "Spring";
		this.seasonModifier    = 1.5;
		this.SEASONS           = {
			0: { name: "Winter", modifier: 0.25 },
			1: { name: "Spring", modifier: 1.25 },
			2: { name: "Summer", modifier: 1.0 },
			3: { name: "Fall", modifier: 0.75 }
		};

		this.maxAcresPerFarmer = 5;
		this.acresPerFarmer    = 5;
		this.farmers           = 0;
		this.fallow            = 0.3;

		this.modifier = 1;
	}
	displayParameters() {
		return {
			weatherDescription: this.weather.description,
			weatherModifier:    this.weatherModifier,
			amazingQuality:     this.amazingQuality,
			greatQuality:       this.greatQuality,
			normalQuality:      this.normalQuality,
			poorQuality:        this.poorQuality,
			terribleQuality:    this.terribleQuality,
			season:             this.season.name,
			seasonModifier:     this.seasonModifier	
		}
	}
	addFarmer() {
		this.farmers += 1;
	}
	removeFarmer() {
		this.farmers -= 1;
	}
	changeSeason() {
		this.seasonID       = (this.seasonID == 3 ? 0 : this.seasonID + 1);

		this.season         = this.SEASONS[this.seasonID].name;
		this.seasonModifier = this.SEASONS[this.seasonID].modifier;
	}
	cultivableLand() {
		return _.reduce(this.BEST_TO_WORST_QUALITIES, (sum, quality) => {
			return sum + this[quality + "Quality"] * this.fallow;
		}, 0);
	}
	update() {
		let landNeeded     = this.maxAcresPerFarmer * this.farmers;
		let cultivableLand = this.cultivableLand();
		let soilUsage = [];

		if (landNeeded > cultivableLand) {
			this.updateAcresPerFarmer(cultivableLand);
			soilUsage = _.zip(Array(this.BEST_TO_WORST_QUALITIES.length).fill(this.fallow), this.BEST_TO_WORST_QUALITIES);
		} else {
			_.map(["amazing", "great", "normal", "poor", "terrible"], (quality) => {
				let available     = this[quality + "Quality"] * this.fallow;
				let landUsed      = Math.min(available, landNeeded);
				landNeeded        -= landUsed;
				soilUsage.push([quality, 1.0 - landUsed / available]);
			});
		}

		this.updateSoil(soilUsage);
		this.updateSoilModifier(soilUsage);
		this.updateModifier();
	}
	updateSoil(usage) {
		_.forEach(usage, ([quality, fallow]) => {

			let config    = this.SOIL_CHANGE_CONFIGURATION[quality];
			let deviation = config.equilibrium - fallow;

			if (deviation > 0 && this.BEST_TO_WORST_QUALITIES[0] != quality) {
				let mean          = (deviation * config.changeIfOver) / DAYS_IN_YEAR;
				let percentChange = gaussian(mean, config.variance).ppf(Math.random());
				let change        = this[quality + "Quality"] * percentChange;
				let betterQuality = this.BEST_TO_WORST_QUALITIES[this.BEST_TO_WORST_QUALITIES.indexOf(quality) - 1];

				this[quality + "Quality"]       -= change;
				this[betterQuality + "Quality"] += change;
			} else if (this.BEST_TO_WORST_QUALITIES[-1] != quality) {
				let mean          = (deviation * config.changeIfUnder) / DAYS_IN_YEAR;
				let percentChange = gaussian(mean, config.variance).ppf(Math.random());
				let change        = this[quality + "Quality"] * percentChange;
				let worseQuality  = this.BEST_TO_WORST_QUALITIES[this.BEST_TO_WORST_QUALITIES.indexOf(quality) + 1];

				this[quality + "Quality"]      -= change;
				this[worseQuality + "Quality"] += change;
			}
		})
	}
	updateSoilModifier(usage) {
		let totalModifier = 0;

		_.forEach(usage, ([quality, fallow]) => {
			totalModifier += this.QUALITY_MODIFIERS[quality] * this[quality + "Quality"] * (1 - fallow);
		});

		this.soilModifier = totalModifier / this.cultivableLand();
	}
	updateModifier() {
		this.modifier = this.soilModifier * this.weatherModifier * this.seasonModifier;
	}
	updateAcresPerFarmer(cultivableLand) {
		this.acresPerFarmer =  cultivableLand / this.farmers;
	}
	updateWeather() {
		this.weatherModifier    = this.WEATHER_MODIFIERS[this.weather.description];
	}
}

