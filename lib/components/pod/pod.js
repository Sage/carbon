'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Pod: {
    displayName: 'Pod'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/pod/pod.js',
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
var Pod = _wrapComponent('Pod')((_temp2 = _class = function (_React$Component) {
  _inherits(Pod, _React$Component);

  function Pod() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pod);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pod.__proto__ || Object.getPrototypeOf(Pod)).call.apply(_ref, [this].concat(args))), _this), _this.titleIsString = function () {
      return typeof _this.props.title === 'string';
    }, _this.toggleCollapse = function () {
      _this.setState({ collapsed: !_this.state.collapsed });
    }, _this.linkProps = function () {
      var props = {
        'data-element': 'edit'
      };

      if (typeof _this.props.onEdit === 'string') {
        props.to = _this.props.onEdit;
      } else if (_typeof(_this.props.onEdit) === 'object') {
        props = _this.props.onEdit;
      }

      return props;
    }, _this.processPodEditEvent = function (ev) {
      if (_events2.default.isEnterKey(ev) || !_events2.default.isEventType(ev, 'keydown')) {
        ev.preventDefault();
        _this.props.onEdit(ev);
      }
    }, _this.toggleHoverState = function (val) {
      _this.setState({ hoverEdit: val });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pod, [{
    key: 'componentWillMount',


    /**
     * A lifecycle called immediatly before initial render
     * Sets the initial state of collasped
     *
     * @method componentWillMount
     */
    value: function componentWillMount() {
      this.setState({ collapsed: this.props.collapsed });
    }

    /**
     * A lifecycle called immediatly before new props cause a re-render
     * Resets the hover state if active
     *
     * @method componentWillReceiveProps
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      if (this.state.hoverEdit) {
        this.toggleHoverState(false);
      }
    }

    /**
     * Returns HTML and text for the pod header.
     * Includes:
     *    Title
     *    Collapsible arrow if collapsible
     *
     * @method podHeader
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
      var content = void 0,
          _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []),
          hoverOverEditEvents = {};


      delete props.className;

      if (this.titleIsString()) {
        props.title = this.props.title;
      }

      if (!this.state.collapsed) {
        content = this.podContent;
      }

      if (this.shouldContentHaveEditProps) {
        hoverOverEditEvents = this.hoverOverEditEvents;
        hoverOverEditEvents.tabIndex = '0';
      }

      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, props, (0, _tags.tagComponent)('pod', this.props)),
        _react3.default.createElement(
          'div',
          _extends({ className: this.blockClasses }, hoverOverEditEvents),
          _react3.default.createElement(
            'div',
            { className: this.contentClasses },
            this.podHeader,
            content
          ),
          this.footer
        ),
        this.edit
      );
    }
  }, {
    key: 'podHeader',
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
        subtitle = _react3.default.createElement(
          'h5',
          { className: 'carbon-pod__subtitle', 'data-element': 'subtitle' },
          this.props.subtitle
        );
      }

      return _react3.default.createElement(
        'div',
        headerProps,
        _react3.default.createElement(
          'h4',
          { className: 'carbon-pod__title', 'data-element': 'title' },
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
      if (this.props.description) {
        return _react3.default.createElement(
          'div',
          { className: 'carbon-pod__description' },
          this.props.description
        );
      } else {
        return null;
      }
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

      return _react3.default.createElement(_icon2.default, { type: 'dropdown', className: className });
    }

    /**
     * Returns the pod description and children.
     *
     * @method podContent
     */

  }, {
    key: 'podContent',
    get: function get() {
      return _react3.default.createElement(
        'div',
        { className: 'carbon-pod__collapsible-content' },
        this.podDescription,
        _react3.default.createElement(
          'div',
          { className: 'carbon-pod__content' },
          this.props.children
        )
      );
    }

    /**
     * Checks that the title is a string rather than something else as it can be JSX
     *
     * @method titleIsString
     * @return {Boolean}
     */


    /**
     * Toggles the opening and closing of the pod
     *
     * @method toggleCollapse
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-pod', this.props.className, 'carbon-pod--' + this.props.alignTitle, {
        'carbon-pod--editable': this.props.onEdit,
        'carbon-pod--is-hovered': this.state.hoverEdit,
        'carbon-pod--content-triggers-edit': this.shouldContentHaveEditProps,
        'carbon-pod--internal-edit-button': this.props.internalEditButton
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
      return (0, _classnames2.default)('carbon-pod__block', 'carbon-pod__block--padding-' + this.props.padding, 'carbon-pod__block--' + this.props.as, {
        'carbon-pod__block--no-border': !this.props.border,
        'carbon-pod__block--full-width': this.props.editContentFullWidth,
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
      return (0, _classnames2.default)('carbon-pod__edit-action', 'carbon-pod__edit-action--' + this.props.as, 'carbon-pod__edit-action--padding-' + this.props.padding, {
        'carbon-pod__edit-action--no-border': !this.props.border,
        'carbon-pod__display-on-hover': this.props.displayEditButtonOnHover
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

      return _react3.default.createElement(
        'div',
        { className: this.footerClasses, 'data-element': 'footer' },
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

      return _react3.default.createElement(
        'div',
        _extends({ className: 'carbon-pod__edit-button-container' }, this.hoverOverEditEvents),
        _react3.default.createElement(_link2.default, _extends({ icon: 'edit', className: this.editActionClasses }, this.linkProps()))
      );
    }

    /**
     * Returns event related props for triggering and highlighting edit functionality
     *
     * @method linkProps
     * @return {Object} props
     */

  }, {
    key: 'hoverOverEditEvents',


    /**
     * Returns event related props for triggering and highlighting edit functionality
     *
     * @method hoverOverEditEvents
     * @return {Object}
     */
    get: function get() {
      var props = {
        onMouseEnter: this.toggleHoverState.bind(this, true),
        onMouseLeave: this.toggleHoverState.bind(this, false),
        onFocus: this.toggleHoverState.bind(this, true),
        onBlur: this.toggleHoverState.bind(this, false)
      };

      if (typeof this.props.onEdit === 'function') {
        props.onClick = this.processPodEditEvent;
        props.onKeyDown = this.processPodEditEvent;
      }

      return props;
    }

    /**
     * Determines if the content pod should share the editProps
     *
     * @method shouldContentHaveEditProps
     * @return {Boolean}
     */

  }, {
    key: 'shouldContentHaveEditProps',
    get: function get() {
      return (this.props.triggerEditOnContent || this.props.displayEditButtonOnHover) && this.props.onEdit;
    }

    /**
     * Processes the edit event only on certain event types
     *
     * @method processPodEditEvent
     * @param {Object} the event
     */


    /**
     * Toggle the state of hovering the edit button.
     *
     * @method toggleHoverState
     * @return {Void}
     */

  }]);

  return Pod;
}(_react3.default.Component), _class.propTypes = {

  /**
   * Enables/disables the border around the pod.
   *
   * @property border
   * @type {Boolean}
   * @default true
   */
  border: _propTypes2.default.bool,

  /**
   * Determines the padding around the pod.
   * Values: 'none', 'small', 'medium' or 'large'.
   *
   * @property padding
   * @type {String}
   * @default medium
   */
  padding: _propTypes2.default.string,

  /**
   * Applies a theme to the Pod.
   * Value: primary, secondary, tile
   *
   * @property as
   * @type {String}
   * @default primary
   */
  as: _propTypes2.default.string,

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
  collapsed: _propTypes2.default.bool,

  /**
   * Title for the pod h4 element
   * always shown
   *
   * @property title
   * @type {String}
   */
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

  /**
   * Optional subtitle for the pod
   *
   * @property subtitle
   * @type {String}
   */
  subtitle: _propTypes2.default.string,

  /**
   * Aligns the title to left, right or center
   *
   * @property alignTitle
   * @type {String}
   * @default left
   */
  alignTitle: _propTypes2.default.string,

  /**
   * Description for the pod
   * Not shown if collapsed
   *
   * @property title
   * @type {String}
   */
  description: _propTypes2.default.string,

  /**
   * A component to render as a Pod footer.
   *
   * @property footer
   * @type {String | Object}
   */
  footer: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

  /**
   * Supplies an edit action to the pod.
   *
   * @property onEdit
   * @type {String|Function|Object}
   */
  onEdit: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.object]),

  /**
   * Determines if the editable pod content should be full width.
   *
   * @property editContentFullWidth
   * @type {Boolean}
   */
  editContentFullWidth: _propTypes2.default.bool,

  /**
   * Determines if the edit button should be hidden until the user
   * hovers over the content.
   *
   * @property displayEditButtonOnHover
   * @type {Boolean}
   */
  displayEditButtonOnHover: _propTypes2.default.bool,

  /**
   * Determines if clicking the pod content calls the onEdit action
   *
   * @property triggerEditOnContent
   * @type {Boolean}
   */
  triggerEditOnContent: _propTypes2.default.bool,

  /**
   * Resets edit button styles to an older version
   *
   * @property internalEditButton
   * @type {Boolean}
   */
  internalEditButton: _propTypes2.default.bool
}, _class.defaultProps = {
  border: true,
  as: 'primary',
  padding: 'medium',
  alignTitle: 'left'
}, _temp2));

exports.default = Pod;