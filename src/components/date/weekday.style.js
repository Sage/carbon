import styled, { css } from 'styled-components';
import Weekday from './weekday.component';

const classicStyle = css`
  padding: 10px 12px;
  border-color: #fff;
  border-style: solid;
  border-width: 0 3px 3px 3px;
  width: 14.28571%;

  abbr {
    text-decoration: none;
  }
`;

const themeStyle = css`
  border: none;
  padding: 10px 12px;
  width: 40px;
  font-weight: 800;
  color: #668592;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;

  abbr {
    text-decoration: none;
  }
`;

const WeekdayPicker = styled(Weekday)`
  &.DayPicker-Weekday {
    ${({ theme }) => (theme.name === 'classic' ? classicStyle : themeStyle)}
  }
`;

export default WeekdayPicker;
