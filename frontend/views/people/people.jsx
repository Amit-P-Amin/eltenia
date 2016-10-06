import PeopleRow from './people-row';
import Table     from 'react-bootstrap/lib/Table';

export default class People extends React.Component {
	constructor(props) {
		super(props);
		this.peopleRows = this.peopleRows.bind(this);
	}
	peopleRows() {
		return _.map(this.props.people, (person) => {
			return <PeopleRow {..._.pick(person, ["key", "name", "age", "strength", "profession", "id"])}/>
		})
	}
	render() {
		return (
			<Table striped bordered condensed hover>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Age</th>
						<th>Strength</th>
						<th>Profession</th>
					</tr>
				</thead>
				<tbody>{this.peopleRows()}</tbody>
			</Table>
		);
	}
}

People.propTypes = {
	people: React.PropTypes.array
};

