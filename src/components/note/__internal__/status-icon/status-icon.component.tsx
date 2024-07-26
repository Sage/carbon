import React from "react";
import StyledStatusIconWrapper from "./status-icon.style";
import Tooltip from "../../../tooltip";

export interface StatusIconProps {
  /** renders a control for the Note */
  children: React.ReactNode;
  /** Content for the tooltip */
  tooltipMessage: string;
}

const StatusIcon = React.forwardRef<HTMLDivElement, StatusIconProps>(
  ({ tooltipMessage, children }: StatusIconProps, ref) => {
    return (
      <Tooltip message={tooltipMessage}>
        <StyledStatusIconWrapper data-component="status-with-tooltip" ref={ref}>
          {children}
        </StyledStatusIconWrapper>
      </Tooltip>
    );
  },
);

StatusIcon.displayName = "StatusIcon";

export default StatusIcon;
