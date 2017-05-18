'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _icon = require('./../../../components/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * InputIcon decorator.
 *
 * This decorator provides HTML and CSS to style an input with a button on the
 * right hand side, labelled with an icon.
 *
 * == How to use InputIcon decorator in a component:
 *
 * In your file:
 *
 *   import InputIcon from 'carbon/lib/utils/decorators/input-icon';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputIcon(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         <input />
 *         { this.inputIconHTML('settings') }
 *       </div>
 *     );
 *   }
 *
 * Note: the icon html needs to sit as a sibling to its input.
 *
 * @method InputIcon
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
var InputIcon = function InputIcon(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      var _ref;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = Component.__proto__ || Object.getPrototypeOf(Component)).call.apply(_ref, [this].concat(args)));

      _this.inputIconHTML = function (iconType) {
        if (_this.props && (_this.props.readOnly || _this.props.disabled)) {
          return null;
        }

        var icon = _react2.default.createElement(_icon2.default, { type: iconType, className: 'carbon-input-icon' });

        if (['error', 'warning'].indexOf(iconType) > -1) {
          icon = _react2.default.createElement(
            'span',
            { className: 'carbon-input-icon carbon-input-icon--' + iconType },
            _this.validationHTML
          );
        }

        return _react2.default.createElement(
          'label',
          { htmlFor: _this.inputProps.id, key: 'label-icon' },
          icon
        );
      };

      return _this;
    }

    /**
     * Supplies the HTML for the input icon.
     *
     * @method inputIconHTML
     * @param {string} iconType Which icon to render
     * @return {Object} JSX for icon
     */


    _createClass(Component, [{
      key: 'mainClasses',


      /**
       * Extends the main classes with any input icon classes.
       *
       * @method mainClasses
       * @return {String} Main class names
       */
      get: function get() {
        return (0, _classnames2.default)(_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'mainClasses', this), 'common-input--with-icon');
      }
    }]);

    return Component;
  }(ComposedComponent), _class.propTypes = (0, _lodash.assign)({}, ComposedComponent.propTypes, {}), _temp;
};

exports.default = InputIcon;