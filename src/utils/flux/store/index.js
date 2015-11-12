import { EventEmitter } from 'events';

const CHANGE_EVENT = "change";

class Store extends EventEmitter {

  constructor(Dispatcher) {
    super(Dispatcher);

    if (!Dispatcher) {
      console.warn("You need to initialize your store with a dispatcher.");
    }

    this.dispatchToken = Dispatcher.register(this.dispatcherCallback);
  }

  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  };

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  };

  getState = () => {
    if (!this.data) { console.warn("You need to set the data property on your store."); }
    return this.data;
  };

  undo = () => {
    if (this.history.length) {
      this.data = this.history.pop();
      this.emit(CHANGE_EVENT, this.constructor.name);
    }
  }

  reset = () => {
    if (this.history.length) {
      this.data = this.history[0];
      this.history = [];
      this.emit(CHANGE_EVENT, this.constructor.name);
    }
  }

  dispatcherCallback = (action) => {
    if (this[action.actionType]) {
      if (this.history) { this.history.push(this.data); }
      this[action.actionType].call(this, action);
      this.emit(CHANGE_EVENT, this.constructor.name);
    }
  }

}

export default Store;
