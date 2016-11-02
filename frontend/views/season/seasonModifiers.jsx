class SeasonModifiers extends React.Component {
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
				<BaseComponents.SmallHeader>Season Modifier</BaseComponents.SmallHeader>
				<table style={[styles.table]}>
					<tbody>
						<tr>
							<td style={[styles.td, styles.left, this.selected('Summer')]}>  <span>Summer - {this.props.modifiers['Summer']}</span></td>
							<td style={[styles.td, styles.center, this.selected('Fall')]}>  <span>Fall   - {this.props.modifiers['Fall']}  </span></td>
							<td style={[styles.td, styles.center, this.selected('Winter')]}><span>Winter - {this.props.modifiers['Winter']}</span></td>
							<td style={[styles.td, styles.right, this.selected('Spring')]}> <span>Spring - {this.props.modifiers['Spring']}</span></td>
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
		width      : '25%'
	},
	selected: {
		color      : 'black',
		fontWeight : 'bold',
		fontSize   : '14px'
	},
	left: {
		'textAlign': 'left'
	},
	center: {
		'textAlign': 'center'
	},
	right: {
		'textAlign': 'right'
	}
};

module.exports = Radium(SeasonModifiers);




