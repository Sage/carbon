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

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

/**
 * A Dialog widget.
 *
 * == How to use a Dialog in a component:
 *
 * In your file
 *
 *   import Dialog from 'carbon/lib/components/dialog';
 *
 * To render a Dialog:
 *
 *   <Dialog onCancel={ customEventHandler } />
 *
 * The component rendering the Dialog must pass down a prop of 'open' in order to open the dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Dialog
 * @constructor
 */

var Dialog = (function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog() {
    var _this = this;

    _classCallCheck(this, Dialog);

    _get(Object.getPrototypeOf(Dialog.prototype), 'constructor', this).apply(this, arguments);

    this.listening = false;

    this.closeDialog = function (ev) {
      if (ev.keyCode === 27) {
        _this.props.onCancel();
      }
    };

    this.centerDialog = function () {
      var height = _this.refs.dialog.offsetHeight / 2,
          width = _this.refs.dialog.offsetWidth / 2,
          midPointY = window.innerHeight / 2 + window.pageYOffset,
          midPointX = window.innerWidth / 2 + window.pageXOffset;

      midPointY = midPointY - height;
      midPointX = midPointX - width;

      if (midPointY < 20) {
        midPointY = 20;
      } else if (_bowser2['default'].ios) {
        midPointY -= window.pageYOffset;
      }

      if (midPointX < 20) {
        midPointX = 20;
      }

      _this.refs.dialog.style.top = midPointY + "px";
      _this.refs.dialog.style.left = midPointX + "px";
    };
  }

  _createClass(Dialog, [{
    key: 'getChildContext',

    /**
     * Returns dialog object to child components. Used to override form cancel button functionality.
     *
     * @method getChildContext
     * @return {void}
     */
    value: function getChildContext() {
      return {
        dialog: {
          onCancel: this.props.onCancel
        }
      };
    }

    /**
     * A lifecycle method to update the component on initialize
     *
     * @method componentDidMount
     * @return {void}
     */
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.open) {
        this.centerDialog();
      }
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
        this.centerDialog();
        this.listening = true;
        window.addEventListener('resize', this.centerDialog);
        window.addEventListener('keyup', this.closeDialog);
      } else if (!this.props.open) {
        this.listening = false;
        window.removeEventListener('resize', this.centerDialog);
        window.removeEventListener('keyup', this.closeDialog);
      }
    }

    /**
     * Triggers the custom close event handler on ESC
     *
     * @method closeDialog
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
      var backgroundHTML = undefined,
          dialogHTML = undefined;

      if (this.props.open) {
        backgroundHTML = this.backgroundHTML;
        dialogHTML = this.dialogHTML;
      }

      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          {
            transitionName: 'dialog',
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500 },
          dialogHTML
        ),
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          {
            transitionName: 'dialog-background',
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500 },
          backgroundHTML
        )
      );
    }
  }, {
    key: 'dialogTitle',

    /**
     * Returns HTML and text for the dialog title.
     *
     * @method dialogTitle
     * @return {String} title to display
     */
    get: function get() {
      return this.props.title ? _react2['default'].createElement(
        'h2',
        { className: this.dialogTitleClasses },
        this.props.title
      ) : null;
    }

    /**
     * Returns HTML for the background.
     *
     * @method backgroundHTML
     * @return {Object} JSX
     */
  }, {
    key: 'backgroundHTML',
    get: function get() {
      return _react2['default'].createElement('div', { className: 'ui-dialog__background' });
    }

    /**
     * Returns classes for the dialog title.
     *
     * @method dialogTitleClasses
     */
  }, {
    key: 'dialogTitleClasses',
    get: function get() {
      return 'ui-dialog__title';
    }

    /**
     * Returns classes for the component.
     *
     * @method mainClasses
     * @return {String} Main className
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      var classes = 'ui-dialog';

      if (this.props.className) {
        classes += ' ' + this.props.className;
      }

      return classes;
    }

    /**
     * Returns classes for the dialog.
     *
     * @method dialogClasses
     * @return {String} dialog className
     */
  }, {
    key: 'dialogClasses',
    get: function get() {
      return 'ui-dialog__dialog';
    }

    /**
     * Returns the computed HTML for the dialog.
     *
     * @method dialogHTML
     * @return {Object} JSX for dialog
     */
  }, {
    key: 'dialogHTML',
    get: function get() {
      var dialogClasses = this.dialogClasses;

      if (typeof this.props.size !== 'undefined') {
        dialogClasses += " ui-dialog__dialog--" + this.props.size;
      }

      return _react2['default'].createElement(
        'div',
        { ref: 'dialog', className: dialogClasses },
        this.dialogTitle,
        _react2['default'].createElement(_icon2['default'], { className: 'ui-dialog__close', type: 'close', onClick: this.props.onCancel }),
        _react2['default'].createElement(
          'div',
          { className: 'ui-dialog__content' },
          this.props.children
        )
      );
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
      onCancel: _react2['default'].PropTypes.func.isRequired,

      /**
       * Sets the open state of the dialog
       *
       * @property open
       * @type {Boolean}
       * @default false
       */
      open: _react2['default'].PropTypes.bool.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      open: false
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      /**
       * Defines a context object for child components of the dialog component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property dialog
       * @type {Object}
       */
      dialog: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  return Dialog;
})(_react2['default'].Component);

exports['default'] = Dialog;
module.exports = exports['default'];

/**
 * Centers dialog relative to window
 *
 * @method centerDialog
 * @return {void}
 */