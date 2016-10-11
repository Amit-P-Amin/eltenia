export default class Families {
	constructor(families) {
		this.families = families;
	}
	data() {
		return _.map(this.families, (family) => {
			return {
				id          : family.id,
				name        : family.name,
				husbandID   : family.husbandID,
				wifeID      : family.wifeID,
				childrenIDs : family.childrenIDs,
				food        : family.food
			}
		})
	}
}
