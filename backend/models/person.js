import Skills     from './skills';
// import Profession from './professions/profession';
import ProfessionFactory from './professions/profession-factory';

export default class Person {
	constructor(params, resources) {
		this.id                = params.id;
		this.intelligence      = params.intelligence;
		this.conscientiousness = params.conscientiousness;
		this.growthPotential   = params.growthPotential;
		this.name              = params.name;
		this.strength          = params.strength;
		this.skills            = new Skills(params.skills);
		// this.farmingSkill      = params.farmingSkill;

		this.age               = params.age;
		this.health            = params.health;
		// this.foodStored        = params.foodStored;
		this.appetite          = params.appetite;
		this.appetiteFulfilled = params.appetiteFulfilled;
		this.survivalRate      = params.survivalRate;
		this.growth            = params.growth;
		this.hoursWorked       = params.hoursWorked;
		// this.foodProduced      = params.foodProduced;

		// this.profession        = Profession.build(this, resources, params.profession);
		this.profession        = ProfessionFactory.build(this, resources, params.profession);

		// this.farmland          = farmland;
		this.family            = null;
		// farmland.addFarmer();
	}
	update() {
		// Work
		this._updateHoursWorked();
		this._updateAppetite();

		this.profession.run();
		// Move to farmer
		// this._updateFoodProduced();
		// this._updateFarmingSkill();

		// Eat --> Split to family
		// this._updateAppetiteFulfilled();
		// this._updateFoodStored();

		// Age
		this._updateAge();
		this._updateHealth();
		this._updateSurvivalRate();
		this._updateGrowth();
		this._updateStrength();
	}
	_updateHoursWorked() {
		this.hoursWorked       = this.health / 100 * this.conscientiousness;
	}
	_updateAppetite() {
		this.appetite          = this.strength * .1 * this.hoursWorked;
	}
	_updateAppetiteFulfilled() {
		this.appetiteFulfilled = Math.min((this.foodStored + this.foodProduced) / this.appetite, 1);
	}
	// _updateFoodStored() {
	// 	this.foodStored        = Math.max((this.foodStored + this.foodProduced) - this.appetite, 0);
	// }
	_updateAge() {
		this.age               = this.age + .005;
	}
	_updateHealth() {
		if(this.appetiteFulfilled < 1) {
			this.health          = this.health - (1 - this.appetiteFulfilled);
		} else {
			this.health          = 1 / Math.pow(this.health, 1.3) + this.health;
		}

		if(this.age > 50) {
			this.health          = this.health - (this.age - 50) / 100;
		}
	}
	_updateSurvivalRate() {
		this.survivalRate      = Math.min(this.health / 20, 1);
	}
	_updateGrowth() {
		this.growth            = this.growthPotential / 100 * this.hoursWorked;
	}
	_updateStrength() {
		this.strength          = this.strength + this.growth;
	}
}

