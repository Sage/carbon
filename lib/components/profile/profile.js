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

var _portrait = require('./../portrait');

var _portrait2 = _interopRequireDefault(_portrait);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ether = require('./../../utils/ether');

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Profile: {
    displayName: 'Profile'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/profile/profile.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

/**
 * Renders a user profile, with avatar.
 */
var Profile = _wrapComponent('Profile')((_temp = _class = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
  }

  _createClass(Profile, [{
    key: 'render',


    /**
    * @method render
    */
    value: function render() {
      return _react3.default.createElement(
        'div',
        _extends({ className: this.classes }, (0, _tags.tagComponent)('profile', this.props)),
        this.avatar,
        this.text
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
      return (0, _classnames2.default)("carbon-profile", this.props.className, _defineProperty({}, "carbon-profile--large", this.props.large));
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
      return (0, _ether.acronymize)(this.props.name);
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
      return _react3.default.createElement(_portrait2.default, {
        initials: this.initials,
        gravatar: this.props.email,
        className: 'carbon-profile__avatar',
        size: 'medium-small'
      });
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
      return _react3.default.createElement(
        'div',
        { className: 'carbon-profile__details' },
        _react3.default.createElement(
          'span',
          { className: 'carbon-profile__name', 'data-element': 'name' },
          this.props.name
        ),
        _react3.default.createElement('br', null),
        _react3.default.createElement(
          'span',
          { className: 'carbon-profile__email', 'data-element': 'email' },
          this.props.email
        )
      );
    }
  }]);

  return Profile;
}(_react3.default.Component), _class.propTypes = {
  /**
   * The user's name.
   *
   * @property name
   * @type {String}
   */
  name: _propTypes2.default.string.isRequired,

  /**
   * The user's email.
   *
   * @property email
   * @type {String}
   */
  email: _propTypes2.default.string.isRequired,

  /**
   * The user's initials.
   *
   * @property initials
   * @type {String}
   */
  initials: _propTypes2.default.string,

  /**
   * Outputs a large name version.
   *
   * @property large
   * @type {Boolean}
   */
  large: _propTypes2.default.bool
}, _temp));

exports.default = Profile;