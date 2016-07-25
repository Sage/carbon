/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_css = require('./../../utils/css');

/*istanbul ignore next*/
var _css2 = _interopRequireDefault(_css);

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_link = require('./../link');

/*istanbul ignore next*/
var _link2 = _interopRequireDefault(_link);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Pod widget.
 *
 * This widget is a provides a wrapper in which to render other widgets.
 *
 * == How to use a Pod in a component:
 *
 * In your file:
 *
 *   import Pod from 'carbon/lib/components/pod';
 *
 * In the render the Pod:
 *
 *   <Pod />
 *
 * @class Pod
 * @constructor
 */

var Pod = function (_React$Component) {
  _inherits(Pod, _React$Component);

  function Pod() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Pod);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Pod)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.componentWillMount = function () {
      /*istanbul ignore next*/_this.setState({ collapsed: /*istanbul ignore next*/_this.props.collapsed });
    }, _this.toggleCollapse = function () {
      /*istanbul ignore next*/_this.setState({ collapsed: ! /*istanbul ignore next*/_this.state.collapsed });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * A lifecycle called immediatly before initial render
   * Sets the initial state of collasped
   *
   * @method componentWillMount
   */


  _createClass(Pod, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var /*istanbul ignore next*/content = void 0;
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var className = _props.className;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['className']);

      if (!this.state.collapsed) {
        content = this.podContent;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/_extends({ className: this.mainClasses }, props),
          this.edit,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: this.contentClasses },
            this.podHeader,
            content
          ),
          this.footer
        )
      );
    }
  }, {
    key: 'podHeader',


    /**
     * Returns HTML and text for the pod header.
     * Includes:
     *    Title
     *    Collapsible arrow if collapsible
     *
     * @method podHeader
     */
    get: function get() {
      if (!this.props.title) {
        return;
      }
      var pod = /*istanbul ignore next*/void 0,
          headerProps = {};

      headerProps.className = /*istanbul ignore next*/'ui-pod__header ' + /*istanbul ignore next*/_css2.default.unselectable;

      if (this.state.collapsed !== undefined) {
        pod = this.podCollapsible;
        headerProps.onClick = this.toggleCollapse;
        headerProps.className += " ui-pod__header--" + this.state.collapsed;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          headerProps,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'h4',
            /*istanbul ignore next*/{ className: 'ui-pod__title' },
            this.props.title
          ),
          pod
        )
      );
    }

    /**
     * Returns HTML and text for the pod description.
     *
     * @method podDescription
     */

  }, {
    key: 'podDescription',
    get: function get() {
      return this.props.description ? /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'div',
        /*istanbul ignore next*/{ className: 'ui-pod__description' },
        this.props.description
      ) : null;
    }

    /**
     * Returns the collapsible icon.
     *
     * @method podCollapsible
     */

  }, {
    key: 'podCollapsible',
    get: function get() {
      var className = 'ui-pod__arrow ui-pod__arrow--' + this.state.collapsed;

      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'dropdown', className: className })
      );
    }

    /**
     * Returns the pod description and children.
     *
     * @method podContent
     */

  }, {
    key: 'podContent',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-pod__collapsible-content' },
          this.podDescription,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-pod__content' },
            this.props.children
          )
        )
      );
    }

    /**
     * Toggles the opening and closing of the pod
     *
     * @method toggleCollapse
     */

  }, {
    key: 'mainClasses',


    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-pod', this.props.className, /*istanbul ignore next*/'ui-pod--' + this.props.as, {
          'ui-pod--no-border': !this.props.border,
          'ui-pod--footer': this.props.footer
        })
      );
    }

    /**
     * Classes for the content.
     *
     * @method contentClasses
     * @return {String}
     */

  }, {
    key: 'contentClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-pod__content', /*istanbul ignore next*/'ui-pod__content--' + this.props.as, /*istanbul ignore next*/'ui-pod--padding-' + this.props.padding, {
          'ui-pod__content--footer': this.props.footer,
          'ui-pod--no-border': !this.props.border
        })
      );
    }

    /**
     * Classes for the footer.
     *
     * @method footerClasses
     * @return {String}
     */

  }, {
    key: 'footerClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-pod__footer', /*istanbul ignore next*/'ui-pod__footer--' + this.props.as, /*istanbul ignore next*/'ui-pod__footer--padding-' + this.props.padding, {
          'ui-pod--no-border': !this.props.border
        })
      );
    }

    /**
     * Returns the footer component.
     *
     * @method footer
     * @return {String}
     */

  }, {
    key: 'footer',
    get: function get() {
      if (!this.props.footer) {
        return null;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.footerClasses },
          this.props.footer
        )
      );
    }

    /**
     * Returns the edit action if defined.
     *
     * @method edit
     * @return {Object} JSX
     */

  }, {
    key: 'edit',
    get: function get() {
      if (!this.props.onEdit) {
        return null;
      }

      var props = {};

      if (typeof this.props.onEdit === "string") {
        props.to = this.props.onEdit;
      } else if ( /*istanbul ignore next*/_typeof(this.props.onEdit) === "object") {
        props = this.props.onEdit;
      } else {
        props.onClick = this.props.onEdit;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_link2.default,
          /*istanbul ignore next*/_extends({ icon: 'edit', className: 'ui-pod__edit-action' }, props),
          /*istanbul ignore next*/_i18nJs2.default.t("components.pod.edit", { defaultValue: "Edit" })
        )
      );
    }
  }]);

  return Pod;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Pod.propTypes = {

  /**
   * Enables/disables the border around the pod.
   *
   * @property border
   * @type {Boolean}
   * @default true
   */
  border: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Determines the padding around the pod.
   * Values: "none", "small", "medium" or "large".
   *
   * @property padding
   * @type {String}
   * @default medium
   */
  padding: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Applies a theme to the Pod.
   * Value: primary, secondary, tile
   *
   * @property as
   * @type {String}
   * @default primary
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * The collapsed state of the pod
   *
   * undefined - Pod is not collapsible
   * true - Pod is closed
   * false - Pod is open
   *
   * @property collapsed
   * @type {Boolean}
   */
  collapsed: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Title for the pod h4 element
   * always shown
   *
   * @property title
   * @type {String}
   */
  title: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Description for the pod
   * Not shown if collapsed
   *
   * @property title
   * @type {String}
   */
  description: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * A component to render as a Pod footer.
   *
   * @property footer
   * @type {String}
   */
  footer: /*istanbul ignore next*/_react2.default.PropTypes.object,

  /**
   * Supplies an edit action to the pod.
   *
   * @property onEdit
   * @type {String|Function|Object}
   */
  onEdit: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.string, /*istanbul ignore next*/_react2.default.PropTypes.func, /*istanbul ignore next*/_react2.default.PropTypes.object])
};
/*istanbul ignore next*/Pod.defaultProps = {
  border: true,
  as: "primary",
  padding: "medium"
};
/*istanbul ignore next*/exports.default = Pod;