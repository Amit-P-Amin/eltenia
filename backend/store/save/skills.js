export default class Skills {
	constructor(skills) {
		this.skills = skills;
	}
	data() {
		return {
			farming: this.skills.farming
		}
	}
}
