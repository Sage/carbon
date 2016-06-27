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

/**
 * A textbox widget.
 *
 * == How to use a Textbox in a component:
 *
 * In your file
 *
 *   import Textbox from 'carbon/lib/components/textbox';
 *
 * To render a Textbox:
 *
 *   <Textbox name="myTextbox" />
 *
 * @class Textbox
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Textbox = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputLabel2['default'])((0, _utilsDecoratorsInputValidation2['default'])((function (_React$Component) {
  _inherits(Textbox, _React$Component);

  function Textbox() {
    _classCallCheck(this, Textbox);

    _get(Object.getPrototypeOf(Textbox.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Textbox, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses,
          ref: function (comp) {
            return _this._target = comp;
          } },
        this.labelHTML,
        this.inputHTML,
        this.validationHTML,
        this.fieldHelpHTML
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {void}
     */
    get: function get() {
      return 'ui-textbox';
    }

    /**
     * Input class getter
     *
     * @method inputClasses
     */
  }, {
    key: 'inputClasses',
    get: function get() {
      return 'ui-textbox__input';
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * textbox specific props.
     *
     * @method inputProps
     * @return {Object} props for the input
     */
  }, {
    key: 'inputProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      return props;
    }
  }]);

  return Textbox;
})(_react2['default'].Component))));

exports['default'] = Textbox;
module.exports = exports['default'];