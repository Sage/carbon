'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _css = require('./../../utils/css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Confirm widget.
 *
 * == How to use a Confirm in a component:
 *
 * In your file
 *
 *   import Confirm from 'carbon/lib/components/confirm';
 *
 * To render a Confirm:
 *
 *   <Confirm
 *      title='Are you sure?"
 *      onConfirm={ customConfirmHandler }
 *      onCancel={ customCancelHandler }
 *      open={ false }
 *    This is the content message
 *   </Confirm>
 *
 * The component rendering the Confirm must pass down a prop of 'open={ true }' to open the confirm dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event via the 'no' button
 *
 * You need to provide a custom confirm event handler to handle a close event via the 'yes' button
 *
 * @class Confirm
 * @constructor
 */
var Confirm = function (_Dialog) {
  _inherits(Confirm, _Dialog);

  function Confirm() {
    _classCallCheck(this, Confirm);

    return _possibleConstructorReturn(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).apply(this, arguments));
  }

  _createClass(Confirm, [{
    key: 'additionalContent',


    /**
     * Get the yes and no buttons for the confirm dialog
     *
     * @method confirmButtons
     * @return {Object} JSX yes and no buttons
     */
    value: function additionalContent() {
      var classes = 'carbon-confirm__buttons ' + _css2.default.clearfix;

      return _react2.default.createElement(
        'div',
        { key: 'confirm-buttons', className: classes },
        _react2.default.createElement(
          'div',
          { className: 'carbon-confirm__button carbon-confirm__no' },
          _react2.default.createElement(
            _button2.default,
            {
              as: 'secondary', onClick: this.props.onCancel,
              'data-element': 'cancel'
            },
            this.props.cancelLabel || _i18nJs2.default.t('confirm.no', { defaultValue: 'No' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-confirm__button carbon-confirm__yes' },
          _react2.default.createElement(
            _button2.default,
            {
              as: 'primary', onClick: this.props.onConfirm,
              'data-element': 'confirm'
            },
            this.props.confirmLabel || _i18nJs2.default.t('confirm.yes', { defaultValue: 'Yes' })
          )
        )
      );
    }
  }, {
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'confirm',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
    }
  }, {
    key: 'mainClasses',


    /**
     * Returns main classes for the component combined with
     * dialog main classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2.default)(_get(Confirm.prototype.__proto__ || Object.getPrototypeOf(Confirm.prototype), 'mainClasses', this), 'carbon-confirm');
    }

    /**
     * Returns classes for the confirm, combines with dialog class names.
     *
     * @method dialogClasses
     */

  }, {
    key: 'dialogClasses',
    get: function get() {
      return (0, _classnames2.default)(_get(Confirm.prototype.__proto__ || Object.getPrototypeOf(Confirm.prototype), 'dialogClasses', this), 'carbon-confirm__confirm');
    }
  }]);

  return Confirm;
}(_dialog2.default);

Confirm.propTypes = (0, _lodash.assign)({}, _dialog2.default.propTypes, {

  /**
   * A custom event handler when a confirmation takes place
   *
   * @property onConfirm
   * @type {Function}
   */
  onConfirm: _propTypes2.default.func.isRequired,

  /**
   * Customise the confirm button label
   *
   * @property onConfirm
   * @type {String}
   */
  confirmLabel: _propTypes2.default.string,

  /**
   * Customise the cancel button label
   *
   * @property onConfirm
   * @type {String}
   */
  cancelLabel: _propTypes2.default.string
});
Confirm.defaultProps = (0, _lodash.assign)({}, _dialog2.default.defaultProps, {
  size: 'extra-small',
  showCloseIcon: false
});
exports.default = Confirm;