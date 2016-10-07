import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeKey: 1 };
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleSelect(eventKey) {
		this.setState({activeKey: eventKey});
		if (eventKey == 1) { this.props.router.push('/');       }
		if (eventKey == 2) { this.props.router.push('/people'); }
		if (eventKey == 3) { this.props.router.push('/resources'); }
		if (eventKey == 4) { this.props.router.push('/'); }
	}
	render() {
		return (
			<Nav style={styles.base} bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
				<NavItem eventKey={1}>Main</NavItem>
				<NavItem eventKey={2}>People</NavItem>
				<NavItem eventKey={3}>Natural Resources</NavItem>
				<NavItem eventKey={4}>Marketplace</NavItem>
			</Nav>
		)
	}
}

var styles = {
	base: {
		width: '400px',
		margin: '0 auto'
	},
	menu: {
		marginRight: '25px',
		cursor: 'pointer',
		":hover": {
			color: '#000000'
		}
	}
};

module.exports = Radium(Navigation);

