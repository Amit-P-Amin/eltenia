import BaseReader from './base-reader'

export default class Farmland extends BaseReader {
	readModel() {
		return {
			weatherDescription: this.model.weather.description,
			weatherModifier:    this.model.weatherModifier,
			amazingQuality:     this.model.lands["amazing"].size,
			greatQuality:       this.model.lands["great"].size,
			normalQuality:      this.model.lands["normal"].size,
			poorQuality:        this.model.lands["poor"].size,
			terribleQuality:    this.model.lands["terrible"].size,
			season:             this.model.season.name,
			seasonModifier:     this.model.seasonModifier
		}
	}
}
