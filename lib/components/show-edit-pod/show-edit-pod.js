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

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  ShowEditPod: {
    displayName: 'ShowEditPod'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/show-edit-pod/show-edit-pod.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

var ShowEditPod = _wrapComponent('ShowEditPod')((_temp2 = _class = function (_React$Component) {
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

      _this.__focusOnPod();
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
    }, _this.onKeyDown = function (ev) {
      if (_events2.default.isEscKey(ev)) {
        _this.onCancelEditForm(ev);
      }
    }, _this.__focusOnPod = function () {
      _reactDom2.default.findDOMNode(_this.refs.podFocus).focus();
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
     * if component is mounted in editing state, focus on pod
     *
     * @method componentDidMount
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.editing) {
        this.__focusOnPod();
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


    /**
     * Handles key down events
     *
     * @method onKeyDown
     * @return {Void}
     */

  }, {
    key: 'render',


    /**
     * @method render
     */
    value: function render() {
      return _react3.default.createElement(
        _pod2.default,
        _extends({ className: this.mainClasses }, this.podProps, { ref: 'podFocus', tabIndex: '-1' }, (0, _tags.tagComponent)('show-edit-pod', this.props)),
        _react3.default.createElement(
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

    /**
     * Focuses on the pod component.
     *
     * @method __focusOnPod
     */

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
      return _react3.default.createElement(
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
      return _react3.default.createElement(
        _form2.default,
        {
          additionalActions: this.props.onDelete ? this.deleteButton : null,
          afterFormValidation: this.onSaveEditForm,
          beforeFormValidation: this.props.beforeFormValidation,
          buttonAlign: this.props.buttonAlign,
          cancel: this.props.cancel,
          cancelText: this.props.cancelText,
          'data-element': 'edit-form',
          onCancel: this.onCancelEditForm,
          saveText: this.props.saveText,
          saving: this.props.saving,
          validateOnMount: this.props.validateOnMount
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
      return this[this.control].editing ? _react3.default.createElement(
        'div',
        { key: 'edit' },
        this.editContent
      ) : _react3.default.createElement(
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
      var _validProps = (0, _ether.validProps)(this, Object.keys(_pod2.default.propTypes)),
          props = _objectWithoutProperties(_validProps, []);

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
      var _validProps2 = (0, _ether.validProps)(this, Object.keys(_pod2.default.propTypes)),
          props = _objectWithoutProperties(_validProps2, []);

      delete props.onEdit;
      delete props.className;

      props.as = 'secondary';
      props.onKeyDown = this.onKeyDown;

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
}(_react3.default.Component), _class.propTypes = {

  /**
   * Determines the editing state of the show edit pod
   * Must be set to true/false onMount if you want to control
   * the pod externally via props
   *
   * @property editing
   * @type {Boolean}
   */
  editing: _propTypes2.default.bool,

  /**
   * Callback when edit button is clicked
   *
   * @property onEdit
   * @type {Function}
   */
  onEdit: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.bool]),

  /**
   * Shows delete button when provided
   * Called when delete button is clicked
   *
   * @property onDelete
   * @type {Function}
   */
  onDelete: _propTypes2.default.func,

  /**
   * JSX of fields to appear when in edit mode
   *
   * @property editFields
   * @type {JSX}
   */
  editFields: _propTypes2.default.node,

  /**
   * Title to display in pod
   *
   * @property title
   * @type {String}
   */
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

  /**
   * Transition Name, Override for custom state transition
   *
   * @property transitionName
   * @type {String}
   * @default 'carbon-show-edit-pod__transition'
   */
  transitionName: _propTypes2.default.string,

  // Props passed to Form
  afterFormValidation: _propTypes2.default.func,
  beforeFormValidation: _propTypes2.default.func,
  buttonAlign: _propTypes2.default.string,
  cancel: _propTypes2.default.bool,
  cancelText: _propTypes2.default.string,
  onCancel: _propTypes2.default.func,
  saveText: _propTypes2.default.string,
  deleteText: _propTypes2.default.string,
  saving: _propTypes2.default.bool,
  validateOnMount: _propTypes2.default.bool,
  additionalActions: _propTypes2.default.node,

  // Props passed to Pod
  as: _propTypes2.default.string,
  border: _propTypes2.default.bool
}, _class.defaultProps = {
  as: 'transparent',
  border: false,
  transitionName: 'carbon-show-edit-pod__transition'
}, _temp2));

exports.default = ShowEditPod;