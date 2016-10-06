import BaseReader from './base-reader'

export default class Skills extends BaseReader {
	readModel() {
		return {
			farming: this.model.farming
		}
	}
}
