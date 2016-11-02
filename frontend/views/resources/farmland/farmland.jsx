import SeasonModifiers  from '../../season/seasonModifiers';
import WeatherModifiers from '../../weather/weatherModifiers';
import Col              from 'react-bootstrap/lib/Col';

export default class Farmland extends React.Component {
	render() {
		return (
			<div>
				<h2>Farmland</h2>
				<Col xs={6}>
					<SeasonModifiers
						current        = { this.props.season }
						modifiers      = { this.props.seasonModifiers} />
					<WeatherModifiers
						current        = { this.props.weather }
						modifiers      = { this.props.weatherModifiers } />
				</Col>
				<Col xs={6}>
					
				</Col>
			</div>
		);
	}
}
