'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Textarea: {
    displayName: 'Textarea'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/textarea/textarea.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
 *   <Textarea name='myTextarea' />
 *
 * @class Textarea
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Textarea = (0, _input2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)(_wrapComponent('Textarea')((_temp2 = _class = function (_React$Component) {
  _inherits(Textarea, _React$Component);

  function Textarea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Textarea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call.apply(_ref, [this].concat(args))), _this), _this.minHeight = 0, _this.expandTextarea = function () {
      var textarea = _this._input;

      if (textarea.scrollHeight > _this.minHeight) {
        // Reset height to zero - IE specific
        textarea.style.height = '0px';
        // Set the height so all content is shown
        textarea.style.height = Math.max(textarea.scrollHeight, _this.minHeight) + 'px';
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
      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags.tagComponent)('textarea', this.props)),
        this.labelHTML,
        this.inputHTML,
        this.validationHTML,
        this.fieldHelpHTML,
        this.characterCount
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
      return 'carbon-textarea';
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
      return (0, _classnames2.default)('carbon-textarea__input', { 'carbon-textarea__input--disable-scroll': this.props.expandable });
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
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      props.className = this.inputClasses;
      props.rows = this.props.rows;
      props.cols = this.props.cols;

      if (this.props.characterLimit && this.props.enforceCharacterLimit) {
        props.maxLength = this.props.characterLimit;
      }

      return props;
    }

    /**
     * I18n options for character count number
     *
     * @method i18nNumberOpts
     * @return {Object}
     */

  }, {
    key: 'i18nNumberOpts',
    get: function get() {
      return { precision: 0 };
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

    /**
     * Returns character count jsx if limit is set
     *
     * @method characterCount
     * @return {JSX}
     */

  }, {
    key: 'characterCount',
    get: function get() {
      if (this.props.characterLimit) {
        return _react3.default.createElement(
          'div',
          { className: 'carbon-textarea__character-limit', 'data-element': 'character-limit' },
          _i18nJs2.default.t('textarea.limit.prefix', { defaultValue: 'You have used ' }),
          _react3.default.createElement(
            'span',
            { className: 'carbon-textarea__limit-used' },
            _i18nJs2.default.toNumber(calculateCharacterCount(this.props.value), this.i18nNumberOpts)
          ),
          _i18nJs2.default.t('textarea.limit.middle', { defaultValue: ' of ' }),
          _react3.default.createElement(
            'span',
            { className: 'carbon-textarea__limit-max' },
            _i18nJs2.default.toNumber(this.props.characterLimit, this.i18nNumberOpts)
          ),
          _i18nJs2.default.t('textarea.limit.suffix', { defaultValue: ' characters' })
        );
      }
    }
  }]);

  return Textarea;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Allows the Textareas Height to change based on user input
   * Width of the textarea will remain static
   *
   * @property expandable
   * @type {Boolean}
   * @default false
   */
  expandable: _propTypes2.default.bool,

  /**
   * Character limit of the textarea
   *
   * @property characterLimit
   * @type {String}
   */
  characterLimit: _propTypes2.default.string,

  /**
   * Stop the user typing over the characterLimit
   *
   * @property enforceCharacterLimit
   * @type {Boolean}
   * @default true
   */
  enforceCharacterLimit: _propTypes2.default.bool
}, _class.defaultProps = {
  expandable: false,
  enforceCharacterLimit: true
}, _temp2)))));

var calculateCharacterCount = function calculateCharacterCount(value) {
  if (!value) {
    return 0;
  }

  var limitUsed = value.length.toString(),
      numberOfLineBreaks = (value.match(/\n/g) || []).length;
  return parseInt(limitUsed) + numberOfLineBreaks;
};

exports.default = Textarea;