/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_dialog = require('../dialog');

/*istanbul ignore next*/
var _dialog2 = _interopRequireDefault(_dialog);

var /*istanbul ignore next*/_button = require('../button');

/*istanbul ignore next*/
var _button2 = _interopRequireDefault(_button);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

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

  function /*istanbul ignore next*/Confirm() {
    /*istanbul ignore next*/
    _classCallCheck(this, Confirm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Confirm).call(this));
  }

  /**
   * Returns main classes for the component combined with
   * dialog main classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */


  _createClass(Confirm, [{
    key: 'mainClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(Confirm.prototype), 'mainClasses', this), 'ui-confirm')
      );
    }

    /**
     * Returns classes title for the confirm, combines with dialog class names.
     *
     * @method dialogTitleClasses
     */

  }, {
    key: 'dialogTitleClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(Confirm.prototype), 'dialogTitleClasses', this), 'ui-confirm__title')
      );
    }

    /**
     * Returns classes for the confirm, combines with dialog class names.
     *
     * @method dialogClasses
     */

  }, {
    key: 'dialogClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(Confirm.prototype), 'dialogClasses', this), 'ui-confirm__confirm')
      );
    }

    /**
     * Get the yes and no buttons for the confirm dialog
     *
     * @method confirmButtons
     * @return {Object} JSX yes and no buttons
     */

  }, {
    key: 'confirmButtons',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-confirm__buttons' },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-confirm__button ui-confirm__no' },
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_button2.default,
              /*istanbul ignore next*/{ as: 'secondary', onClick: this.props.onCancel },
              this.props.cancelLabel || /*istanbul ignore next*/_i18nJs2.default.t('confirm.no', { defaultValue: 'No' })
            )
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-confirm__button ui-confirm__yes' },
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_button2.default,
              /*istanbul ignore next*/{ as: 'primary', onClick: this.props.onConfirm },
              this.props.confirmLabel || /*istanbul ignore next*/_i18nJs2.default.t('confirm.yes', { defaultValue: 'Yes' })
            )
          )
        )
      );
    }

    /**
     * Returns HTML and text for the confirm body. Appends the two
     * confirm buttons to super dialogHTML
     *
     * @method dialogTitle
     */

  }, {
    key: 'modalHTML',
    get: function get() {
      var dialog = /*istanbul ignore next*/_get(Object.getPrototypeOf(Confirm.prototype), 'modalHTML', this);
      dialog.props.children.push(this.confirmButtons);
      return dialog;
    }
  }]);

  return Confirm;
}(_dialog2.default);

/*istanbul ignore next*/Confirm.propTypes = {

  /**
   * A custom event handler when a confirmation takes place
   *
   * @property onConfirm
   * @type {Function}
   */
  onConfirm: /*istanbul ignore next*/_react2.default.PropTypes.func.isRequired,

  /**
   * Customise the confirm button label
   *
   * @property onConfirm
   * @type {String}
   */
  confirmLabel: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Customise the cancel button label
   *
   * @property onConfirm
   * @type {String}
   */
  cancelLabel: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/Confirm.defaultProps = {
  size: 'xsmall'
};
/*istanbul ignore next*/exports.default = Confirm;