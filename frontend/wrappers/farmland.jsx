import BaseWrapper    from './base-wrapper';
import Farmland       from '../views/farmland/farmland.jsx';
import FarmlandReader from '../../backend/data_access_layer/read/farmland';

export default class FarmlandWrapper extends BaseWrapper {
	constructor(props) {
		super(props);
		this.reader = new FarmlandReader(game.farmland);
		this.id     = uuid.v4();
		this.view   = Farmland;

		this.state  = this.parameters();
	}
}
