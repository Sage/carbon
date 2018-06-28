'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _browser = require('./../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

var _portal = require('./../../components/portal');

var _portal2 = _interopRequireDefault(_portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/sort-comp */ // Getting confusing order from sort-comp


var TIMEOUT = 500;
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
 * get transitionName() // Transisition name for CSSTransitionGroup
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

  function Modal(props) {
    _classCallCheck(this, Modal);

    /**
     * Tracks if event listeners are on for modal
     *
     * @property listening
     * @type {Boolean}
     */
    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.updateDataState = function () {
      clearTimeout(_this.openTimeout);
      _this.openTimeout = setTimeout(function () {
        _this.setState({ state: _this.props.open ? 'open' : 'closed' });
      }, TIMEOUT);
    };

    _this.closeModal = function (ev) {
      if (_this.props.onCancel && !_this.props.disableEscKey && _events2.default.isEscKey(ev)) {
        _this.props.onCancel();
      }
    };

    _this.listening = false;

    _this.state = {
      /**
       * Sets the initial data-state of the modal
       * @property state
       * @type {String}
       */
      state: _this.props.open ? 'open' : 'closed'
    };
    return _this;
  }

  /**
   * Updates the value used for the css data-state. This uses a timeout to match the length of any transition to ensure
   * UI automation is able to target elements once they are visually ready.
   * @method updateDataState
   * @return {void}
   *
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
      var _window = _browser2.default.getWindow();

      if (this.props.open && !this.listening) {
        this.listening = true;
        this.updateDataState();
        this.onOpening; // eslint-disable-line no-unused-expressions
        _window.addEventListener('keyup', this.closeModal);
      } else if (!this.props.open && this.listening) {
        this.listening = false;
        this.updateDataState();
        this.onClosing; // eslint-disable-line no-unused-expressions
        _window.removeEventListener('keyup', this.closeModal);
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
    key: 'componentTags',


    // stubbed method for component tags
    value: function componentTags() {
      return null;
    }

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */

  }, {
    key: 'render',
    value: function render() {
      var backgroundHTML = void 0,
          modalHTML = void 0;

      if (this.props.open) {
        backgroundHTML = this.backgroundHTML;
        modalHTML = this.modalHTML;
      }

      return _react2.default.createElement(
        _portal2.default,
        { key: '1' },
        _react2.default.createElement(
          'div',
          _extends({
            className: this.mainClasses
          }, this.componentTags(this.props), {
            'data-state': this.state.state
          }),
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              component: 'div',
              transitionName: this.backgroundTransitionName,
              transitionEnterTimeout: TIMEOUT,
              transitionLeaveTimeout: TIMEOUT
            },
            backgroundHTML
          ),
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              component: 'div',
              transitionName: this.transitionName,
              transitionEnterTimeout: TIMEOUT,
              transitionLeaveTimeout: TIMEOUT
            },
            modalHTML
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
        return _react2.default.createElement('div', {
          className: 'carbon-modal__background'
        });
      }
      return null;
    }

    // Called after the modal opens

  }, {
    key: 'onOpening',
    get: function get() {
      return null;
    }
    // Called after the modal closes

  }, {
    key: 'onClosing',
    get: function get() {
      return null;
    }
    // Classes for parent div

  }, {
    key: 'mainClasses',
    get: function get() {
      return null;
    }
    // Modal HTML shown when open

  }, {
    key: 'modalHTML',
    get: function get() {
      return null;
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
}(_react2.default.Component);

Modal.propTypes = {

  /**
   * A custom close event handler
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _propTypes2.default.func,

  /**
   * Sets the open state of the modal
   *
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: _propTypes2.default.bool.isRequired,

  /**
   * Determines if the background is disabled
   * when the modal is open
   *
   * @property enableBackgroundUI
   * @type {Boolean}
   * @default true
   */
  enableBackgroundUI: _propTypes2.default.bool,

  /**
   * Determines if the Esc Key closes the modal
   *
   * @property disableEscKey
   * @type {Boolean}
   * @default true
   */
  disableEscKey: _propTypes2.default.bool,

  /**
   * The ARIA role to be applied to the modal
   *
   * @property ariaRole
   * @type {String}
   */
  ariaRole: _propTypes2.default.string // eslint-disable-line react/no-unused-prop-types
};
Modal.defaultProps = {
  onCancel: null,
  enableBackgroundUI: false,
  disableEscKey: false
};
Modal.childContextTypes = {
  /**
   * Defines a context object for child components of the modal component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property modal
   * @type {Object}
   */
  modal: _propTypes2.default.object
};
exports.default = Modal;