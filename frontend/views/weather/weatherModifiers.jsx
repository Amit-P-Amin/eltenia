class WeatherModifiers extends React.Component {
	constructor(props) {
		super(props);
		this.selected  = this.selected.bind(this);
	}
	selected(weather) {
		return this.props.current == weather ? styles.selected : {}
	}
	render() {
		return (
			<div>
				<BaseComponents.SmallHeader>Weather Modifier</BaseComponents.SmallHeader>
				<table style={[styles.table]}>
					<tbody>
						<tr>
							<td style={[styles.td, styles.three, this.selected('Amazing')]}>  <span>Amazing  - {this.props.modifiers['Amazing']} </span></td>
							<td style={[styles.td, styles.three, this.selected('Great')]}>    <span>Great    - {this.props.modifiers['Great']}   </span></td>
							<td style={[styles.td, styles.three, this.selected('Normal')]}>   <span>Normal   - {this.props.modifiers['Normal']}  </span></td>
						</tr>
						<tr>
							<td style={[styles.td, styles.three, this.selected('Poor')]}>     <span>Poor     - {this.props.modifiers['Poor']}     </span></td>
							<td style={[styles.td, styles.three, this.selected('Terrible')]}> <span>Terrible - {this.props.modifiers['Terrible']} </span></td>
							<td style={[styles.td, styles.three, this.selected('Drought')]}>  <span>Drought  - {this.props.modifiers['Drought']}  </span></td>
						</tr>
						<tr>
							<td colSpan="3">
								<table style={[styles.table]}>
									<tbody>
									<tr>
										<td style={[styles.td, styles.two, this.selected('Locust Swarms')]}><span>Locust Swarms - {this.props.modifiers['Locust Swarms']}  </span></td>
										<td style={[styles.td, styles.two, this.selected('Deep Freeze')]}>   <span>Deep Freeze   - {this.props.modifiers['Deep Freeze']}  </span></td>
									</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

var styles = {
	table: {
		width: '100%'
	},
	td: {
		color      : '#D3D3D3',
		fontWeight : 'thin',
		fontSize   : '12px',
		width      : '33%',
		textAlign  : 'left',
		height     : '25px'
	},
	selected: {
		color      : 'black',
		fontWeight : 'bold',
		fontSize   : '14px'
	},
	three: {
		width: '33%'
	},
	two: {
		width: '50%'
	}
};

module.exports = Radium(WeatherModifiers);




