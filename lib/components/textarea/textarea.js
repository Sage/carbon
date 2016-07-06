/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

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
 * A textarea widget.
 *
 * == How to use a Textarea in a component:
 *
 * In your file:
 *
 *   import Textarea from 'carbon/lib/components/textarea';
 *
 * To render a Textarea:
 *
 *   <Textarea name="myTextarea" />
 *
 * @class Textarea
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Textarea = /*istanbul ignore next*/(0, _input2.default)( /*istanbul ignore next*/(0, _inputLabel2.default)( /*istanbul ignore next*/(0, _inputValidation2.default)( /*istanbul ignore next*/(_temp2 = _class = function (_React$Component) {
  _inherits(Textarea, _React$Component);

  function Textarea() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Textarea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Textarea)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.minHeight = 0, _this.expandTextarea = function () {
      var textarea = /*istanbul ignore next*/_this._input;

      if (textarea.scrollHeight > /*istanbul ignore next*/_this.minHeight) {
        // Reset height to zero - IE specific
        textarea.style.height = "0px";
        // Set the height so all content is shown
        textarea.style.height = Math.max(textarea.scrollHeight, /*istanbul ignore next*/_this.minHeight) + "px";
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Minimum height of the textarea


  _createClass(Textarea, [{
    key: 'componentDidMount',


    /**
     * A lifecycle method that is called after initial render.
     * Allows access to refs and DOM to set expandable variables
     *
     * @method componentDidMount
     * @return {void}
     */
    value: function componentDidMount() {
      if (this.props.expandable) {
        window.addEventListener('resize', this.expandTextarea);
        // Set the min height to the initially rendered height.
        // Without minHeight expandable textareas will only have
        // one line when no content is present.
        this.minHeight = this._input.clientHeight;

        this.expandTextarea();
      }
    }

    /**
     * A lifecycle method that is called before the component is
     * unmounted from the DOM
     *
     * @method componentWillUnmount
     * @return {void}
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.expandable) {
        window.removeEventListener('resize', this.expandTextarea);
      }
    }

    /**
     * A lifecycle method to update the component after it is re-rendered
     * Resizes the textarea based on update if it can expand
     *
     * @method componentDidUpdate
     * @return {void}
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.expandable) {
        this.expandTextarea();
      }
    }

    /**
     * Expands the textarea based on the current input
     * so that width is fixed but height changes to show
     * all content.
     *
     * @method expandTextarea
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
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
     * Uses the mainClasses method provided by the decorator to add additional classes
     *
     * @method mainClasses
     * @return {String} main className
     */
    get: function get() {
      return 'ui-textarea';
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
      return 'ui-textarea__input';
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
      props.rows = this.props.rows;
      props.cols = this.props.cols;
      return props;
    }

    /**
     * Defines a custom input type for this component.
     *
     * @method inputType
     * @return {String} the input type
     */

  }, {
    key: 'inputType',
    get: function get() {
      return 'textarea';
    }
  }]);

  return Textarea;
}( /*istanbul ignore next*/_react2.default.Component), _class.propTypes = {
  /**
   * Allows the Textareas Height to change based on user input
   * Width of the textarea will remain static
   *
   * @property expandable
   * @type {Boolean}
   * @default false
   */
  expandable: /*istanbul ignore next*/_react2.default.PropTypes.bool
}, _class.defaultProps = {
  expandable: false
}, _temp2))));

/*istanbul ignore next*/exports.default = Textarea;