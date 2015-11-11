var Store = (ComposedStore) => class Store extends ComposedStore {

  constructor(...args) {
    super(...args);

    if (!this.emit) {
      console.warn("You need to extend your store class from EventEmitter (https://www.npmjs.com/package/events).");
    }

    if (!this.data) {
      console.warn("You need to define data for the store. Define a data property in your store's constructor.");
    }

    if (!this.dispatcher) {
      console.warn("You need to define the dispatcher for the store. Define a dispatcher property in your store's constructor.");
    }

    this.dispatchToken = this.dispatcher.register(this.dispatcherCallback);
  }

  addChangeListener = (callback, key) => {
    this.key = key;
    this.on('change', callback);
  };

  removeChangeListener = (callback) => {
    this.removeListener('change', callback);
  };

  getState = () => {
    return this.data;
  };

  undo = () => {
    if (this.history.length) {
      this.data = this.history.pop();
      this.emit('change', this.key);
    }
  }

  reset = () => {
    if (this.history.length) {
      this.data = this.history[0];
      this.history = [];
      this.emit('change', this.key);
    }
  }

  dispatcherCallback = (action) => {
    if (this[action.actionType]) {
      if (this.history) { this.history.push(this.data); }
      this.data = this[action.actionType].call(this, this.data, action);
      this.emit('change', this.key);
    }
  }
}

export default Store;
