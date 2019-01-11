'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dispatcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.connect = connect;

var _flux = require('flux');

var _flux2 = _interopRequireDefault(_flux);

var _lodash = require('lodash');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dispatcher = exports.Dispatcher = new _flux2.default.Dispatcher();

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
function connect(ComposedView, stores) {
  _logger2.default.deprecate('connect has been deprecated in favour of the connect higher order component', {
    group: 'connect'
  });

  // Build an object mapping any stores passed to the connect function, using
  // the store's class name as the key.

  var _stores = {};

  function _addStore(store) {
    _stores[store.name] = store;
  }

  if (stores.constructor === Array) {
    // if there are multiple stores, iterate through them and add them
    stores.forEach(function (store) {
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

  var View = function (_ComposedView) {
    _inherits(View, _ComposedView);

    function View() {
      var _ref;

      _classCallCheck(this, View);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /**
       * Combines the view component's state with the data from the store.
       *
       * @property state
       * @type {Object}
       */
      var _this = _possibleConstructorReturn(this, (_ref = View.__proto__ || Object.getPrototypeOf(View)).call.apply(_ref, [this].concat(args)));

      _this._onChange = function (key) {
        // update the state with the data for the store that changed
        _this.setState(_defineProperty({}, key, _stores[key].getState()));
      };

      _this._getStoreStates = function () {
        var states = {};

        for (var key in _stores) {
          states[key] = _stores[key].getState();
        }

        return states;
      };

      _this.state = (0, _lodash.assign)({}, _this.state, _this._getStoreStates());
      return _this;
    }

    /**
     * Lifecycle method called by React when a component is mounted.
     *
     * @method componentDidMount
     * @return {void}
     */


    _createClass(View, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // ensure that the super view calls its version of componentDidMount
        /* istanbul ignore else */
        if (_get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'componentDidMount', this)) {
          _get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'componentDidMount', this).call(this);
        }

        // listen to each store when the view component mounts
        for (var key in _stores) {
          _stores[key].addChangeListener(this._onChange);
        }
      }

      /**
       * Lifecycle method called by React when a component is unmounted.
       *
       * @method componentWillUnmount
       * @return {void}
       */

    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // ensure that the super view calls its version of componentWillUnmount
        /* istanbul ignore else */
        if (_get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'componentWillUnmount', this)) {
          _get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'componentWillUnmount', this).call(this);
        }

        // unlisten to each store when the view component unmounts
        for (var key in _stores) {
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


      /**
       * Collects the most up to date data from each store.
       *
       * @method _getStoreStates
       * @return {Object} A collection of each store and it's data.
       */

    }]);

    return View;
  }(ComposedView);

  // ensures that the new component has the original component's name


  View.displayName = ComposedView.displayName || ComposedView.name;

  return View;
}