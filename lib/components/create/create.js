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

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tags = require('../../utils/helpers/tags');

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Create: {
    displayName: 'Create'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/create/create.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

var Create = _wrapComponent('Create')((_temp = _class = function (_React$Component) {
  _inherits(Create, _React$Component);

  function Create(args) {
    _classCallCheck(this, Create);

    var _this = _possibleConstructorReturn(this, (Create.__proto__ || Object.getPrototypeOf(Create)).call(this, args));

    _this.linkProps = _this.linkProps.bind(_this);
    return _this;
  }

  /**
   * @method render
   * @return {Object} JSX
   */


  _createClass(Create, [{
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        _link2.default,
        _extends({}, this.linkProps(), (0, _tags.tagComponent)('create', this.props)),
        this.props.children
      );
    }

    /**
     * Returns the props for the component.
     *
     * @method linkProps
     * @return {Object}
     */

  }, {
    key: 'linkProps',
    value: function linkProps() {
      var className = this.props.className;

      var props = _objectWithoutProperties(this.props, []);

      props.className = (0, _classnames2.default)('carbon-create', className);

      props.iconAlign = 'right';
      props.icon = 'add';
      return props;
    }
  }]);

  return Create;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Props for the link
   *
   * @property linkProps
   * @type {Object}
   */
  linkProps: _propTypes2.default.object
}, _temp));

exports.default = Create;