import BaseReader from './base-reader'

export default class Family extends BaseReader {
	static extractAttributes(object) {
		return {
			id   : object.id,
			name : object.name,
			age  : object.age
		}
	}
	getParameters() {
		return {
			id        : this.object.id,
			name      : this.object.name,
			husband   : Family.extractAttributes(this.object.husband()),
			wife      : Family.extractAttributes(this.object.wife()),
			children  : _.forEach(this.object.children(), (child) => { return Family.extractAttributes(child)} )
		}
	}
}
