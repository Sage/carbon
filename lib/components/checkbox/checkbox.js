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

var _utilsDecoratorsInput = require('./../../utils/decorators/input');

var _utilsDecoratorsInput2 = _interopRequireDefault(_utilsDecoratorsInput);

var _utilsDecoratorsInputLabel = require('./../../utils/decorators/input-label');

var _utilsDecoratorsInputLabel2 = _interopRequireDefault(_utilsDecoratorsInputLabel);

var _utilsDecoratorsInputValidation = require('./../../utils/decorators/input-validation');

var _utilsDecoratorsInputValidation2 = _interopRequireDefault(_utilsDecoratorsInputValidation);

/**
 * A checkbox widget.
 *
 * == How to use a Checkbox in a component:
 *
 * In your file:
 *
 *   import Checkbox from 'carbon/lib/components/checkbox';
 *
 * To render the Checkbox:
 *
 *   <Checkbox name="myCheckbox" />
 *
 * @class Checkbox
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Checkbox = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputLabel2['default'])((0, _utilsDecoratorsInputValidation2['default'])((function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    var _this = this;

    _classCallCheck(this, Checkbox);

    _get(Object.getPrototypeOf(Checkbox.prototype), 'constructor', this).apply(this, arguments);

    this.handleOnChange = function (ev) {
      // we handle the change event manually here, as we pass the checked param
      // instead of value
      _this._handleOnChange({ target: { value: ev.target.checked } });
    };
  }

  _createClass(Checkbox, [{
    key: 'render',

    /**
     * Renders the component with props.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var labelRight = undefined,
          labelLeft = undefined;

      if (this.props.reverse) {
        labelLeft = this.labelHTML;
      } else {
        labelRight = this.labelHTML;
      }

      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        labelLeft,
        _react2['default'].createElement('input', this.hiddenInputProps),
        this.inputHTML,
        labelRight,
        this.validationHTML
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return 'ui-checkbox';
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     * @return {String} input className
     */
  }, {
    key: 'inputClasses',
    get: function get() {
      return 'ui-checkbox__input';
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * checkbox specific props.
     *
     * @method inputProps
     * @return {Object} Props to be applied to the input
     */
  }, {
    key: 'inputProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      props.type = "checkbox";
      // React uses checked instead of value to define the state of a checkbox
      props.checked = this.props.checked || this.props.value;
      props.value = "1";
      props.onChange = this.handleOnChange;
      return props;
    }

    /**
     * A getter for hidden input props.
     *
     * @method hiddenInputProps
     * @return {Object} Props to be applied to the hidden input
     */
  }, {
    key: 'hiddenInputProps',
    get: function get() {
      var props = {
        ref: "hidden",
        type: "hidden",
        value: "0",
        name: this.inputProps.name,
        readOnly: true
      };

      return props;
    }

    /**
     * Return the svg image for the checkbox
     *
     * @return {Object} JSX svg
     */
  }, {
    key: 'checkboxSprite',
    get: function get() {
      return _react2['default'].createElement(
        'svg',
        { width: '15', height: '15', viewBox: '0 0 15 15' },
        _react2['default'].createElement('rect', { className: 'checkbox-outline', fill: '#AFAFAF', x: '0', y: '0', width: '15', height: '15' }),
        _react2['default'].createElement('rect', { className: 'checkbox-fill', fill: '#FFFFFF', x: '1', y: '1', width: '13', height: '13' }),
        _react2['default'].createElement('path', { d: 'M5.06079081,11.805307 L2.2548404,9.4508351 C1.95287351,9.19745479 1.91372172, 8.74748731 2.16708208,8.44554418 L3.08395978,7.35285189 C3.3376225,7.05054844 3.78738919, 7.01144632 4.08921714,7.26471004 L6.46118447,9.25502694 L11.4959248,3.25485701 C11.7492184, 2.95299356 12.1993451,2.91365198 12.5012882,3.16701234 L13.5939805,4.08389004 C13.896284, 4.33755276 13.9353536,4.78735811 13.6820499,5.08923375 L8.30934217,11.4921775 C8.28333213, 11.5485068 8.24949267,11.6023543 8.20769039,11.6521724 L7.2908127,12.7448647 C7.12011041, 12.9482997 6.86060017,13.032541 6.61713008,12.9887006 C6.48855215,12.9709764 6.36324771, 12.9179844 6.25647356,12.8283903 L5.16378128,11.9115126 C5.12512704,11.8790778 5.09077658, 11.8434362 5.06079081,11.805307 L5.06079081,11.805307 Z', className: 'checkbox-check', fill: '#FFFFFF' })
      );
    }

    /**
     * Extends the input content to include the checkbox sprite
     *
     * @method additionalInputContent
     * @return {Object} JSX additional content inline with input
     */
  }, {
    key: 'additionalInputContent',
    get: function get() {
      return this.checkboxSprite;
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Sets the checked state of the checkbox
       *
       * @property defaultChecked
       * @type {Boolean}
       * @default false
       */
      defaultChecked: _react2['default'].PropTypes.bool,

      /**
       * Reverses label and checkbox display
       *
       * @property reverse
       * @type {Boolean}
       * @default false
       */
      reverse: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      defaultChecked: false,
      reverse: false
    },

    /**
     * Sets the value of the checkbox [true | false]
     *
     * @method handleOnChange
     * @param {Object} ev event
     * @return {void}
     */
    enumerable: true
  }]);

  return Checkbox;
})(_react2['default'].Component))));

exports['default'] = Checkbox;
module.exports = exports['default'];