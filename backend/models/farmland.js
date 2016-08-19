var gaussian = require('gaussian');
import { shared }        from '../../shared/shared';
import { config } from '../config/config';

export default class Farmland {
	constructor(weather, season) {
		this.id                      = uuid.v4();

		this.amazingQuality          = 20;
		this.greatQuality            = 50;
		this.normalQuality           = 100;
		this.poorQuality             = 200;
		this.terribleQuality         = 500;
		this.soilModifier            = 1;

		this.weather            = weather;
		this.weatherModifier    = 0;
		this.weather.subscribe(this.id, this.updateWeather.bind(this));
		this.updateWeather();

		this.season           = season;
		this.seasonModifier   = 0;
		this.season.subscribe(this.id, this.updateSeason.bind(this));
		this.updateSeason();

		this.maxAcresPerFarmer = 5;
		this.acresPerFarmer    = 5;
		this.farmers           = 0;
		this.fallow            = 0.3;

		this.modifier = 1;
	}
	addFarmer() {
		this.farmers += 1;
	}
	removeFarmer() {
		this.farmers -= 1;
	}
	cultivableLand() {
		return _.reduce(config.farmland.BEST_TO_WORST_QUALITIES, (sum, quality) => {
			return sum + this[quality + "Quality"] * this.fallow;
		}, 0);
	}
	update() {
		let landNeeded     = this.maxAcresPerFarmer * this.farmers;
		let cultivableLand = this.cultivableLand();
		let soilUsage = [];

		if (landNeeded > cultivableLand) {
			this.updateAcresPerFarmer(cultivableLand);
			soilUsage = _.zip(Array(config.farmland.BEST_TO_WORST_QUALITIES.length).fill(this.fallow), config.farmland.BEST_TO_WORST_QUALITIES);
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

			let settings    = config.farmland.SOIL_CHANGE_CONFIGURATION[quality];
			let deviation = settings.equilibrium - fallow;

			if (deviation > 0 && config.farmland.BEST_TO_WORST_QUALITIES[0] != quality) {
				let mean          = (deviation * settings.changeIfOver) / shared.constants.DAYS_IN_YEAR;
				let percentChange = gaussian(mean, settings.variance).ppf(Math.random());
				let change        = this[quality + "Quality"] * percentChange;
				let betterQuality = config.farmland.BEST_TO_WORST_QUALITIES[config.farmland.BEST_TO_WORST_QUALITIES.indexOf(quality) - 1];

				this[quality + "Quality"]       -= change;
				this[betterQuality + "Quality"] += change;
			} else if (config.farmland.BEST_TO_WORST_QUALITIES[-1] != quality) {
				let mean          = (deviation * settings.changeIfUnder) / shared.constants.DAYS_IN_YEAR;
				let percentChange = gaussian(mean, settings.variance).ppf(Math.random());
				let change        = this[quality + "Quality"] * percentChange;
				let worseQuality  = config.farmland.BEST_TO_WORST_QUALITIES[config.farmland.BEST_TO_WORST_QUALITIES.indexOf(quality) + 1];

				this[quality + "Quality"]      -= change;
				this[worseQuality + "Quality"] += change;
			}
		})
	}
	updateSoilModifier(usage) {
		let totalModifier = 0;

		_.forEach(usage, ([quality, fallow]) => {
			totalModifier += config.farmland.SOIL_QUALITY_MODIFIERS[quality] * this[quality + "Quality"] * (1 - fallow);
		});

		this.soilModifier = totalModifier / this.cultivableLand();
	}
	updateModifier() {
		this.modifier = this.soilModifier * this.weatherModifier * this.seasonModifier;
	}
	updateAcresPerFarmer(cultivableLand) {
		this.acresPerFarmer =  cultivableLand / this.farmers;
	}
	updateSeason() {
		this.seasonModifier = config.farmland.SEASON_MODIFIERS[this.season.name];
	}
	updateWeather() {
		this.weatherModifier = config.farmland.WEATHER_MODIFIERS[this.weather.description];
	}
}

