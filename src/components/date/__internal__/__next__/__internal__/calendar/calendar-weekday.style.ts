import styled from "styled-components";
import Typography from "../../../../../typography";
import type { TypographyProps } from "../../../../../typography";

const StyledWeekday = styled.th`
  border: none;
  box-sizing: border-box;
  width: var(--global-size-m);
  min-width: var(--global-size-m);
  height: var(--global-size-m);
  min-height: var(--global-size-m);
  padding: 0;
  text-align: center;
  vertical-align: middle;
`;

export const StyledWeekdayText = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--global-size-m);
  height: var(--global-size-m);
`;

export const StyledWeekdayTypography = styled(Typography)<TypographyProps>`
  && {
    color: var(--input-calendar-txt-alt);
  }
`;

export default StyledWeekday;
