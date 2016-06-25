require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import Button from 'react-bootstrap/lib/Button';
import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
	render() {
		return (
			<div>
				<Button>Simple React + Babel + Bootstrap + Webpack</Button>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
