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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _utilsHelpersEvents = require('./../../utils/helpers/events');

var _utilsHelpersEvents2 = _interopRequireDefault(_utilsHelpersEvents);

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

var Modal = (function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _this = this;

    _classCallCheck(this, Modal);

    _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).apply(this, arguments);

    this.listening = false;

    this.closeModal = function (ev) {
      if (!_this.props.disableEscKey && _utilsHelpersEvents2['default'].isEscKey(ev)) {
        _this.props.onCancel();
      }
    };
  }

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
      var _this2 = this;

      var backgroundHTML = undefined,
          modalHTML = undefined;

      if (this.props.open) {
        backgroundHTML = this.backgroundHTML;
        modalHTML = this.modalHTML;
      }

      return _react2['default'].createElement(
        'div',
        { ref: function (c) {
            return _this2._input = c;
          }, className: this.mainClasses },
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          {
            transitionName: this.transitionName,
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500 },
          modalHTML
        ),
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          {
            transitionName: this.backgroundTransitionName,
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500 },
          backgroundHTML
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
        return _react2['default'].createElement('div', {
          className: 'ui-modal__background'
        });
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
  }], [{
    key: 'propTypes',
    value: {

      /**
       * A custom close event handler
       *
       * @property onCancel
       * @type {Function}
       */
      onCancel: _react2['default'].PropTypes.func,

      /**
       * Sets the open state of the modal
       *
       * @property open
       * @type {Boolean}
       * @default false
       */
      open: _react2['default'].PropTypes.bool.isRequired,

      /**
       * Determines if the background is disabled
       * when the modal is open
       *
       * @property enableBackgroundUI
       * @type {Boolean}
       * @default true
       */
      enableBackgroundUI: _react2['default'].PropTypes.bool,

      /**
       * Determines if the Esc Key closes the modal
       *
       * @property disableEscKey
       * @type {Boolean}
       * @default true
       */
      disableEscKey: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      open: false,
      enableBackgroundUI: false,
      disableEscKey: false
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      /**
       * Defines a context object for child components of the modal component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property modal
       * @type {Object}
       */
      modal: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  return Modal;
})(_react2['default'].Component);

exports['default'] = Modal;
module.exports = exports['default'];

/**
 * Tracks if event listeners are on for modal
 *
 * @property listening
 * @type {Boolean}
 */