import BaseReader       from './base-reader'
import PersonReader     from './person'

export default class People extends BaseReader {
	getParameters() {
		return ({
			people: _.map(this.object, (person, id) => {
				let personData = new PersonReader(person).read();
				personData.key = id;
				personData.id = id;

				return personData;
			})}
		)
	}
}
