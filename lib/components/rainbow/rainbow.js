'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

require('./rainbow.scss');

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
 *   import Rainbow from 'carbon-react/lib/components/rainbow';
 *
 * Note that the Rainbow component expects that you already have the Highcharts
 * library loaded. This may be true in case of some projects, which already have
 * that library available for their legacy code.
 * In other cases, you would need to import Highcharts before importing Rainbow:
 *
 *   import 'react-highcharts/dist/bundle/highcharts';
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

    return _possibleConstructorReturn(this, (Rainbow.__proto__ || Object.getPrototypeOf(Rainbow)).apply(this, arguments));
  }

  _createClass(Rainbow, [{
    key: 'componentDidMount',


    /**
     * Renders the initial chart, and stores it on the ref so it can be updated later
     */
    value: function componentDidMount() {
      var config = generateConfig(this.props.data, this.props.title);
      (0, _lodash.merge)(config, this.props.config);
      this._chart = global.Highcharts.chart(this._chart, config);
    }

    /**
     * Always returns false, but uses the Highcharts API to update the charts
     * data or title if they have been updated.
     *
     * @method shouldComponentUpdate
     * @param {Object} nextProps new props passed to the component
     * @return {void}
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // use the highchart api to update its title
      if (this.props.title !== nextProps.title) {
        this._chart.setTitle({ text: nextProps.title });
      }

      // use the highchart api to update its data
      if (this.props.data !== nextProps.data) {
        this._chart.series[0].setData(nextProps.data.toJS());
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
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags2.default)('rainbow', this.props)),
        _react2.default.createElement('div', { ref: function ref(chart) {
            _this2._chart = chart;
          } })
      );
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-rainbow', this.props.className);
    }
  }]);

  return Rainbow;
}(_react2.default.Component);

/* istanbul ignore next */
/**
 * Generates the config for the Highchart.
 *
 * @method generateConfig
 * @param {Object} immutableData data for highchart
 * @param {String} title title for highchart
 * @private
 * @return {Object} config for highchart
 */


Rainbow.propTypes = {
  /**
   * A title for the component.
   *
   * @property title
   * @type {String}
   */
  title: _propTypes2.default.string,

  /**
   * The data set for the component.
   *
   * @property data
   * @type {Object}
   */
  data: _propTypes2.default.object.isRequired,

  /**
   * Custom chart config for the component.
   *
   * @property config
   * @type {Object}
   */
  config: _propTypes2.default.object,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string
};
Rainbow.defaultProps = {
  className: '',
  config: {},
  title: '' };
function generateConfig(immutableData, title) {
  var data = immutableData.toJS();

  return {
    credits: {
      enabled: false
    },
    chart: {
      height: 250,
      margin: 0,
      backgroundColor: null,
      spacing: 0,
      plotShadow: false
    },
    title: {
      style: {
        color: '',
        fontFamily: '',
        fontSize: ''
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
        return function () {
          var x = point.plotX - tooltipWidth / 2;
          var y = point.plotY - (tooltipHeight - 5);

          return { x: x, y: y };
        };
      },
      shadow: false
    },
    plotOptions: {
      pie: {
        animation: {
          duration: 400
        },
        colors: ['#01A4CF', '#FFAB02', '#EA433F', '#FFDD4F', '#FF448F'],
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '100%'],
        dataLabels: {
          connectorWidth: 0,
          defer: false,
          distance: 18,
          enabled: true,
          formatter: function formatter() {
            var display = 'display: ';
            display += this.point.visible ? 'block' : 'none';

            return '\n              <span style="color: ' + this.point.color + '; ' + display + '">\n                <strong>' + this.point.name + '</strong><br>' + this.point.label + '\n              </span>\n            ';
          },

          padding: 0,
          style: {
            fontSize: '',
            fontWeight: '',
            fontFamily: ''
          },
          useHTML: true
        },
        point: {
          events: {
            mouseOver: function mouseOver(ev) {
              ev.target.graphic.zIndexSetter(1);
            },
            mouseOut: function mouseOut(ev) {
              ev.target.graphic.zIndexSetter(0);
            }
          }
        },
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

exports.default = Rainbow;