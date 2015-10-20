import Events from 'events';

class Store extends Events.EventEmitter {

  constructor(Dispatcher, data) {
    super();

    this.history = [];

    this.data = data;

    this.dispatchToken = Dispatcher.register(this.dispatcherCallback);
  }

  addChangeListener = (callback) => {
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
      this.emit('change');
    }
  }

  reset = () => {
    if (this.history.length) {
      this.data = this.history[0];
      this.history = [];
      this.emit('change');
    }
  }

  dispatcherCallback = (action) => {
    if (this[action.actionType]) {
      this.history.push(this.data);
      this[action.actionType].call(this, action)
      this.emit('change');
    }
  }
}

export default Store
