import styled from "styled-components";

import StyledAbbr from "./abbr.style";

const StyledWeekday = styled.th`
  &,
  & ${StyledAbbr} {
    border: none;
    height: var(--sizing500);
    min-width: var(--sizing500);
    font-weight: 800;
    color: var(--colorsActionMinor500);
    text-transform: uppercase;
    font-size: 12px;
    //font: var(--typographyDatePickerCalendarDayM); font assets to be updated part of FE-4975
    text-align: center;
    padding: 20px 0 5px;
    box-sizing: border-box;
  }
`;

export default StyledWeekday;
