import BaseReader       from './base-reader'
import SkillReader      from './skills'
import ProfessionReader from './profession'

export default class Person extends BaseReader {
	getParameters() {
		return {
			age:               this.object.age,
			appetite:          this.object.appetite,
			appetiteFulfilled: this.object.appetiteFulfilled,
			conscientiousness: this.object.conscientiousness,
			skills:            new SkillReader(this.object.skills).read(),
			profession:        new ProfessionReader(this.object.profession).read(),
			growthPotential:   this.object.growthPotential,
			health:            this.object.health,
			intelligence:      this.object.intelligence,
			name:              this.object.name,
			strength:          this.object.strength,
			survivalRate:      this.object.survivalRate,
			familyID:          this.object.family.id,
			familyName:        this.object.family.name
		}
	}
}
