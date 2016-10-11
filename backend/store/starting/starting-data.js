import { weather } from './weather';
import { season } from './season';
import { people } from './people';
import { farmland } from './farmland';
import { families} from './families';

let startingData = {
	weather: weather,
	season: season,
	people: people,
	farmland: farmland,
	families: families
};

Object.freeze(startingData);

export { startingData }
// module.exports = startingData;
