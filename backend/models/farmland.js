var gaussian = require('gaussian');
import { shared }  from '../../shared/shared';
import { config }  from '../config/config';
import { helpers } from '../helpers/helpers';
import Land        from './land';

export default class Farmland {
	static seasonModifiers() {
		return config.farmland.SEASON_MODIFIERS;
	}
	static weatherModifiers() {
		return config.farmland.WEATHER_MODIFIERS;
	}
	constructor(params, weather, season) {
		this.id               = params.id;

		this.weather          = weather;
		this.weatherModifier  = params.weatherModifier;
		this.weather.subscribe(this.id, this.updateWeather.bind(this));
		this.updateWeather();

		this.season           = season;
		this.seasonModifier   = params.seasonModifier;
		this.season.subscribe(this.id, this.updateSeason.bind(this));
		this.updateSeason();

		this.farmers           = 0;
		this.fallowRate        = params.fallowRate;

		this.lands            = {
			"Amazing"  : new Land(params.lands["Amazing"], this),
			"Great"    : new Land(params.lands["Great"], this),
			"Normal"   : new Land(params.lands["Normal"], this),
			"Poor"     : new Land(params.lands["Poor"], this),
			"Terrible" : new Land(params.lands["Terrible"], this)
		};
	}
	addFarmer() {
		this.farmers += 1;
	}
	removeFarmer() {
		this.farmers -= 1;
	}
	acresPerFarmer() {
		return Math.min(this.cultivableLand() / this.farmers, config.farmland.MAX_ACRES_PER_FARMER);
	}
	cultivableLand() {
		return _.reduce(config.farmland.BEST_TO_WORST_LAND, (land, quality) => {
			return land + this.lands[quality].available();
		}, 0);
	}
	landModifier() {
		let modifiers = [];
		let weights   = [];

		_.map(config.farmland.BEST_TO_WORST_LAND, (quality) => {
			modifiers.push(config.farmland.LAND_QUALITY_MODIFIERS[quality]);
			weights.push(this.lands[quality].used);
		});

		return helpers.weightedAverage(modifiers, weights);
	}
	totalModifier() {
		return this.landModifier() * this.weatherModifier * this.seasonModifier;
	}
	update() {
		this.updateLandInUse();
		this.updateLandSize();
	}
	updateLandInUse() {
		let landNeeded = this.acresPerFarmer() * this.farmers;

	  _.map(config.farmland.BEST_TO_WORST_LAND, (quality) => {
			let land   = this.lands[quality];
	  	land.used  = Math.min(landNeeded, land.available());
			landNeeded = Math.max(landNeeded - land.used, 0);
		}, 0);
	}
	updateLandSize() {
		_.map(config.farmland.BEST_TO_WORST_LAND, (quality) => {
			let land      = this.lands[quality];
			let settings  = config.farmland.LAND_CHANGE_SETTINGS[quality];
			let deviation = settings.equilibrium - land.fallowPercent();

			if (deviation > 0 && config.farmland.BEST_TO_WORST_LAND[0] != quality) {
				this.upgradeLand(land, quality, settings);
			} else if (_.last(config.farmland.BEST_TO_WORST_LAND) != quality) {
				this.downgradeLand(land, quality, settings);
			}
		})
	}
	upgradeLand(land, quality, settings) {
		let meanChange    = settings.changeIfOver / shared.constants.DAYS_IN_YEAR;
		let percentChange = Math.max(gaussian(meanChange, settings.variance).ppf(Math.random()), 0);
		let fallowLand    = land.size - land.used;
		let change        = fallowLand * percentChange;
		let betterQuality = config.farmland.BEST_TO_WORST_LAND[config.farmland.BEST_TO_WORST_LAND.indexOf(quality) - 1];

		land.remove(change);
		this.lands[betterQuality].add(change);
	}
	downgradeLand(land, quality, settings) {
		let meanChange    = settings.changeIfUnder / shared.constants.DAYS_IN_YEAR;
		let percentChange = Math.max(gaussian(meanChange, settings.variance).ppf(Math.random()), 0);
		let change        = land.used * percentChange;
		let worseQuality  = config.farmland.BEST_TO_WORST_LAND[config.farmland.BEST_TO_WORST_LAND.indexOf(quality) + 1];

		land.remove(change);
		this.lands[worseQuality].add(change);
	}
	updateSeason() {
		this.seasonModifier = this.constructor.seasonModifiers()[this.season.name];
	}
	updateWeather() {
		this.weatherModifier = this.constructor.weatherModifiers()[this.weather.description];
	}
}

