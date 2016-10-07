import BaseReader from './base-reader'
import { helpers } from '../../helpers/helpers';

export default class Profession extends BaseReader {
	getParameters() {
		return {
			name:    helpers.capitalize(this.object.constructor.professionName()),
			skills:  this.object.constructor.professionSkills(),
		}
	}
}
