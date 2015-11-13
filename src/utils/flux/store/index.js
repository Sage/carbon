import { EventEmitter } from 'events';

/**
 * A constant used for the change event within this module.
 *
 * @property CHANGE_EVENT
 * @type String
 * @final
 */
const CHANGE_EVENT = "change";

/**
 * A base class that can be used to extend a store with boilerplate to work with
 * a flux based architecture.
 *
 * It provides the following:
 *
 * * A method to return data from the store.
 * * A method to determine if the store should react to an action from the dispatcher.
 * * Methods to setup or remove change listeners with a specified callback.
 * * Methods to handle interaction with data history (eg. undo, redo and reset).
 *
 * You can import this class with the following:
 *
 *   import Store from 'carbon/lib/utils/flux/store';
 *
 * You can then use the imported store to extend your defined store class:
 *
 *   class MyStore extends Store {
 *     constructor(Dispatcher) {
 *       super(Dispatcher);
 *
 *       // required - Define the store's initial data.
 *       this.data = ImmutableHelper.parse({});
 *
 *       // optional - By defining the history property, the store will collect
 *       // any data interaction. You should only define this if you intend to
 *       // use the data collected.
 *       this.history = [];
 *     }
 *   }
 *
 *   // You should initialize your store with your application's dispatcher before
 *   // exporting it.
 *   export default new MyStore(Dispatcher);
 *
 * Please note, you should initialize your store with your application's dispatcher.
 * It is also required that you define your store's initial data by defining the
 * data property in the store's constructor.
 *
 * @class Store
 * @param {Object} Dispatcher
 * @constructor
 * @extends EventEmitter
 */
export default class Store extends EventEmitter {

  constructor(Dispatcher) {
    super(Dispatcher);

    // it is required to initialize the store with the dispatcher so we can register
    // the store with it and store the dispatchToken
    if (!Dispatcher) {
      console.warn("You need to initialize your store with a dispatcher.");
    }

    /**
     * Store the dispatchToken after registering with the dispatcher, this will
     * allow us to use the waitFor API provided by flux
     * https://facebook.github.io/flux/docs/dispatcher.html#api
     *
     * @property dispatchToken
     * @type {String}
     */
    this.dispatchToken = Dispatcher.register(this.dispatcherCallback);
  }

  /**
   * Adds a listener to the store, which calls a provided callback on change.
   *
   * @method addChangeListener
   * @param {Function} callback The function that is called in the view component.
   */
  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * Removes a listener to the store.
   *
   * @method addChangeListener
   * @param {Function} callback The function that is called in the view component.
   */
  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * Returns the current data from the store.
   *
   * @method getState
   */
  getState = () => {
    // warn the developer if they have not defined the data property.
    if (!this.data) { console.warn("You need to set the data property on your store."); }
    return this.data;
  }

  /**
   * Determine if this store can handle the given action, and calls it if it can.
   *
   * @method dispatcherCallback
   * @param {Object} action The action dispatched from the dispatcher
   */
  dispatcherCallback = (action) => {
    // We determine if the store has the actionType available as a function.
    // In traditional flux this normally uses a switch/case statement.
    if (this[action.actionType]) {
      // if history is enabled, store it at this point
      if (this.history) { this.history.push(this.data); }
      // call the function on the store with the action
      this[action.actionType].call(this, action);
      // tell the store a change has occurred
      this._triggerChange();
    }
  }

  /**
   * Reverts the data to the previous data set in the history array.
   *
   * @method undo
   */
  undo = () => {
    if (this.history.length) {
      // pop the last entry in history and set it as the current data
      this.data = this.history.pop();
      // tell the store a change has occurred
      this._triggerChange();
    }
  }

  /**
   * Reverts the data to the initial data set in the history.
   *
   * @method reset
   */
  reset = () => {
    if (this.history.length) {
      // set the data to the initial state stored in the history array
      this.data = this.history[0];
      // reset the history array
      this.history = [];
      // tell the store a change has occurred
      this._triggerChange();
    }
  }

  /**
   * Emit the change event that the store is listening to so it can trigger
   * the callback provided from the view component.
   *
   * @method _triggerChange
   */
  _triggerChange() {
    // we use the constructor name so the view component knows which store updated
    this.emit(CHANGE_EVENT, this.constructor.name);
  }

}
