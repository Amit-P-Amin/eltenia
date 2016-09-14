import { weather } from './weather';
import { season } from './season';
import { people } from './people';
import { farmland } from './farmland';

let startingData = {
	weather: weather,
	season: season,
	people: people,
	farmland: farmland
};

Object.freeze(startingData);

export { startingData }
