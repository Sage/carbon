'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dropdown = require('./../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

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

var DropdownFilter = (function (_Dropdown) {
  _inherits(DropdownFilter, _Dropdown);

  function DropdownFilter() {
    var _this = this;

    _classCallCheck(this, DropdownFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(DropdownFilter.prototype), 'constructor', this).apply(this, args);

    /**
     * The user input search text.
     *
     * @property filter
     * @type {String}
     * @default null
     */

    this.handleBlur = function () {
      if (!_this.blockBlur) {
        (function () {
          var filter = _this.props.create ? _this.state.filter : null,
              highlighted = _this.highlighted(_this.options);

          if (highlighted != _this.props.value) {
            var item = _this.props.options.find(function (item) {
              return String(item.get('id')) === String(highlighted);
            });

            _this.emitOnChangeCallback(highlighted, item.get('name'));
          }

          _this.setState({ open: false, filter: filter });
        })();
      }
    };

    this.handleFocus = function () {
      if (!_this.props.suggest) {
        _this.setState({ open: true });
      }

      _this.refs.input.setSelectionRange(0, _this.refs.input.value.length);
    };

    this.handleCreate = function (ev) {
      _this.setState({ open: false });
      _this.props.create(ev, _this);
    };

    this.prepareList = function (options) {
      if ((_this.props.suggest || !_this.openingList) && typeof _this.state.filter === 'string') {
        (function () {
          var filter = _this.state.filter;
          var regex = new RegExp(filter, 'i');

          // if user has entered a search filter
          options = options.filter(function (option) {
            if (option.name.search(regex) > -1) {
              option.name = _this.highlightMatches(option.name, filter);
              return option;
            }
          });
        })();
      }

      return options;
    };

    this.highlighted = function (options) {
      var highlighted = null;

      if (_this.state.highlighted) {
        highlighted = _this.state.highlighted;
      } else {
        if (!_this.state.filter && _this.props.value) {
          highlighted = _this.props.value;
        } else if (_this.state.filter && options.length) {
          highlighted = options[0].id;
        }
      }

      return highlighted;
    };

    this.highlightMatches = function (optionText, value) {
      if (!value.length) {
        return optionText;
      }

      var beginning = undefined,
          end = undefined,
          middle = undefined,
          newValue = undefined,
          parsedOptionText = undefined,
          valIndex = undefined;

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
        end = _this.highlightMatches(end, value);
      }

      // build JSX object
      newValue = [_react2['default'].createElement(
        'span',
        { key: 'beginning' },
        beginning
      ), _react2['default'].createElement(
        'strong',
        { key: 'middle' },
        _react2['default'].createElement(
          'u',
          null,
          middle
        )
      ), _react2['default'].createElement(
        'span',
        { key: 'end' },
        end
      )];

      return newValue;
    };

    this.state.filter = null;

    /**
     * Determines if list is being opened on current render.
     *
     * @property openingList
     * @type {Boolean}
     * @default false
     */
    this.openingList = false;

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
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
      _get(Object.getPrototypeOf(DropdownFilter.prototype), 'selectValue', this).call(this, val, visibleVal);
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

      if (this.props.suggest && ev.target.value.length > 0) {
        state.open = true;
      } else if (this.props.suggest) {
        state.open = false;
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
  }, {
    key: 'results',

    /**
     * Function that returns search results. Builds each list item with relevant handlers and classes.
     *
     * @method results
     */
    value: function results(options) {
      var items = _get(Object.getPrototypeOf(DropdownFilter.prototype), 'results', this).call(this, options);

      if (!items.length) {
        items = _react2['default'].createElement(
          'li',
          { className: 'ui-dropdown__list__item ui-dropdown__list__item--no-results' },
          _i18nJs2['default'].t("dropdownlist.no_results", {
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
      var original = _get(Object.getPrototypeOf(DropdownFilter.prototype), 'listHTML', this),
          html = [original];

      if (this.state.open && this.props.create) {
        var text = "Create ";

        if (this.state.filter) {
          text += '"' + this.state.filter + '"';
        } else {
          text += "New";
        }

        html.push(_react2['default'].createElement(
          'a',
          { key: 'dropdown-action', className: 'ui-dropdown__action', onClick: this.handleCreate },
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
      var classes = _get(Object.getPrototypeOf(DropdownFilter.prototype), 'mainClasses', this);
      return classes + ' ui-dropdown-filter';
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     */
  }, {
    key: 'inputClasses',
    get: function get() {
      var classes = _get(Object.getPrototypeOf(DropdownFilter.prototype), 'inputClasses', this);

      if (!this.props.create && typeof this.state.filter === 'string') {
        classes += ' ui-dropdown__input--filtered';
      }

      return classes;
    }

    /**
     * Input props for the dropdown, extended from the base dropdown component.
     *
     * @method inputProps
     */
  }, {
    key: 'inputProps',
    get: function get() {
      var props = _get(Object.getPrototypeOf(DropdownFilter.prototype), 'inputProps', this);

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
  }], [{
    key: 'propTypes',
    value: {
      /**
       * The ID value for the component
       *
       * @property value
       * @type {String}
       */
      value: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),

      /**
       * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
       *
       * @property options
       * @type {object}
       */
      options: _react2['default'].PropTypes.object.isRequired,

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
  }]);

  return DropdownFilter;
})(_dropdown2['default']);

exports['default'] = DropdownFilter;
module.exports = exports['default'];

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