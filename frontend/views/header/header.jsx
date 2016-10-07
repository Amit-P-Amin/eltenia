class Header extends React.Component {
	render() {
		return (
			<div style={styles.base}>
				<Col xs={8}>
					<strong style={styles.title}>Eltenia</strong>
				</Col>
				<Col xs={4}>
					<span key={"save"}  style={styles.menu} onClick={this.props.saveHandler}><strong>Save</strong></span>
					<span key={"load"}  style={styles.menu} onClick={this.props.loadHandler}><strong>Load</strong></span>
					<span key={"reset"} style={styles.menu} onClick={this.props.resetHandler}><strong>Reset</strong></span>
				</Col>
			</div>
		)
	}
}

var styles = {
	base: {
		background: '#c28ad0',
		border: 0,
		color: 'white',
		height: '40px',
    lineHeight: '40px',
    verticalAlign: 'middle'
	},
	title: {
		fontSize: '17px'
	},
	menu: {
		marginRight: '25px',
		float: 'right',
		cursor: 'pointer',
		":hover": {
			color: '#000000'
		}
	}
};

module.exports = Radium(Header);

