'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

require('./preview.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Preview = function Preview(props) {
  if (isLoading(props.loading, props.children)) {
    var previews = [];
    for (var i = 1; i <= props.lines; i++) {
      previews.push(createPreview(props, i));
    }
    return previews;
  }

  return props.children;
};

Preview.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,
  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,
  /**
   * Custom height
   *
   * @property height
   * @type {String}
   */
  height: _propTypes2.default.string,
  /**
   * Number of lines to generate for preview
   *
   * @property lines
   * @type {Number}
   */
  lines: _propTypes2.default.number,
  /**
   * Custom loading
   *
   * @property loading
   * @type {Boolean}
   */
  loading: _propTypes2.default.bool,
  /**
   * Custom width
   *
   * @property width
   * @type {String}
   */
  width: _propTypes2.default.string
};

Preview.defaultProps = {
  lines: 1
};

function isLoading(loading, children) {
  if (typeof loading !== 'undefined') {
    return loading;
  }

  return !children;
}

function createPreview(allProps, index) {
  var className = allProps.className,
      height = allProps.height,
      lines = allProps.lines;
  var width = allProps.width;


  if (!width && lines > 1 && lines === index) {
    width = '80%';
  }

  return _react2.default.createElement('span', _extends({
    key: index,
    className: (0, _classnames2.default)('carbon-preview', className),
    style: { height: height, width: width }
  }, (0, _tags2.default)('preview', allProps)));
}

exports.default = Preview;