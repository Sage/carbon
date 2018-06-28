'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Higher order component
 *
 * Takes a variadic number of arguments where the leading arguments are
 * Stores and the the tail of those arguments is a function mapping from
 * store states to the props of the composed component.
 *
 * Usage like so:
 *
 *    function mapStateToProps(stateA, stateB, props) {
 *      return {
 *        propFromA: stateA.get('someProp') + props.someProp,
 *        propFromB: stateB.get('someProp')
 *      }
 *    }
 *
 *    const ConnectedComponent = connect(storeA, storeB, mapStateToProps)(TargetComponent)
 *
 * @function connect
 * @param {...Store} ...stores
 * @param {Function} mapStateToProps
 * @return {Function}
 */
var connect = function connect() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (WrappedComponent) {
    var stores = args.slice(0, args.length - 1);
    var mapToProps = args[args.length - 1];

    var ConnectedComponent = function (_React$Component) {
      _inherits(ConnectedComponent, _React$Component);

      function ConnectedComponent() {
        _classCallCheck(this, ConnectedComponent);

        return _possibleConstructorReturn(this, (ConnectedComponent.__proto__ || Object.getPrototypeOf(ConnectedComponent)).apply(this, arguments));
      }

      _createClass(ConnectedComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.unsubscribers = stores.map(function (store) {
            var updateComponent = function updateComponent() {
              _this2.forceUpdate();
            };
            store.addChangeListener(updateComponent);
            return function () {
              return store.removeChangeListener(updateComponent);
            };
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.unsubscribers.forEach(function (unsubscribe) {
            return unsubscribe();
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var states = stores.map(function (store) {
            return store.getState();
          });

          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, mapToProps.apply(undefined, _toConsumableArray(states).concat([this.props]))));
        }
      }]);

      return ConnectedComponent;
    }(_react2.default.Component);

    var displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ConnectedComponent.displayName = 'Connect(' + displayName + ')';

    return ConnectedComponent;
  };
};

exports.default = connect;