export default class PeopleRow extends React.Component {
	render() {
		return (
			<tr>
				<td></td>
				<td>{ this.props.age             }</td>
				<td>{ this.props.strength        }</td>
				<td>{ this.props.profession.name }</td>
			</tr>
		);
	}
}
