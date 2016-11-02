import BaseReader from './base-reader'
import LandReader from './land'

export default class Lands extends BaseReader {
	getParameters() {
		return ({
				amazing  : new LandReader(this.object['Amazing']).read(),
				great    : new LandReader(this.object['Great']).read(),
				normal   : new LandReader(this.object['Normal']).read(),
				poor     : new LandReader(this.object['Poor']).read(),
				terrible : new LandReader(this.object['Terrible']).read(),
			}
		)
	}
}
