export default class Profession {
	constructor(profession) {
		this.profession = profession;
	}
	data() {
		return {
			name: this.profession.name()
		}
	}
}
