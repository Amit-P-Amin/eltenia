export default class Family {
	constructor(params, people) {
		this.id          = params.id;
		this.husbandID   = params.husbandID;
		this.wifeID      = params.wifeID;
		this.childrenIDs = params.childrenIDs;
		this.name        = params.name;
		this.people      = people;
		this.directory   = this.buildDirectory();
		this.updateFamilyReference();
	}
	buildDirectory () {
		let directory = {};

		directory[this.husbandID] = 'husband';
		directory[this.wifeID]    = 'wife';
		_.forEach(this.childrenIDs, (childID) => {
			directory[childID] = 'child';
		});

		return directory;
	}
	rebuildDirectory() {
		this.directory = this.buildDirectory();
	}
	statusOf(familyMember) {
		return this.directory[familyMember.id];
	}
	updateFamilyReference() {
		_.forEach(this.directory, (status, id) => {
			this.people[id].family = this;
		});
	}
	husband() {
		return this.people[this.husbandID];
	}
	wife() {
		return this.people[this.wifeID];
	}
	children() {
		return _.forEach(this.childrenIDs, (childID) => { return this.people[childID] })
	}
}
