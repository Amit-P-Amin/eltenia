import BaseReader       from './base-reader'
import SkillReader      from './skills'
import ProfessionReader from './profession'

export default class Person extends BaseReader {
	readModel() {
		return {
			age:               this.model.age,
			appetite:          this.model.appetite,
			appetiteFulfilled: this.model.appetiteFulfilled,
			conscientiousness: this.model.conscientiousness,
			skills:            new SkillReader(this.model.skills).read(),
			profession:        new ProfessionReader(this.model.profession).read(),
			// foodProduced:      this.model.foodProduced,
			// foodStored:        this.model.foodStored,
			growthPotential:   this.model.growthPotential,
			health:            this.model.health,
			intelligence:      this.model.intelligence,
			name:              this.model.name,
			strength:          this.model.strength,
			survivalRate:      this.model.survivalRate,
			familyID:          this.model.family.id,
			familyName:        this.model.family.name
		}
	}
}
