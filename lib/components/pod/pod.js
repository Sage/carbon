'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsIcon = require('components/icon');

var _componentsIcon2 = _interopRequireDefault(_componentsIcon);

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

var Pod = (function (_React$Component) {
  _inherits(Pod, _React$Component);

  function Pod() {
    var _this = this;

    _classCallCheck(this, Pod);

    _get(Object.getPrototypeOf(Pod.prototype), 'constructor', this).apply(this, arguments);

    this.componentWillMount = function () {
      _this.setState({ collapsed: _this.props.collapsed });
    };

    this.toggleCollapse = function () {
      _this.setState({ collapsed: !_this.state.collapsed });
    };
  }

  _createClass(Pod, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var className = "ui-pod ";
      var content = undefined;

      className += this.props.className ? this.props.className : '';

      if (!this.state.collapsed) {
        content = this.podContent;
      }

      return _react2['default'].createElement(
        'div',
        { className: className },
        this.podHeader,
        content
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
      var pod = undefined,
          headerProps = {};

      headerProps.className = "ui-pod__header unselectable";

      if (this.state.collapsed !== undefined) {
        pod = this.podCollapsible;
        headerProps.onClick = this.toggleCollapse;
        headerProps.className += " ui-pod__header--" + this.state.collapsed;
      }

      return _react2['default'].createElement(
        'div',
        headerProps,
        _react2['default'].createElement(
          'h2',
          { className: 'ui-pod__title' },
          this.props.title
        ),
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
      return this.props.description ? _react2['default'].createElement(
        'div',
        { className: 'ui-pod__description' },
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

      return _react2['default'].createElement(_componentsIcon2['default'], { type: 'dropdown', className: className });
    }

    /**
     * Returns the pod description and children.
     *
     * @method podContent
     */
  }, {
    key: 'podContent',
    get: function get() {
      return _react2['default'].createElement(
        'div',
        { className: 'ui-pod__collapsible-content' },
        this.podDescription,
        _react2['default'].createElement(
          'div',
          { className: 'ui-pod__content' },
          this.props.children
        )
      );
    }

    /**
     * Toggles the opening and closing of the pod
     *
     * @method toggleCollapse
     */
  }], [{
    key: 'propTypes',
    value: {

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
      collapsed: _react2['default'].PropTypes.bool
    },

    /**
     * A lifecycle called immediatly before initial render
     * Sets the initial state of collasped
     *
     * @method componentWillMount
     */
    enumerable: true
  }]);

  return Pod;
})(_react2['default'].Component);

exports['default'] = Pod;
module.exports = exports['default'];