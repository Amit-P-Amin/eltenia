import BaseReader from './base-reader'

export default class Family extends BaseReader {
	static extractAttributes(model) {
		return {
			id   : model.id,
			name : model.name,
			age  : model.age
		}
	}
	readModel() {
		return {
			id        : this.model.id,
			name      : this.model.name,
			husband   : Family.extractAttributes(this.model.husband()),
			wife      : Family.extractAttributes(this.model.wife()),
			children  : _.forEach(this.model.children(), (child) => { return Family.extractAttributes(child)} )
		}
	}
}
