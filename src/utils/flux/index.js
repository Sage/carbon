import _ from 'lodash';

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
 *   import { connect } from 'carbon/lib/utils/flux';
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

  // Build an object mapping any stores passed to the connect function, using
  // the store's class name as the key.

  let _stores = {};

  function _addStore(store) {
    // tell the developer if they have not defined the name property.
    if (!store.name) {
      throw new Error(`You need to set the name property on your store. In ${store.constructor.name}'s constructor add 'this.name = "uniqueStoreName";'.`);
    }

    // tell the developer if they have not defined the data property.
    if (!store.data) {
      throw new Error(`You need to set the data property on your store. In ${store.constructor.name}'s constructor add 'this.data = ImmutableHelper.parseJSON({});'.`);
    }

    _stores[store.name] = store;
  }

  if (stores.constructor === Array) {
    stores.forEach((store) => {
      _addStore(store);
    });
  } else {
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
      this.state = _.assign({}, this.state, this._getStoreStates());
    }

    /**
     * Lifecycle method called by React when a component is mounted.
     *
     * @method componentDidMount
     */
    componentDidMount() {
      // ensure that the super view calls it's version of componentDidMount
      if (super.componentDidMount) { super.componentDidMount(); }

      // listen to each store when the view component mounts
      for (let key in _stores) {
        _stores[key].addChangeListener(this._onChange);
      }
    }

    /**
     * Lifecycle method called by React when a component is unmounted.
     *
     * @method componentWillUnmount
     */
    componentWillUnmount() {
      // ensure that the super view calls it's version of componentWillUnmount
      if (super.componentWillUnmount) { super.componentWillUnmount(); }

      // unlisten to each store when the view component unmounts
      for (let key in _stores) {
        _stores[key].removeChangeListener(this._onChange);
      }
    }

    /**
     * A callback for whenever a store that is listened to emits a change.
     *
     * @method _onChange
     * @param {String} key The name for the store that changed.
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
      var states = {};

      for (let key in _stores) {
        states[key] = _stores[key].getState();
      }

      return states;
    }
  }

  return View;
}
