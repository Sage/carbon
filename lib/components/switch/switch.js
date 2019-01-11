'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

require('./switch.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var switchClasses = function switchClasses(props) {
  var loadingClass = props.loading ? ' carbon-switch__loading' : '',
      reverseClass = props.reverse ? ' carbon-switch__reverse' : '';

  return (0, _classnames2.default)('carbon-switch', props.className, loadingClass, reverseClass);
};

/**
 * A Switch widget.
 *
 * This widget extends Checkbox and adds a switch styling over the top.
 *
 * == How to use a Switch component:
 *
 * In your file:
 *
 *   import Switch from 'carbon-react/lib/components/switch';
 *   <Switch label='My switch component.' />
 */
var Switch = function Switch(props) {
  return _react2.default.createElement(
    _checkbox2.default,
    _extends({
      disabled: props.loading
    }, propsForCheckbox(props)),
    _react2.default.createElement(
      'div',
      { className: 'carbon-switch__switch' + (props.loading ? ' carbon-switch__switch__loading' : '') },
      _react2.default.createElement('span', { className: 'carbon-switch__slider' }),
      _react2.default.createElement(
        'div',
        { className: 'carbon-switch__on' },
        renderIcon('tick', props.loading)
      ),
      _react2.default.createElement(
        'div',
        { className: 'carbon-switch__off' },
        renderIcon('cross', props.loading)
      )
    )
  );
};

Switch.propTypes = _extends({}, _checkbox2.default.propTypes, {
  loading: _propTypes2.default.bool // Display loading dots in place of icon and disable component during load.
});

Switch.defaultProps = _extends({}, _checkbox2.default.defaultProps, {
  reverse: true
});

function propsForCheckbox(props) {
  var loading = props.loading,
      checkboxProps = _objectWithoutProperties(props, ['loading']);

  if (loading) {
    checkboxProps.readOnly = true;
  }
  checkboxProps.className = switchClasses(props);
  return checkboxProps;
}

function renderIcon(icon, loading) {
  if (loading) {
    return _react2.default.createElement(
      'div',
      { className: 'carbon-loading-dots' },
      _react2.default.createElement('div', { className: 'carbon-loading-dots__bounce carbon-loading-dots__bounce1' }),
      _react2.default.createElement('div', { className: 'carbon-loading-dots__bounce carbon-loading-dots__bounce2' }),
      _react2.default.createElement('div', { className: 'carbon-loading-dots__bounce carbon-loading-dots__bounce3' })
    );
  }
  return _react2.default.createElement(_icon2.default, { type: icon });
}

exports.default = Switch;