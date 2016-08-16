export default class BaseWrapper extends React.Component {
	componentWillMount() {
		game.subscribe(this.id, this.update.bind(this));
	}
	componentWillUnmount() {
		game.unsubscribe(this.id);
	}
	parameters() {
		return { parameters: this.read(this.model) };
	}
	update() {
		this.setState(this.parameters());
	}
	render() {
		let View = this.view;
		return <View { ...this.state.parameters } id = { this.id }/>
	}
}
