/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_appWrapper = require('./../app-wrapper');

/*istanbul ignore next*/
var _appWrapper2 = _interopRequireDefault(_appWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders a full width application bar.
 */

var NavigationBar = function (_React$Component) {
  _inherits(NavigationBar, _React$Component);

  function NavigationBar() {
    _classCallCheck(this, NavigationBar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NavigationBar).apply(this, arguments));
  }

  _createClass(NavigationBar, [{
    key: 'render',


    /**
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.classes },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_appWrapper2.default,
            /*istanbul ignore next*/{ className: 'ui-navigation-bar__content' },
            this.props.children
          )
        )
      );
    }
  }, {
    key: 'classes',


    /**
     * Returns the classes for the component.
     *
     * @method classes
     * @return {String}
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)("ui-navigation-bar", this.props.className, /*istanbul ignore next*/'ui-navigation-bar--' + this.props.as)
      );
    }
  }]);

  return NavigationBar;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/NavigationBar.propTypes = {
  /**
   * Determines the style of the component eg. primary/secondary
   *
   * @property as
   * @type {String}
   * @default primary
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/NavigationBar.defaultProps = {
  as: "primary"
};
/*istanbul ignore next*/exports.default = NavigationBar;