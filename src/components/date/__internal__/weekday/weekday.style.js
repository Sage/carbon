import styled from "styled-components";

const StyledWeekday = styled.div`
  &,
  &.DayPicker-Weekday {
    border: none;
    height: var(--sizing500);
    min-width: var(--sizing500);
    color: var(--colorsActionMinor400);
    text-transform: uppercase;
    font: var(--typographyDatePickerCalendarDayM);
    text-align: center;
    padding: 20px 0 5px;
    box-sizing: border-box;
  }
`;

export default StyledWeekday;
