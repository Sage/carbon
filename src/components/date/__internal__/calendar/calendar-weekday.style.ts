import styled from "styled-components";
import Typography from "../../../typography";
import type { TypographyProps } from "../../../typography";

const StyledWeekday = styled.th`
  border: none;
  box-sizing: border-box;
  width: var(--date-picker-day-cell-size);
  min-width: var(--date-picker-day-cell-size);
  height: var(--date-picker-day-cell-size);
  min-height: var(--date-picker-day-cell-size);
  padding: 0;
  text-align: center;
  vertical-align: middle;
`;

export const StyledWeekdayText = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--date-picker-day-cell-size);
  height: var(--date-picker-day-cell-size);
`;

export const StyledWeekdayTypography = styled(Typography)<TypographyProps>`
  && {
    color: var(--input-calendar-txt-alt);
  }
`;

export default StyledWeekday;
