import { weather } from './weather'
import { season } from './season'

let starting = {
	weather: weather,
	season: season
};

Object.freeze(starting);

export { starting }
