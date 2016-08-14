import PeopleRow from './people-row';
import Table     from 'react-bootstrap/lib/Table';

export default class PeopleView extends React.Component {
	constructor(props) {
		super(props);
		this.peopleRows = this.peopleRows.bind(this);
	}
	peopleRows() {
		return _.map(this.props.people, (person) => {
			return <PeopleRow {..._.pick(person, ["key", "name", "age", "strength", "farmingSkill", "id"])}/>
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
						<th>Farming Skill</th>
					</tr>
				</thead>
				<tbody>{this.peopleRows()}</tbody>
			</Table>
		);
	}
}

PeopleView.propTypes = {
	people: React.PropTypes.array
};

