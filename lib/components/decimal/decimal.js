'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18nJs = require("i18n-js");

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _utilsDecoratorsInput = require('./../../utils/decorators/input');

var _utilsDecoratorsInput2 = _interopRequireDefault(_utilsDecoratorsInput);

var _utilsDecoratorsInputLabel = require('./../../utils/decorators/input-label');

var _utilsDecoratorsInputLabel2 = _interopRequireDefault(_utilsDecoratorsInputLabel);

var _utilsDecoratorsInputValidation = require('./../../utils/decorators/input-validation');

var _utilsDecoratorsInputValidation2 = _interopRequireDefault(_utilsDecoratorsInputValidation);

/**
 * A decimal widget.
 *
 * == How to use a Decimal in a component:
 *
 * In your file
 *
 *   import Decimal from 'carbon/lib/components/decimal';
 *
 * To render the Decimal:
 *
 *   <Decimal name="myDecimal" />
 *
 * @class Decimal
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Decimal = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputLabel2['default'])((0, _utilsDecoratorsInputValidation2['default'])((function (_React$Component) {
  _inherits(Decimal, _React$Component);

  function Decimal() {
    var _this = this;

    _classCallCheck(this, Decimal);

    _get(Object.getPrototypeOf(Decimal.prototype), 'constructor', this).apply(this, arguments);

    this._document = document;
    this.highlighted = false;
    this.state = {
      /**
       * The formatted value for display
       *
       * @property visibleValue
       * @type {String}
       */
      visibleValue: formatVisibleValue(this.props.value, this)
    };

    this.emitOnChangeCallback = function (val) {
      var hiddenField = _this.refs.hidden;
      hiddenField.value = val;

      _this._handleOnChange({ target: hiddenField });
    };

    this.isValidDecimal = function (value) {
      var del = undefined,
          regex = undefined,
          result = undefined,
          sep = undefined;
      del = i18nFormatting().delimiter;
      sep = i18nFormatting().separator;
      regex = new RegExp('^[-]?[0-9]*(?:\\' + del + '?[0-9]?)*\\' + sep + '?[0-9]{0,}$');
      result = regex.test(value);

      return result;
    };

    this.handleVisibleInputChange = function (ev) {
      if (_this.isValidDecimal(ev.target.value)) {
        _this.setState({ visibleValue: ev.target.value });
        _this.emitOnChangeCallback(formatHiddenValue(ev.target.value));
      } else {
        // reset the value
        ev.target.value = _this.state.visibleValue;
        // reset the selection range
        ev.target.setSelectionRange(_this.selectionStart, _this.selectionEnd);
      }
    };

    this.handleBlur = function () {
      _this.setState({ visibleValue: formatVisibleValue(_this.props.value, _this) });
      _this.highlighted = false;
    };

    this.handleOnClick = function () {
      // if value is already highlighted then don't re-highlight it
      if (_this.highlighted) {
        _this.highlighted = false;
        return;
      }

      var input = _this.refs.visible;
      // only do it if the selection is not within the value
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        input.setSelectionRange(0, input.value.length);
        _this.highlighted = true;
      }
    };

    this.handleKeyDown = function (ev) {
      // track the selection start and end
      _this.selectionStart = ev.target.selectionStart;
      _this.selectionEnd = ev.target.selectionEnd;

      if (_this.props.onKeyDown) {
        // we also send the props so more information can be extracted by the action
        _this.props.onKeyDown(ev, _this.props);
      }
    };
  }

  _createClass(Decimal, [{
    key: 'componentWillReceiveProps',

    /**
     * A lifecycle method to update the visible value with a formatted version,
     * only when the field is not the active element.
     *
     * @method componentWillReceiveProps
     * @param {Object} props The new props passed down to the component
     * @return {void}
     */
    value: function componentWillReceiveProps(props) {
      if (this._document.activeElement != this.refs.visible) {
        var value = props.value || props.defaultValue;
        this.setState({ visibleValue: formatVisibleValue(value, this) });
      }
    }

    /**
     * Callback to update the hidden field on change.
     *
     * @method emitOnChangeCallback
     * @param {String} val The unformatted decimal value
     * @return {void}
     */
  }, {
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
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
    key: 'inputProps',

    /**
     * A getter that combines props passed down from the input decorator with
     * textbox specific props.
     *
     * @method inputProps
     * @return {Object} props to apply to input field
     */
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      props.ref = "visible";
      props.onChange = this.handleVisibleInputChange;
      props.onClick = this.handleOnClick;
      props.name = null;
      props.onBlur = this.handleBlur;
      props.value = this.state.visibleValue;
      props.onKeyDown = this.handleKeyDown;
      return props;
    }

    /**
     * A getter for hidden input props.
     *
     * @method hiddenInputProps
     * @return {Object} props to apply to hidden field
     */
  }, {
    key: 'hiddenInputProps',
    get: function get() {
      var props = {
        ref: "hidden",
        type: "hidden",
        readOnly: true,
        name: this.props.name
      };

      if (typeof this.props.value !== 'undefined') {
        props.value = this.props.value;
      } else {
        props.defaultValue = this.props.defaultValue;
      }

      return props;
    }

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      var classes = 'ui-decimal';

      if (this.props.className) {
        classes += ' ' + this.props.className;
      }

      return classes;
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     * @return {String} Input className
     */
  }, {
    key: 'inputClasses',
    get: function get() {
      return 'ui-decimal__input';
    }
  }], [{
    key: 'defaultProps',
    value: {
      /**
       * Sets the default value of the decimal field
       *
       * @property defaultValue
       * @type {String}
       * @default '0.00'
       */
      defaultValue: '0.00',

      /**
       * Sets the default value alignment
       *
       * @property align
       * @type {String}
       * @default 'right'
       */
      align: "right"
    },
    enumerable: true
  }]);

  return Decimal;
})(_react2['default'].Component))));

// Private Methods

/**
 * Formats delimiter and separator through i18n
 *
 * @method i18nFormatting
 * @private
 * @return {Object} Delimeter and separator values
 */
function i18nFormatting() {
  return {
    delimiter: _i18nJs2['default'].t("number.format.delimiter", { defaultValue: "," }),
    separator: _i18nJs2['default'].t("number.format.separator", { defaultValue: "." })
  };
}

/**
 * Removes delimiters and separators from value
 *
 * @method formatHiddenValue
 * @private
 * @param {String} valueToFormat Formatted value
 * @return {String} formated hidden value
 */
function formatHiddenValue(valueToFormat) {
  var value = valueToFormat;
  var regex = new RegExp('\\' + i18nFormatting().delimiter, "g");

  value = value.replace(regex, "", "g");
  value = value.replace(i18nFormatting().separator, ".");

  return value;
}

/**
 * Adds formatting to the value
 *
 * @method formatVisibleValue
 * @private
 * @param {String} value Unformatted Value
 * @param {Object} scope used to get default value of current scope if value doesn't exist
 * @return {String} formated value
 */
function formatVisibleValue(value, scope) {
  value = value || getDefaultValue(scope);

  value = _i18nJs2['default'].toNumber(value, {
    precision: 2,
    delimiter: i18nFormatting().delimiter,
    separator: i18nFormatting().separator
  });
  return value;
}

/**
 * Returns defaultValue for specified scope,
 *
 * @method getDefaultValue
 * @private
 * @param {Object} scope used to get default value of current scope
 * @return {String} default Value
 */
function getDefaultValue(scope) {
  if (typeof scope.refs.hidden !== 'undefined') {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
}

exports['default'] = Decimal;
module.exports = exports['default'];

/**
 * Stores the document - allows us to override it different contexts, such as
 * when running tests.
 *
 * @property _document
 * @type {document}
 */

/**
 * Used within the onClick and onBlur method to
 * check if the current visible input value is
 * highlighted
 *
 * @property highlighted
 * @type {Boolean}
 */

/**
 * Checks that visibleValue is valid decimal.
 * This is a post-processor applied after the value has been updated.
 *
 * @method isValidDecimal
 * @param {String} value new prop value
 * @return {Boolean} true if a valid decimal
 */

/**
 * Handles Change to visible field
 *
 * @method handleVisibleInputChange
 * @param {Object} ev event
 * @return {void}
 */

/**
 * Updates visible value on blur
 *
 * @method handleBlur
 * @return {void}
 */

/*
 * Selects visible input text depending on where the user clicks
 *
 * @method handleOnClick
 * @param {Object} ev event
 * @return {void}
 */

/*
 * Triggers on key down of the input
 *
 * @method handleKeyDown
 * @param {Object} ev event
 * @return {void}
 */