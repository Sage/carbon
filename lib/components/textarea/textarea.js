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
var Textarea = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputLabel2['default'])((0, _utilsDecoratorsInputValidation2['default'])((function (_React$Component) {
  _inherits(Textarea, _React$Component);

  function Textarea() {
    var _this = this;

    _classCallCheck(this, Textarea);

    _get(Object.getPrototypeOf(Textarea.prototype), 'constructor', this).apply(this, arguments);

    this.minHeight = 0;

    this.expandTextarea = function () {
      var textarea = _this.refs.textarea;

      if (textarea.scrollHeight > _this.minHeight) {
        // Reset height to zero - IE specific
        textarea.style.height = "0px";
        // Set the height so all content is shown
        textarea.style.height = Math.max(textarea.scrollHeight, _this.minHeight) + "px";
      }
    };
  }

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
        this.minHeight = this.refs.textarea.clientHeight;

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
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        this.labelHTML,
        this.inputHTML,
        this.validationHTML
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
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      props.ref = 'textarea';
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
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Allows the Textareas Height to change based on user input
       * Width of the textarea will remain static
       *
       * @property expandable
       * @type {Boolean}
       * @default false
       */
      expandable: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      expandable: false
    },
    enumerable: true
  }]);

  return Textarea;
})(_react2['default'].Component))));

exports['default'] = Textarea;
module.exports = exports['default'];

// Minimum height of the textarea