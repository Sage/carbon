'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Rainbow: {
    displayName: 'Rainbow'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/rainbow/rainbow.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

/**
 * A rainbow chart using the Highcharts API.
 *
 * == How to use a Rainbow in a component:
 *
 * In your file:
 *
 *   import Rainbow from 'carbon/lib/components/rainbow';
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
var Rainbow = _wrapComponent('Rainbow')((_temp = _class = function (_React$Component) {
  _inherits(Rainbow, _React$Component);

  function Rainbow() {
    _classCallCheck(this, Rainbow);

    return _possibleConstructorReturn(this, (Rainbow.__proto__ || Object.getPrototypeOf(Rainbow)).apply(this, arguments));
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
     * Renders the initial chart, and stores it on the ref so it can be updated later
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var config = generateConfig(this.props.data, this.props.title);
      (0, _lodash.merge)(config, this.props.config);
      this.refs.chart.chart = global.Highcharts.chart(this.refs.chart, config);
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

      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags.tagComponent)('rainbow', this.props)),
        _react3.default.createElement('div', { ref: 'chart' })
      );
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-rainbow', this.props.className);
    }
  }]);

  return Rainbow;
}(_react3.default.Component), _class.propTypes = {
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
  config: _propTypes2.default.object
}, _temp));

/**
 * Uses the Highcharts API to apply z-index to the current segment.
 *
 * @method focusSegment
 * @private
 * @return {void}
 */


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
      margin: 0,
      backgroundColor: null,
      spacing: 0,
      plotShadow: false
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
        point: {
          events: {
            mouseOver: focusSegment,
            mouseOut: unfocusSegment
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