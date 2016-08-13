/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Textbox = /*istanbul ignore next*/(0, _input2.default)( /*istanbul ignore next*/(0, _inputLabel2.default)( /*istanbul ignore next*/(0, _inputValidation2.default)( /*istanbul ignore next*/function (_React$Component) {
  _inherits(Textbox, _React$Component);

  function Textbox() {
    _classCallCheck(this, Textbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Textbox).apply(this, arguments));
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
      /*istanbul ignore next*/
      var _this2 = this;

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses,
            ref: function /*istanbul ignore next*/ref(comp) /*istanbul ignore next*/{
              return (/*istanbul ignore next*/_this2._target = comp
              );
            } },
          this.labelHTML,
          this.inputHTML,
          this.validationHTML,
          this.fieldHelpHTML
        )
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
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      return props;
    }
  }]);

  return Textbox;
}( /*istanbul ignore next*/_react2.default.Component))));

/*istanbul ignore next*/exports.default = Textbox;