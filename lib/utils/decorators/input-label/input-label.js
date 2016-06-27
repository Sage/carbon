'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _componentsHelp = require('./../../../components/help');

var _componentsHelp2 = _interopRequireDefault(_componentsHelp);

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
 *
 * @method InputIcon
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
var InputLabel = function InputLabel(ComposedComponent) {
  return (function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, args);
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
        return (0, _classnames2['default'])(_get(Object.getPrototypeOf(Component.prototype), 'mainClasses', this), { 'common-input--label-inline': this.props.labelInline });
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
        return (0, _classnames2['default'])('common-input__label', {
          'common-input__label--inline': this.props.labelInline,
          'common-input__label--help': this.props.fieldHelp,
          'common-input__label--align-right': this.props.labelAlign === 'right'
        });
      }
    }, {
      key: 'fieldHelpClasses',
      get: function get() {
        return (0, _classnames2['default'])(_get(Object.getPrototypeOf(Component.prototype), 'fieldHelpClasses', this), 'common-input__help-text', {
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
          return;
        }

        // either use label supplied by dev, or automatically make one common on input name
        var labelText = this.props.label || (0, _lodash.startCase)(this.props.name);

        if (!labelText) {
          return;
        }

        // set asterisk if validation is used which uses an asterisk
        if ((0, _lodash.find)(this.props.validations, function (v) {
          return v.asterisk;
        })) {
          labelText += "*";
        }

        // add label width if defined
        var labelStyle = this.props.labelWidth ? { width: this.props.labelWidth + '%' } : null;
        return _react2['default'].createElement(
          'label',
          {
            style: labelStyle,
            className: this.labelClasses,
            htmlFor: this.inputProps.id
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
        if (this.props.labelHelp) {
          return _react2['default'].createElement(
            _componentsHelp2['default'],
            {
              tooltipPosition: this.props.labelHelpPosition,
              tooltipAlign: this.props.labelHelpAlign,
              href: this.props.labelHelpHref
            },
            this.props.labelHelp
          );
        }
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
        if (this.props.fieldHelp) {
          var style = {};

          if (this.props.labelInline) {
            style.marginLeft = this.props.labelWidth + '%';
          }

          return _react2['default'].createElement(
            'span',
            { className: this.fieldHelpClasses, style: style },
            this.props.fieldHelp
          );
        }
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
        var inputProps = _get(Object.getPrototypeOf(Component.prototype), 'inputProps', this) || {};

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
        var fieldProps = _get(Object.getPrototypeOf(Component.prototype), 'fieldProps', this) || {};

        // add input width if label width is defined
        if (this.props.labelWidth) {
          var inputWidth = 100 - this.props.labelWidth + '%';
          fieldProps.style = fieldProps.style || {};
          fieldProps.style.width = inputWidth;
        }

        return fieldProps;
      }
    }], [{
      key: 'contextTypes',
      value: (0, _lodash.assign)({}, ComposedComponent.contextTypes, {
        form: _react2['default'].PropTypes.object
      }),
      enumerable: true
    }]);

    return Component;
  })(ComposedComponent);
};

exports['default'] = InputLabel;
module.exports = exports['default'];