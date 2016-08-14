import { Link } from 'react-router'

export default class PeopleRow extends React.Component {
	render() {
		return (
			<tr>
				<td><Link to={`/person/${this.props.id}`}>{ this.props.name }</Link></td>
				<td>{ this.props.age          }</td>
				<td>{ this.props.strength     }</td>
				<td>{ this.props.farmingSkill }</td>
			</tr>
		);
	}
}

PeopleRow.propTypes = {
	age:          React.PropTypes.number.isRequired,
	farmingSkill: React.PropTypes.number.isRequired,
	id:           React.PropTypes.string.isRequired,
	name:         React.PropTypes.string.isRequired,
	strength:     React.PropTypes.number.isRequired
};

