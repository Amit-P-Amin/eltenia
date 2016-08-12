require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
// import ReactDOM   from 'react-dom';
import { render } from 'react-dom'
import Game       from './game.js';
import PeopleView from './views/people/people-view.jsx';
import PersonView from './views/people/person-view.jsx';
import FarmlandView from './views/farmland/farmland-view.jsx';
import { Router, Route, hashHistory } from 'react-router'
import { DISPLAYABLE_ATTRIBUTES } from './shared/displayable-attributes'
import { TICK }  from './shared/constants.js';
import { Link } from 'react-router'

let game = new Game ();

window.game = game; // for Dev

export class Eltenia extends React.Component {
	constructor(props) {
		super(props);
		this.state  = { game: game };
		this.people = this.people.bind(this);

		setInterval(() => {
			this.setState({ people: this.people() });
		}, TICK);
	}
	people() {
		return _.map(this.state.game.people, (person, id) => {
			let displayableAttributes = _.pick(person, DISPLAYABLE_ATTRIBUTES.person);
			displayableAttributes.key = id;
			displayableAttributes.id  = id;

			return displayableAttributes
		})
	}
	render() {
		return (
			<div>
				<h1>Yo!</h1>
				<Link to={`/resource/farmland`}>Farmland</Link>
				<PeopleView people={this.state.people}/>
				{this.props.children}
			</div>
		);
	}
}

class PersonWrapper extends React.Component {
	constructor(props) {
		super(props);
		let person = game.people[this.props.routeParams.id];
		let updater = setInterval(() => {
			this.setState({ displayableAttributes: _.pick(person, DISPLAYABLE_ATTRIBUTES.person) });
		}, TICK);

		this.state  = { displayableAttributes: _.pick(person, DISPLAYABLE_ATTRIBUTES.person),
										updater: updater};
	}
	componentWillUnmount() {
		clearInterval(this.state.updater);
	}
	render() {
		return <PersonView { ...this.state.displayableAttributes } id = { this.props.routeParams.id } />
	}
}

class FarmlandWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.farmland = game.farmland;
		this.gameKey  = game.subscribe(this);
		this.state    = { displayableAttributes: _.pick(this.farmland, DISPLAYABLE_ATTRIBUTES.farmland) }
	}
	componentWillUnmount() {
		game.unsubscribe(this.gameKey);
	}
	update() {
		this.setState({ displayableAttributes: _.pick(this.farmland, DISPLAYABLE_ATTRIBUTES.farmland) });
	}
	render() {
		return <FarmlandView { ...this.state.displayableAttributes } />
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={Eltenia}>
			<Route path="/person/:id" component={PersonWrapper}/>
			<Route path="/resource/farmland" component={FarmlandWrapper}/>
		</Route>
		<Route path="*" component={Eltenia}/>
	</Router>
), document.querySelector("#app"))



