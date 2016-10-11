class Season extends React.Component {
	constructor(props) {
		super(props);
		this.selected  = this.selected.bind(this);
	}
	selected(season) {
		return this.props.current == season ? styles.selected : {}
	}
	render() {
		return (
			<div>
				<BaseComponents.SmallHeader><u>Season Modifier</u></BaseComponents.SmallHeader>
				<div>
					<table>
						<tbody>
							<tr>
								<td style={[styles.base, this.selected('Summer')]}><span>Summer - {this.props.summerModifier}</span></td>
								<td style={[styles.base, this.selected('Fall')]}>  <span>Fall   - {this.props.fallModifier}  </span></td>
								<td style={[styles.base, this.selected('Winter')]}><span>Winter - {this.props.winterModifier}</span></td>
								<td style={[styles.base, this.selected('Spring')]}><span>Spring - {this.props.springModifier}</span></td>
								</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

var styles = {
	base: {
		color      : '#D3D3D3',
		fontWeight : 'thin',
		fontSize   : '10px',
		width      : '20%',
		textAlign  : 'center'
	},
	selected: {
		color      : 'black',
		fontWeight : 'bold',
		fontSize   : '16px',
		width      : '40%'
	}
};

module.exports = Radium(Season);




