import Flux from 'flux';
import { assign } from 'lodash';
import Logger from '../logger';

export const Dispatcher = new Flux.Dispatcher();

/**
 * Connects a view component to one or more flux based stores.
 *
 * It handles the following:
 *
 * * Registering and de-registering the listeners between the component and the store(s).
 * * Making the data available to the component from the store.
 * * Updating the component with the new state when the store emits a change.
 *
 * You can import this function with the following:
 *
 *   import { connect } from 'carbon-react/lib/utils/flux';
 *
 * You can then use the function like this:
 *
 *   connect(MyView, MyStore);
 *
 * With multiple stores, this will look like:
 *
 *   connect(MyView, [StoreOne, StoreTwo, StoreThree]);
 *
 * @method connect
 * @param {ReactComponent} ComposedView The view component to interact with the store(s).
 * @param {Object|Array} stores The store(s) you want to connect to the ComposedView.
 * @return {Class} An enhanced version of the ComposedView to work with flux stores.
 */
export function connect(ComposedView, stores) {
  Logger.deprecate('connect has been deprecated in favour of the connect higher order component', {
    group: 'connect'
  });

  // Build an object mapping any stores passed to the connect function, using
  // the store's class name as the key.

  const _stores = {};

  function _addStore(store) {
    _stores[store.name] = store;
  }

  if (stores.constructor === Array) {
    // if there are multiple stores, iterate through them and add them
    stores.forEach((store) => {
      _addStore(store);
    });
  } else {
    // if there is a single store, just add it
    _addStore(stores);
  }

  /**
   * Extends the specified view component with additional functionality with working
   * with flux stores.
   *
   * @class View
   * @constructor
   */
  class View extends ComposedView {
    constructor(...args) {
      super(...args);

      /**
       * Combines the view component's state with the data from the store.
       *
       * @property state
       * @type {Object}
       */
      this.state = assign({}, this.state, this._getStoreStates());
    }

    /**
     * Lifecycle method called by React when a component is mounted.
     *
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {
      // ensure that the super view calls its version of componentDidMount
      /* istanbul ignore else */
      if (super.componentDidMount) { super.componentDidMount(); }

      // listen to each store when the view component mounts
      for (const key in _stores) {
        _stores[key].addChangeListener(this._onChange);
      }
    }

    /**
     * Lifecycle method called by React when a component is unmounted.
     *
     * @method componentWillUnmount
     * @return {void}
     */
    componentWillUnmount() {
      // ensure that the super view calls its version of componentWillUnmount
      /* istanbul ignore else */
      if (super.componentWillUnmount) { super.componentWillUnmount(); }

      // unlisten to each store when the view component unmounts
      for (const key in _stores) {
        _stores[key].removeChangeListener(this._onChange);
      }
    }

    /**
     * A callback for whenever a store that is listened to emits a change.
     *
     * @method _onChange
     * @param {String} key The name for the store that changed.
     * @return {void}
     */
    _onChange = (key) => {
      // update the state with the data for the store that changed
      this.setState({ [key]: _stores[key].getState() });
    }

    /**
     * Collects the most up to date data from each store.
     *
     * @method _getStoreStates
     * @return {Object} A collection of each store and it's data.
     */
    _getStoreStates = () => {
      const states = {};

      for (const key in _stores) {
        states[key] = _stores[key].getState();
      }

      return states;
    }
  }

  // ensures that the new component has the original component's name
  View.displayName = ComposedView.displayName || ComposedView.name;

  return View;
}
