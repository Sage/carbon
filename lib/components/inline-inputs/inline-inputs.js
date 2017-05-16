'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _row = require('./../row');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineInputs = function InlineInputs(props) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)("carbon-inline-inputs", props.className) },
    label(props),
    _react2.default.createElement(
      _row2.default,
      { gutter: 'none', className: 'carbon-inline-inputs__inputs' },
      props.children
    )
  );
};

// Carbon


var label = function label(props) {
  if (props.label) {
    return _react2.default.createElement(
      'label',
      { className: 'carbon-inline-inputs__label' },
      props.label
    );
  }
};

InlineInputs.propTypes = {
  /**
   * Defines the label text for the heading.
   *
   * @property label
   * @type {String}
   */
  label: _propTypes2.default.string
};

exports.default = InlineInputs;