'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  MenuListItem: {
    displayName: 'MenuListItem'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/menu-list/menu-list-item/menu-list-item.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

var MenuListItem = _wrapComponent('MenuListItem')((_temp = _class = function (_React$Component) {
  _inherits(MenuListItem, _React$Component);

  function MenuListItem() {
    var _ref;

    _classCallCheck(this, MenuListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MenuListItem.__proto__ || Object.getPrototypeOf(MenuListItem)).call.apply(_ref, [this].concat(args)));

    _this.mainClasses = _this.mainClasses.bind(_this);
    return _this;
  }

  _createClass(MenuListItem, [{
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'li',
        { className: this.mainClasses() },
        this.props.children
      );
    }
  }, {
    key: 'mainClasses',
    value: function mainClasses() {
      return (0, _classnames2.default)('carbon-menu-list-item', this.props.className);
    }
  }]);

  return MenuListItem;
}(_react3.default.Component), _class.propTypes = {
  children: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.number, _react2.PropTypes.array, _react2.PropTypes.object]).isRequired
}, _temp));

exports.default = MenuListItem;