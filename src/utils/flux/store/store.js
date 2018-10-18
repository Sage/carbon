import { EventEmitter } from 'events';
import { Dispatcher } from '..';
import reducerRegistry from './../reducer-registry';

/**
 * A constant used for the change event within this module.
 *
 * @property CHANGE_EVENT
 * @type String
 * @final
 */
const CHANGE_EVENT = 'change';

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
 *   import Store from 'carbon-react/lib/utils/flux/store';
 *
 * You can then use the imported store to extend your defined store class:
 *
 *   class MyStore extends Store {
 *   }
 *
 *   // get the initial data for your store
 *   let data = ImmutableHelper.parse({});
 *
 *   // You should initialize your store with a name and its data.
 *   //
 *   // optional - By enabling history in the opts, the store will collect
 *   // any data interaction. You should only set this if you intend to
 *   // use the data collected.
 *   // optional - You can pass in a custom dispatcher in the opts.
 *   export default new MyStore("myStore", data, { history: true });
 *
 * Please note, you should initialize your store with a name and initial data.
 * You can also pass a third param of additional options which allows you to
 * enable history or supply a custom dispatcher for your store.
 *
 * @class Store
 * @param {String} name
 * @param {Object} data
 * @param {Object} opts
 * @constructor
 * @extends EventEmitter
 */


export default class Store extends EventEmitter {
  constructor(name, data, opts = {}) {
    super(name, data, opts);

    const suffix = `Check the initialization of ${this.constructor.name}.`;

    // tell the developer if they have not defined the name property.
    if (!name) {
      throw new Error(`You need to initialize your store with a name. ${suffix}`);
    }

    // tell the developer if they have not defined the data property.
    if (!data) {
      throw new Error(`You need to initialize your store with data. ${suffix}`);
    }

    this.name = name;

    /**
     * Set the data for the store - this should be an immutable object.
     *
     * @property data
     * @type {Object}
     */
    this.data = data;

    this.reducer = (state, action) => {
      if (this[action.type]) {
        this.data = state;
        this[action.type](action);
      }
      return this.data;
    }

    reducerRegistry.register(name, this.reducer)
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
   * Reverts the data to the initial data set in the history.
   *
   * @method reset
   * @return {void}
   */
  reset = () => {
  }
}
