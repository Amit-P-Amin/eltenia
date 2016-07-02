import { randomInt }  from '../shared/utility';
import { randomName } from '../shared/random-name';

export default class Person {
	constructor() {
		this.intelligence      = randomInt(15,25);
		this.conscientiousness = randomInt(15,25);
		this.growthPotential   = randomInt(10,20);
		this.name              = randomName();
		this.strength          = randomInt(5, 10);
		this.farmingSkill      = randomInt(1,5);
		this.age               = randomInt(15,30) + 0.1;
		this.health            = randomInt(50,90);
		this.foodStored        = randomInt(5,15);
		this.appetite          = 0;
		this.appetiteFulfilled = 1;
		this.survivalRate      = 1.0;
		this.growth            = 0;
		this.hoursWorked       = 0;
		this.foodProduced      = 0;
	}
	update() {
		// Work
		this.updateHoursWorked();
		this.updateAppetite();
		this.updateFoodProduced();
		this.updateFarmingSkill();

		// Eat
		this.updateAppetiteFulfilled();
		this.updateFoodStored();

		// Age
		this.updateAge();
		this.updateHealth();
		this.updateSurvivalRate();
		this.updateGrowth();
		this.updateStrength();
	}
	updateHoursWorked() {
		this.hoursWorked       = this.health / 100 * this.conscientiousness;
	}
	updateAppetite() {
		this.appetite          = this.strength * .1 * this.hoursWorked;
	}
	updateFoodProduced() {
		this.foodProduced      = this.strength * .1 * this.hoursWorked * this.farmingSkill;
	}
	updateFarmingSkill() {
		this.farmingSkill      = this.farmingSkill + this.intelligence / 1000 * this.hoursWorked;
	}
	updateAppetiteFulfilled() {
		this.appetiteFulfilled = Math.min((this.foodStored + this.foodProduced) / this.appetite, 1);
	}
	updateFoodStored() {
		this.foodStored        = Math.max((this.foodStored + this.foodProduced) - this.appetite, 0);
	}
	updateAge() {
		this.age               = this.age + .005;
	}
	updateHealth() {
		if(this.appetiteFulfilled < 1) {
			this.health          = this.health - (1 - this.appetiteFulfilled);
		} else {
			this.health          = 1 / Math.pow(this.health, 1.3) + this.health;
		}

		if(this.age > 50) {
			this.health          = this.health - (this.age - 50) / 100;
		}
	}
	updateSurvivalRate() {
		this.survivalRate      = Math.min(this.health / 20, 1);
	}
	updateGrowth() {
		this.growth            = this.growthPotential / 100 * this.hoursWorked;
	}
	updateStrength() {
		this.strength          = this.strength + this.growth;
	}
}

