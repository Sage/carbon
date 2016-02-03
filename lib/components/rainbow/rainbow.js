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

var _reactHighchartsDistBundleHighcharts = require('react-highcharts/dist/bundle/highcharts');

var _reactHighchartsDistBundleHighcharts2 = _interopRequireDefault(_reactHighchartsDistBundleHighcharts);

/**
 * A rainbow chart using the Highcharts API.
 *
 * == How to use a Rainbow in a component:
 *
 * In your file:
 *
 *   import Rainbow from 'carbon/lib/components/rainbow';
 *
 * To render the Rainbow:
 *
 *   let myImmutableData = Immutable.fromJS([
 *     {
 *       y: 30,
 *       name: 'First Bit',
 *       label: 'label for first bit',
 *       tooltip: 'more info about this bit',
 *       color: '#000' # we supply color by default, but you can supply your own like this
 *     }, {
 *       y: 70,
 *       name: 'Second Bit',
 *       label: 'label for second bit',
 *       tooltip: 'more info about this bit'
 *     }
 *   ]);
 *
 *   <Rainbow title="My Chart" data={ myImmutableData } />
 *
 * @class Rainbow
 * @constructor
 */

var Rainbow = (function (_React$Component) {
  _inherits(Rainbow, _React$Component);

  function Rainbow() {
    _classCallCheck(this, Rainbow);

    _get(Object.getPrototypeOf(Rainbow.prototype), 'constructor', this).apply(this, arguments);
  }

  /**
   * Uses the Highcharts API to apply z-index to the current segment.
   *
   * @method focusSegment
   * @private
   * @return {void}
   */

  _createClass(Rainbow, [{
    key: 'shouldComponentUpdate',

    /**
     * Always returns false, but uses the Highcharts API to update the charts
     * data or title if they have been updated.
     *
     * @method shouldComponentUpdate
     * @param {Object} nextProps new props passed to the component
     * @return {void}
     */
    value: function shouldComponentUpdate(nextProps) {
      var chart = this.refs.chart.chart;

      // use the highchart api to update its title
      if (this.props.title !== nextProps.title) {
        chart.setTitle({ text: nextProps.title });
      }

      // use the highchart api to update its data
      if (this.props.data !== nextProps.data) {
        chart.series[0].setData(nextProps.data.toJS());
      }

      // never re-render the component
      return false;
    }

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
  }, {
    key: 'render',
    value: function render() {
      var config = generateConfig(this.props.data, this.props.title);

      return _react2['default'].createElement(
        'div',
        { className: 'ui-rainbow' },
        _react2['default'].createElement(_reactHighchartsDistBundleHighcharts2['default'], { ref: 'chart', config: config })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * A title for the component.
       *
       * @property title
       * @type {String}
       */
      title: _react2['default'].PropTypes.string.isRequired,

      /**
       * The data set for the component.
       *
       * @property data
       * @type {Object}
       */
      data: _react2['default'].PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return Rainbow;
})(_react2['default'].Component);

function focusSegment() {
  this.graphic.zIndexSetter(1);
}

/**
 * Uses the Highcharts API to apply z-index to the current segment.
 *
 * @method unfocusSegment
 * @private
 * @return {void}
 */
function unfocusSegment() {
  this.graphic.zIndexSetter(0);
}

/**
 * Calculates the position for the tooltip.
 *
 * @method tooltipPosition
 * @param {Number} tooltipWidth width of tooltip
 * @param {Number} tooltipHeight height of tooltip
 * @param {Object} point center of tooltip
 * @private
 * @return {Object} x and y position of tooltip
 */
function tooltipPosition(tooltipWidth, tooltipHeight, point) {
  var x = point.plotX - tooltipWidth / 2;
  var y = point.plotY - (tooltipHeight - 5);

  return { x: x, y: y };
}

/**
 * Generates the config for the Highchart.
 *
 * @method generateConfig
 * @param {Object} immutableData data for highchart
 * @param {String} title title for highchart
 * @private
 * @return {Object} config for highchart
 */
function generateConfig(immutableData, title) {
  var data = immutableData.toJS();

  return {
    credits: {
      enabled: false
    },
    chart: {
      height: 250,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      spacing: [10, 0, 0, 0],
      width: 400
    },
    title: {
      style: {
        "color": "",
        "fontFamily": "",
        "fontSize": ""
      },
      text: title,
      useHTML: true,
      verticalAlign: 'top',
      y: 35
    },
    tooltip: {
      borderRadius: 100,
      borderWidth: 0,
      followPointer: true,
      headerFormat: '',
      pointFormatter: function pointFormatter() {
        return '<span style="color: ' + this.color + '">' + this.tooltip + '</span>';
      },
      positioner: function positioner(tooltipWidth, tooltipHeight, point) {
        return tooltipPosition(tooltipWidth, tooltipHeight, point);
      },
      shadow: false
    },
    plotOptions: {
      pie: {
        animation: {
          duration: 400
        },
        borderWidth: 0,
        center: ['50%', '100%'],
        colors: ['#01A4CF', '#FFAB02', '#EA433F', '#FFDD4F', '#FF448F'],
        dataLabels: {
          connectorWidth: 0,
          defer: false,
          distance: 25,
          enabled: true,
          formatter: function formatter() {
            var display = "display: ";
            display += this.point.visible ? "block" : "none";

            return '<span style="color:' + this.point.color + '; ' + display + '"><strong>' + this.point.name + '</strong><br>' + this.point.label + '</span>';
          },
          padding: 0,
          style: {
            "fontSize": "",
            "fontWeight": "",
            "fontFamily": ""
          },
          useHTML: true
        },
        endAngle: 90,
        point: {
          events: {
            mouseOver: focusSegment,
            mouseOut: unfocusSegment
          }
        },
        startAngle: -90,
        states: {
          hover: {
            halo: false
          }
        }
      }
    },
    series: [{
      data: data,
      innerSize: '65%',
      type: 'pie'
    }]
  };
}

exports['default'] = Rainbow;
module.exports = exports['default'];