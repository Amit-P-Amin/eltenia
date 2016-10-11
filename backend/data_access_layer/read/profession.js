import BaseReader from './base-reader'

export default class Profession extends BaseReader {
	getParameters() {
		return {
			name:    helpers.capitalize(this.object.constructor.professionName()),
			skills:  this.object.constructor.professionSkills(),
		}
	}
}
