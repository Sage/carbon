import React from "react";

import StyledCalendarCloseButton from "./calendar-close-button.style";

interface CalendarCloseButtonProps {
  children: React.ReactNode;
  onClick: (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const CalendarCloseButton = ({
  children,
  onClick,
}: CalendarCloseButtonProps) => (
  <StyledCalendarCloseButton
    data-role="date-picker-close"
    type="button"
    variant="default"
    variantType="subtle"
    size="small"
    onClick={onClick}
  >
    {children}
  </StyledCalendarCloseButton>
);

export default CalendarCloseButton;
