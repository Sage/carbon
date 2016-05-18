'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var Alert = (function (_Dialog) {
  _inherits(Alert, _Dialog);

  function Alert() {
    _classCallCheck(this, Alert);

    _get(Object.getPrototypeOf(Alert.prototype), 'constructor', this).call(this);
  }

  _createClass(Alert, [{
    key: 'dialogTitleClasses',

    /**
     * Returns classes title for the confirm, combines with dialog class names.
     *
     * @method dialogTitleClasses
     */
    get: function get() {
      return (0, _classnames2['default'])(_get(Object.getPrototypeOf(Alert.prototype), 'dialogTitleClasses', this), 'ui-alert__title');
    }

    /**
     * Returns classes for the alert, combines with dialog class names..
     *
     * @method dialogClasses
     */
  }, {
    key: 'dialogClasses',
    get: function get() {
      return (0, _classnames2['default'])(_get(Object.getPrototypeOf(Alert.prototype), 'dialogClasses', this), 'ui-alert__alert');
    }
  }], [{
    key: 'defaultProps',
    value: {
      size: 'xsmall'
    },
    enumerable: true
  }]);

  return Alert;
})(_dialog2['default']);

exports['default'] = Alert;
module.exports = exports['default'];