import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';
import weekdayClassicStyling from './weekday-classic.style';

const WeekdayStyle = styled.div`
&, &.DayPicker-Weekday {
  border: none;
  padding: 10px 12px;
  width: 40px;
  font-weight: 800;
  color: #668592;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;

  ${weekdayClassicStyling}
}
`;

WeekdayStyle.defaultProps = {
  theme: baseTheme
};

export default WeekdayStyle;
