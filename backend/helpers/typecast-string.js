export default function(string, toType) {
	if (toType == 'number') {
		return parseFloat(string);
	} else if (toType == 'boolean') {
		return JSON.parse(string);
	} else if (toType == 'string') {
		return string;
	} else {
		console.log('Unknown type detected');
		console.log("String: " + string);
		console.log("toType:" + toType);
	}
}
