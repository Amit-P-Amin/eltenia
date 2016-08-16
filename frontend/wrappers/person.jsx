import BaseWrapper  from './base-wrapper';
import Person       from '../views/person/person.jsx';
import readPerson   from '../../backend/data_access_layer/read/person';

export default class PersonWrapper extends BaseWrapper {
	constructor(props) {
		super(props);
		
		this.read   = readPerson;
		this.id     = this.props.routeParams.id;
		this.model  = game.people[this.id];
		this.view   = Person;

		this.state  = this.parameters();
	}
}
