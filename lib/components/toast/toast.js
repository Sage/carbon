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

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

/**
* A Toast widget.
*
* == How to use a Toast in a component:
*
* In your file:
*
*   import Toast from 'carbon/lib/components/toast'
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

var Toast = (function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast() {
    _classCallCheck(this, Toast);

    _get(Object.getPrototypeOf(Toast.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Toast, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
        _reactAddonsCssTransitionGroup2['default'],
        {
          transitionAppear: true,
          transitionName: 'toast',
          transitionAppearTimeout: 1600,
          transitionEnterTimeout: 1500,
          transitionLeaveTimeout: 500
        },
        this.toastContent
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
      return (0, _classnames2['default'])('ui-toast', this.props.className, 'ui-toast--' + this.props.as);
    }

    /**
     * Content rendered for dismiss X
     *
     * @method dismissIcon
     */
  }, {
    key: 'dismissIcon',
    get: function get() {
      return this.props.onDismiss ? _react2['default'].createElement(_icon2['default'], { className: 'ui-toast__close', type: 'close', onClick: this.props.onDismiss }) : null;
    }

    /**
     * Content rendered for the toast.
     *
     * @method toastContent
     */
  }, {
    key: 'toastContent',
    get: function get() {
      return this.props.open ? _react2['default'].createElement(
        'div',
        { className: this.componentClasses },
        _react2['default'].createElement(
          'div',
          { className: 'ui-toast__type' },
          _react2['default'].createElement(_icon2['default'], { className: 'ui-toast__type-icon', type: this.props.as })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-toast__content' },
          this.props.children
        ),
        this.dismissIcon
      ) : null;
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Customizes the appearance through colour
       * (see the 'iconColorSets' for possible values)
       *
       * @property as
       * @type {String}
       * @default 'warning'
       */
      as: _react2['default'].PropTypes.string,

      /**
       * Determines if the toast is open.
       *
       * @property open
       * @type {Boolean}
       * @default true
       */
      open: _react2['default'].PropTypes.bool,

      /**
       * Callback for when dismissed.
       *
       * @property onDismiss
       * @type {Function}
       */
      onDismiss: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      as: 'warning',
      open: true
    },
    enumerable: true
  }]);

  return Toast;
})(_react2['default'].Component);

exports['default'] = Toast;
module.exports = exports['default'];