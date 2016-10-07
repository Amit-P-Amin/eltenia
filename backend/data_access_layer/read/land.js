import BaseReader from './base-reader';

export default class Land extends BaseReader {
	getParameters() {
		return {
			size : this.object.size,
			used : this.object.used
		}
	}
}
