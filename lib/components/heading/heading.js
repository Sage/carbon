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

var /*istanbul ignore next*/_help = require('./../help');

/*istanbul ignore next*/
var _help2 = _interopRequireDefault(_help);

var /*istanbul ignore next*/_link = require('./../link');

/*istanbul ignore next*/
var _link2 = _interopRequireDefault(_link);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UI for a heading header.
 */

var Heading = function (_React$Component) {
  _inherits(Heading, _React$Component);

  function Heading() {
    _classCallCheck(this, Heading);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Heading).apply(this, arguments));
  }

  _createClass(Heading, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      if (!this.props.title) {
        return null;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.classes },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-heading__header' },
            this.back,
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'div',
              /*istanbul ignore next*/{ className: 'ui-heading__headers' },
              /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'div',
                /*istanbul ignore next*/{ className: 'ui-heading__main-header' },
                /*istanbul ignore next*/_react2.default.createElement(
                  /*istanbul ignore next*/'h1',
                  /*istanbul ignore next*/{ className: 'ui-heading__title' },
                  this.props.title
                ),
                this.help
              ),
              this.subheader
            )
          ),
          this.props.children
        )
      );
    }
  }, {
    key: 'help',


    /**
     * Returns the help component.
     *
     * @method help
     * @return {Object} JSX
     */
    get: function get() {
      if (!this.props.help && !this.props.helpLink) {
        return null;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_help2.default,
          /*istanbul ignore next*/{
            className: 'ui-heading__help',
            tooltipAlign: 'left',
            href: this.props.helpLink
          },
          this.props.help
        )
      );
    }

    /**
     * Returns the back button.
     *
     * @method back
     * @return {Object} JSX
     */

  }, {
    key: 'back',
    get: function get() {
      if (!this.props.backLink) {
        return null;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_link2.default,
          /*istanbul ignore next*/{
            className: 'ui-heading__back',
            href: this.props.backLink
          },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'chevron' })
        )
      );
    }

    /**
     * Returns the subheader.
     *
     * @method subheader
     * @return {Object} JSX
     */

  }, {
    key: 'subheader',
    get: function get() {
      if (!this.props.subheader) {
        return null;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-heading__subheader' },
          this.props.subheader
        )
      );
    }

    /**
     * Returns the classes for the component.
     *
     * @method classes
     * @return {String}
     */

  }, {
    key: 'classes',
    get: function get() {
      /*istanbul ignore next*/
      var _classNames;

      return (/*istanbul ignore next*/(0, _classnames2.default)("ui-heading", this.props.className, /*istanbul ignore next*/(_classNames = {}, _defineProperty(_classNames, "ui-heading--has-subheader", this.props.subheader), _defineProperty(_classNames, "ui-heading--has-back", this.props.backLink), _classNames))
      );
    }
  }]);

  return Heading;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Heading.propTypes = {
  /**
   * Defines the title for the heading.
   *
   * @property title
   * @type {String}
   */
  title: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Defines the help text for the heading.
   *
   * @property help
   * @type {String}
   */
  help: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Defines the help link for the heading.
   *
   * @property helpLink
   * @type {String}
   */
  helpLink: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Defines the a href for the back link.
   *
   * @property backLink
   * @type {String}
   */
  backLink: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/exports.default = Heading;