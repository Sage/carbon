import styled from 'styled-components';
import baseTheme from '../../style/themes/base';
import Weekday from './weekday.component';
import weekdayClassicStyling from './weekday-classic.style';

const WeekdayPicker = styled(Weekday)`
&.DayPicker-Weekday {
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

  ${weekdayClassicStyling}
}
`;

WeekdayPicker.defaultProps = {
  theme: baseTheme
};

export default WeekdayPicker;
