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
* A Tooltip widget.
*
* == How to use a Tooltip in a component:
*
* In your file:
*
*   import Tooltip from 'carbon/lib/components/tooltip'
*
* To render the Tooltip:
*
*   <Tooltip isVisible={ toggleTooltipHandler }>
*     My tooltip content
*   </Tooltip>
*
* You must pass a prop of 'isVisible' which is toggled to true or false.
*
* You can pass a prop of 'align' to the component which shifts the alignment of the pointer.
* This defaults to 'center'.
* You can also pass a prop of 'position' to the component which shifts the position of the pointer.
* This defaults to 'bottom'
*
* @class Tooltip
* @constructor
*/

var Tooltip = (function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    _get(Object.getPrototypeOf(Tooltip.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Tooltip, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      if (!this.props.isVisible) {
        return null;
      }

      return this.tooltipHTML;
    }
  }, {
    key: 'mainClasses',

    /**
     * Main classes
     *
     * @method mainClasses
     * @return {String} classNames for tooltip
     */
    get: function get() {
      return (0, _classnames2['default'])('ui-tooltip', 'ui-tooltip--position-' + this.props.position, 'ui-tooltip--pointer-align-' + this.props.align, this.props.className);
    }

    /**
     * Return HTML for tooltip
     *
     * @method tooltipHTML
     * @return {JSX}
     */
  }, {
    key: 'tooltipHTML',
    get: function get() {
      var contents = [this.props.children, _react2['default'].createElement('span', { key: 'pointer', className: 'ui-tooltip__pointer' })];

      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        _react2['default'].createElement(
          'div',
          { className: 'ui-tooltip__container' },
          contents
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Sets alignment of pointer on tooltip
       *
       * Options: top, bottom, center, right, left
       *
       * @property align
       * @type {String}
       * @default 'center'
       */
      align: _react2['default'].PropTypes.string,

      /**
       * Sets position of the tooltip
       *
       *
       * Options: top, bottom, right, left
       *
       * @property position
       * @type {String}
       * @default 'bottom'
       */
      position: _react2['default'].PropTypes.string,

      /**
       * Whether to to show the Tooltip
       *
       * @property isVisible
       * @type {Boolean}
       * @default false
       */
      isVisible: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      align: 'center',
      position: 'top',
      isVisible: false
    },
    enumerable: true
  }]);

  return Tooltip;
})(_react2['default'].Component);

exports['default'] = Tooltip;
module.exports = exports['default'];