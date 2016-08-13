/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var /*istanbul ignore next*/_dialog = require('../dialog');

/*istanbul ignore next*/
var _dialog2 = _interopRequireDefault(_dialog);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

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

  function /*istanbul ignore next*/Alert() {
    /*istanbul ignore next*/
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Alert).call(this));
  }

  _createClass(Alert, [{
    key: 'dialogTitleClasses',


    /**
     * Returns classes title for the confirm, combines with dialog class names.
     *
     * @method dialogTitleClasses
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(Alert.prototype), 'dialogTitleClasses', this), 'ui-alert__title')
      );
    }

    /**
     * Returns classes for the alert, combines with dialog class names..
     *
     * @method dialogClasses
     */

  }, {
    key: 'dialogClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(Alert.prototype), 'dialogClasses', this), 'ui-alert__alert')
      );
    }
  }]);

  return Alert;
}(_dialog2.default);

/*istanbul ignore next*/Alert.defaultProps = {
  size: 'xsmall'
};
/*istanbul ignore next*/exports.default = Alert;