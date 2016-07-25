/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_pod = require('./../pod');

/*istanbul ignore next*/
var _pod2 = _interopRequireDefault(_pod);

var /*istanbul ignore next*/_form = require('./../form');

/*istanbul ignore next*/
var _form2 = _interopRequireDefault(_form);

var /*istanbul ignore next*/_link = require('./../link');

/*istanbul ignore next*/
var _link2 = _interopRequireDefault(_link);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowEditPod = function (_React$Component) {
  _inherits(ShowEditPod, _React$Component);

  function ShowEditPod() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ShowEditPod);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ShowEditPod)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      /**
       * Determines if the component is in edit mode
       *
       * @property editing
       */
      editing: false
    }, _this.onEdit = function (ev) {
      if ( /*istanbul ignore next*/_this.props.onEdit) {
        /*istanbul ignore next*/_this.props.onEdit(ev);
      }
      /*istanbul ignore next*/_this.setState({ editing: true });
    }, _this.onSaveEditForm = function (ev, valid) {
      ev.preventDefault();

      if (valid) {
        /*istanbul ignore next*/_this.props.afterFormValidation(ev);
        /*istanbul ignore next*/_this.setState({ editing: false });
      }
    }, _this.onCancelEditForm = function (ev) {
      if ( /*istanbul ignore next*/_this.props.onCancel) {
        /*istanbul ignore next*/_this.props.onCancel(ev);
      }
      /*istanbul ignore next*/_this.setState({ editing: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Called when the edit button is clicked
   * Emits callback when present and changes state
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


  _createClass(ShowEditPod, [{
    key: 'render',


    /**
     * Render function
     *
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_pod2.default,
          /*istanbul ignore next*/_extends({ className: this.mainClasses }, this.podProps),
          this.content
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Returns classes for top level div
     *
     * @method mainClasses
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-show-edit-pod', this.props.className)
      );
    }

    /**
     * Returns the delete button
     *
     * @method mainClasses
     */

  }, {
    key: 'deleteButton',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_link2.default,
          /*istanbul ignore next*/{ as: 'error', className: 'ui-show-edit-pod__delete', onClick: this.props.onDelete },
          this.props.deleteText || /*istanbul ignore next*/_i18nJs2.default.t('actions.delete', { defaultValue: 'Delete' })
        )
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/null,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_form2.default,
            /*istanbul ignore next*/{
              afterFormValidation: this.onSaveEditForm,
              beforeFormValidation: this.beforeFormValidation,
              buttonAlign: 'left',
              cancel: this.props.cancel,
              cancelText: this.props.cancelText,
              onCancel: this.onCancelEditForm,
              saveText: this.props.saveText,
              saving: this.props.saving,
              validateOnMount: this.props.validateOnMount,
              additionalActions: this.props.onDelete ? this.deleteButton : null
            },
            this.props.editFields
          )
        )
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
      return this.state.editing ? this.editContent : this.props.children;
    }

    /**
     * Determines props for show content
     *
     * @method content
     */

  }, {
    key: 'contentProps',
    get: function get() {
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var className = _props.className;
      /*istanbul ignore next*/var onEdit = _props.onEdit;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['className', 'onEdit']);

      props.onEdit = this.onEdit;

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
      /*istanbul ignore next*/var _props2 = this.props;
      /*istanbul ignore next*/var className = _props2.className;
      /*istanbul ignore next*/var onEdit = _props2.onEdit;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props2, ['className', 'onEdit']);

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
      return this.state.editing ? this.editingProps : this.contentProps;
    }
  }]);

  return ShowEditPod;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/ShowEditPod.propTypes = {
  /**
   * Callback when edit button is clicked
   *
   * @property onEdit
   * @type {Function}
   */
  onEdit: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Shows delete button when provided
   * Called when delete button is clicked
   *
   * @property onDelete
   * @type {Function}
   */
  onDelete: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * JSX of fields to appear when in edit mode
   *
   * @property editFields
   * @type {JSX}
   */
  editFields: /*istanbul ignore next*/_react2.default.PropTypes.node,

  // Props passed to Form
  afterFormValidation: /*istanbul ignore next*/_react2.default.PropTypes.func,
  beforeFormValidation: /*istanbul ignore next*/_react2.default.PropTypes.func,
  buttonAlign: /*istanbul ignore next*/_react2.default.PropTypes.string,
  cancel: /*istanbul ignore next*/_react2.default.PropTypes.bool,
  cancelText: /*istanbul ignore next*/_react2.default.PropTypes.string,
  onCancel: /*istanbul ignore next*/_react2.default.PropTypes.func,
  saveText: /*istanbul ignore next*/_react2.default.PropTypes.string,
  saving: /*istanbul ignore next*/_react2.default.PropTypes.bool,
  validateOnMount: /*istanbul ignore next*/_react2.default.PropTypes.bool,
  additionalActions: /*istanbul ignore next*/_react2.default.PropTypes.node,

  // Props passed to Pod
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,
  border: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/ShowEditPod.defaultProps = {
  as: 'transparent',
  border: false
};
/*istanbul ignore next*/exports.default = ShowEditPod;