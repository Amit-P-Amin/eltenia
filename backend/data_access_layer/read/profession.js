import BaseReader from './base-reader'
import { helpers } from '../../helpers/helpers';

export default class Profession extends BaseReader {
	readModel() {
		return {
			name:    helpers.capitalize(this.model.constructor.professionName()),
			skills:  this.model.constructor.professionSkills(),
		}
	}
}
