require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
import Game                                 from './backend/models/game.js';
import People                               from './frontend/views/people/people.jsx';
import PersonReader                         from './backend/data_access_layer/read/person';
import routes                               from './frontend/routes';
import { shared }                           from './shared/shared.js';
import { Router, Link, hashHistory }        from 'react-router'
import { render }                           from 'react-dom'
import { config }                           from './backend/config/config';
import Save                                 from './backend/store/save/save';
import Load                                 from './backend/store/load/load';
import { starting }													from './backend/store/starting/starting';
import { withRouter }                       from 'react-router';

// for store.js
global.localStorage = require('localStorage');
//

let data = {};

if (Load.isSavePresent()) {
	data = new Load().saveData();
} else {
	data = starting;
}

let game = new Game(data);
// for Dev
window.game = game;
window.shared = shared;
window.config = config;
//

export class Eltenia extends React.Component {
	constructor(props) {
		super(props);
		this.state  = { game: game };
		this.people = this.people.bind(this);
		this.save   = this.save.bind(this);
		this.load   = this.load.bind(this);

		setInterval(() => {
			this.setState({ people: this.people() });
		}, shared.constants.TICK);
	}
	people() {
		return _.map(this.state.game.people, (person, id) => {
			let parameters = new PersonReader(person).read();
			parameters.key = id;
			parameters.id  = id;

			return parameters
		})
	}
	save() {
		new Save(this.state.game).run();
	}
	load() {
		if (Load.isSavePresent()) {
			this.setState({ game: {} });
			setTimeout(() => {
				this.props.router.push('/');
				window.game = new Game(new Load().saveData());
				this.setState({ game: window.game });
			}, 1000);
		} else {
			alert("No save found");
		}
	}
	render() {
		return (
			<div>
				<h1>{ "Hello" }</h1>
				<Bootstrap.Button onClick={this.save}>Save</Bootstrap.Button>
				<Bootstrap.Button onClick={this.load}>Load</Bootstrap.Button>
				<Link to={`/resource/farmland`}>Farmland</Link>
				<People people={this.state.people}/>
				{this.props.children}
			</div>
		);
	}
}

render((
	<Router history={hashHistory}>
		{ routes(withRouter(Eltenia)) }
	</Router>
), document.querySelector("#app"));
