import capitalize      from './capitalize';
import isNumeric       from './is-numeric';
import isUndefined     from './is-undefined';
import randomBoolean   from './random-boolean';
import randomInt       from './random-int';
import randomName      from './random-name';
import typecastString  from './typecast-string';
import weightedAverage from './weighted-average';

let helpers = {
	capitalize      : capitalize,
	isNumeric       : isNumeric,
	isUndefined     : isUndefined,
	randomBoolean   : randomBoolean,
	randomInt       : randomInt,
	randomName      : randomName,
	typecastString  : typecastString,
	weightedAverage : weightedAverage
};

window.helpers = helpers;
module.exports = helpers;
