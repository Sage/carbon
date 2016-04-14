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
 *   }
 *
 *   // get the initial data for your store
 *   let data = ImmutableHelper.parse({});
 *
 *   // You should initialize your store with a name, its data and your
 *   // application's dispatcher before exporting it.
 *   //
 *   // optional - By defining the history property, the store will collect
 *   // any data interaction. You should only set this if you intend to
 *   // use the data collected.
 *   export default new MyStore("myStore", data, Dispatcher, { history: true });
 *
 * Please note, you should initialize your store with a name, initial data, and
 * your application's dispatcher. You can also pass a fourth param of additional
 * options which allows you to enable history for your store.
 *
 * @class Store
 * @param {String} name
 * @param {Object} data
 * @param {Object} Dispatcher
 * @param {Object} opts
 * @constructor
 * @extends EventEmitter
 */
export default class Store extends EventEmitter {

  constructor(name, data, Dispatcher, opts = {}) {
    super(name, data, Dispatcher, opts);

    // tell the developer if they have not defined the name property.
    if (!name) {
      throw new Error(`You need to initialize your store with a name. Check the initialization of ${this.constructor.name}.`);
    }

    // tell the developer if they have not defined the data property.
    if (!data) {
      throw new Error(`You need to initialize your store with data. Check the initialization of ${this.constructor.name}.`);
    }

    // it is required to initialize the store with the dispatcher so we can register
    // the store with it and store the dispatchToken
    if (!Dispatcher) {
      throw new Error(`You need to initialize your store with your application's dispatcher. Check the initialization of ${this.constructor.name}.`);
    }

    /**
     * Set the name for the store - this will be used to identify your store.
     *
     * @property name
     * @type {String}
     */
    this.name = name;

    /**
     * Set the data for the store - this should be an immutable object.
     *
     * @property data
     * @type {Object}
     */
    this.data = data;

    /**
     * Store the dispatchToken after registering with the dispatcher, this will
     * allow us to use the waitFor API provided by flux
     * https://facebook.github.io/flux/docs/dispatcher.html#api
     *
     * @property dispatchToken
     * @type {String}
     */
    this.dispatchToken = Dispatcher.register(this.dispatcherCallback);

    /**
     * Array to store the history, set with the initial data.
     *
     * @property history
     * @type {Array}
     */
    this.history = [data];

    /**
     * Determines if the store should track data changes.
     *
     * @property trackHistory
     * @type {Boolean}
     */
    this.trackHistory = opts.history ? true : false;
  }

  /**
   * Adds a listener to the store, which calls a provided callback on change.
   *
   * @method addChangeListener
   * @param {Function} callback The function that is called in the view component.
   * @return {void}
   */
  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * Removes a listener to the store.
   *
   * @method addChangeListener
   * @param {Function} callback The function that is called in the view component.
   * @return {void}
   */
  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * Returns the current data from the store.
   *
   * @method getState
   * @return {Object} the current data
   */
  getState = () => {
    return this.data;
  }

  /**
   * Determine if this store can handle the given action, and calls it if it can.
   *
   * @method dispatcherCallback
   * @param {Object} action The action dispatched from the dispatcher
   * @return {void}
   */
  dispatcherCallback = (action) => {
    // We determine if the store has the actionType available as a function.
    // In traditional flux this normally uses a switch/case statement.
    if (this[action.actionType]) {
      // if history is enabled, store it at this point
      if (this.trackHistory) { this.history.push(this.data); }
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
   * @return {void}
   */
  undo = () => {
    if (this.history.length > 1) {
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
   * @return {void}
   */
  reset = () => {
    // set the data to the initial state stored in the history array
    this.data = this.history[0];
    // reset the history array
    this.history = [this.data];
    // tell the store a change has occurred
    this._triggerChange();
  }

  /**
   * Emit the change event that the store is listening to so it can trigger
   * the callback provided from the view component.
   *
   * @method _triggerChange
   * @return {void}
   */
  _triggerChange() {
    // we use the store name so the view component knows which store updated
    this.emit(CHANGE_EVENT, this.name);
  }

}
