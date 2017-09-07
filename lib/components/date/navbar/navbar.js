'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navbar = function Navbar(_ref) {
  var onPreviousClick = _ref.onPreviousClick,
      onNextClick = _ref.onNextClick,
      className = _ref.className;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'button',
      {
        className: 'DayPicker-NavButton DayPicker-NavButton--prev',
        onClick: function onClick() {
          return onPreviousClick();
        }
      },
      _react2.default.createElement(
        'span',
        { className: 'DayPicker-NavButton__arrow' },
        '\u2039'
      )
    ),
    _react2.default.createElement(
      'button',
      {
        className: 'DayPicker-NavButton DayPicker-NavButton--next',
        onClick: function onClick() {
          return onNextClick();
        }
      },
      _react2.default.createElement(
        'span',
        { className: 'DayPicker-NavButton__arrow' },
        '\u203A'
      )
    )
  );
};

Navbar.propTypes = {
  onPreviousClick: _propTypes2.default.func,
  onNextClick: _propTypes2.default.func,
  className: _propTypes2.default.string
};

exports.default = Navbar;