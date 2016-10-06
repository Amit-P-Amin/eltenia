import Skills from './skills';
import Profession from './profession';

export default class People {
	constructor(people) {
		this.people = people;
	}
	data() {
		return _.map(this.people, (person) => {
			return {
				id                : person.id,
				intelligence      : person.intelligence,
				conscientiousness : person.conscientiousness,
				growthPotential   : person.growthPotential,
				name              : person.name,
				strength          : person.strength,
				age               : person.age,
				health            : person.health,
				foodStored        : person.foodStored,
				appetite          : person.appetite,
				appetiteFulfilled : person.appetiteFulfilled,
				survivalRate      : person.survivalRate,
				growth            : person.growth,
				hoursWorked       : person.hoursWorked,
				foodProduced      : person.foodProduced,
				skills            : new Skills(person.skills).data(),
				profession        : new Profession(person.profession).data()
			}
		})
	}
}
