'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _inputIcon = require('./../../utils/decorators/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Dropdown = (0, _input2.default)((0, _inputIcon2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)((_temp = _class = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  /**
   * @constructor
   */
  function Dropdown() {
    var _ref;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /**
     * Determines if the blur event should be prevented.
     *
     * @property blockBlur
     * @type {Boolean}
     * @default false
     */
    var _this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args)));

    _this.state = {
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

    _this.emitOnChangeCallback = function (value, visibleValue) {
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

    _this.handleSelect = function (ev) {
      _this.selectValue(ev.currentTarget.getAttribute('value'), ev.currentTarget.textContent);
    };

    _this.handleMouseOverListItem = function (ev) {
      _this.setState({ highlighted: ev.currentTarget.getAttribute('value') });
    };

    _this.handleMouseEnterList = function () {
      _this.blockBlur = true;
    };

    _this.handleMouseLeaveList = function () {
      _this.blockBlur = false;
    };

    _this.handleMouseDownOnList = function (ev) {
      // if mouse down was on list (not list item), ensure the input retains focus
      // NOTE: this is an IE11 fix
      if (ev.target === _this.refs.list) {
        setTimeout(function () {
          _this._input.focus();
        }, 0);
      }
    };

    _this.handleBlur = function () {
      if (!_this.blockBlur) {
        _this.setState({ open: false });

        if (_this.props.onBlur) {
          _this.props.onBlur();
        }
      }
    };

    _this.handleFocus = function () {
      if (_this.blockFocus) {
        _this.blockFocus = false;
      } else {
        _this.setState({ open: true });
      }
    };

    _this.nameByID = function () {
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

    _this.handleKeyDown = function (ev) {
      ev.stopPropagation();

      if (!_this.refs.list) {
        // if up/down/space then open list
        if (_events2.default.isUpKey(ev) || _events2.default.isDownKey(ev) || _events2.default.isSpaceKey(ev)) {
          ev.preventDefault();
          _this.setState({ open: true });
        }

        return;
      }

      var list = _this.refs.list,
          element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0],
          nextVal = void 0;

      switch (ev.which) {
        case 13:
          // return
          if (element) {
            ev.preventDefault();
            _this.selectValue(element.getAttribute('value'), element.textContent);
          }
          break;
        case 38:
          // up arrow
          ev.preventDefault();
          nextVal = _this.onUpArrow(list, element);
          break;
        case 40:
          // down arrow
          ev.preventDefault();
          nextVal = _this.onDownArrow(list, element);
          break;
      }
      _this.setState({ highlighted: nextVal });
    };

    _this.onUpArrow = function (list, element) {
      var nextVal = list.lastChild.getAttribute('value');

      if (element === list.firstChild) {
        _this.updateScroll(list, list.lastChild);
        nextVal = list.lastChild.getAttribute('value');
      } else if (element && element.previousElementSibling) {
        _this.updateScroll(list, element.previousElementSibling);
        nextVal = element.previousElementSibling.getAttribute('value');
      }
      return nextVal;
    };

    _this.onDownArrow = function (list, element) {
      var nextVal = list.firstChild.getAttribute('value');

      if (element === list.lastChild) {
        _this.updateScroll(list, list.firstChild);
        nextVal = list.firstChild.getAttribute('value');
      } else if (element && element.nextElementSibling) {
        _this.updateScroll(list, element.nextElementSibling);
        nextVal = element.nextElementSibling.getAttribute('value');
      }
      return nextVal;
    };

    _this.highlighted = function () {
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

    _this.blockBlur = false;

    /**
     * Variable to cache current value.
     * Setting it here rather than state prevents complete rerender when value changes.
     *
     * @property visibleValue
     * @type {String}
     * @default ''
     */
    _this.visibleValue = '';

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    _this.selectValue = _this.selectValue.bind(_this);
    _this.results = _this.results.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',


    /**
     * Manually focus if autoFocus is applied - allows us to prevent the list from opening.
     *
     * @method componentDidMount
     */
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.blockFocus = true;
        this._input.focus();
      }
    }

    /**
     * Clears the visible value if a new value has been selected.
     *
     * @method componentWillReceiveProps
     * @param {Object} nextProps the updated props
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.cacheVisibleValue || nextProps.value !== this.props.value) {
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
      this._handleContentChange();
      this.emitOnChangeCallback(val, visibleVal);
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }

    /**
     * Runs the callback onChange action
     *
     * @method emitOnChangeCallback
     * @param {Object} value Value of the selected list item
     */


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
     * Gets the previous item on up arrow
     *
     * @method onDownArrow
     * @param {HTML} list ul element
     * @param {HTML} element current li element
     * @return {HTML} nextVal next li element to be selected
     */


    /**
     * Gets the next item on down arrow
     *
     * @method onDownArrow
     * @param {HTML} list ul element
     * @param {HTML} element current li element
     * @return {HTML} nextVal next li element to be selected
     */

  }, {
    key: 'updateScroll',


    /**
     * Sets the scroll position for the list
     *
     * @method updateScroll
     * @param {HTML} list ul element
     * @param {HTML} element current li element
     * @return {Void}
     */
    value: function updateScroll(list, nextItem) {
      var firstTop = list.firstChild.offsetTop,
          itemHeight = nextItem.offsetHeight,
          listHeight = list.offsetHeight;

      if (nextItem.offsetTop + itemHeight > listHeight) {
        list.scrollTop = nextItem.offsetTop - firstTop - (listHeight - itemHeight);
      } else if (nextItem.offsetTop === 1) {
        list.scrollTop = nextItem.offsetTop - firstTop;
      }
    }

    /**
     * Return the list item which should be highlighted by default.
     *
     * @method highlighted
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

      var className = 'carbon-dropdown__list-item',
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

        return _react2.default.createElement(
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
    key: 'showArrow',


    /**
     * Determines whether dropdown arrow is displayed
     *
     * @method showArrow
     * @return {Boolean}
     */
    value: function showArrow() {
      return true;
    }

    /**
     * Renders the component.
     *
     * @method render
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.mainClasses },
        this.labelHTML,
        this.inputHTML,
        _react2.default.createElement('input', this.hiddenInputProps),
        this.validationHTML,
        this.fieldHelpHTML
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

      delete props.autoFocus;

      props.className = this.inputClasses;
      props.value = this.visibleValue || this.nameByID();
      props.name = null;
      props.onBlur = this.handleBlur;
      props.onKeyDown = this.handleKeyDown;
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
      return {
        key: "listBlock",
        ref: "listBlock",
        onMouseDown: this.handleMouseDownOnList,
        onMouseLeave: this.handleMouseLeaveList,
        onMouseEnter: this.handleMouseEnterList,
        className: 'carbon-dropdown__list-block'
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
      return {
        key: "list",
        ref: "list",
        className: 'carbon-dropdown__list'
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
      return (0, _classnames2.default)('carbon-dropdown', { 'carbon-dropdown--open': this.state.open });
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      return 'carbon-dropdown__input';
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
      return _react2.default.createElement(
        'ul',
        this.listProps,
        this.results(this.options)
      );
    }
  }, {
    key: 'additionalInputContent',
    get: function get() {
      var content = [];

      if (this.showArrow()) {
        content.push(this.inputIconHTML("dropdown"));
      }
      content.push(_react2.default.createElement(
        'div',
        this.listBlockProps,
        this.listHTML
      ));

      return content;
    }
  }]);

  return Dropdown;
}(_react2.default.Component), _class.propTypes = {
  /**
   * The ID value for the component
   *
   * @property value
   * @type {String}
   */
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),

  /**
   * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
   *
   * This should be an Immutable object.
   *
   * @property options
   * @type {object}
   */
  options: _react2.default.PropTypes.object.isRequired,

  /**
   * Determines if the visibleValue will be cached or not.
   *
   * @property cacheVisibleValue
   * @type {boolean}
   */
  cacheVisibleValue: _react2.default.PropTypes.bool
}, _class.defaultProps = {
  cacheVisibleValue: false
}, _temp)))));

exports.default = Dropdown;