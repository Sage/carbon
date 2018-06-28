'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _help = require('./../../../components/help');

var _help2 = _interopRequireDefault(_help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * InputLabel decorator.
 *
 * This decorator provides HTML for input labels.
 *
 * == How to use InputLabel decorator in a component:
 *
 * In your file:
 *
 *   import InputLabel from 'carbon/lib/utils/decorators/input-label';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputLabel(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         { this.labelHTML() }
 *         <input />
 *       </div>
 *     );
 *   }
 *
 * The label decorator adds additional props to your component for:
 *
 *  * `label` - either a string or false to turn the label off
 *  * `labelInline` - pass true to format the input/label inline
 *  * `labelWidth` - pass a percentage to define the width of the label when it
 *  is displayed inline.
 *  * `inputWidth` - pass a percentage to define the width of the input when it
 *  is displayed inline.
 *
 * @method InputLabel
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
var InputLabel = function InputLabel(ComposedComponent) {
  var Component = function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      _classCallCheck(this, Component);

      return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
    }

    _createClass(Component, [{
      key: 'mainClasses',


      /**
       * Extends the main classes with any validation classes.
       *
       * @method mainClasses
       * @return {String} Main class names
       */
      get: function get() {
        return (0, _classnames2.default)(_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'mainClasses', this), {
          'common-input--label-inline': this.props.labelInline,
          'common-input--has-label-help': this.props.labelHelp,
          'common-input--has-field-help': this.props.fieldHelp
        });
      }

      /**
       * Classes to apply to the label
       *
       * @method labelClasses
       * @return {String} classes
       */

    }, {
      key: 'labelClasses',
      get: function get() {
        return (0, _classnames2.default)('common-input__label', {
          'common-input__label--inline': this.props.labelInline,
          'common-input__label--help': this.props.labelHelp,
          'common-input__label--align-right': this.props.labelAlign === 'right'
        });
      }
    }, {
      key: 'fieldHelpClasses',
      get: function get() {
        return (0, _classnames2.default)(_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'fieldHelpClasses', this), 'common-input__help-text', {
          'common-input__help-text--inline': this.props.labelInline
        });
      }

      /**
       * ID used for the label.
       *
       * @method labelID
       * @return {String}
       */

    }, {
      key: 'labelID',
      get: function get() {
        return this._guid;
      }

      /**
       * Supplies the HTML for the label.
       *
       * @method labelHTML
       * @return {HTML} HTML for label.
       */

    }, {
      key: 'labelHTML',
      get: function get() {
        if (this.props.label === false) {
          return null;
        }

        // either use label supplied by dev, or automatically make one common on input name
        var labelText = this.props.label || (0, _lodash.startCase)(this.props.name);

        if (!labelText) {
          return null;
        }

        // set asterisk if validation is used which uses an asterisk
        if ((0, _lodash.find)(this.props.validations, function (v) {
          return v.asterisk;
        })) {
          labelText += '*';
        }

        // add label width if defined
        var labelStyle = this.props.labelWidth ? { width: this.props.labelWidth + '%' } : null;
        return _react2.default.createElement(
          'label',
          {
            style: labelStyle,
            className: this.labelClasses,
            htmlFor: this.inputProps.id,
            'data-element': 'label'
          },
          labelText,
          this.labelHelpHTML
        );
      }

      /**
       * Supplies the HTML for help component
       *
       * @method labelHelpHTML
       * @return {Object} JSX for help
       */

    }, {
      key: 'labelHelpHTML',
      get: function get() {
        if (!this.props.labelHelp) {
          return null;
        }

        return _react2.default.createElement(
          _help2.default,
          {
            tooltipPosition: this.props.labelHelpPosition,
            tooltipAlign: this.props.labelHelpAlign,
            href: this.props.labelHelpHref
          },
          this.props.labelHelp
        );
      }

      /**
       * Supplies the HTML label help
       *
       * @method fieldHelpHTML
       * @return {Object} JSX for label help
       */

    }, {
      key: 'fieldHelpHTML',
      get: function get() {
        if (!this.props.fieldHelp) {
          return null;
        }
        var style = {};

        if (this.props.labelInline) {
          style.marginLeft = this.props.labelWidth + '%';
        }

        return _react2.default.createElement(
          'span',
          {
            className: this.fieldHelpClasses, style: style,
            'data-element': 'help'
          },
          this.props.fieldHelp
        );
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
        var inputProps = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'inputProps', this) || {};

        // set id so label will focus on input when clicked
        if (!inputProps.id) {
          inputProps.id = this.labelID;
        }

        return inputProps;
      }

      /**
       * Extends the field props to include width.
       *
       * @method fieldProps
       * @return {Object} Field props
       */

    }, {
      key: 'fieldProps',
      get: function get() {
        var fieldProps = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'fieldProps', this) || {};
        var labelWidth = this.props.labelWidth;
        var inputWidth = this.props.inputWidth;


        if (labelWidth && !inputWidth) {
          inputWidth = 100 - labelWidth;
        }

        if (inputWidth) {
          fieldProps.style = fieldProps.style || {};
          fieldProps.style.width = inputWidth + '%';
        }

        return fieldProps;
      }
    }]);

    return Component;
  }(ComposedComponent);

  Component.contextTypes = (0, _lodash.assign)({}, ComposedComponent.contextTypes, {
    form: _propTypes2.default.object
  });
  Component.propTypes = (0, _lodash.assign)({}, ComposedComponent.propTypes, {

    /**
     * Either a string or false to turn the label off
     *
     * @property
     * @type {String|Boolean}
     */
    label: _propTypes2.default.node,

    /**
     * Pass true to format the input/label inline
     *
     * @property
     * @default top
     * @type {Boolean}
     */
    labelInline: _propTypes2.default.bool,

    /**
     * Pass a percentage to define the width of the label when it
     *  is displayed inline.
     *
     * @property
     * @type {Number}
     */
    labelWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

    /**
     * Aligns label content to the right if set
     *
     * @property
     * @type {String}
     */
    labelAlign: _propTypes2.default.string,

    /**
     * Text applied to tooptip of help icon
     *
     * @property
     * @type {String}
     */
    labelHelp: _propTypes2.default.string,

    /**
     * Pass a percentage to define the width of the label when it
     *  is displayed inline
     *
     * @property
     * @type {Number}
     */
    inputWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

    /**
     * A string representing a help message
     *
     * @property
     * @type {Node}
     */
    fieldHelp: _propTypes2.default.node,

    /**
     * Boolean to determine whether the help message should be inline
     *
     * @property
     * @type {Boolean}
     */
    fieldHelpInline: _propTypes2.default.bool
  });


  Component.displayName = ComposedComponent.displayName || ComposedComponent.name;
  return Component;
};

exports.default = InputLabel;