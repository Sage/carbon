'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _appWrapper = require('./../../app-wrapper');

var _appWrapper2 = _interopRequireDefault(_appWrapper);

var _tags = require('./../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var fullScreenHeadingClasses = function fullScreenHeadingClasses(props) {
  return (0, _classnames2.default)('carbon-full-screen-heading', props.className);
};

var FullScreenHeading = function FullScreenHeading(props) {
  var children = props.children,
      otherProps = _objectWithoutProperties(props, ['children']);

  return _react2.default.createElement(
    'div',
    _extends({}, otherProps, {
      className: fullScreenHeadingClasses(props)
    }, (0, _tags2.default)('full-screen-heading', props)),
    _react2.default.createElement(
      _appWrapper2.default,
      null,
      children
    )
  );
};

FullScreenHeading.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};

exports.default = FullScreenHeading;