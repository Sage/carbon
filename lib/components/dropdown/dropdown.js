/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_input = require('./../../utils/decorators/input');

/*istanbul ignore next*/
var _input2 = _interopRequireDefault(_input);

var /*istanbul ignore next*/_inputLabel = require('./../../utils/decorators/input-label');

/*istanbul ignore next*/
var _inputLabel2 = _interopRequireDefault(_inputLabel);

var /*istanbul ignore next*/_inputValidation = require('./../../utils/decorators/input-validation');

/*istanbul ignore next*/
var _inputValidation2 = _interopRequireDefault(_inputValidation);

var /*istanbul ignore next*/_inputIcon = require('./../../utils/decorators/input-icon');

/*istanbul ignore next*/
var _inputIcon2 = _interopRequireDefault(_inputIcon);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_events = require('./../../utils/helpers/events');

/*istanbul ignore next*/
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
var Dropdown = /*istanbul ignore next*/(0, _input2.default)( /*istanbul ignore next*/(0, _inputIcon2.default)( /*istanbul ignore next*/(0, _inputLabel2.default)( /*istanbul ignore next*/(0, _inputValidation2.default)( /*istanbul ignore next*/(_temp = _class = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  /**
   * @constructor
   */

  function /*istanbul ignore next*/Dropdown() {
    /*istanbul ignore next*/
    var _Object$getPrototypeO;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /*istanbul ignore next*/

    /**
     * Determines if the blur event should be prevented.
     *
     * @property blockBlur
     * @type {Boolean}
     * @default false
     */

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Dropdown)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    /*istanbul ignore next*/_this.state = {
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
    /*istanbul ignore next*/
    _this.emitOnChangeCallback = function (value, visibleValue) {
      // To be consistent, always return string
      value = String(value);
      // mock a standard input event return, with target and value
      /*istanbul ignore next*/_this._handleOnChange({
        target: {
          value: value,
          visibleValue: visibleValue
        }
      });
    };

    /*istanbul ignore next*/
    _this.handleSelect = function (ev) {
      /*istanbul ignore next*/_this.selectValue(ev.currentTarget.getAttribute('value'), ev.currentTarget.textContent);
    };

    /*istanbul ignore next*/
    _this.handleMouseOverListItem = function (ev) {
      /*istanbul ignore next*/_this.setState({ highlighted: ev.currentTarget.getAttribute('value') });
    };

    /*istanbul ignore next*/
    _this.handleMouseEnterList = function () {
      /*istanbul ignore next*/_this.blockBlur = true;
    };

    /*istanbul ignore next*/
    _this.handleMouseLeaveList = function () {
      /*istanbul ignore next*/_this.blockBlur = false;
    };

    /*istanbul ignore next*/
    _this.handleMouseDownOnList = function (ev) {
      // if mouse down was on list (not list item), ensure the input retains focus
      // NOTE: this is an IE11 fix
      if (ev.target === /*istanbul ignore next*/_this.refs.list) {
        setTimeout(function () {
          /*istanbul ignore next*/_this._input.focus();
        }, 0);
      }
    };

    /*istanbul ignore next*/
    _this.handleBlur = function () {
      if (! /*istanbul ignore next*/_this.blockBlur) {
        /*istanbul ignore next*/
        (function () {
          var highlighted = /*istanbul ignore next*/_this.highlighted( /*istanbul ignore next*/_this.options);

          if (highlighted != /*istanbul ignore next*/_this.props.value) {
            var item = /*istanbul ignore next*/_this.props.options.find(function (item) {
              return item.get('id') == highlighted;
            });

            /*istanbul ignore next*/_this.emitOnChangeCallback(highlighted, item.get('name'));
          }

          /*istanbul ignore next*/_this.setState({ open: false });
        })();
      }
    };

    /*istanbul ignore next*/
    _this.handleFocus = function () {
      if ( /*istanbul ignore next*/_this.blockFocus) {
        /*istanbul ignore next*/_this.blockFocus = false;
      } else {
        /*istanbul ignore next*/_this.setState({ open: true });
      }
    };

    /*istanbul ignore next*/
    _this.nameByID = function () {
      if ( /*istanbul ignore next*/_this.props.options) {
        /*istanbul ignore next*/_this.visibleValue = '';
        // if no value selected, no match possible
        if (! /*istanbul ignore next*/_this.props.value) {
          return (/*istanbul ignore next*/_this.visibleValue
          );
        }

        // Match selected id to corresponding list option
        var option = /*istanbul ignore next*/_this.props.options.find(function (item) {
          return item.get('id') == /*istanbul ignore next*/_this.props.value;
        });
        // If match is found, set visibleValue to option's name;
        if (option) {
          /*istanbul ignore next*/_this.visibleValue = option.get('name');
        }
      }

      // If match is found, set value to option's name;
      return (/*istanbul ignore next*/_this.visibleValue
      );
    };

    /*istanbul ignore next*/
    _this.handleKeyDown = function (ev) {
      ev.stopPropagation();

      if (! /*istanbul ignore next*/_this.refs.list) {
        // if up/down/space then open list
        if ( /*istanbul ignore next*/_events2.default.isUpKey(ev) || /*istanbul ignore next*/_events2.default.isDownKey(ev) || /*istanbul ignore next*/_events2.default.isSpaceKey(ev)) {
          ev.preventDefault();
          /*istanbul ignore next*/_this.setState({ open: true });
        }

        return;
      }

      var list = /*istanbul ignore next*/_this.refs.list,
          element = list.getElementsByClassName('ui-dropdown__list-item--highlighted')[0],
          nextVal = /*istanbul ignore next*/void 0;

      switch (ev.which) {
        case 13:
          // return
          if (element) {
            ev.preventDefault();
            /*istanbul ignore next*/_this.selectValue(element.getAttribute('value'), element.textContent);
          }
          break;
        case 38:
          // up arrow
          ev.preventDefault();
          nextVal = /*istanbul ignore next*/_this.onUpArrow(list, element);
          break;
        case 40:
          // down arrow
          ev.preventDefault();
          nextVal = /*istanbul ignore next*/_this.onDownArrow(list, element);
          break;
      }
      /*istanbul ignore next*/_this.setState({ highlighted: nextVal });
    };

    /*istanbul ignore next*/
    _this.onUpArrow = function (list, element) {
      var nextVal = list.lastChild.getAttribute('value');

      if (element === list.firstChild) {
        /*istanbul ignore next*/_this.updateScroll(list, list.lastChild);
        nextVal = list.lastChild.getAttribute('value');
      } else if (element && element.previousElementSibling) {
        /*istanbul ignore next*/_this.updateScroll(list, element.previousElementSibling);
        nextVal = element.previousElementSibling.getAttribute('value');
      }
      return nextVal;
    };

    /*istanbul ignore next*/
    _this.onDownArrow = function (list, element) {
      var nextVal = list.firstChild.getAttribute('value');

      if (element === list.lastChild) {
        /*istanbul ignore next*/_this.updateScroll(list, list.firstChild);
        nextVal = list.firstChild.getAttribute('value');
      } else if (element && element.nextElementSibling) {
        /*istanbul ignore next*/_this.updateScroll(list, element.nextElementSibling);
        nextVal = element.nextElementSibling.getAttribute('value');
      }
      return nextVal;
    };

    /*istanbul ignore next*/
    _this.highlighted = function () {
      var highlighted = null;

      if ( /*istanbul ignore next*/_this.state.highlighted) {
        return (/*istanbul ignore next*/_this.state.highlighted
        );
      } else {
        if ( /*istanbul ignore next*/_this.props.value) {
          return (/*istanbul ignore next*/_this.props.value
          );
        }
      }

      return highlighted;
    };

    /*istanbul ignore next*/_this.blockBlur = false;

    /**
     * Variable to cache current value.
     * Setting it here rather than state prevents complete rerender when value changes.
     *
     * @property visibleValue
     * @type {String}
     * @default ''
     */
    /*istanbul ignore next*/_this.visibleValue = '';

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    /*istanbul ignore next*/_this.selectValue = /*istanbul ignore next*/_this.selectValue.bind( /*istanbul ignore next*/_this);
    /*istanbul ignore next*/_this.results = /*istanbul ignore next*/_this.results.bind( /*istanbul ignore next*/_this);
    /*istanbul ignore next*/return _this;
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
      this._handleContentChange();
      this.emitOnChangeCallback(val, visibleVal);
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
      /*istanbul ignore next*/
      var _this2 = this;

      var className = 'ui-dropdown__list-item',
          highlighted = this.highlighted(options);

      var results = options.map(function (option) {
        var klass = className;

        // add highlighted class
        if (highlighted == option.id) {
          klass += /*istanbul ignore next*/' ' + className + '--highlighted';
        }

        // add selected class
        if ( /*istanbul ignore next*/_this2.props.value == option.id) {
          klass += /*istanbul ignore next*/' ' + className + '--selected';
        }

        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'li',
            /*istanbul ignore next*/{
              key: option.name + option.id,
              value: option.id,
              onClick: /*istanbul ignore next*/_this2.handleSelect,
              onMouseOver: /*istanbul ignore next*/_this2.handleMouseOverListItem,
              className: klass },
            option.name
          )
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          this.labelHTML,
          this.inputHTML,
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'input', this.hiddenInputProps),
          this.validationHTML,
          this.fieldHelpHTML
        )
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
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var autoFocus = _props.autoFocus;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['autoFocus']);

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
        className: 'ui-dropdown__list-block'
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
        className: 'ui-dropdown__list'
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-dropdown', { 'ui-dropdown--open': this.state.open })
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
      return 'ui-dropdown__input';
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'ul',
          this.listProps,
          this.results(this.options)
        )
      );
    }
  }, {
    key: 'additionalInputContent',
    get: function get() {
      var content = [];

      if (!this.props.suggest) {
        content.push(this.inputIconHTML("dropdown"));
      }

      content.push( /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'div',
        this.listBlockProps,
        this.listHTML
      ));

      return content;
    }
  }]);

  return Dropdown;
}( /*istanbul ignore next*/_react2.default.Component), _class.propTypes = {
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
   * This should be an Immutable object.
   *
   * @property options
   * @type {object}
   */
  options: /*istanbul ignore next*/_react2.default.PropTypes.object.isRequired
}, _temp)))));

/*istanbul ignore next*/exports.default = Dropdown;