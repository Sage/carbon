/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_portrait = require('./../portrait');

/*istanbul ignore next*/
var _portrait2 = _interopRequireDefault(_portrait);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_ether = require('./../../utils/ether');

/*istanbul ignore next*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders a user profile, with avatar.
 */

var Profile = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Profile).apply(this, arguments));
  }

  _createClass(Profile, [{
    key: 'render',


    /**
    * @method render
    */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.classes },
          this.avatar,
          this.text
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
      return (/*istanbul ignore next*/(0, _classnames2.default)("ui-profile", this.props.className, /*istanbul ignore next*/_defineProperty({}, "ui-profile--large", this.props.large))
      );
    }

    /**
     * Returns the initials for the name.
     *
     * @method initials
     * @return {String}
     */

  }, {
    key: 'initials',
    get: function get() {
      if (this.props.initials) {
        return this.props.initials;
      }
      return (/*istanbul ignore next*/(0, _ether.acronymize)(this.props.name)
      );
    }

    /**
     * Returns the avatar portion of the profile.
     *
     * @method avatar
     * @return {Object} JSX
     */

  }, {
    key: 'avatar',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_portrait2.default, /*istanbul ignore next*/{
          initials: this.initials,
          gravatar: this.props.email,
          className: 'ui-profile__avatar',
          size: 'medium-small'
        })
      );
    }

    /**
     * Returns the text portion of the profile.
     *
     * @method text
     * @return {Object} JSX
     */

  }, {
    key: 'text',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-profile__details' },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'span',
            /*istanbul ignore next*/{ className: 'ui-profile__name' },
            this.props.name
          ),
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'br', /*istanbul ignore next*/null),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'span',
            /*istanbul ignore next*/{ className: 'ui-profile__email' },
            this.props.email
          )
        )
      );
    }
  }]);

  return Profile;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Profile.propTypes = {
  /**
   * The user's name.
   *
   * @property name
   * @type {String}
   */
  name: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * The user's email.
   *
   * @property email
   * @type {String}
   */
  email: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * The user's initials.
   *
   * @property initials
   * @type {String}
   */
  initials: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Outputs a large name version.
   *
   * @property large
   * @type {Boolean}
   */
  large: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/exports.default = Profile;