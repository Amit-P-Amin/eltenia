let farmland = {
	MAX_ACRES_PER_FARMER: 5,
	BEST_TO_WORST_LAND: ["Amazing", "Great", "Normal", "Poor", "Terrible"],
	LAND_QUALITY_MODIFIERS: {
		"Amazing"  : 2.0,
		"Great"    : 1.25,
		"Normal"   : 1.0,
		"Poor"     : 0.75,
		"Terrible" : 0.5
	},
	LAND_CHANGE_SETTINGS: {
		"Amazing"  : { equilibrium: .60, changeIfOver: .0000, changeIfUnder: .0100, variance: .020 },
		"Great"    : { equilibrium: .50, changeIfOver: .0010, changeIfUnder: .0050, variance: .010 },
		"Normal"   : { equilibrium: .40, changeIfOver: .0015, changeIfUnder: .0075, variance: .015 },
		"Poor"     : { equilibrium: .35, changeIfOver: .0020, changeIfUnder: .0100, variance: .020 },
		"Terrible" : { equilibrium: .30, changeIfOver: .0025, changeIfUnder: .0000, variance: .025 }
	},
	WEATHER_MODIFIERS: {
		"Amazing"      : 2.0,
		"Great"        : 1.5,
		"Normal"       : 1,
		"Poor"         : .7,
		"Terrible"     : .5,
		"Drought"      : .3,
		"Locust Swarms": .25,
		"Deep Freeze"  : .15
	},
	SEASON_MODIFIERS: {
		"Winter": 0.25,
		"Spring": 1.25,
		"Summer": 1.0,
		"Fall"  : 0.75
	}
};

Object.freeze(farmland);

export { farmland }


