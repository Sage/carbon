import styled from "styled-components";

const StyledWeekday = styled.div`
  &,
  &.DayPicker-Weekday {
    border: none;
    height: var(--sizing500);
    min-width: var(--sizing500);
    font-weight: 800;
    color: var(--colorsActionMinor400);
    text-transform: uppercase;
    font-size: 12px;
    //font: var(--typographyDatePickerCalendarDayM) to be implemented
    text-align: center;
    padding: 20px 0 5px;
    box-sizing: border-box;
  }
`;

export default StyledWeekday;
