import BaseWrapper  from './base-wrapper';
import People       from '../views/people/people';
import PeopleReader from '../../backend/data_access_layer/read/people';

export default class PersonWrapper extends BaseWrapper {
	constructor(props) {
		super(props);
		this.id     = uuid.v4();
		this.reader = new PeopleReader(game.people);
		this.view   = People;

		this.state  = this.parameters();
	}
}
