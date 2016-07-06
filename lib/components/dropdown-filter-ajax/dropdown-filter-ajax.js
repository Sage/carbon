/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_superagent = require('superagent');

/*istanbul ignore next*/
var _superagent2 = _interopRequireDefault(_superagent);

var /*istanbul ignore next*/_lodash = require('lodash');

var /*istanbul ignore next*/_dropdownFilter = require('./../dropdown-filter');

/*istanbul ignore next*/
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

  function /*istanbul ignore next*/DropdownFilterAjax() {
    /*istanbul ignore next*/
    var _Object$getPrototypeO;

    _classCallCheck(this, DropdownFilterAjax);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /*istanbul ignore next*/

    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DropdownFilterAjax)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    /*istanbul ignore next*/
    _this.handleBlur = function () {
      if (! /*istanbul ignore next*/_this.blockBlur) {
        /*istanbul ignore next*/
        (function () {
          var filter = /*istanbul ignore next*/_this.props.create ? /*istanbul ignore next*/_this.state.filter : null,
              highlighted = /*istanbul ignore next*/_this.highlighted( /*istanbul ignore next*/_this.options);

          // select highlighted if it is not the current selected value
          if (highlighted && highlighted !== String( /*istanbul ignore next*/_this.props.value)) {
            var item = /*istanbul ignore next*/(0, _lodash.find)( /*istanbul ignore next*/_this.state.options, function (item) {
              return String(item.id) === String(highlighted);
            });

            /*istanbul ignore next*/_this.emitOnChangeCallback(highlighted, item.name);
          }

          // close list and reset filter
          /*istanbul ignore next*/_this.setState({ open: false, filter: filter });
        })();
      }
    };

    /*istanbul ignore next*/
    _this.handleFocus = function () {
      if (! /*istanbul ignore next*/_this.props.suggest && ! /*istanbul ignore next*/_this.blockFocus) {
        /*istanbul ignore next*/_this.getData("", 1);
      } else {
        /*istanbul ignore next*/_this.blockFocus = false;
      }

      /*istanbul ignore next*/_this._input.setSelectionRange(0, /*istanbul ignore next*/_this._input.value.length);
    };

    /*istanbul ignore next*/
    _this.handleScroll = function () {
      if ( /*istanbul ignore next*/_this.listeningToScroll) {
        if ( /*istanbul ignore next*/_this.state.page < /*istanbul ignore next*/_this.state.pages) {
          var list = /*istanbul ignore next*/_this.refs.list;
          var scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 25;

          if (list.scrollTop > scrollTriggerPosition) {
            /*istanbul ignore next*/_this.listeningToScroll = false;
            /*istanbul ignore next*/_this.getData( /*istanbul ignore next*/_this.state.visibleValue, /*istanbul ignore next*/_this.state.page + 1);
          }
        }
      }
    };

    /*istanbul ignore next*/
    _this.getData = function () {
      /*istanbul ignore next*/var query = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      /*istanbul ignore next*/var page = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      /*istanbul ignore next*/_superagent2.default.get( /*istanbul ignore next*/_this.props.path).query({
        page: page,
        rows: /*istanbul ignore next*/_this.props.rowsPerRequest,
        value: query
      }).end(function (err, response) {
        /*istanbul ignore next*/_this.updateList(response.body.data[0]);
      });
    };

    /*istanbul ignore next*/
    _this.resetScroll = function () {
      var list = /*istanbul ignore next*/_this.refs.list;

      /*istanbul ignore next*/_this.listeningToScroll = false;

      if (list) {
        list.scrollTop = 0;
      }
    };

    /*istanbul ignore next*/
    _this.updateList = function (data) {
      // Default page size is 25 records
      var pages = Math.ceil(data.records / /*istanbul ignore next*/_this.props.rowsPerRequest),
          records = data.items;

      // Adds next set of records as page scrolled down
      if (data.page > 1) {
        records = /*istanbul ignore next*/_this.state.options.concat(records);
      } else {
        /*istanbul ignore next*/_this.resetScroll();
      }

      /*istanbul ignore next*/_this.setState({
        open: true,
        options: records,
        page: data.page,
        pages: pages
      });

      /*istanbul ignore next*/_this.listeningToScroll = true;
    };

    /*istanbul ignore next*/_this.state.options = [];

    /**
     * The current page number for the results.
     *
     * @property page
     * @type {Number}
     * @default 1
     */
    /*istanbul ignore next*/_this.state.page = 1;

    /**
     * The total number of pages of results.
     *
     * @property pages
     * @type {Number}
     * @default 0
     */
    /*istanbul ignore next*/_this.state.pages = 0;

    /**
     * Tracks whether the scroll listener is active on the list, useful for
     * paginated results.
     *
     * @property listeningToScroll
     * @type {Boolean}
     * @default true
     */
    /*istanbul ignore next*/_this.listeningToScroll = true;
    /*istanbul ignore next*/return _this;
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
      /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilterAjax.prototype), 'handleVisibleChange', this).call(this, ev);
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
    key: 'listProps',


    /**
     * Properties to be assigned to the list.
     *
     * @method listProps
     */
    get: function get() {
      var props = /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilterAjax.prototype), 'listProps', this);

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
      return this.prepareList( /*istanbul ignore next*/(0, _lodash.cloneDeep)(this.state.options));
    }

    /**
     * Input props for the dropdown, extended from the base dropdown component.
     *
     * @method inputProps
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var props = /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilterAjax.prototype), 'inputProps', this);

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

/*istanbul ignore next*/DropdownFilterAjax.propTypes = {
  /**
   * The ID value for the component
   *
   * @property value
   * @type {Number}
   */
  value: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.string, /*istanbul ignore next*/_react2.default.PropTypes.number]),

  /**
   * The visible value for the input
   *
   * @property visibleValue
   * @type {String}
   */
  visibleValue: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * The path to your data (e.g. "/core_accounting/ledger_accounts/suggestions")
   *
   * @property path
   * @type {String}
   */
  path: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * The number of rows to get per request
   *
   * @property rowsPerRequest
   * @type {Number}
   * @default 25
   */
  rowsPerRequest: /*istanbul ignore next*/_react2.default.PropTypes.number,

  /**
   * Enables create functionality for dropdown.
   *
   * @property create
   * @type {Function}
   */
  create: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Should the dropdown act and look like a suggestable input instead.
   *
   * @property suggest
   * @type {Boolean}
   */
  suggest: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/DropdownFilterAjax.defaultProps = {
  rowsPerRequest: 25
};
/*istanbul ignore next*/exports.default = DropdownFilterAjax;