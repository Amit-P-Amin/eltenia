import BaseReader from './base-reader';
import FarmlandReader from './farmland';

export default class Resources extends BaseReader {
	getParameters() {
		return {
			farmland: new FarmlandReader(this.object.farmland).read()
		}
	}
}
