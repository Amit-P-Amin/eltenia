import Table from 'react-bootstrap/lib/Table';

export default class Farmland extends React.Component {
	render() {
		return (
			<Table striped bordered condensed hover>
				<thead>
				<tr>
					<th>Weather</th>
					<th>Weather Modifier</th>
					<th>Total Land</th>
					<th>Amazing Quality</th>
					<th>Great Quality</th>
					<th>Normal Quality</th>
					<th>Poor Quality</th>
					<th>Terrible Quality</th>
					<th>Season</th>
					<th>Season Modifier</th>
				</tr>
				</thead>
				<tbody>
					<tr>
						<td>{this.props.weatherDescription}</td>
						<td>{this.props.weatherModifier}</td>
						<td>{this.props.amazingQuality + this.props.greatQuality + this.props.normalQuality + this.props.poorQuality + this.props.terribleQuality }</td>
						<td>{this.props.amazingQuality}</td>
						<td>{this.props.greatQuality}</td>
						<td>{this.props.normalQuality}</td>
						<td>{this.props.poorQuality}</td>
						<td>{this.props.terribleQuality}</td>
						<td>{this.props.season}</td>
						<td>{this.props.seasonModifier}</td>
					</tr>
				</tbody>
			</Table>
		);
	}
}
