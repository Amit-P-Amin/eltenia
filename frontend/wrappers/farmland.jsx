import BaseWrapper  from './base-wrapper';
import Farmland     from '../views/farmland/farmland.jsx';
import readFarmland from '../../backend/data_access_layer/read/farmland';

export default class FarmlandWrapper extends BaseWrapper {
	constructor(props) {
		super(props);

		this.read   = readFarmland;
		this.id     = uuid.v4();
		this.model  = game.farmland;
		this.view   = Farmland;

		this.state  = this.parameters();
	}
}
