'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Modal: {
    displayName: 'Modal'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/modal/modal.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
var Modal = _wrapComponent('Modal')((_temp2 = _class = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.listening = false, _this.closeModal = function (ev) {
      if (_this.props.onCancel && !_this.props.disableEscKey && _events2.default.isEscKey(ev)) {
        _this.props.onCancel();
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
    key: 'componentTags',


    // stubbed method for component tags
    value: function componentTags() {
      return;
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
      var _this2 = this;

      var backgroundHTML = void 0,
          modalHTML = void 0;

      if (this.props.open) {
        backgroundHTML = this.backgroundHTML;
        modalHTML = this.modalHTML;
      }

      return _react3.default.createElement(
        'div',
        _extends({
          ref: function ref(c) {
            return _this2._input = c;
          },
          className: this.mainClasses
        }, this.componentTags(this.props)),
        _react3.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: this.transitionName,
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500 },
          modalHTML
        ),
        _react3.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
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
        return _react3.default.createElement('div', {
          className: 'carbon-modal__background'
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
  }]);

  return Modal;
}(_react3.default.Component), _class.propTypes = {

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
  disableEscKey: _propTypes2.default.bool
}, _class.defaultProps = {
  open: false,
  enableBackgroundUI: false,
  disableEscKey: false
}, _class.childContextTypes = {
  /**
   * Defines a context object for child components of the modal component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property modal
   * @type {Object}
   */
  modal: _propTypes2.default.object
}, _temp2));

exports.default = Modal;