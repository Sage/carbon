import React from 'react';
import PropTypes from 'prop-types';
import { StyledTooltipInner, StyledTooltipWrapper, StyledTooltipPointer } from './tooltip.style';
import tagComponent from '../../../utils/helpers/tags';

class Tooltip extends React.Component {
  static propTypes = {
    /**
     * Sets alignment of pointer on tooltip
     * Options: top, bottom, center, right, left
     */
    align: PropTypes.string,
    /** Custom className */
    className: PropTypes.string,
    /** Children elements */
    children: PropTypes.node,
    /** The id attribute to use for the tooltip */
    id: PropTypes.string,
    /** Whether to to show the Tooltip */
    isVisible: PropTypes.bool,
    /**
     * Sets position of the tooltip
     * Options: top, bottom, right, left
     */
    position: PropTypes.string,
    /** Sets a onMouseEnter function */
    onMouseEnter: PropTypes.func,
    /** Sets a onMouseLeave function */
    onMouseLeave: PropTypes.func,
    /** Defines the message type */
    type: PropTypes.string
  };

  static defaultProps = {
    align: 'center',
    position: 'top',
    className: '',
    isVisible: false
  };

  get tooltipHTML() {
    const { children, ...tooltipProps } = this.props;

    const contents = [
      children,
      <StyledTooltipPointer key='pointer' { ...tooltipProps } />
    ];

    return (
      <StyledTooltipWrapper
        role='tooltip'
        { ...tooltipProps }
        { ...tagComponent('tooltip', this.props) }
      >
        <StyledTooltipInner { ...tooltipProps }>
          {contents}
        </StyledTooltipInner>
      </StyledTooltipWrapper>
    );
  }

  render() {
    return this.props.isVisible ? this.tooltipHTML : null;
  }
}

export default Tooltip;
