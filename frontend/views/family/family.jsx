import Table from 'react-bootstrap/lib/Table';

export default class Family extends React.Component {
	render() {
		return (
			<Table striped bordered condensed hover>
				<tbody>
					<tr>
						<td>{ this.props.name }</td>
						<td>{ this.props.husband.name }</td>
					</tr>
				</tbody>
			</Table>
		);
	}
}
