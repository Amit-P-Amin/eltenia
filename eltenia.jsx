require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
import Game         from './backend/models/game.js';
import People       from './frontend/views/people/people.jsx';
import readPerson   from './backend/data_access_layer/read/person';
import PersonWrapper from './frontend/wrappers/person';
import FarmlandWrapper from './frontend/wrappers/farmland';

let game = new Game ();

import { shared }  from './shared/shared.js';
import { Router, Link, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'

// for Dev
window.game = game;
window.shared = shared;
//

export class Eltenia extends React.Component {
	constructor(props) {
		super(props);
		this.state  = { game: game };
		this.people = this.people.bind(this);

		setInterval(() => {
			this.setState({ people: this.people() });
		}, shared.constants.TICK);
	}
	people() {
		return _.map(this.state.game.people, (person, id) => {
			let parameters = readPerson(person);
			parameters.key = id;
			parameters.id  = id;

			return parameters
		})
	}
	render() {
		return (
			<div>
				<h1>{ "sex" }</h1>
				<Link to={`/resource/farmland`}>Farmland</Link>
				<People people={this.state.people}/>
				{this.props.children}
			</div>
		);
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
), document.querySelector("#app"));



