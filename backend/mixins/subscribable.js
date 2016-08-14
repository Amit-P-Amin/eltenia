let Subscribable = (superclass) => class extends superclass {
	subscribe(id, callback) {
		this.subscribers[id] = callback;
	}
	unsubscribe(id) {
		this.subscribers = _.omit(this.subscribers, [id])
	}
	_notifySubscribers() {
		_.mapValues(this.subscribers, (callback) => { callback() });
	}
}

export { Subscribable }
