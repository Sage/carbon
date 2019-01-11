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

var _guid = require('../../utils/helpers/guid');

var _guid2 = _interopRequireDefault(_guid);

var _browser = require('../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

var _scrollableParent = require('../../utils/helpers/scrollable-parent');

var _scrollableParent2 = _interopRequireDefault(_scrollableParent);

require('./portal.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    var _ref;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Portal.__proto__ || Object.getPrototypeOf(Portal)).call.apply(_ref, [this].concat(args)));

    _this.guid = (0, _guid2.default)();
    return _this;
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onReposition) {
        this.props.onReposition();
        /* eslint-disable */
        this.scrollParent = _scrollableParent2.default.searchForScrollableParent(_reactDom2.default.findDOMNode(this));
        /* eslint-enable */
        if (this.scrollParent) {
          this.scrollParent.addEventListener('scroll', this.props.onReposition);
        }
        _browser2.default.getWindow().addEventListener('resize', this.props.onReposition);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onReposition) {
        _browser2.default.getWindow().removeEventListener('resize', this.props.onReposition);
        if (this.scrollParent) {
          this.scrollParent.removeEventListener('scroll', this.props.onReposition);
        }
      }
      _browser2.default.getDocument().body.removeChild(this.defaultNode);
      this.defaultNode = null;
      this.scrollParent = null;
    }
  }, {
    key: 'getPortalDiv',
    value: function getPortalDiv() {
      if (!this.defaultNode) {
        this.defaultNode = _browser2.default.getDocument().createElement('div');
        this.defaultNode.classList.add('carbon-portal');
        this.defaultNode.setAttribute('data-portal-exit', this.guid);
        _browser2.default.getDocument().body.appendChild(this.defaultNode);
      }
      return this.defaultNode;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!_browser2.default.isDomAvailable()) {
        return null;
      }
      return _react2.default.createElement(
        'span',
        { 'data-portal-entrance': this.guid },
        (0, _reactDom.createPortal)(this.props.children, this.getPortalDiv())
      );
    }
  }]);

  return Portal;
}(_react2.default.Component);

Portal.propTypes = {
  /**
   * The content of the portal.
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,
  /**
   * Callback function triggered when parent element is scrolled or window resized.
   *
   * @property onReposition
   * @type {Node}
   */
  onReposition: _propTypes2.default.func
};
exports.default = Portal;