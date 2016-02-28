'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _lodash = require('lodash');

var _dropdownFilter = require('./../dropdown-filter');

var _dropdownFilter2 = _interopRequireDefault(_dropdownFilter);

/**
 * A dropdown filter widget using ajax.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import DropdownFilterAjax from 'carbon/lib/components/dropdown-filter-ajax';
 *
 * To render a DropdownFilterAjax:
 *
 *   <DropdownFilter name="foo" path="/foo" onChange={ myChangeHandler } />
 *
 * You can also use the component in 'suggest' mode, which only shows the dropdown
 * once a filter term has been entered.
 *
 * You can also define a function using the 'create' prop, this will allow you
 * to trigger events to create new items.
 *
 * You can also define the number of rows returned by the ajax request using
 * the property rowsPerRequest.
 *
 * @class DropdownFilterAjax
 * @constructor
 */

var DropdownFilterAjax = (function (_DropdownFilter) {
  _inherits(DropdownFilterAjax, _DropdownFilter);

  function DropdownFilterAjax() {
    var _this = this;

    _classCallCheck(this, DropdownFilterAjax);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(DropdownFilterAjax.prototype), 'constructor', this).apply(this, args);

    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */

    this.handleBlur = function () {
      if (!_this.blockBlur) {
        (function () {
          var filter = _this.props.create ? _this.state.filter : null,
              highlighted = _this.highlighted(_this.options);

          // select highlighted if it is not the current selected value
          if (highlighted != _this.props.value) {
            var item = (0, _lodash.find)(_this.state.options, function (item) {
              return String(item.id) === String(highlighted);
            });

            _this.emitOnChangeCallback(highlighted, item.name);
          }

          // close list and reset filter
          _this.setState({ open: false, filter: filter });
        })();
      }
    };

    this.handleFocus = function () {
      if (!_this.props.suggest) {
        _this.getData("", 1);
      }

      _this._input.setSelectionRange(0, _this._input.value.length);
    };

    this.handleScroll = function () {
      if (_this.listeningToScroll) {
        if (_this.state.page < _this.state.pages) {
          var list = _this.refs.list;
          var scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 25;

          if (list.scrollTop > scrollTriggerPosition) {
            _this.listeningToScroll = false;
            _this.getData(_this.state.visibleValue, _this.state.page + 1);
          }
        }
      }
    };

    this.getData = function () {
      var query = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var page = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      _superagent2['default'].get(_this.props.path).query({
        page: page,
        rows: _this.props.rowsPerRequest,
        value: query
      }).end(function (err, response) {
        _this.updateList(response.body.data[0]);
      });
    };

    this.resetScroll = function () {
      var list = _this.refs.list;

      _this.listeningToScroll = false;

      if (list) {
        list.scrollTop = 0;
      }
    };

    this.updateList = function (data) {
      // Default page size is 25 records
      var pages = Math.ceil(data.records / _this.props.rowsPerRequest),
          records = data.items;

      // Adds next set of records as page scrolled down
      if (data.page > 1) {
        records = _this.state.options.concat(records);
      } else {
        _this.resetScroll();
      }

      _this.setState({
        open: true,
        options: records,
        page: data.page,
        pages: pages
      });

      _this.listeningToScroll = true;
    };

    this.state.options = [];

    /**
     * The current page number for the results.
     *
     * @property page
     * @type {Number}
     * @default 1
     */
    this.state.page = 1;

    /**
     * The total number of pages of results.
     *
     * @property pages
     * @type {Number}
     * @default 0
     */
    this.state.pages = 0;

    /**
     * Tracks whether the scroll listener is active on the list, useful for
     * paginated results.
     *
     * @property listeningToScroll
     * @type {Boolean}
     * @default true
     */
    this.listeningToScroll = true;
  }

  _createClass(DropdownFilterAjax, [{
    key: 'handleVisibleChange',

    /*
     * Handles changes to the visible input field. Updates filter and displayed value.
     *
     * @method handleVisibleChange
     * @param {Object} ev event
     */
    value: function handleVisibleChange(ev) {
      _get(Object.getPrototypeOf(DropdownFilterAjax.prototype), 'handleVisibleChange', this).call(this, ev);
      this.getData(ev.target.value, 1);
    }

    /*
     * Handles what happens on blur of the input.
     *
     * @method handleBlur
     */
  }, {
    key: 'listProps',

    /**
     * Properties to be assigned to the list.
     *
     * @method listProps
     */
    get: function get() {
      var props = _get(Object.getPrototypeOf(DropdownFilterAjax.prototype), 'listProps', this);

      props.onScroll = this.handleScroll;

      return props;
    }

    /**
     * Returns the list options in the correct format
     *
     * @method options
     */
  }, {
    key: 'options',
    get: function get() {
      return this.prepareList((0, _lodash.cloneDeep)(this.state.options));
    }

    /**
     * Input props for the dropdown, extended from the base dropdown component.
     *
     * @method inputProps
     */
  }, {
    key: 'inputProps',
    get: function get() {
      var props = _get(Object.getPrototypeOf(DropdownFilterAjax.prototype), 'inputProps', this);

      if (typeof this.state.filter !== 'string') {
        props.value = this.props.visibleValue;
      } else {
        props.value = this.state.filter;
      }

      return props;
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * The ID value for the component
       *
       * @property value
       * @type {Number}
       */
      value: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),

      /**
       * The visible value for the input
       *
       * @property visibleValue
       * @type {String}
       */
      visibleValue: _react2['default'].PropTypes.string,

      /**
       * The path to your data (e.g. "/core_accounting/ledger_accounts/suggestions")
       *
       * @property path
       * @type {String}
       */
      path: _react2['default'].PropTypes.string.isRequired,

      /**
       * The number of rows to get per request
       *
       * @property rowsPerRequest
       * @type {Number}
       * @default 25
       */
      rowsPerRequest: _react2['default'].PropTypes.number,

      /**
       * Enables create functionality for dropdown.
       *
       * @property create
       * @type {Function}
       */
      create: _react2['default'].PropTypes.func,

      /**
       * Should the dropdown act and look like a suggestable input instead.
       *
       * @property suggest
       * @type {Boolean}
       */
      suggest: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      rowsPerRequest: 25
    },
    enumerable: true
  }]);

  return DropdownFilterAjax;
})(_dropdownFilter2['default']);

exports['default'] = DropdownFilterAjax;
module.exports = exports['default'];

/**
 * Handles what happens on focus of the input.
 *
 * @method handleFocus
 */

/**
 * Handles what happens on scroll of the list.
 *
 * @method handleScroll
 */

/**
 * Retrieves data from the server for the list.
 *
 * @method getData
 * @param {String} query The search term
 * @param {Object} page The page number to get
 */

/**
 * Resets the scroll position of the list.
 *
 * @method resetScroll
 */

/**
 * Sets or appends the list with new data and causes a setState.
 *
 * @method updateList
 * @param {Object} data
 */