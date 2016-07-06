/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_dropdown = require('./../dropdown');

/*istanbul ignore next*/
var _dropdown2 = _interopRequireDefault(_dropdown);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_escapeStringRegexp = require('escape-string-regexp');

/*istanbul ignore next*/
var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A dropdown filter widget.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import DropdownFilter from 'carbon/lib/components/dropdown-filter';
 *
 * To render a DropdownFilter:
 *
 *   <DropdownFilter name="foo" options={ foo } onChange={ myChangeHandler } />
 *
 * The developer should pass data to the store as JSON. e.g.
 *
 *   foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]
 *
 * You can also use the component in 'suggest' mode, which only shows the dropdown
 * once a filter term has been entered.
 *
 * You can also define a function using the 'create' prop, this will allow you
 * to trigger events to create new items.
 *
 * @class DropdownFilter
 * @constructor
 */

var DropdownFilter = function (_Dropdown) {
  _inherits(DropdownFilter, _Dropdown);

  function /*istanbul ignore next*/DropdownFilter() {
    /*istanbul ignore next*/
    var _Object$getPrototypeO;

    _classCallCheck(this, DropdownFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /*istanbul ignore next*/

    /**
     * The user input search text.
     *
     * @property filter
     * @type {String}
     * @default null
     */

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DropdownFilter)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    /*istanbul ignore next*/
    _this.handleBlur = function () {
      if (! /*istanbul ignore next*/_this.blockBlur) {
        /*istanbul ignore next*/
        (function () {
          var filter = /*istanbul ignore next*/_this.props.create ? /*istanbul ignore next*/_this.state.filter : null,
              highlighted = /*istanbul ignore next*/_this.highlighted( /*istanbul ignore next*/_this.options);

          if (highlighted && highlighted !== String( /*istanbul ignore next*/_this.props.value)) {
            var item = /*istanbul ignore next*/_this.props.options.find(function (item) {
              return String(item.get('id')) === String(highlighted);
            });

            /*istanbul ignore next*/_this.emitOnChangeCallback(highlighted, item.get('name'));
          }

          /*istanbul ignore next*/_this.setState({ open: false, filter: filter });
        })();
      }
    };

    /*istanbul ignore next*/
    _this.handleFocus = function () {
      if (! /*istanbul ignore next*/_this.props.suggest && ! /*istanbul ignore next*/_this.blockFocus) {
        /*istanbul ignore next*/_this.setState({ open: true });
      } else {
        /*istanbul ignore next*/_this.blockFocus = false;
      }

      /*istanbul ignore next*/_this._input.setSelectionRange(0, /*istanbul ignore next*/_this._input.value.length);
    };

    /*istanbul ignore next*/
    _this.handleCreate = function (ev) {
      /*istanbul ignore next*/_this.setState({ open: false });
      /*istanbul ignore next*/_this.props.create(ev, /*istanbul ignore next*/_this);
    };

    /*istanbul ignore next*/
    _this.prepareList = function (options) {
      if (( /*istanbul ignore next*/_this.props.suggest || ! /*istanbul ignore next*/_this.openingList) && typeof /*istanbul ignore next*/_this.state.filter === 'string') {
        /*istanbul ignore next*/
        (function () {
          var filter = /*istanbul ignore next*/_this.state.filter;
          var regex = new RegExp( /*istanbul ignore next*/(0, _escapeStringRegexp2.default)(filter), 'i');

          // if user has entered a search filter
          options = options.filter(function (option) {
            if (option.name.search(regex) > -1) {
              option.name = /*istanbul ignore next*/_this.highlightMatches(option.name, filter);
              return option;
            }
          });
        })();
      }

      return options;
    };

    /*istanbul ignore next*/
    _this.highlighted = function (options) {
      var highlighted = null;

      if ( /*istanbul ignore next*/_this.state.highlighted) {
        highlighted = /*istanbul ignore next*/_this.state.highlighted;
      } else {
        if (! /*istanbul ignore next*/_this.state.filter && /*istanbul ignore next*/_this.props.value) {
          highlighted = /*istanbul ignore next*/_this.props.value;
        } else if ( /*istanbul ignore next*/_this.state.filter && options.length) {
          highlighted = options[0].id;
        }
      }

      return highlighted;
    };

    /*istanbul ignore next*/
    _this.highlightMatches = function (optionText, value) {
      if (!value.length) {
        return optionText;
      }

      var beginning = /*istanbul ignore next*/void 0,
          end = /*istanbul ignore next*/void 0,
          middle = /*istanbul ignore next*/void 0,
          newValue = /*istanbul ignore next*/void 0,
          parsedOptionText = /*istanbul ignore next*/void 0,
          valIndex = /*istanbul ignore next*/void 0;

      parsedOptionText = optionText.toLowerCase();
      valIndex = parsedOptionText.indexOf(value);

      if (valIndex === -1) {
        return optionText;
      }

      beginning = optionText.substr(0, valIndex);
      middle = optionText.substr(valIndex, value.length);
      end = optionText.substr(valIndex + value.length, optionText.length);

      // find end of string recursively
      if (end.indexOf(value) !== -1) {
        end = /*istanbul ignore next*/_this.highlightMatches(end, value);
      }

      // build JSX object
      newValue = [/*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'span',
        /*istanbul ignore next*/{ key: 'beginning' },
        beginning
      ), /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'strong',
        /*istanbul ignore next*/{ key: 'middle' },
        /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'u',
          /*istanbul ignore next*/null,
          middle
        )
      ), /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'span',
        /*istanbul ignore next*/{ key: 'end' },
        end
      )];

      return newValue;
    };

    /*istanbul ignore next*/_this.state.filter = null;

    /**
     * Determines if list is being opened on current render.
     *
     * @property openingList
     * @type {Boolean}
     * @default false
     */
    /*istanbul ignore next*/_this.openingList = false;

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    /*istanbul ignore next*/_this.handleVisibleChange = /*istanbul ignore next*/_this.handleVisibleChange.bind( /*istanbul ignore next*/_this);
    /*istanbul ignore next*/return _this;
  }

  _createClass(DropdownFilter, [{
    key: 'componentWillUpdate',


    /**
     * Lifecycle hook for when the component will update.
     *
     * @method componentWillUpdate
     * @param {Object} nextProps
     * @param {Object} nextState
     */
    value: function componentWillUpdate(nextProps, nextState) {
      // if list is being opened, set boolean
      if (this.state.open != nextState.open) {
        this.openingList = true;
      }
    }

    /**
     * Selects the value for the component
     *
     * @method selectValue
     * @param {String} val
     */

  }, {
    key: 'selectValue',
    value: function selectValue(val, visibleVal) {
      /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilter.prototype), 'selectValue', this).call(this, val, visibleVal);
      this.setState({ filter: null });
    }

    /*
     * Handles changes to the visible input field. Updates filter and displayed value.
     *
     * @method handleVisibleChange
     * @param {Object} ev event
     */

  }, {
    key: 'handleVisibleChange',
    value: function handleVisibleChange(ev) {
      var state = {
        filter: ev.target.value,
        highlighted: null
      };

      if (this.props.suggest && ev.target.value.length <= 0) {
        state.open = false;
      } else {
        state.open = true;
      }

      this.setState(state);

      this.openingList = false;

      if (this.props.create) {
        // if create is enabled then empty the selected value so the filter persists
        this.emitOnChangeCallback("", ev.target.value);
      }
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
     * Handles what happens when create button is clicked.
     *
     * @method handleCreate
     */


    /**
     * Prepares list options by converting to JSON and formatting filtered options.
     *
     * @method prepareList
     * @param {Object} options Immutable map of list options
     */

  }, {
    key: 'results',


    /**
     * Function that returns search results. Builds each list item with relevant handlers and classes.
     *
     * @method results
     */
    value: function results(options) {
      var items = /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilter.prototype), 'results', this).call(this, options);

      if (!items.length) {
        items = /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'li',
          /*istanbul ignore next*/{ className: 'ui-dropdown__list-item ui-dropdown__list-item--no-results' },
          /*istanbul ignore next*/_i18nJs2.default.t("dropdownlist.no_results", {
            defaultValue: "No results match \"%{term}\"",
            term: this.state.filter
          })
        );
      }

      return items;
    }

    /**
     * Return the list item which should be highlighted by default.
     *
     * @method highlighted
     */

  }, {
    key: 'listHTML',


    /**
     * Getter to return HTML for list to render method.
     *
     * @method listHTML
     */
    get: function get() {
      var original = /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilter.prototype), 'listHTML', this),
          html = [original];

      if (this.state.open && this.props.create) {
        var text = "Create ";

        if (this.state.filter) {
          text += '"' + this.state.filter + '"';
        } else {
          text += "New";
        }

        html.push( /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'a',
          /*istanbul ignore next*/{ key: 'dropdown-action', className: 'ui-dropdown__action', onClick: this.handleCreate },
          text
        ));
      }

      return html;
    }

    /**
     * Returns the list options in the correct format
     *
     * @method options
     */

  }, {
    key: 'options',
    get: function get() {
      return this.prepareList(this.props.options.toJS());
    }

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilter.prototype), 'mainClasses', this), 'ui-dropdown-filter')
      );
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilter.prototype), 'inputClasses', this), {
          'ui-dropdown__input--filtered': !this.props.create && typeof this.state.filter === 'string'
        })
      );
    }

    /**
     * Input props for the dropdown, extended from the base dropdown component.
     *
     * @method inputProps
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var props = /*istanbul ignore next*/_get(Object.getPrototypeOf(DropdownFilter.prototype), 'inputProps', this);

      var value = props.value;

      if (typeof this.state.filter === 'string') {
        // if filter has a value, use that instead
        value = this.state.filter;
      }

      props.readOnly = this.props.readOnly || false;
      props.onChange = this.handleVisibleChange;
      props.value = value;

      return props;
    }

    /**
     * Find and highlights search terms in text
     *
     * @method highlightMatches
     * @param {String} optionText - the text to search
     * @param {String} value - the search term
     */

  }]);

  return DropdownFilter;
}(_dropdown2.default);

/*istanbul ignore next*/DropdownFilter.propTypes = {
  /**
   * The ID value for the component
   *
   * @property value
   * @type {String}
   */
  value: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.string, /*istanbul ignore next*/_react2.default.PropTypes.number]),

  /**
   * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
   *
   * @property options
   * @type {object}
   */
  options: /*istanbul ignore next*/_react2.default.PropTypes.object.isRequired,

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
/*istanbul ignore next*/exports.default = DropdownFilter;