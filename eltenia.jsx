require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
// Must be at the top, to set the helpers and BaseComponents globals
import helpers                              from './backend/helpers/helpers';
import BaseComponents                       from './frontend/base-components/base-components';
//
import Game                                 from './backend/models/game.js';
import routes                               from './frontend/routes';
import { shared }                           from './shared/shared.js';
import { Router, hashHistory }              from 'react-router'
import { render }                           from 'react-dom'
import { config }                           from './backend/config/config';
import Save                                 from './backend/store/save/save';
import Load                                 from './backend/store/load/load';
import { startingData }   									from './backend/store/starting/starting-data';
import { withRouter }                       from 'react-router';
import Header                               from './frontend/views/header/header';
import Navigation                           from './frontend/views/navigation/navigation';

let store = require('store');

let gameData = {};

// window.helpers        = require('./backend/helpers/helpers');

if (Load.isSavePresent()) {
	gameData = new Load().saveData();
} else {
	gameData = startingData;
}

let game = new Game(gameData);

// for Dev
window.game = game;
window.shared = shared;
window.config = config;
window.store  = store;
// window.AES    = CryptoJS.AES;
// window.Utf8   = CryptoJS.enc.Utf8;
//

class Eltenia extends React.Component {
	constructor(props) {
		super(props);
		this.state  = { game: game };
		this.save   = this.save.bind(this);
		this.load   = this.load.bind(this);
		this.reset  = this.reset.bind(this);
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
	reset() {
		this.setState({ game: {} });
		store.clear();
		setTimeout(() => {
			this.props.router.push('/');
			window.game = new Game(startingData);
			this.setState({ game: window.game });
		}, 1000);
	}
	render() {
		return (
			<div style={styles.base}>
				<Header saveHandler={this.save} loadHandler={this.load} resetHandler={this.reset}/>
				<Navigation router={this.props.router}/>
				<div style={styles.body}>
					<Col xs={1}/>
					<Col xs={10}>{this.props.children}</Col>
					<Col x2={1}/>
				</div>
			</div>
		);
	}
}

var styles = {
	base: {
		fontFamily : 'Raleway, sans-serif'
	},
	body: {
		width      : '900px',
		margin     : '0 auto'
	}
};

render((
	<Router history={hashHistory}>
		{ routes(withRouter(Radium(Eltenia))) }
	</Router>
), document.querySelector("#app"));
