'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = exports.Pages = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tags = require('./../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _carousel = require('./../carousel');

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pagesClasses = function pagesClasses(props) {
  return (0, _classnames2.default)('carbon-pages', props.className);
};

var Pages = function Pages(props) {
  return _react2.default.createElement(
    _carousel.Carousel,
    _extends({
      className: pagesClasses(props),
      enableSlideSelector: false,
      enablePreviousButton: false,
      enableNextButton: false
    }, (0, _tags2.default)('pages', props), props),
    props.children
  );
};

Pages.propTypes = {
  className: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  children: _propTypes2.default.node
};

exports.Pages = Pages;
exports.Page = _page2.default;