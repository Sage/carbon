'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _lodash = require('lodash');

var _dropdownFilter = require('./../dropdown-filter');

var _dropdownFilter2 = _interopRequireDefault(_dropdownFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var DropdownFilterAjax = function (_DropdownFilter) {
  _inherits(DropdownFilterAjax, _DropdownFilter);

  function DropdownFilterAjax() {
    var _ref;

    _classCallCheck(this, DropdownFilterAjax);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */
    var _this = _possibleConstructorReturn(this, (_ref = DropdownFilterAjax.__proto__ || Object.getPrototypeOf(DropdownFilterAjax)).call.apply(_ref, [this].concat(args)));

    _this.handleBlur = function () {
      if (!_this.blockBlur) {
        var filter = _this.props.create ? _this.state.filter : null;
        // close list and reset filter
        _this.setState({ open: false, filter: filter });

        if (_this.props.onBlur) {
          _this.props.onBlur();
        }
      }
    };

    _this.handleFocus = function () {
      if (!_this.props.suggest && !_this.blockFocus) {
        _this.getData('', 1);
      } else {
        _this.blockFocus = false;
      }

      _this._input.setSelectionRange(0, _this._input.value.length);
    };

    _this.handleScroll = function () {
      if (_this.listeningToScroll) {
        if (_this.state.page < _this.state.pages) {
          var list = _this.list;
          var scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 25;

          if (list.scrollTop > scrollTriggerPosition) {
            _this.listeningToScroll = false;
            _this.getData(_this.state.visibleValue, _this.state.page + 1);
          }
        }
      }
    };

    _this.getData = function () {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      _this.setState({ requesting: true });
      _superagent2.default.get(_this.props.path).query({
        page: page,
        rows: _this.props.rowsPerRequest,
        value: query
      }).query(_this.props.additionalRequestParams).end(_this.ajaxUpdateList);
    };

    _this.ajaxUpdateList = function (err, response) {
      _this.updateList(response.body.data[0]);
      _this.setState({ requesting: false });
    };

    _this.resetScroll = function () {
      _this.listeningToScroll = false;
      if (_this.state.open && _this.list) {
        _this.list.scrollTop = 0;
      }
    };

    _this.updateList = function (data) {
      // Default page size is 25 records
      var pages = Math.ceil(data.records / _this.props.rowsPerRequest);
      var records = data.items;

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

    _this.requestingState = function () {
      return _this.state.requesting ? 'requesting-list' : 'idle';
    };

    _this.state.options = [];

    /**
     * The current page number for the results.
     *
     * @property page
     * @type {Number}
     * @default 1
     */
    _this.state.page = 1;

    /**
     * The total number of pages of results.
     *
     * @property pages
     * @type {Number}
     * @default 0
     */
    _this.state.pages = 0;

    /**
     * Tracks whether the scroll listener is active on the list, useful for
     * paginated results.
     *
     * @property listeningToScroll
     * @type {Boolean}
     * @default true
     */
    _this.listeningToScroll = true;
    return _this;
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
      _get(DropdownFilterAjax.prototype.__proto__ || Object.getPrototypeOf(DropdownFilterAjax.prototype), 'handleVisibleChange', this).call(this, ev);
      this.getData(ev.target.value, 1);
    }

    /*
     * Handles what happens on blur of the input.
     *
     * @method handleBlur
     */


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
     * Applies some data from AJAX to the list
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

  }, {
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'dropdown-filter-ajax',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
    }
  }, {
    key: 'listProps',


    /**
     * Properties to be assigned to the list.
     *
     * @method listProps
     */
    get: function get() {
      var props = _get(DropdownFilterAjax.prototype.__proto__ || Object.getPrototypeOf(DropdownFilterAjax.prototype), 'listProps', this);

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
     * Converts requesting state into a string for the automation property data-state
     */

  }, {
    key: 'inputProps',


    /**
     * Input props for the dropdown, extended from the base dropdown component.
     *
     * @method inputProps
     */
    get: function get() {
      var props = _get(DropdownFilterAjax.prototype.__proto__ || Object.getPrototypeOf(DropdownFilterAjax.prototype), 'inputProps', this);

      if (typeof this.state.filter !== 'string') {
        props.value = this.props.visibleValue;
      } else {
        props.value = this.state.filter;
      }

      return props;
    }
  }]);

  return DropdownFilterAjax;
}(_dropdownFilter2.default);

DropdownFilterAjax.propTypes = (0, _lodash.omit)((0, _lodash.assign)({}, _dropdownFilter2.default.propTypes, {
  /**
   * The ID value for the component
   *
   * @property value
   * @type {Number}
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * The visible value for the input
   *
   * @property visibleValue
   * @type {String}
   */
  visibleValue: _propTypes2.default.string,

  /**
   * The path to your data (e.g. "/core_accounting/ledger_accounts/suggestions")
   *
   * @property path
   * @type {String}
   */
  path: _propTypes2.default.string.isRequired,

  /**
   * Additional parameters for the request (e.g. {foo: 'bar' })
   *
   * @property additionalRequestParams
   * @type {Object}
   */
  additionalRequestParams: _propTypes2.default.object,

  /**
   * The number of rows to get per request
   *
   * @property rowsPerRequest
   * @type {Number}
   * @default 25
   */
  rowsPerRequest: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * Enables create functionality for dropdown.
   *
   * @property create
   * @type {Function}
   */
  create: _propTypes2.default.func,

  /**
   * Should the dropdown act and look like a suggestable input instead.
   *
   * @property suggest
   * @type {Boolean}
   */
  suggest: _propTypes2.default.bool
}), 'options');
DropdownFilterAjax.defaultProps = {
  rowsPerRequest: 25,
  visibleValue: '' };
exports.default = DropdownFilterAjax;