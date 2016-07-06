/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

/*istanbul ignore next*/
var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var /*istanbul ignore next*/_events = require('./../../utils/helpers/events');

/*istanbul ignore next*/
var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Modal Component
 *
 * Abstract base class for all modals
 *
 * == How to use a Modal in a component
 *
 * In your file
 *
 *   import Modal from 'carbon/lib/components/modal'
 *
 * Extends from the modal
 *
 *   class MyModal extends Modal
 *
 * Override several methods
 *
 * get onOpening() // Called by componentDidUpdate when dialog opens
 * get onClosing() // Called by componentDidUpdate when dialog closes
 * get mainClasses() // Classes to apply to parent div
 * get modalHTML() // JSX displayed when open
 * get transitionName() // Transisition name for ReactCSSTransitionGroup
 *
 * Optional Override
 * get backgroundTransitionName() // Transisition name for background fade
 *
 *
 * @class Modal
 * @constructor
 */

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Modal)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.listening = false, _this.closeModal = function (ev) {
      if (! /*istanbul ignore next*/_this.props.disableEscKey && /*istanbul ignore next*/_events2.default.isEscKey(ev)) {
        /*istanbul ignore next*/_this.props.onCancel();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Tracks if event listeners are on for modal
   *
   * @property listening
   * @type {Boolean}
   */


  _createClass(Modal, [{
    key: 'getChildContext',


    /**
     * Returns modal object to child components. Used to override form cancel button functionality.
     *
     * @method getChildContext
     * @return {void}
     */
    value: function getChildContext() {
      return {
        modal: {
          onCancel: this.props.onCancel
        }
      };
    }

    /**
     * A lifecycle method to update the component after it is re-rendered
     *
     * @method componentDidUpdate
     * @return {void}
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.open && !this.listening) {
        this.listening = true;
        this.onOpening;
        window.addEventListener('keyup', this.closeModal);
      } else if (!this.props.open) {
        this.listening = false;
        this.onClosing;
        window.removeEventListener('keyup', this.closeModal);
      }
    }

    /**
     * Triggers the custom close event handler on Esc
     *
     * @method closeModal
     * @param {Object} ev event
     * @return {void}
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      /*istanbul ignore next*/
      var _this2 = this;

      var backgroundHTML = /*istanbul ignore next*/void 0,
          modalHTML = /*istanbul ignore next*/void 0;

      if (this.props.open) {
        backgroundHTML = this.backgroundHTML;
        modalHTML = this.modalHTML;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ ref: function /*istanbul ignore next*/ref(c) /*istanbul ignore next*/{
              return (/*istanbul ignore next*/_this2._input = c
              );
            }, className: this.mainClasses },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
            /*istanbul ignore next*/{
              transitionName: this.transitionName,
              transitionEnterTimeout: 500,
              transitionLeaveTimeout: 500 },
            modalHTML
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
            /*istanbul ignore next*/{
              transitionName: this.backgroundTransitionName,
              transitionEnterTimeout: 500,
              transitionLeaveTimeout: 500 },
            backgroundHTML
          )
        )
      );
    }
  }, {
    key: 'backgroundHTML',


    /**
     * Returns HTML for the background.
     *
     * @method backgroundHTML
     * @return {Object} JSX
     */
    get: function get() {
      if (!this.props.enableBackgroundUI) {
        return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'div', /*istanbul ignore next*/{
            className: 'ui-modal__background'
          })
        );
      }
    }

    // Called after the modal opens

  }, {
    key: 'onOpening',
    get: function get() {
      return;
    }
    // Called after the modal closes

  }, {
    key: 'onClosing',
    get: function get() {
      return;
    }
    // Classes for parent div

  }, {
    key: 'mainClasses',
    get: function get() {
      return;
    }
    // Modal HTML shown when open

  }, {
    key: 'modalHTML',
    get: function get() {
      return;
    }

    // Modal transistion name

  }, {
    key: 'transitionName',
    get: function get() {
      return 'modal';
    }
    // modal background transisiton name

  }, {
    key: 'backgroundTransitionName',
    get: function get() {
      return 'modal-background';
    }
  }]);

  return Modal;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Modal.propTypes = {

  /**
   * A custom close event handler
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Sets the open state of the modal
   *
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: /*istanbul ignore next*/_react2.default.PropTypes.bool.isRequired,

  /**
   * Determines if the background is disabled
   * when the modal is open
   *
   * @property enableBackgroundUI
   * @type {Boolean}
   * @default true
   */
  enableBackgroundUI: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Determines if the Esc Key closes the modal
   *
   * @property disableEscKey
   * @type {Boolean}
   * @default true
   */
  disableEscKey: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/Modal.defaultProps = {
  open: false,
  enableBackgroundUI: false,
  disableEscKey: false
};
/*istanbul ignore next*/Modal.childContextTypes = {
  /**
   * Defines a context object for child components of the modal component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property modal
   * @type {Object}
   */
  modal: /*istanbul ignore next*/_react2.default.PropTypes.object
};
/*istanbul ignore next*/exports.default = Modal;