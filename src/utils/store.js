import Events from 'events';

class Store extends Events.EventEmitter {

  constructor(Dispatcher, data) {
    super();

    this.data = data;

    this.dispatchToken = Dispatcher.register(this.dispatcherCallback);
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

  dispatcherCallback = (action) => {
    if (this[action.actionType]) {
      this[action.actionType].call(this, action)
      this.emit('change', this.key);
    }
  }
}

export default Store
