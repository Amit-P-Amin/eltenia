let farmland = {
	id: uuid.v4(),
	weatherModifier: 1,
	lands: {
		"Amazing"  : { size: 20, used: 10 },
		"Great"    : { size: 50, used: 30 },
		"Normal"   : { size: 100, used: 50 },
		"Poor"     : { size: 200, used: 100 },
		"Terrible" : { size: 500, used: 250 }
	},
	seasonModifier: 1,
	fallowRate: 0.3
};

export { farmland }
