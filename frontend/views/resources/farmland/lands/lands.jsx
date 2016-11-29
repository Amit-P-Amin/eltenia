import LandRow from './land-row';
import Table   from 'react-bootstrap/lib/Table';

export default class Lands extends React.Component {
	constructor(props) {
		super(props);
		this.landRows = this.landRows.bind(this);
	}
	landRows() {
		return _.forEach(this.props.lands, (landData, landType) => {
			return <LandRow
				quality = {landType}
				{...landData}
			/>
		})
	}
	render() {
		return (
			<Table>
				<thead>
				<tr>
					<th>Quality</th>
					<th>Modifier</th>
					<th>Used</th>
					<th>Unused</th>
					<th>Set Aside</th>
					<th>Total</th>
					<th>% Fallow</th>
					<th>Change</th>
				</tr>
				</thead>
				<tbody>{this.landRows()}</tbody>
			</Table>
		);
	}
}

