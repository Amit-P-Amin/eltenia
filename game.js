import Person from './models/person.js';
let uuid = require('node-uuid');

export default class Game {
	constructor() {
		let people = {};
		_.times(5, () => { people[uuid.v4()] = new Person() });

		this.people = people;
		this.run();
	}
	run() {
		setInterval(() => { this.update(); }, 1000);
	}
	update() {
		_.mapValues(this.people, (person) => { person.update() });
	}
}

