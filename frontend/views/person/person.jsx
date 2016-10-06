import Table from 'react-bootstrap/lib/Table';

export default class Person extends React.Component {
	render() {
		return (
			<Table striped bordered condensed hover>
				<tbody>
					<tr>
						<td>{ this.props.name }</td>
						<td>{ this.props.age }</td>
						<td>{ this.props.profession.name } </td>
						<td>{ this.props.growthPotential } </td>
						<td>{ this.props.health } </td>
						<td>{ this.props.intelligence } </td>
						<td>{ this.props.conscientiousness }</td>
						<td>{ this.props.strength }</td>
						<td>{ this.props.survivalRate }</td>
						<td><Router.Link to={`/family/${this.props.familyID}`}>{ this.props.familyName }</Router.Link></td>
					</tr>
				</tbody>
			</Table>
		);
	}
}
