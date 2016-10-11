import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.activeKey    = this.activeKey.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	activeKey() {
		let route = this.props.currentRouteRoot;

		if (route == '')                               { return 1; }
		if (route == 'people' || route == 'family')    { return 2; }
		if (route == 'resources')                      { return 3; }
	}
	handleSelect(eventKey) {
		if (eventKey == 1) { this.props.router.push('/');       }
		if (eventKey == 2) { this.props.router.push('/people'); }
		if (eventKey == 3) { this.props.router.push('/resources'); }
		if (eventKey == 4) { this.props.router.push('/'); }
	}
	render() {
		return (
			<Nav style={styles.base} bsStyle="tabs" activeKey={this.activeKey()} onSelect={this.handleSelect}>
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
		width: '600px',
		margin: '0 auto',
		marginTop: '14px'
	}
};

module.exports = Radium(Navigation);

