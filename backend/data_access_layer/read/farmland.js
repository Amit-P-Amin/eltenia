import BaseReader from './base-reader';
import LandsReader from './lands';

export default class Farmland extends BaseReader {
	getParameters() {
		return {
			weather            : this.object.weather.description,
			weatherModifier    : this.object.weatherModifier,
			weatherModifiers   : this.object.constructor.weatherModifiers(),
			lands              : new LandsReader(this.object.lands).read(),
			season             : this.object.season.name,
			seasonModifier     : this.object.seasonModifier,
			seasonModifiers    : this.object.constructor.seasonModifiers(),
			fallowRate         : this.object.fallowRate,
			landModifier       : this.object.landModifier(),
			totalModifier      : this.object.totalModifier()
		}
	}
}
