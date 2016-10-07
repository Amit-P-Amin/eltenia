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
				<h3><u>Season Modifier</u></h3>
				<div style={styles.container}>
					<span style={[styles.base, this.selected('Summer')]}>Summer - {this.props.summerModifier}</span>
					<span style={[styles.base, this.selected('Fall')]}>  Fall   - {this.props.fallModifier}  </span>
					<span style={[styles.base, this.selected('Winter')]}>Winter - {this.props.winterModifier}</span>
					<span style={[styles.base, this.selected('Spring')]}>Spring - {this.props.springModifier}</span>
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
		width      : '15%',
		display    : 'block'
	},
	selected: {
		color      : 'black',
		fontWeight : 'bold',
		fontSize   : '16px',
		width      : '55%',
		display    : 'block'
	}
};

module.exports = Radium(Season);




