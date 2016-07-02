export default class PersonView extends React.Component {
	render() {
		return (
			<div>
				<p>{ this.props.name }</p>
				<p>{ this.props.age }</p>
				<p>{ this.props.farmingSkill } </p>
				<p>{ this.props.foodProduced } </p>
				<p>{ this.props.foodStored } </p>
				<p>{ this.props.growthPotential } </p>
				<p>{ this.props.appetite } </p>
				<p>{ this.props.appetiteFulfilled } </p>
				<p>{ this.props.health } </p>
				<p>{ this.props.intelligence } </p>
				<p>{ this.props.conscientiousness }</p>
				<p>{ this.props.strength }</p>
				<p>{ this.props.survivalRate }</p>
			</div>
		);
	}
}
