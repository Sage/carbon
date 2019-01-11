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

var _tags = require('../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _fullScreenHeading = require('../../dialog-full-screen/full-screen-heading');

var _fullScreenHeading2 = _interopRequireDefault(_fullScreenHeading);

var _appWrapper = require('../../app-wrapper');

var _appWrapper2 = _interopRequireDefault(_appWrapper);

require('./page.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageClasses = function pageClasses(props) {
  return (0, _classnames2.default)('carbon-page', props.className);
};

var Page = function Page(props) {
  return _react2.default.createElement(
    'article',
    _extends({ className: pageClasses(props) }, (0, _tags2.default)('page', props)),
    _react2.default.createElement(
      _fullScreenHeading2.default,
      null,
      props.title
    ),
    _react2.default.createElement(
      'div',
      { className: 'carbon-page__content' },
      _react2.default.createElement(
        _appWrapper2.default,
        null,
        props.children
      )
    )
  );
};

Page.propTypes = {
  className: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};

exports.default = Page;