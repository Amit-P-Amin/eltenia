require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
import { render } from 'react-dom'
import Game       from './backend/models/game.js';
import PeopleView from 'frontend/views/people/people-view.jsx';
import PersonView from 'frontend/views/people/person-view.jsx';
import FarmlandView from 'frontend/views/farmland/farmland-view.jsx';
import { Router, Route, hashHistory } from 'react-router'
import { DISPLAYABLE_ATTRIBUTES } from './shared/displayable-attributes'
import { TICK }  from './shared/constants.js';
import { Link } from 'react-router'

let game = new Game ();
let uuid = require('node-uuid');

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
		this.id       = uuid.v4();
		this.farmland = game.farmland;
		this.state    = this.displayableAttributes();

		game.subscribe(this.id, this.update.bind(this));
	}
	componentWillUnmount() {
		game.unsubscribe(this.id);
	}
	displayableAttributes() {
		return { displayableAttributes: _.pick(this.farmland, DISPLAYABLE_ATTRIBUTES.farmland) };
	}
	update() {
		this.setState(this.displayableAttributes());
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



