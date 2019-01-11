'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _portal = require('../portal');

var _portal2 = _interopRequireDefault(_portal);

require('./toast.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* A Toast widget.
*
* == How to use a Toast in a component:
*
* In your file:
*
*   import Toast from 'carbon-react/lib/components/toast'
*
* To render the Toast:
*
*   <Toast open={ true } onDismiss={ this.dismissHandler } as='info'>
*     My toast content
*   </Toast>
*
* Additionally you can pass optional props to the Toast component
*
*   as: Customizes the appearence of the toast changing the colour
*       (see the 'iconColorSets' for possible values).
*
* @class Toast
* @constructor
*/
var Toast = function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast() {
    _classCallCheck(this, Toast);

    return _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).apply(this, arguments));
  }

  _createClass(Toast, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2.default.createElement(
        _portal2.default,
        null,
        _react2.default.createElement(
          _CSSTransitionGroup2.default,
          {
            component: 'div',
            transitionAppear: true,
            transitionName: 'toast',
            transitionAppearTimeout: 1600,
            transitionEnterTimeout: 1500,
            transitionLeaveTimeout: 500
          },
          this.toastContent
        )
      );
    }
  }, {
    key: 'componentClasses',


    /**
     * Classes to be applied to the component.
     *
     * @method componentClasses
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-toast', this.props.className, 'carbon-toast--' + this.props.as);
    }

    /**
     * Content rendered for dismiss X
     *
     * @method dismissIcon
     */

  }, {
    key: 'dismissIcon',
    get: function get() {
      if (this.props.onDismiss) {
        return _react2.default.createElement(_icon2.default, {
          className: 'carbon-toast__close',
          'data-element': 'close',
          onClick: this.props.onDismiss,
          type: 'close'
        });
      }
      return null;
    }

    /**
     * Content rendered for the toast.
     *
     * @method toastContent
     */

  }, {
    key: 'toastContent',
    get: function get() {
      if (this.props.open) {
        return _react2.default.createElement(
          'div',
          _extends({ className: this.componentClasses }, (0, _tags2.default)('toast', this.props)),
          _react2.default.createElement(
            'div',
            { className: 'carbon-toast__type' },
            _react2.default.createElement(_icon2.default, { className: 'carbon-toast__type-icon', type: this.props.as })
          ),
          _react2.default.createElement(
            'div',
            { className: 'carbon-toast__content' },
            this.props.children
          ),
          this.dismissIcon
        );
      }
      return null;
    }
  }]);

  return Toast;
}(_react2.default.Component);

Toast.propTypes = {

  /**
   * Customizes the appearance through colour
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'warning'
   */
  as: _propTypes2.default.string,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * The rendered children of the component.
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * Determines if the toast is open.
   *
   * @property open
   * @type {Boolean}
   * @default true
   */
  open: _propTypes2.default.bool,

  /**
   * Callback for when dismissed.
   *
   * @property onDismiss
   * @type {Function}
   */
  onDismiss: _propTypes2.default.func
};
Toast.defaultProps = {
  as: 'warning',
  className: '',
  onDismiss: null,
  open: true };
exports.default = Toast;