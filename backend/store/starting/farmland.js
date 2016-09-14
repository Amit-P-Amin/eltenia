let farmland = {
	id: uuid.v4(),
	weatherModifier: 1,
	lands: {
		amazing  : { size: 20, used: 10 },
		great    : { size: 50, used: 30 },
		normal   : { size: 100, used: 50 },
		poor     : { size: 200, used: 100 },
		terrible : { size: 500, used: 250 }
	},
	seasonModifier: 1,
	fallowRate: 0.3
};

export { farmland }
