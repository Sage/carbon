/*istanbul ignore next*/"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_events = require("events");

/*istanbul ignore next*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A constant used for the change event within this module.
 *
 * @property CHANGE_EVENT
 * @type String
 * @final
 */
var CHANGE_EVENT = "change";

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
/*istanbul ignore next*/
var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function /*istanbul ignore next*/Store(name, data, Dispatcher) {
    /*istanbul ignore next*/var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    /*istanbul ignore next*/
    _classCallCheck(this, Store);

    // tell the developer if they have not defined the name property.

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this, name, data, Dispatcher, opts));

    /*istanbul ignore next*/
    _this.addChangeListener = function (callback) {
      /*istanbul ignore next*/_this.on(CHANGE_EVENT, callback);
    };

    /*istanbul ignore next*/
    _this.removeChangeListener = function (callback) {
      /*istanbul ignore next*/_this.removeListener(CHANGE_EVENT, callback);
    };

    /*istanbul ignore next*/
    _this.getState = function () {
      return (/*istanbul ignore next*/_this.data
      );
    };

    /*istanbul ignore next*/
    _this.dispatcherCallback = function (action) {
      if (!action.actionType) {
        throw new Error("You are dispatching an invalid action (maybe the constant is incorrect or missing)");
      }

      // We determine if the store has the actionType available as a function.
      // In traditional flux this normally uses a switch/case statement.
      if ( /*istanbul ignore next*/_this[action.actionType]) {
        // if history is enabled, store it at this point
        if ( /*istanbul ignore next*/_this.trackHistory) {
          /*istanbul ignore next*/_this.history.push( /*istanbul ignore next*/_this.data);
        }
        // call the function on the store with the action
        /*istanbul ignore next*/_this[action.actionType].call( /*istanbul ignore next*/_this, action);
        // tell the store a change has occurred
        /*istanbul ignore next*/_this._triggerChange();
      }
    };

    /*istanbul ignore next*/
    _this.undo = function () {
      if ( /*istanbul ignore next*/_this.history.length > 1) {
        // pop the last entry in history and set it as the current data
        /*istanbul ignore next*/_this.data = /*istanbul ignore next*/_this.history.pop();
        // tell the store a change has occurred
        /*istanbul ignore next*/_this._triggerChange();
      }
    };

    /*istanbul ignore next*/
    _this.reset = function () {
      // set the data to the initial state stored in the history array
      /*istanbul ignore next*/_this.data = /*istanbul ignore next*/_this.history[0];
      // reset the history array
      /*istanbul ignore next*/_this.history = [/*istanbul ignore next*/_this.data];
      // tell the store a change has occurred
      /*istanbul ignore next*/_this._triggerChange();
    };

    if (!name) {
      throw new Error( /*istanbul ignore next*/"You need to initialize your store with a name. Check the initialization of " + /*istanbul ignore next*/_this.constructor.name + ".");
    }

    // tell the developer if they have not defined the data property.
    if (!data) {
      throw new Error( /*istanbul ignore next*/"You need to initialize your store with data. Check the initialization of " + /*istanbul ignore next*/_this.constructor.name + ".");
    }

    // it is required to initialize the store with the dispatcher so we can register
    // the store with it and store the dispatchToken
    if (!Dispatcher) {
      throw new Error( /*istanbul ignore next*/"You need to initialize your store with your application's dispatcher. Check the initialization of " + /*istanbul ignore next*/_this.constructor.name + ".");
    }

    /**
     * Set the name for the store - this will be used to identify your store.
     *
     * @property name
     * @type {String}
     */
    /*istanbul ignore next*/_this.name = name;

    /**
     * Set the data for the store - this should be an immutable object.
     *
     * @property data
     * @type {Object}
     */
    /*istanbul ignore next*/_this.data = data;

    /**
     * Store the dispatchToken after registering with the dispatcher, this will
     * allow us to use the waitFor API provided by flux
     * https://facebook.github.io/flux/docs/dispatcher.html#api
     *
     * @property dispatchToken
     * @type {String}
     */
    /*istanbul ignore next*/_this.dispatchToken = Dispatcher.register( /*istanbul ignore next*/_this.dispatcherCallback);

    /**
     * Array to store the history, set with the initial data.
     *
     * @property history
     * @type {Array}
     */
    /*istanbul ignore next*/_this.history = [data];

    /**
     * Determines if the store should track data changes.
     *
     * @property trackHistory
     * @type {Boolean}
     */
    /*istanbul ignore next*/_this.trackHistory = opts.history ? true : false;
    /*istanbul ignore next*/return _this;
  }

  /**
   * Adds a listener to the store, which calls a provided callback on change.
   *
   * @method addChangeListener
   * @param {Function} callback The function that is called in the view component.
   * @return {void}
   */


  /**
   * Removes a listener to the store.
   *
   * @method addChangeListener
   * @param {Function} callback The function that is called in the view component.
   * @return {void}
   */


  /**
   * Returns the current data from the store.
   *
   * @method getState
   * @return {Object} the current data
   */


  /**
   * Determine if this store can handle the given action, and calls it if it can.
   *
   * @method dispatcherCallback
   * @param {Object} action The action dispatched from the dispatcher
   * @return {void}
   */


  /**
   * Reverts the data to the previous data set in the history array.
   *
   * @method undo
   * @return {void}
   */


  /**
   * Reverts the data to the initial data set in the history.
   *
   * @method reset
   * @return {void}
   */


  _createClass(Store, [{
    key: "_triggerChange",


    /**
     * Emit the change event that the store is listening to so it can trigger
     * the callback provided from the view component.
     *
     * @method _triggerChange
     * @return {void}
     */
    value: function _triggerChange() {
      // we use the store name so the view component knows which store updated
      this.emit(CHANGE_EVENT, this.name);
    }
  }]);

  return Store;
}(_events.EventEmitter);

/*istanbul ignore next*/exports.default = Store;