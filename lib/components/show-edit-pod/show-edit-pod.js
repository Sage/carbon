'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pod = require('./../pod');

var _pod2 = _interopRequireDefault(_pod);

var _form = require('./../form');

var _form2 = _interopRequireDefault(_form);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowEditPod = function (_React$Component) {
  _inherits(ShowEditPod, _React$Component);

  function ShowEditPod() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShowEditPod);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShowEditPod.__proto__ || Object.getPrototypeOf(ShowEditPod)).call.apply(_ref, [this].concat(args))), _this), _this.control = 'props', _this.state = {
      /**
       * When controlled by state
       * Determines if the component is in edit mode
       *
       * @property editing
       */
      editing: false
    }, _this.onEdit = function (ev) {
      if (_this.props.onEdit) {
        _this.props.onEdit(ev);
      }

      if (_this.stateControlled) {
        _this.setState({ editing: true });
      }
    }, _this.onSaveEditForm = function (ev, valid) {
      ev.preventDefault();

      if (valid) {
        _this.props.afterFormValidation(ev);

        if (_this.stateControlled) {
          _this.setState({ editing: false });
        }
      }
    }, _this.onCancelEditForm = function (ev) {
      if (_this.props.onCancel) {
        _this.props.onCancel(ev);
      }

      if (_this.stateControlled) {
        _this.setState({ editing: false });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Determines if controlled internally via state
  // Or externally via props


  _createClass(ShowEditPod, [{
    key: 'componentWillMount',


    /**
     * Determine if the component is controlled internally or externally
     * If editing prop is undefined then component is controlled internally
     *
     * @method componentWillMount
     */
    value: function componentWillMount() {
      if (typeof this.props.editing === 'undefined') {
        this.control = 'state';
      }
    }

    /**
     * Called when the edit button is clicked
     * Emits callback when present
     *
     * @method onEdit
     */


    /**
     * Emits the afterFormValidation Callback
     * when valid
     *
     * @method onSaveEditForm
     */


    /**
     * Emits the onCancel Callback
     *
     * @method onCancelEditForm
     */

  }, {
    key: 'render',


    /**
     * Render function
     *
     * @method render
     */
    value: function render() {
      return _react2.default.createElement(
        _pod2.default,
        _extends({ className: this.mainClasses }, this.podProps),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: this.props.transitionName,
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 50
          },
          this.content
        )
      );
    }
  }, {
    key: 'stateControlled',


    /**
     * True if the component is controlled by state
     *
     * @method stateControlled
     * @return {Boolean}
     */
    get: function get() {
      return this.control === 'state';
    }

    /**
     * Returns classes for top level div
     *
     * @method mainClasses
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-show-edit-pod', this.props.className);
    }

    /**
     * Returns the delete button
     *
     * @method mainClasses
     */

  }, {
    key: 'deleteButton',
    get: function get() {
      return _react2.default.createElement(
        _link2.default,
        { as: 'error', className: 'carbon-show-edit-pod__delete', onClick: this.props.onDelete },
        this.props.deleteText || _i18nJs2.default.t('actions.delete', { defaultValue: 'Delete' })
      );
    }

    /**
     * Get the content for when the component is in edit mode
     *
     * @method editContent
     */

  }, {
    key: 'editContent',
    get: function get() {
      return _react2.default.createElement(
        _form2.default,
        {
          afterFormValidation: this.onSaveEditForm,
          beforeFormValidation: this.beforeFormValidation,
          cancel: this.props.cancel,
          cancelText: this.props.cancelText,
          onCancel: this.onCancelEditForm,
          saveText: this.props.saveText,
          saving: this.props.saving,
          validateOnMount: this.props.validateOnMount,
          additionalActions: this.props.onDelete ? this.deleteButton : null
        },
        this.props.editFields
      );
    }

    /**
     * Determines the content to render
     *
     * @method content
     */

  }, {
    key: 'content',
    get: function get() {
      return this[this.control].editing ? _react2.default.createElement(
        'div',
        { key: 'edit' },
        this.editContent
      ) : _react2.default.createElement(
        'div',
        { key: 'show' },
        this.props.children
      );
    }

    /**
     * Determines props for show content
     *
     * @method content
     */

  }, {
    key: 'contentProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      delete props.onEdit;
      delete props.className;

      if (this.props.onEdit !== false) {
        props.onEdit = this.onEdit;
      }

      return props;
    }

    /**
     * Determines props for edit content
     *
     * @method content
     */

  }, {
    key: 'editingProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      delete props.onEdit;
      delete props.className;

      props.as = 'secondary';

      return props;
    }

    /**
     * Determines which props to return
     *
     * @method content
     */

  }, {
    key: 'podProps',
    get: function get() {
      return this[this.control].editing ? this.editingProps : this.contentProps;
    }
  }]);

  return ShowEditPod;
}(_react2.default.Component);

ShowEditPod.propTypes = {

  /**
   * Determines the editing state of the show edit pod
   * Must be set to true/false onMount if you want to control
   * the pod externally via props
   *
   * @property editing
   * @type {Boolean}
   */
  editing: _react2.default.PropTypes.bool,

  /**
   * Callback when edit button is clicked
   *
   * @property onEdit
   * @type {Function}
   */
  onEdit: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.bool]),

  /**
   * Shows delete button when provided
   * Called when delete button is clicked
   *
   * @property onDelete
   * @type {Function}
   */
  onDelete: _react2.default.PropTypes.func,

  /**
   * JSX of fields to appear when in edit mode
   *
   * @property editFields
   * @type {JSX}
   */
  editFields: _react2.default.PropTypes.node,

  /**
   * Title to display in pod
   *
   * @property title
   * @type {String}
   */
  title: _react2.default.PropTypes.string,

  /**
   * Transition Name, Override for custom state transition
   *
   * @property transitionName
   * @type {String}
   * @default 'carbon-show-edit-pod__transition'
   */

  // Props passed to Form
  afterFormValidation: _react2.default.PropTypes.func,
  beforeFormValidation: _react2.default.PropTypes.func,
  buttonAlign: _react2.default.PropTypes.string,
  cancel: _react2.default.PropTypes.bool,
  cancelText: _react2.default.PropTypes.string,
  onCancel: _react2.default.PropTypes.func,
  saveText: _react2.default.PropTypes.string,
  saving: _react2.default.PropTypes.bool,
  validateOnMount: _react2.default.PropTypes.bool,
  additionalActions: _react2.default.PropTypes.node,

  // Props passed to Pod
  as: _react2.default.PropTypes.string,
  border: _react2.default.PropTypes.bool
};
ShowEditPod.defaultProps = {
  as: 'transparent',
  border: false,
  transitionName: 'carbon-show-edit-pod__transition'
};
exports.default = ShowEditPod;