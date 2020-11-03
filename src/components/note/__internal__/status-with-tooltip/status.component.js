import React from "react";
import PropTypes from "prop-types";
import StyledStatusIconWrapper from "./status.style";
import TooltipDecorator from "../../../../utils/decorators/tooltip-decorator/tooltip-decorator";

class StatusIcon extends React.Component {
  render() {
    return (
      <>
        <StyledStatusIconWrapper
          data-component="status-with-tooltip"
          ref={(comp) => {
            this._target = comp;
          }}
          onMouseOver={this.props.onMouseOver}
          onMouseLeave={this.props.onMouseLeave}
          onFocus={this.props.onMouseOver}
        >
          {this.props.children}
        </StyledStatusIconWrapper>
        {this.tooltipHTML}
      </>
    );
  }
}

StatusIcon.propTypes = {
  /** The children for the button */
  children: PropTypes.node.isRequired,
  /** Callback to handle any mouse over events on a button */
  onMouseOver: PropTypes.func.isRequired,
  /** Callback to handle any mouse leave events on a button */
  onMouseLeave: PropTypes.func.isRequired,
};

export default TooltipDecorator(StatusIcon);
