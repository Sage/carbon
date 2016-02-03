'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsDecoratorsInput = require('./../../utils/decorators/input');

var _utilsDecoratorsInput2 = _interopRequireDefault(_utilsDecoratorsInput);

var _utilsDecoratorsInputLabel = require('./../../utils/decorators/input-label');

var _utilsDecoratorsInputLabel2 = _interopRequireDefault(_utilsDecoratorsInputLabel);

var _utilsDecoratorsInputValidation = require('./../../utils/decorators/input-validation');

var _utilsDecoratorsInputValidation2 = _interopRequireDefault(_utilsDecoratorsInputValidation);

var _utilsDecoratorsInputIcon = require('./../../utils/decorators/input-icon');

var _utilsDecoratorsInputIcon2 = _interopRequireDefault(_utilsDecoratorsInputIcon);

/**
 * A dropdown widget.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import Dropdown from 'carbon/lib/components/dropdown';
 *
 * To render a Dropdown:
 *
 *   <Dropdown name="foo" options={ foo } onChange={ myChangeHandler } />
 *
 * The developer should pass data to the store as JSON. e.g.
 *
 *   foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]
 *
 * @class Dropdown
 * @constructor
 * @decorators {List,Input,InputIcon,InputLabel,InputValidation}
 */
var Dropdown = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputIcon2['default'])((0, _utilsDecoratorsInputLabel2['default'])((0, _utilsDecoratorsInputValidation2['default'])((function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  /**
   * @constructor
   */

  function Dropdown() {
    var _this = this;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(Dropdown.prototype), 'constructor', this).apply(this, args);

    /**
     * Determines if the blur event should be prevented.
     *
     * @property blockBlur
     * @type {Boolean}
     * @default false
     */
    this.state = {
      /**
       * Defines whether the list is open or not.
       *
       * @property open
       * @type {Boolean}
       * @default false
       */
      open: false,

      /**
       * The ID of the highlighted item in the list.
       *
       * @property highlighted
       * @type {Number}
       * @default null
       */
      highlighted: null
    };

    this.emitOnChangeCallback = function (value, visibleValue) {
      // To be consistent, always return string
      value = String(value);
      // mock a standard input event return, with target and value
      _this._handleOnChange({
        target: {
          value: value,
          visibleValue: visibleValue
        }
      });
    };

    this.handleSelect = function (ev) {
      _this.selectValue(ev.currentTarget.getAttribute('value'), ev.currentTarget.textContent);
    };

    this.handleMouseOverListItem = function (ev) {
      _this.setState({ highlighted: ev.currentTarget.getAttribute('value') });
    };

    this.handleMouseEnterList = function () {
      _this.blockBlur = true;
    };

    this.handleMouseLeaveList = function () {
      _this.blockBlur = false;
    };

    this.handleMouseDownOnList = function (ev) {
      // if mouse down was on list (not list item), ensure the input retains focus
      // NOTE: this is an IE11 fix
      if (ev.target === _this.refs.list) {
        setTimeout(function () {
          _this.refs.input.focus();
        }, 0);
      }
    };

    this.handleBlur = function () {
      if (!_this.blockBlur) {
        (function () {
          var highlighted = _this.highlighted(_this.options);

          if (highlighted != _this.props.value) {
            var item = _this.props.options.find(function (item) {
              return item.get('id') === highlighted;
            });

            _this.emitOnChangeCallback(highlighted, item.get('name'));
          }

          _this.setState({ open: false });
        })();
      }
    };

    this.handleFocus = function () {
      _this.setState({
        open: true
      });
    };

    this.nameByID = function () {
      if (_this.props.options) {
        _this.visibleValue = '';

        // if no value selected, no match possible
        if (!_this.props.value) {
          return _this.visibleValue;
        }

        // Match selected id to corresponding list option
        var option = _this.props.options.find(function (item) {
          return item.get('id') == _this.props.value;
        });

        // If match is found, set visibleValue to option's name;
        if (option) {
          _this.visibleValue = option.get('name');
        }
      }

      // If match is found, set value to option's name;
      return _this.visibleValue;
    };

    this.handleKeyDown = function (ev) {
      if (!_this.refs.list) {
        return;
      }

      var list = _this.refs.list,
          element = list.getElementsByClassName('ui-dropdown__list__item--highlighted')[0],
          nextVal = undefined;

      switch (ev.which) {
        case 13:
          // return
          if (element) {
            ev.preventDefault();
            _this.selectValue(element.value, element.textContent);
          }
          break;
        case 38:
          // up arrow
          ev.preventDefault();
          nextVal = list.lastChild.value;

          if (element && element.previousElementSibling) {
            nextVal = element.previousElementSibling.value;
          }

          _this.setState({ highlighted: nextVal });
          break;
        case 40:
          // down arrow
          ev.preventDefault();
          nextVal = list.firstChild.value;

          if (element && element.nextElementSibling) {
            nextVal = element.nextElementSibling.value;
          }

          _this.setState({ highlighted: nextVal });
          break;
      }
    };

    this.highlighted = function () {
      var highlighted = null;

      if (_this.state.highlighted) {
        return _this.state.highlighted;
      } else {
        if (_this.props.value) {
          return _this.props.value;
        }
      }

      return highlighted;
    };

    this.blockBlur = false;

    /**
     * Variable to cache current value.
     * Setting it here rather than state prevents complete rerender when value changes.
     *
     * @property visibleValue
     * @type {String}
     * @default ''
     */
    this.visibleValue = '';

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    this.selectValue = this.selectValue.bind(this);
    this.results = this.results.bind(this);
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',

    /**
     * Clears the visible value if a new value has been selected.
     *
     * @method componentWillReceiveProps
     * @param {Object} nextProps the updated props
     */
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value != this.props.value) {
        // clear the cache
        this.visibleValue = null;
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
      this.blockBlur = false;
      this.setState({ open: false });
      this.emitOnChangeCallback(val, visibleVal);
    }

    /**
     * Runs the callback onChange action
     *
     * @method emitOnChangeCallback
     * @param {Object} value Value of the selected list item
     */
  }, {
    key: 'results',

    /**
     * Function that returns search results. Builds each list item with relevant handlers and classes.
     *
     * @method results
     */
    value: function results(options) {
      var _this2 = this;

      var className = 'ui-dropdown__list__item',
          highlighted = this.highlighted(options);

      var results = options.map(function (option) {
        var klass = className;

        // add highlighted class
        if (highlighted == option.id) {
          klass += ' ' + className + '--highlighted';
        }

        // add selected class
        if (_this2.props.value == option.id) {
          klass += ' ' + className + '--selected';
        }

        return _react2['default'].createElement(
          'li',
          {
            key: option.name + option.id,
            value: option.id,
            onClick: _this2.handleSelect,
            onMouseOver: _this2.handleMouseOverListItem,
            className: klass },
          option.name
        );
      });

      return results;
    }

    /**
     * Extends the input content to include the input icon.
     *
     * @method additionalInputContent
     */
  }, {
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        this.labelHTML,
        this.inputHTML,
        _react2['default'].createElement('input', this.hiddenInputProps),
        this.validationHTML
      );
    }
  }, {
    key: 'options',

    /**
     * Returns the list options in the correct format
     *
     * @method options
     */
    get: function get() {
      return this.props.options.toJS();
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * dropdown specific props.
     *
     * @method inputProps
     */
  }, {
    key: 'inputProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      props.value = this.visibleValue || this.nameByID();
      props.name = null;
      props.onBlur = this.handleBlur;
      props.onKeyDown = this.handleKeyDown;
      props.ref = "input";
      props.readOnly = true;

      if (!this.props.readOnly && !this.props.disabled) {
        props.onFocus = this.handleFocus;
      }

      return props;
    }

    /**
     * A getter for hidden input props.
     *
     * @method hiddenInputProps
     */
  }, {
    key: 'hiddenInputProps',
    get: function get() {
      var props = {
        ref: "hidden",
        type: "hidden",
        readOnly: true,
        name: this.props.name,
        value: this.props.value
      };

      return props;
    }

    /**
     * Properties to be assigned to the list.
     *
     * @method listProps
     */
  }, {
    key: 'listBlockProps',
    get: function get() {
      var listClasses = 'ui-dropdown__list-block';

      return {
        key: "listBlock",
        ref: "listBlock",
        onMouseDown: this.handleMouseDownOnList,
        onMouseLeave: this.handleMouseLeaveList,
        onMouseEnter: this.handleMouseEnterList,
        className: listClasses
      };
    }

    /**
     * Properties to be assigned to the list.
     *
     * @method listProps
     */
  }, {
    key: 'listProps',
    get: function get() {
      var listClasses = 'ui-dropdown__list';

      return {
        key: "list",
        ref: "list",
        className: listClasses
      };
    }

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      var classes = 'ui-dropdown';

      if (this.state.open) {
        classes += ' ui-dropdown--open';
      }

      return classes;
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     */
  }, {
    key: 'inputClasses',
    get: function get() {
      var inputClasses = 'ui-dropdown__input';

      return inputClasses;
    }

    /**
     * Getter to return HTML for list to render method.
     *
     * @method listHTML
     */
  }, {
    key: 'listHTML',
    get: function get() {
      if (!this.state.open) {
        return null;
      }

      return _react2['default'].createElement(
        'ul',
        this.listProps,
        this.results(this.options)
      );
    }
  }, {
    key: 'additionalInputContent',
    get: function get() {
      var content = [];

      if (!this.props.suggest) {
        content.push(this.inputIconHTML("dropdown"));
      }

      content.push(_react2['default'].createElement(
        'div',
        this.listBlockProps,
        this.listHTML
      ));

      return content;
    }
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
       * This should be an Immutable object.
       *
       * @property options
       * @type {object}
       */
      options: _react2['default'].PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return Dropdown;
})(_react2['default'].Component)))));

exports['default'] = Dropdown;
module.exports = exports['default'];

/**
 * Handles a select action on a list item
 *
 * @method handleSelect
 * @param {Object} ev event
 */

/**
 * Handles a mouse over event for list items.
 *
 * @method handleMouseOverListItem
 * @param {Object} ev event
 */

/*
 * Handles when the mouse hovers over the list.
 *
 * @method handleMouseEnterList
 */

/**
 * Handles when the mouse hovers out of the list.
 *
 * @method handleMouseLeaveList
 */

/**
 * Handles when the mouse clicks on the list.
 *
 * @method handleMouseDownOnList
 */

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
 * Sets the selected value based on selected id.
 *
 * @method nameByID
 * @param {String} value
 */

/**
 * Handles when a user keys up on input.
 *
 * @method handleKeyUp
 * @param {Object} ev event
 */

/**
 * Return the list item which should be highlighted by default.
 *
 * @method highlighted
 */