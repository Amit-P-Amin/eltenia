import BaseWrapper  from './base-wrapper';
import Person       from '../views/person/person.jsx';
import PersonReader from '../../backend/data_access_layer/read/person';

export default class PersonWrapper extends BaseWrapper {
	constructor(props) {
		super(props);
		this.reader = new PersonReader(game.people[this.id]);
		this.id     = this.props.routeParams.id;
		this.view   = Person;

		this.state  = this.parameters();
	}
}
