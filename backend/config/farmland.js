let farmland = {
	MAX_ACRES_PER_FARMER: 5,
	BEST_TO_WORST_LAND: ["amazing", "great", "normal", "poor", "terrible"],
	LAND_QUALITY_MODIFIERS: {
		amazing:  2.0,
		great:    1.25,
		normal:   1.0,
		poor:     0.75,
		terrible: 0.5
	},
	LAND_CHANGE_SETTINGS: {
		amazing:  { equilibrium: .60, changeIfOver: .0000, changeIfUnder: .0100, variance: .020 },
		great:    { equilibrium: .50, changeIfOver: .0010, changeIfUnder: .0050, variance: .010 },
		normal:   { equilibrium: .40, changeIfOver: .0015, changeIfUnder: .0075, variance: .015 },
		poor:     { equilibrium: .35, changeIfOver: .0020, changeIfUnder: .0100, variance: .020 },
		terrible: { equilibrium: .30, changeIfOver: .0025, changeIfUnder: .0000, variance: .025 }
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


