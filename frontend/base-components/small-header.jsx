class SmallHeader extends React.Component {
	render() {
		return (
			<h3 style={styles.base}>{this.props.children}</h3>
		)
	}
}

var styles = {
	base: {
		color: '#98d08a'
	}
};

module.exports = Radium(SmallHeader);
