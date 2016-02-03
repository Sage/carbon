'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.connect = connect;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

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

function connect(ComposedView, stores) {

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

  var View = (function (_ComposedView) {
    _inherits(View, _ComposedView);

    function View() {
      var _this = this;

      _classCallCheck(this, View);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _get(Object.getPrototypeOf(View.prototype), 'constructor', this).apply(this, args);

      /**
       * Combines the view component's state with the data from the store.
       *
       * @property state
       * @type {Object}
       */

      this._onChange = function (key) {
        // update the state with the data for the store that changed
        _this.setState(_defineProperty({}, key, _stores[key].getState()));
      };

      this._getStoreStates = function () {
        var states = {};

        for (var key in _stores) {
          states[key] = _stores[key].getState();
        }

        return states;
      };

      this.state = (0, _lodash.assign)({}, this.state, this._getStoreStates());
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
        if (_get(Object.getPrototypeOf(View.prototype), 'componentDidMount', this)) {
          _get(Object.getPrototypeOf(View.prototype), 'componentDidMount', this).call(this);
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
        if (_get(Object.getPrototypeOf(View.prototype), 'componentWillUnmount', this)) {
          _get(Object.getPrototypeOf(View.prototype), 'componentWillUnmount', this).call(this);
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
    }]);

    return View;
  })(ComposedView);

  return View;
}

/**
 * Collects the most up to date data from each store.
 *
 * @method _getStoreStates
 * @return {Object} A collection of each store and it's data.
 */