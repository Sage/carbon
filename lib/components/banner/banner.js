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

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Banner: {
    displayName: 'Banner'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/banner/banner.js',
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
 * A Banner widget.
 *
 * == How to use a Banner in a component:
 *
 * In your file:
 *
 *   import Banner from 'carbon/lib/components/banner';
 *
 * To render the Banner:
 *
 *   <Banner
 *      title="This is a title"
 *      message="This is my message."
 *      buttonAction={ this.handleButtonClick } />
 *
 * Additionally you can pass optional props to the Banner component
 *
 *   as: Customizes the appearence of the banner changing the colour
 *       (see the 'iconColorSets' for possible values).
 *
 *   buttonText: allows you to customize the button text.
 *
 * @class Banner
 * @constructor
 */
var Banner = _wrapComponent('Banner')((_temp = _class = function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner() {
    _classCallCheck(this, Banner);

    return _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).apply(this, arguments));
  }

  _createClass(Banner, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react3.default.createElement(
        'div',
        { className: this.mainClasses },
        _react3.default.createElement(
          'div',
          { className: 'carbon-banner__content' },
          _react3.default.createElement(_icon2.default, { className: 'carbon-banner__icon', type: this.props.as }),
          _react3.default.createElement(
            'div',
            { className: 'carbon-banner__info' },
            _react3.default.createElement(
              'div',
              { className: 'carbon-banner__title' },
              this.props.title
            ),
            _react3.default.createElement(
              'div',
              { className: 'carbon-banner__message' },
              this.props.message
            )
          ),
          _react3.default.createElement(
            _button2.default,
            { onClick: this.props.buttonAction, className: this.buttonClasses },
            this.props.buttonText
          )
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Classes for the banner
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-banner', 'carbon-banner--' + this.props.as, this.props.className);
    }

    /**
     * Classes for the button action
     *
     * @method buttonClasses
     * @return {String} classNames for button
     */

  }, {
    key: 'buttonClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-banner__action', 'carbon-banner__action--' + this.props.as);
    }
  }]);

  return Banner;
}(_react3.default.Component), _class.propTypes = {

  /**
   * Customizes the appearance through icon and colour
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'info'
   */
  as: _react3.default.PropTypes.string,

  /**
   * Title to be displayed.
   *
   * @property title
   * @type {String}
   */
  title: _react3.default.PropTypes.string.isRequired,

  /**
   * Message to be displayed.
   *
   * @property message
   * @type {String}
   */
  message: _react3.default.PropTypes.string.isRequired,

  /**
   * Text to display on button.
   *
   * @property buttonText
   * @type {String}
   * @default 'Got it!'
   */
  buttonText: _react3.default.PropTypes.string,

  /**
   * The action to trigger on click.
   *
   * @property buttonAction
   * @type {func}
   */
  buttonAction: _react3.default.PropTypes.func.isRequired
}, _class.defaultProps = {
  as: 'info',
  buttonText: 'Got it!'
}, _temp));

exports.default = Banner;