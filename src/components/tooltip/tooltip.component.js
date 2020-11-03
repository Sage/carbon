import React from "react";
import PropTypes from "prop-types";
import { StyledTooltipInner, StyledTooltipWrapper } from "./tooltip.style";
import StyledTooltipPointer from "./tooltip-pointer.style";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import tagComponent from "../../utils/helpers/tags/tags";

class Tooltip extends React.Component {
  static propTypes = {
    /**
     * Sets alignment of pointer on tooltip
     */
    align: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
    /** Children elements */
    children: PropTypes.node,
    /** The id attribute to use for the tooltip */
    id: PropTypes.string,
    /** Whether to to show the Tooltip */
    isVisible: PropTypes.bool,
    /**
     * Sets position of the tooltip
     */
    position: PropTypes.oneOf(OptionsHelper.positions),
    /** Sets a onMouseEnter function */
    onMouseEnter: PropTypes.func,
    /** Sets a onMouseLeave function */
    onMouseLeave: PropTypes.func,
    /** Defines the message type */
    type: PropTypes.string,
  };

  static defaultProps = {
    align: "center",
    position: "top",
    isVisible: false,
  };

  get tooltipHTML() {
    const { children, onMouseEnter, onMouseLeave, ...commonProps } = this.props;

    return (
      <StyledTooltipWrapper
        role="tooltip"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...commonProps}
        {...tagComponent("tooltip", this.props)}
      >
        <StyledTooltipInner {...commonProps}>
          <>
            {children}
            <StyledTooltipPointer
              key="pointer"
              {...commonProps}
              data-element="tooltip-pointer"
            />
          </>
        </StyledTooltipInner>
      </StyledTooltipWrapper>
    );
  }

  render() {
    return this.props.isVisible && this.props.children
      ? this.tooltipHTML
      : null;
  }
}

export default Tooltip;
