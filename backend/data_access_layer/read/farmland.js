export default (farmland) => {
	return {
		weatherDescription: farmland.weather.description(),
		weatherModifier:    farmland.weatherModifier,
		amazingQuality:     farmland.amazingQuality,
		greatQuality:       farmland.greatQuality,
		normalQuality:      farmland.normalQuality,
		poorQuality:        farmland.poorQuality,
		terribleQuality:    farmland.terribleQuality,
		season:             farmland.season.name,
		seasonModifier:     farmland.seasonModifier
	}
}
