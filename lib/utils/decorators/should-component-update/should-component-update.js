'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shouldComponentUpdate = require('./../../helpers/should-component-update');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ShouldComponentUpdate Decorator.
 *
 * This decorator provides useful should component update function.
 *
 * == How to use ShouldComponentUpdate decorator in a component:
 *
 * In your file:
 *
 *   import ShouldComponentUpdate from 'carbon/lib/utils/decorators/should-component-update;
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = ShouldComponentUpdate(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * Provided ShouldComponentUpdate Methods
 *  * `shouldComponentUpdate` - uses the shouldComponentUpdate Helper to compare props and state
 *
 *
 * @method ShouldComponentUpdate
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
var ShouldComponentUpdate = function ShouldComponentUpdate(ComposedComponent) {
  return function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      _classCallCheck(this, Component);

      return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
    }

    _createClass(Component, [{
      key: 'shouldComponentUpdate',


      /**
       * Lifecycle hook to calculate if the component should re-render
       *
       * @method shouldComponentUpdate
       * @param nextProps - The next props for component
       * @param nextState - The next state for component
       * @return {Boolean}
       */
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _shouldComponentUpdate2.default)(this, nextProps, nextState);
      }
    }]);

    return Component;
  }(ComposedComponent);
};

exports.default = ShouldComponentUpdate;