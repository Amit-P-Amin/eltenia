import BaseWrapper  from './base-wrapper';
import Family       from '../views/family/family.jsx';
import FamilyReader from '../../backend/data_access_layer/read/family';

export default class FamilyWrapper extends BaseWrapper {
	constructor(props) {
		super(props);
		this.id     = this.props.routeParams.id;
		this.reader = new FamilyReader(game.families[this.id]);
		this.view   = Family;

		this.state  = this.parameters();
	}
}
