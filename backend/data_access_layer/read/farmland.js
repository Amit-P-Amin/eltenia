import BaseReader from './base-reader'

export default class Farmland extends BaseReader {
	readModel() {
		return {
			weatherDescription: this.model.weather.description,
			weatherModifier:    this.model.weatherModifier,
			amazingQuality:     this.model.amazingQuality,
			greatQuality:       this.model.greatQuality,
			normalQuality:      this.model.normalQuality,
			poorQuality:        this.model.poorQuality,
			terribleQuality:    this.model.terribleQuality,
			season:             this.model.season.name,
			seasonModifier:     this.model.seasonModifier
		}
	}
}
