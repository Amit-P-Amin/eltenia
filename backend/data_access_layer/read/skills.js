import BaseReader from './base-reader'

export default class Skills extends BaseReader {
	getParameters() {
		return {
			farming: this.object.farming
		}
	}
}
