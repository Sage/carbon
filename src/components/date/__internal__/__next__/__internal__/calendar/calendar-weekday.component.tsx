import React from "react";
import Typography from "../../../../../typography";
import StyledWeekday, {
  StyledWeekdayText,
  StyledWeekdayTypography,
} from "./calendar-weekday.style";

interface CalendarWeekdayProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

const CalendarWeekday = ({
  className,
  title,
  children,
}: CalendarWeekdayProps) => (
  <StyledWeekday className={className} scope="col">
    <StyledWeekdayText aria-hidden="true">
      <StyledWeekdayTypography
        as="span"
        variant="p"
        weight="medium"
        size="M"
        m={0}
      >
        {children}
      </StyledWeekdayTypography>
    </StyledWeekdayText>
    {title && (
      <Typography as="span" variant="span" screenReaderOnly>
        {title}
      </Typography>
    )}
  </StyledWeekday>
);

export default CalendarWeekday;
