import BaseWrapper    from './base-wrapper';
import Resources       from '../views/resources/resources';
import ResourcesReader from '../../backend/data_access_layer/read/resources';

export default class ResourcesWrapper extends BaseWrapper {
	constructor(props) {
		super(props);
		this.id     = uuid.v4();
		this.reader = new ResourcesReader(game.resources);
		this.view   = Resources;

		this.state  = this.parameters();
	}
}
