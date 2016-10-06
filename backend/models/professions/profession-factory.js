import Farmer from './farmer';

export default class ProfessionFactory {
	static build(person, resources, params) {
		let Klass = ProfessionFactory.getKlass(params.name);

		return new Klass(person, resources, params);
	}
	static getKlass(name) {
		return ProfessionFactory.professions()[name];
	}
	static professions() {
		let professions = {};

		professions[Farmer.professionName()] = Farmer;

		return professions;
	}
}
