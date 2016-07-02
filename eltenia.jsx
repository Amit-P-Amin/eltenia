require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
// import ReactDOM   from 'react-dom';
import { render } from 'react-dom'
import Game       from './game.js';
import PeopleView from './views/people/people-view.jsx';
import PersonView from './views/people/person-view.jsx';
import { Router, Route, hashHistory } from 'react-router'
import { DISPLAYABLE_ATTRIBUTES } from './shared/displayable-attributes'

let game = new Game ();

export class Eltenia extends React.Component {
	constructor(props) {
		super(props);
		this.state  = { game: game };
		this.people = this.people.bind(this);

		setInterval(function() {
			this.setState({people: this.people()});
		}.bind(this), 1000);
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
				<PeopleView people={this.state.people}/>
				{this.props.children}
			</div>
		);
	}
}

class PersonWrapper extends React.Component {
	render() {
		let id                    = this.props.routeParams.id;
		let person                = game.people[id];
		let displayableAttributes = _.pick(person, DISPLAYABLE_ATTRIBUTES.person);

		return <PersonView { ...displayableAttributes } id = { id } />
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={Eltenia}>
			<Route path="/person/:id" component={PersonWrapper}/>
		</Route>
		<Route path="*" component={Eltenia}/>
	</Router>
), document.querySelector("#app"))



