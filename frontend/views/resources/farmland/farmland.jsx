import SeasonModifiers from '../../season/seasonModifiers'
import Col             from 'react-bootstrap/lib/Col';

export default class Farmland extends React.Component {
	render() {
		return (
			<div>
				<h2>Farmland</h2>
				<Col xs={6}>
					<SeasonModifiers
						current        = { this.props.season }
						summerModifier = { this.props.seasonModifiers['Summer'] }
						fallModifier   = { this.props.seasonModifiers['Fall'] }
						winterModifier = { this.props.seasonModifiers['Winter'] }
						springModifier = { this.props.seasonModifiers['Spring'] } />
				</Col>
			</div>
		);
	}
}


