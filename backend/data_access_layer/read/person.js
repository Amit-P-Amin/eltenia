import BaseReader from './base-reader'

export default class Person extends BaseReader {
	readModel() {
		return {
			age:               this.model.age,
			appetite:          this.model.appetite,
			appetiteFulfilled: this.model.appetiteFulfilled,
			conscientiousness: this.model.conscientiousness,
			farmingSkill:      this.model.farmingSkill,
			foodProduced:      this.model.foodProduced,
			foodStored:        this.model.foodStored,
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
