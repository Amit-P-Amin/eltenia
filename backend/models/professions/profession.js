export default class Profession {
	constructor(person) {
		this.person = person;
	}
	run() {
		this._produceGoods();
		this._updateSkills();
	}
	_family() {
		return this.person.family;
	}
	_skills() {
		return this.person.skills;
	}
}
