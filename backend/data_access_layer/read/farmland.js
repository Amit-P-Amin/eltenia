import BaseReader from './base-reader';
import LandReader from './land';

export default class Farmland extends BaseReader {
	getParameters() {
		return {
			weatherDescription : this.object.weather.description,
			weatherModifier    : this.object.weatherModifier,
			weatherModifiers   : this.object.constructor.weatherModifiers(),
			// lands              : new LandsReader(this.object.lands).read(),
			// amazingQuality     : new LandReader(this.object.lands['amazing']).read(),
			// greatQuality       : new LandReader(this.object.lands['great']).read(),
			// normalQuality      : new LandReader(this.object.lands['normal']).read(),
			// poorQuality        : new LandReader(this.object.lands['poor']).read(),
			// terribleQuality    : new LandReader(this.object.lands['terrible']).read(),
			season             : this.object.season.name,
			seasonModifier     : this.object.seasonModifier,
			seasonModifiers    : this.object.constructor.seasonModifiers(),
			fallowRate         : this.object.fallowRate,
			landModifier       : this.object.landModifier(),
			totalModifier      : this.object.totalModifier()
		}
	}
}
