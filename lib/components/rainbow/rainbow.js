/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_highcharts = require('react-highcharts/dist/bundle/highcharts');

/*istanbul ignore next*/
var _highcharts2 = _interopRequireDefault(_highcharts);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Rainbow = function (_React$Component) {
  _inherits(Rainbow, _React$Component);

  function Rainbow() {
    _classCallCheck(this, Rainbow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Rainbow).apply(this, arguments));
  }

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
     * Main Class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var config = generateConfig(this.props.data, this.props.title);

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_highcharts2.default, /*istanbul ignore next*/{ ref: 'chart', config: config })
        )
      );
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-rainbow', this.props.className)
      );
    }
  }]);

  return Rainbow;
}( /*istanbul ignore next*/_react2.default.Component);

/**
 * Uses the Highcharts API to apply z-index to the current segment.
 *
 * @method focusSegment
 * @private
 * @return {void}
 */


/*istanbul ignore next*/Rainbow.propTypes = {
  /**
   * A title for the component.
   *
   * @property title
   * @type {String}
   */
  title: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * The data set for the component.
   *
   * @property data
   * @type {Object}
   */
  data: /*istanbul ignore next*/_react2.default.PropTypes.object.isRequired
};
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
      pointFormatter: function /*istanbul ignore next*/pointFormatter() {
        return '<span style="color: ' + this.color + '">' + this.tooltip + '</span>';
      },
      positioner: function /*istanbul ignore next*/positioner(tooltipWidth, tooltipHeight, point) {
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
          formatter: function /*istanbul ignore next*/formatter() {
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

/*istanbul ignore next*/exports.default = Rainbow;