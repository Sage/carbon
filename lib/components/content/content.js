'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

/**
 * Renders content with a title and body text.
 *
 * @class Content
 * @constructor
 */

var Content = (function (_React$Component) {
  _inherits(Content, _React$Component);

  function Content() {
    _classCallCheck(this, Content);

    _get(Object.getPrototypeOf(Content.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Content, [{
    key: 'render',

    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var classes = (0, _classnames2['default'])("ui-content", this.props.className, 'ui-content--' + this.props.as);

      return this.props.children ? _react2['default'].createElement(
        'div',
        { className: classes },
        _react2['default'].createElement(
          'div',
          { className: 'ui-content__title' },
          this.props.title
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-content__body' },
          this.props.children
        )
      ) : null;
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * The body of the content component.
       *
       * @property children
       * @type {Object}
       */
      children: _react2['default'].PropTypes.node,

      /**
       * The title of the content component.
       *
       * @property title
       * @type {String}
       */
      title: _react2['default'].PropTypes.string,

      /**
       * Applies a theme to the Content
       * Value: primary, secondary
       *
       * @property as
       * @type {String}
       * @default primary
       */
      as: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      as: "primary"
    },
    enumerable: true
  }]);

  return Content;
})(_react2['default'].Component);

exports['default'] = Content;
module.exports = exports['default'];