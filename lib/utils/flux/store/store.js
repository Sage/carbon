'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _flux = require('flux');

var _flux2 = _interopRequireDefault(_flux);

var _flux3 = require('./../../flux');

var _logger = require('./../../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var CHANGE_EVENT = 'change';

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

var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store(name, data) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, name, data, opts));

    _this.addChangeListener = function (callback) {
      _this.on(CHANGE_EVENT, callback);
    };

    _this.removeChangeListener = function (callback) {
      _this.removeListener(CHANGE_EVENT, callback);
    };

    _this.getState = function () {
      return _this.data;
    };

    _this.dispatcherCallback = function (action) {
      if (!action.actionType) {
        throw new Error('You are dispatching an invalid action (maybe the constant is incorrect or missing)');
      }

      // We determine if the store has the actionType available as a function.
      // In traditional flux this normally uses a switch/case statement.
      if (_this[action.actionType]) {
        // if history is enabled, store it at this point
        if (_this.trackHistory) {
          _this.history.push(_this.data);
        }
        // call the function on the store with the action
        _this[action.actionType].call(_this, action);
        // tell the store a change has occurred
        _this._triggerChange();
      }
    };

    _this.undo = function () {
      if (_this.history.length > 1) {
        // pop the last entry in history and set it as the current data
        _this.data = _this.history.pop();
        // tell the store a change has occurred
        _this._triggerChange();
      }
    };

    _this.reset = function () {
      // set the data to the initial state stored in the history array
      _this.data = _this.history[0];
      // reset the history array
      _this.history = [_this.data];
      // tell the store a change has occurred
      _this._triggerChange();
    };

    var dispatcher = void 0;

    var suffix = 'Check the initialization of ' + _this.constructor.name + '.';

    // tell the developer if they have not defined the name property.
    if (!name) {
      throw new Error('You need to initialize your store with a name. ' + suffix);
    }

    // tell the developer if they have not defined the data property.
    if (!data) {
      throw new Error('You need to initialize your store with data. ' + suffix);
    }

    // it is required to initialize the store with the dispatcher so we can register
    // the store with it and store the dispatchToken
    if (opts instanceof _flux2.default.Dispatcher) {
      dispatcher = opts; // this line ensures backwards compatability
      _logger2.default.deprecate(name + ': The \'connect\' function will no longer support the Dispatcher as it\'s third argument. If you want to use the Dispatcher provided by Carbon then you can just remove this argument, however if you want to provide your own Dispatcher you will need to set it as an option of the third argument of the connect function (eg. connect(Component, Store, { dispatcher: CustomDispatcher }))', { // eslint-disable-line max-len
        group: 'connect'
      });
    } else {
      dispatcher = opts.dispatcher || _flux3.Dispatcher;
    }

    /**
     * Set the name for the store - this will be used to identify your store.
     *
     * @property name
     * @type {String}
     */
    _this.name = name;

    /**
     * Set the data for the store - this should be an immutable object.
     *
     * @property data
     * @type {Object}
     */
    _this.data = data;

    /**
     * Store the dispatchToken after registering with the dispatcher, this will
     * allow us to use the waitFor API provided by flux
     * https://facebook.github.io/flux/docs/dispatcher.html#api
     *
     * @property dispatchToken
     * @type {String}
     */
    _this.dispatchToken = dispatcher.register(_this.dispatcherCallback);

    /**
     * Array to store the history, set with the initial data.
     *
     * @property history
     * @type {Array}
     */
    _this.history = [data];

    /**
     * Determines if the store should track data changes.
     *
     * @property trackHistory
     * @type {Boolean}
     */
    _this.trackHistory = !!opts.history;
    return _this;
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
    key: '_triggerChange',


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

exports.default = Store;