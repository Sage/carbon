import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import tagComponent from '../../utils/helpers/tags';
import { RainbowStyle } from './rainbow.style';
import Logger from '../../utils/logger';

class Rainbow extends React.Component {
  constructor(props) {
    super(props);
    Logger.deprecate('Rainbow component is scheduled to be removed from Carbon.');
  }

  /** Renders the initial chart, and stores it on the ref so it can be updated later */
  componentDidMount() {
    const config = generateConfig(this.props.data, this.props.title);
    merge(config, this.props.config);
    this._chart = global.Highcharts.chart(this._chart, config);
  }

  /**
   * Always returns false, but uses the Highcharts API to update the charts
   * data or title if they have been updated.
   */
  shouldComponentUpdate(nextProps) {
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

  /** Renders the component. */
  render() {
    return (
      <RainbowStyle className={ this.props.className } { ...tagComponent('rainbow', this.props) }>
        <div ref={ (chart) => { this._chart = chart; } } />
      </RainbowStyle>
    );
  }
}

/* istanbul ignore next */
/** Generates the config for the Highchart. */
function generateConfig(immutableData, title) {
  const data = immutableData.toJS();

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
      pointFormatter() {
        return `<span style="color: ${this.color}">${this.tooltip}</span>`;
      },
      positioner: (tooltipWidth, tooltipHeight, point) => {
        return () => {
          const x = point.plotX - (tooltipWidth / 2);
          const y = point.plotY - (tooltipHeight - 5);

          return { x, y };
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
          formatter() {
            let display = 'display: ';
            display += this.point.visible ? 'block' : 'none';

            return `
              <span style="color: ${this.point.color}; ${display}">
                <strong>${this.point.name}</strong><br>${this.point.label}
              </span>
            `;
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
            mouseOver: (ev) => { ev.target.graphic.zIndexSetter(1); },
            mouseOut: (ev) => { ev.target.graphic.zIndexSetter(0); }
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
      data,
      innerSize: '65%',
      type: 'pie'
    }]
  };
}

Rainbow.propTypes = {
  /** Supply a custom title for the chart. */
  title: PropTypes.string,
  /** Supply data for the chart. */
  data: PropTypes.object.isRequired,
  /** Supply a custom config object to the Highcharts. */
  config: PropTypes.object,
  /** [legacy] Classes to apply to the component. */
  className: PropTypes.string
};

export default Rainbow;
