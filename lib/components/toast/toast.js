/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

/*istanbul ignore next*/
var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

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

var Toast = function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast() {
    _classCallCheck(this, Toast);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Toast).apply(this, arguments));
  }

  _createClass(Toast, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
          /*istanbul ignore next*/{
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-toast', this.props.className, 'ui-toast--' + this.props.as)
      );
    }

    /**
     * Content rendered for dismiss X
     *
     * @method dismissIcon
     */

  }, {
    key: 'dismissIcon',
    get: function get() {
      return this.props.onDismiss ? /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'ui-toast__close', type: 'close', onClick: this.props.onDismiss }) : null;
    }

    /**
     * Content rendered for the toast.
     *
     * @method toastContent
     */

  }, {
    key: 'toastContent',
    get: function get() {
      return this.props.open ? /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'div',
        /*istanbul ignore next*/{ className: this.componentClasses },
        /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-toast__type' },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'ui-toast__type-icon', type: this.props.as })
        ),
        /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-toast__content' },
          this.props.children
        ),
        this.dismissIcon
      ) : null;
    }
  }]);

  return Toast;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Toast.propTypes = {

  /**
   * Customizes the appearance through colour
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'warning'
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Determines if the toast is open.
   *
   * @property open
   * @type {Boolean}
   * @default true
   */
  open: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Callback for when dismissed.
   *
   * @property onDismiss
   * @type {Function}
   */
  onDismiss: /*istanbul ignore next*/_react2.default.PropTypes.func
};
/*istanbul ignore next*/Toast.defaultProps = {
  as: 'warning',
  open: true
};
/*istanbul ignore next*/exports.default = Toast;