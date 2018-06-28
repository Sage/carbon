'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _dropdown = require('./../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

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
 * You can also use the component in 'freetext' mode, which behaves like 'suggest',
 * but allows write-in text values in addition to list options. Specify an initial
 * write-in value with the `visibleValue` property, instead of the `value` property
 * for an option id. Set the `freetextName` property to add a second hidden input
 * for the write-in value, as opposed to the `name` property used for the option id.
 *
 * You can also define a function using the 'create' prop, this will allow you
 * to trigger events to create new items.
 *
 * @class DropdownFilter
 * @constructor
 */
var DropdownFilter = function (_Dropdown) {
  _inherits(DropdownFilter, _Dropdown);

  /**
   * Constructor
   *
   * @constructor
   * @param {Array} args - Arguments
   */
  function DropdownFilter() {
    var _ref;

    _classCallCheck(this, DropdownFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /**
     * The user input search text.
     *
     * @property filter
     * @type {String}
     * @default null
     */
    var _this = _possibleConstructorReturn(this, (_ref = DropdownFilter.__proto__ || Object.getPrototypeOf(DropdownFilter)).call.apply(_ref, [this].concat(args)));

    _this.handleBlur = function () {
      if (!_this.blockBlur) {
        var filter = null;

        if (_this.props.create || _this.props.freetext) {
          filter = _this.state.filter;
        }
        _this.setState({ open: false, filter: filter });

        if (_this.props.freetext) {
          var opt = void 0;

          if (_this.state.filter) {
            opt = _this.props.options.find(function (option) {
              if (option.get('name')) {
                return option.get('name').toLowerCase() === _this.state.filter.toLowerCase();
              }
              return null;
            });
          }

          if (opt) {
            _this.selectValue(opt.get('id'), opt.get('name'));
          } else {
            _this.emitOnChangeCallback('', _this.state.filter);
          }
        }

        if (_this.props.onBlur) {
          _this.props.onBlur();
        }
      }
    };

    _this.handleFocus = function () {
      if (!_this.writeable && !_this.blockFocus) {
        _this.setState({ open: true });
      } else {
        _this.blockFocus = false;
      }

      _this._input.setSelectionRange(0, _this._input.value.length);
    };

    _this.handleCreate = function (ev) {
      _this.setState({ open: false });
      _this.props.create(ev, _this);
    };

    _this.prepareList = function (options) {
      var filteredOptions = void 0;
      if ((_this.writeable || !_this.openingList) && typeof _this.state.filter === 'string') {
        var filter = _this.state.filter;

        var regex = new RegExp((0, _escapeStringRegexp2.default)(filter), 'i');

        // if user has entered a search filter
        filteredOptions = options.filter(function (option) {
          if (option.name && option.name.search(regex) > -1) {
            option.name = _this.highlightMatches(option.name, filter);
            return option;
          }
          return null;
        });
      }

      return filteredOptions || options;
    };

    _this.highlighted = function (options) {
      var highlighted = null;

      if (_this.state.highlighted) {
        highlighted = _this.state.highlighted;
      } else if (!_this.state.filter && _this.props.value) {
        highlighted = _this.props.value;
      } else if (_this.state.filter && options.length) {
        highlighted = options[0].id;
      }

      return highlighted;
    };

    _this.highlightMatches = function (optionText, value) {
      if (!value.length) {
        return optionText;
      }

      var parsedOptionText = optionText.toLowerCase();
      var valIndex = parsedOptionText.indexOf(value);

      if (valIndex === -1) {
        return optionText;
      }

      var beginning = optionText.substr(0, valIndex);
      var middle = optionText.substr(valIndex, value.length);
      var end = optionText.substr(valIndex + value.length, optionText.length);

      // find end of string recursively
      if (end.indexOf(value) !== -1) {
        end = _this.highlightMatches(end, value);
      }

      // build JSX object
      var newValue = [_react2.default.createElement(
        'span',
        { key: 'beginning' },
        beginning
      ), _react2.default.createElement(
        'strong',
        { key: 'middle' },
        _react2.default.createElement(
          'u',
          null,
          middle
        )
      ), _react2.default.createElement(
        'span',
        { key: 'end' },
        end
      )];

      return newValue;
    };

    _this.state.filter = _this.hasFreetextValue() ? _this.props.visibleValue : null;

    /**
     * Determines if list is being opened on current render.
     *
     * @property openingList
     * @type {Boolean}
     * @default false
     */
    _this.openingList = false;

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    _this.handleVisibleChange = _this.handleVisibleChange.bind(_this);
    return _this;
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
      if (this.state.open !== nextState.open) {
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
      var filter = this.props.freetext ? visibleVal : null;
      _get(DropdownFilter.prototype.__proto__ || Object.getPrototypeOf(DropdownFilter.prototype), 'selectValue', this).call(this, val, visibleVal);
      this.setState({ filter: filter });
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

      if (this.writeable && ev.target.value.length <= 0) {
        state.open = false;
      } else {
        state.open = true;
      }

      this.setState(state);

      this.openingList = false;

      if (this.props.create) {
        // if create is enabled then empty the selected value so the filter persists
        this.emitOnChangeCallback('', ev.target.value);
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
      var items = _get(DropdownFilter.prototype.__proto__ || Object.getPrototypeOf(DropdownFilter.prototype), 'results', this).call(this, options);

      if (!items.length) {
        items = _react2.default.createElement(
          'li',
          { className: 'carbon-dropdown__list-item carbon-dropdown__list-item--no-results' },
          _i18nJs2.default.t('dropdownlist.no_results', {
            defaultValue: 'No results match "%{term}"',
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
    key: 'showArrow',


    /**
     * Overrides Dropdown method to conditionally show arrow
     *
     * @method showArrow
     * @return {Boolean}
     */
    value: function showArrow() {
      return !this.writeable;
    }

    /**
     * Returns the list options in the correct format
     *
     * @method options
     */

  }, {
    key: 'hasFreetextValue',


    /**
     * Returns whether properties indicate a freetext write-in value
     *
     * @method hasFreetextValue
     * @return {Boolean}
     */
    value: function hasFreetextValue() {
      return this.props.freetext && this.props.visibleValue && !this.props.value;
    }
  }, {
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'dropdown-filter',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
    }
  }, {
    key: 'listHTML',


    /**
     * Getter to return HTML for list to render method.
     *
     * @method listHTML
     */
    get: function get() {
      var original = _get(DropdownFilter.prototype.__proto__ || Object.getPrototypeOf(DropdownFilter.prototype), 'listHTML', this),
          html = [original];

      if (this.state.open && this.props.create) {
        var createText = _i18nJs2.default.t('dropdown_filter.create_text', { defaultValue: 'Create' });

        if (this.props.createText) {
          createText = this.props.createText;
        } else if (this.state.filter) {
          createText += ' "' + this.state.filter + '"';
        } else {
          createText += _i18nJs2.default.t('dropdown_filter.new_text', { defaultValue: ' New' });
        }

        html.push(_react2.default.createElement(
          _link2.default,
          {
            icon: this.props.createIconType || 'add',
            iconAlign: 'left',
            className: 'carbon-dropdown__action',
            'data-element': 'create',
            key: 'dropdown-action',
            onClick: this.handleCreate
          },
          createText
        ));
      }

      return html;
    }
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
      return (0, _classnames2.default)(_get(DropdownFilter.prototype.__proto__ || Object.getPrototypeOf(DropdownFilter.prototype), 'mainClasses', this), 'carbon-dropdown-filter', { 'carbon-dropdown-filter--writeable': this.writeable });
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      var filtered = !this.props.create && !this.props.freetext && typeof this.state.filter === 'string';
      return (0, _classnames2.default)(_get(DropdownFilter.prototype.__proto__ || Object.getPrototypeOf(DropdownFilter.prototype), 'inputClasses', this), { 'carbon-dropdown__input--filtered': filtered });
    }

    /**
     * Input props for the dropdown, extended from the base dropdown component.
     *
     * @method inputProps
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var props = _get(DropdownFilter.prototype.__proto__ || Object.getPrototypeOf(DropdownFilter.prototype), 'inputProps', this);
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
     * Input props for freetext hidden input.
     *
     * @method alternateHiddenInputProps
     * @return {Object}
     */

  }, {
    key: 'alternateHiddenInputProps',
    get: function get() {
      var props = {
        ref: 'altHidden',
        type: 'hidden',
        readOnly: true,
        name: this.props.freetextName,
        value: this.props.visibleValue
      };

      return props;
    }

    /**
     * Getter to return HTML for alternate hidden input to render method.
     *
     * @method alternateHiddenHTML
     * @return {Object} JSX
     */

  }, {
    key: 'alternateHiddenHTML',
    get: function get() {
      if (!this.props.freetext || !this.props.freetextName) {
        return null;
      }
      return _react2.default.createElement('input', this.alternateHiddenInputProps);
    }

    /**
     * Find and highlights search terms in text
     *
     * @method highlightMatches
     * @param {String} optionText - the text to search
     * @param {String} value - the search term
     */

  }, {
    key: 'writeable',


    /**
     * Returns whether input is writeable (for suggest or freetext modes)
     *
     * @method  writeable
     * @return  {Boolean}
     */
    get: function get() {
      return this.props.suggest || this.props.freetext;
    }
  }]);

  return DropdownFilter;
}(_dropdown2.default);

DropdownFilter.propTypes = (0, _lodash.assign)({}, _dropdown2.default.propTypes, {

  /**
   * The ID value for the component
   *
   * @property value
   * @type {String}
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * The visible value for the component
   * Provides a visible value in `freetext` mode when no option is selected.
   *
   * @property visibleValue
   * @type {String}
   */
  visibleValue: _propTypes2.default.string,

  /**
   * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
   *
   * @property options
   * @type {object}
   */
  options: _propTypes2.default.object.isRequired,

  /**
   * Enables create functionality for dropdown.
   *
   * @property create
   * @type {Function}
   */
  create: _propTypes2.default.func,

  /**
   * Customizes text for the create functionality of the dropdown.
   *
   * @property createText
   * @type {String}
   */
  createText: _propTypes2.default.string,

  /**
   * Customizes the Carbon Icon type for the create functionality of the dropdown.
   *
   * @property createIconType
   * @type {String}
   */
  createIconType: _propTypes2.default.string,

  /**
   * Should the dropdown act and look like a suggestable input instead.
   *
   * @property suggest
   * @type {Boolean}
   */
  suggest: _propTypes2.default.bool,

  /**
   * Should the dropdown accept free text as well as suggested options?
   *
   * @property freetext
   * @type {Boolean}
   */
  freetext: _propTypes2.default.bool,

  /**
   * Name for freetext value hidden input containing visibleValue in freetext mode
   *
   * @property freetextName
   * @type {String}
   */
  freetextName: _propTypes2.default.string
});
exports.default = DropdownFilter;