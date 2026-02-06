import React from "react";
import StyledWeekday from "./weekday.style";
import StyledAbbr from "./abbr.style";

export interface WeekdayProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

const Weekday = ({ className, title, children, ...props }: WeekdayProps) => (
  <StyledWeekday className={className} role="columnheader" {...props}>
    <StyledAbbr title={title}>{children}</StyledAbbr>
  </StyledWeekday>
);

export default Weekday;
