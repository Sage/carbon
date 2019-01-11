'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Can be used to integrate React components into
 * pre-existing user interfaces.
 *
 * == How to use a MountInApp component:
 *
 * Import the component:
 *
 *   import MountInApp from 'carbon-react/lib/components/mount-in-app';
 *
 * Imagine that your pre-existing user interface has
 * a <div id="put_carbon_component_here" /> inside
 * which you want to put your new React component.
 *
 * To do that create a new React component that renders:
 *
 *   <MountInApp targetId="put_carbon_component_here">
 *     <div>Hello</div>
 *     <div>I'm a react component rendered in an existing UI</div>
 *   </MountInApp>
 *
 */
var MountInApp = function (_React$Component) {
  _inherits(MountInApp, _React$Component);

  function MountInApp() {
    _classCallCheck(this, MountInApp);

    return _possibleConstructorReturn(this, (MountInApp.__proto__ || Object.getPrototypeOf(MountInApp)).apply(this, arguments));
  }

  _createClass(MountInApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.targetElement) {
        _reactDom2.default.render(this.contentHtml, this.targetElement);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.targetElement.firstChild.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'contentHtml',
    get: function get() {
      return _react2.default.createElement(
        'div',
        { className: 'carbon-mount-in-app' },
        this.props.children
      );
    }
  }, {
    key: 'targetElement',
    get: function get() {
      return document.getElementById(this.props.targetId);
    }
  }]);

  return MountInApp;
}(_react2.default.Component);

MountInApp.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * ID of the element in which the children components will be rendered.
   *
   * @property targetId
   * @type {String}
   */
  targetId: _propTypes2.default.string
};
exports.default = MountInApp;