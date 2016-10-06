import Profession from './profession';

export default class Farmer extends Profession {
	static professionName() {
		return 'farmer';
	}
	static professionSkills() {
		return ['farming'];
	}
	constructor(person, resources) {
		super(person);
		this.farmland = resources.farmland;
		this.farmland.addFarmer();
	}
	_produceGoods() {
		this._family().food    += this.strength * .1 * this.hoursWorked * this._skills().farming * this.farmland.totalModifier();
	}
	_updateSkills() {
		this._skills().farming += this.intelligence / 10000 * this.hoursWorked;
	}
}
