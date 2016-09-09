'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _css = require('./../../utils/css');

var _css2 = _interopRequireDefault(_css);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pod);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pod.__proto__ || Object.getPrototypeOf(Pod)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
      _this.setState({ collapsed: _this.props.collapsed });
    }, _this.toggleCollapse = function () {
      _this.setState({ collapsed: !_this.state.collapsed });
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
      var content = void 0;
      var props = _objectWithoutProperties(this.props, []);

      delete props.className;

      if (!this.state.collapsed) {
        content = this.podContent;
      }

      return _react2.default.createElement(
        'div',
        { className: this.mainClasses },
        this.edit,
        _react2.default.createElement(
          'div',
          _extends({ className: this.blockClasses }, props),
          _react2.default.createElement(
            'div',
            { className: this.contentClasses },
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

      var pod = void 0,
          subtitle = void 0,
          headerProps = {};

      if (this.state.collapsed !== undefined) {
        pod = this.podCollapsible;
        headerProps.onClick = this.toggleCollapse;
      }

      headerProps.className = this.headerClasses;

      if (this.props.subtitle) {
        subtitle = _react2.default.createElement(
          'h5',
          { className: 'carbon-pod__subtitle' },
          this.props.subtitle
        );
      }

      return _react2.default.createElement(
        'div',
        headerProps,
        _react2.default.createElement(
          'h4',
          { className: 'carbon-pod__title' },
          this.props.title
        ),
        subtitle,
        pod
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
      return this.props.description ? _react2.default.createElement(
        'div',
        { className: 'carbon-pod__description' },
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
      var className = 'carbon-pod__arrow carbon-pod__arrow--' + this.state.collapsed;

      return _react2.default.createElement(_icon2.default, { type: 'dropdown', className: className });
    }

    /**
     * Returns the pod description and children.
     *
     * @method podContent
     */

  }, {
    key: 'podContent',
    get: function get() {
      return _react2.default.createElement(
        'div',
        { className: 'carbon-pod__collapsible-content' },
        this.podDescription,
        _react2.default.createElement(
          'div',
          { className: 'carbon-pod__content' },
          this.props.children
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
    get: function get() {
      return (0, _classnames2.default)("carbon-pod", this.props.className, _css2.default.clearfix, {
        "carbon-pod--editable": this.props.onEdit
      });
    }

    /**
     * Main Class getter
     *
     * @method blockClasses
     * @return {String} Main className
     */

  }, {
    key: 'blockClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-pod__block', 'carbon-pod__block--' + this.props.as, {
        'carbon-pod__block--no-border': !this.props.border,
        'carbon-pod__block--footer': this.props.footer
      });
    }

    /**
     * Header classes getter
     *
     * @method headerClasses
     * @return {String} header className
     */

  }, {
    key: 'headerClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-pod__header', 'carbon-pod__header--' + this.props.alignTitle, _defineProperty({}, 'carbon-pod__header--' + this.state.collapsed, this.state.collapsed !== undefined));
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
      return (0, _classnames2.default)('carbon-pod__content', 'carbon-pod__content--' + this.props.as, 'carbon-pod__content--padding-' + this.props.padding, {
        'carbon-pod__content--footer': this.props.footer,
        'carbon-pod--no-border': !this.props.border
      });
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
      return (0, _classnames2.default)('carbon-pod__footer', 'carbon-pod__footer--' + this.props.as, 'carbon-pod__footer--padding-' + this.props.padding, {
        'carbon-pod--no-border': !this.props.border
      });
    }

    /**
     * Classes for the edit action.
     *
     * @method editActionClasses
     * @return {String}
     */

  }, {
    key: 'editActionClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-pod__edit-action', 'carbon-pod__edit-action--padding-' + this.props.padding, {
        'carbon-pod__edit-action--no-border': !this.props.border
      });
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

      return _react2.default.createElement(
        'div',
        { className: this.footerClasses },
        this.props.footer
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
      } else if (_typeof(this.props.onEdit) === "object") {
        props = this.props.onEdit;
      } else {
        props.onClick = this.props.onEdit;
      }

      return _react2.default.createElement(_link2.default, _extends({ icon: 'edit', className: this.editActionClasses }, props));
    }
  }]);

  return Pod;
}(_react2.default.Component);

Pod.propTypes = {

  /**
   * Enables/disables the border around the pod.
   *
   * @property border
   * @type {Boolean}
   * @default true
   */
  border: _react2.default.PropTypes.bool,

  /**
   * Determines the padding around the pod.
   * Values: "none", "small", "medium" or "large".
   *
   * @property padding
   * @type {String}
   * @default medium
   */
  padding: _react2.default.PropTypes.string,

  /**
   * Applies a theme to the Pod.
   * Value: primary, secondary, tile
   *
   * @property as
   * @type {String}
   * @default primary
   */
  as: _react2.default.PropTypes.string,

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
  collapsed: _react2.default.PropTypes.bool,

  /**
   * Title for the pod h4 element
   * always shown
   *
   * @property title
   * @type {String}
   */
  title: _react2.default.PropTypes.string,

  /**
   * Aligns the title to left, right or center
   *
   * @property alignTitle
   * @type {String}
   * @default left
   */
  alignTitle: _react2.default.PropTypes.string,

  /**
   * Description for the pod
   * Not shown if collapsed
   *
   * @property title
   * @type {String}
   */
  description: _react2.default.PropTypes.string,

  /**
   * A component to render as a Pod footer.
   *
   * @property footer
   * @type {String}
   */
  footer: _react2.default.PropTypes.object,

  /**
   * Supplies an edit action to the pod.
   *
   * @property onEdit
   * @type {String|Function|Object}
   */
  onEdit: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func, _react2.default.PropTypes.object])
};
Pod.defaultProps = {
  border: true,
  as: "primary",
  padding: "medium",
  alignTitle: 'left'
};
exports.default = Pod;