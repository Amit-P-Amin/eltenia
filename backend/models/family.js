export default class Family {
	constructor(params, people) {
		this.id          = params.id;
		this.husbandID   = params.husbandID;
		this.wifeID      = params.wifeID;
		this.childrenIDs = params.childrenIDs;
		this.name        = params.name;
		this.food        = params.food;
		this.people      = people;
		this.directory   = this._buildDirectory();
		this._updateFamilyReference();
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
	statusOf(familyMember) {
		return this.directory[familyMember.id];
	}
	_buildDirectory () {
		let directory = {};

		directory[this.husbandID] = 'husband';
		directory[this.wifeID]    = 'wife';
		_.forEach(this.childrenIDs, (childID) => {
			directory[childID] = 'child';
		});

		return directory;
	}
	_updateFamilyReference() {
		_.forEach(this.directory, (status, id) => {
			this.people[id].family = this;
		});
	}
	// rebuildDirectory() {
	// 	this.directory = this._buildDirectory();
	// }
}
