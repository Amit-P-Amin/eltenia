var gaussian = require('gaussian');
import { shared } from '../../shared/shared';
import { config } from '../config/config';
import { helpers } from '../helpers/helpers';
import Land       from './land';

export default class Farmland {
	constructor(weather, season) {
		this.id               = uuid.v4();

		this.weather          = weather;
		this.weatherModifier  = 0;
		this.weather.subscribe(this.id, this.updateWeather.bind(this));
		this.updateWeather();

		this.season           = season;
		this.seasonModifier   = 0;
		this.season.subscribe(this.id, this.updateSeason.bind(this));
		this.updateSeason();

		this.maxAcresPerFarmer = 5;
		this.acresPerFarmer    = 5;
		this.farmers           = 0;
		this.fallowRate        = 0.3;

		this.lands            = {
			amazing : new Land(this, 20),
			great   : new Land(this, 50),
			normal  : new Land(this, 100),
			poor    : new Land(this, 200),
			terrible: new Land(this, 500)
		};
		this.landModifier     = 1;

		this.totalModifier = 1;
	}
	addFarmer() {
		this.farmers += 1;
	}
	removeFarmer() {
		this.farmers -= 1;
	}
	update() {
		this.updateLandInUse();
		this.updateLandSize();
		this.updateLandModifier();
		this.updateTotalModifier();
	}
	updateLandInUse() {
		let landNeeded = this.acresPerFarmer * this.farmers;

	  _.map(config.farmland.BEST_TO_WORST_LAND, (quality) => {
			let land   = this.lands[quality];
	  	land.used  = Math.min(landNeeded, land.available);
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
	updateLandModifier() {
		let modifiers = [];
		let weights   = [];

		_.map(config.farmland.BEST_TO_WORST_LAND, (quality) => {
			modifiers.push(config.farmland.LAND_QUALITY_MODIFIERS[quality]);
			weights.push(this.lands[quality].used);
		});

		return helpers.weightedAverage(modifiers, weights);
	}
	updateTotalModifier() {
		this.totalModifier = this.landModifier * this.weatherModifier * this.seasonModifier;
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

