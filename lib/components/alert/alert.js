'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Alert widget.
 *
 * == How to use a Alert in a component:
 *
 * In your file
 *
 *   import Alert from 'carbon/lib/components/alert';
 *
 * To render a Alert:
 *
 *   <Alert onCancel={ customEventHandler } open={ false }/>
 *
 * The component rendering the Alert must pass down a prop of 'open' in order to open the alert.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Alert
 * @constructor
 */
var Alert = function (_Dialog) {
  _inherits(Alert, _Dialog);

  function Alert(props) {
    _classCallCheck(this, Alert);

    // focusDialog is called via setTimeout in onDialogBlur,
    // so it needs binding to this
    // From the React docs: "Generally, if you refer to a method without () after
    // it, such as onClick={this.handleClick}, you should bind that method."
    var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

    _this.focusDialog = _this.focusDialog.bind(_this);
    return _this;
  }

  /**
   * Returns classes for the alert, combines with dialog class names..
   *
   * @method dialogClasses
   */


  _createClass(Alert, [{
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'alert',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
    }

    /**
     * Handles keyboard focus leaving the dialog
     * element.
     *
     * Assumes that, if no close icon is displayed,
     * no other element can receive keyboard focus.
     * Therefore focus should remain on the dialog
     * element while it is open.
     *
     * @override
     * @return {Void}
     */

  }, {
    key: 'onDialogBlur',
    value: function onDialogBlur(ev) {
      if (!this.props.showCloseIcon) {
        ev.preventDefault();
        // Firefox loses focus unless we wrap the call to
        // this.focusDialog in setTimeout
        setTimeout(this.focusDialog);
      }
    }
  }, {
    key: 'dialogClasses',
    get: function get() {
      return (0, _classnames2.default)(_get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'dialogClasses', this), 'carbon-alert__alert');
    }
  }]);

  return Alert;
}(_dialog2.default);

Alert.defaultProps = (0, _lodash.assign)({}, _dialog2.default.defaultProps, {
  role: 'alertdialog',
  size: 'extra-small'
});
exports.default = Alert;