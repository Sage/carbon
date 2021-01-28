import React from "react";
import PropTypes from "prop-types";
import StyledStatusIconWrapper from "./status.style";
import Tooltip from "../../../tooltip";

const StatusIcon = React.forwardRef(({ tooltipMessage, children }, ref) => {
  return (
    <Tooltip message={tooltipMessage}>
      <StyledStatusIconWrapper data-component="status-with-tooltip" ref={ref}>
        {children}
      </StyledStatusIconWrapper>
    </Tooltip>
  );
});

StatusIcon.propTypes = {
  /** The children for the button */
  children: PropTypes.node.isRequired,
  /** Content for the tooltip */
  tooltipMessage: PropTypes.string.isRequired,
};

export default StatusIcon;
