'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _css = require('./../../utils/css');

var _css2 = _interopRequireDefault(_css);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A button toggle group widget.
 *
 * == How to use an ButtonToggleGroup in a component:
 *
 * In your file
 *
 *   import ButtonToggleGroup from 'carbon/lib/components/button-toggle-group';
 *
 * To render an ButtonToggleGroup:
 *
 *   <ButtonToggleGroup validations=[]>
 *     <ButtonToggle />
 *   <ButtonToggleGroup />
 *
 * @class ButtonToggleGroup
 * @constructor
 * @decorators {InputLabel,InputValidation}
 */
var ButtonToggleGroup = (0, _inputLabel2.default)((0, _inputValidation2.default)((_temp2 = _class = function (_React$Component) {
  _inherits(ButtonToggleGroup, _React$Component);

  function ButtonToggleGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ButtonToggleGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ButtonToggleGroup.__proto__ || Object.getPrototypeOf(ButtonToggleGroup)).call.apply(_ref, [this].concat(args))), _this), _this._handleGroupBlur = function () {
      if (!_this.blockBlur) {
        // use setTimeout to drop in the callstack to ensure value has time to be set
        setTimeout(function () {
          _this.validate();
          _this.warning();
          _this.info();

          if (_this.state.messageLocked) {
            _this.setState({ messageLocked: false });
          }
        }, 100);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ButtonToggleGroup, [{
    key: 'componentWillReceiveProps',


    /**
    * A lifecycle method for when the component has re-rendered.
    *
    * @method componentWillReceiveProps
    * @return {void}
    */
    value: function componentWillReceiveProps(nextProps) {
      // manually trigger change as this wrapper doesn't actually have an input to trigger it itself
      if (nextProps.value !== this.props.value) {
        this._handleContentChange();
      }
    }

    /**
     * Main Class getter
     *
     * @method mainClasses
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
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        _extends({
          className: this.mainClasses,
          ref: function ref(comp) {
            _this2._target = comp;
          }
        }, (0, _tags2.default)('button-toggle-group', this.props)),
        this.labelHTML,
        this.inputHTML,
        this.validationHTML,
        this.fieldHelpHTML
      );
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-button-toggle-group', this.props.className, _css2.default.input);
    }

    /**
     * Provides an extension point to add additional properties for the containing field.
     *
     * @method fieldProps
     * @return {Object} Field props
     */

  }, {
    key: 'fieldProps',
    get: function get() {
      var fieldProps = {
        className: 'common-input__field',
        onFocus: this._handleFocus,
        onBlur: this._handleGroupBlur
      };

      return fieldProps;
    }

    /**
     * Extends the input props to include the ID.
     *
     * @method inputProps
     * @return {Object} Input props
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var children = _react2.default.Children.toArray(this.props.children);

      if (children.length === 0 || children[0].props.id === undefined) {
        return null;
      }

      return { id: children[0].props.id };
    }

    /**
     * Returns HTML for the input.
     *
     * @method inputHTML
     * @return {HTML} HTML for input
     */

  }, {
    key: 'inputHTML',
    get: function get() {
      return _react2.default.createElement(
        'div',
        this.fieldProps,
        this.props.children
      );
    }

    /**
     * On blur of the input we want to validate the field.
     *
     * @method _handleBlur
     * @return {void}
     */

  }]);

  return ButtonToggleGroup;
}(_react2.default.Component), _class.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node.isRequired,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Selected value from children components
   *
   * @property value
   * @type {String}
   */
  value: _propTypes2.default.string
}, _temp2)));

exports.default = ButtonToggleGroup;