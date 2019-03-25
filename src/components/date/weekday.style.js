import styled, { css } from 'styled-components';
import Weekday from './weekday.component';

const WeekdayPicker = styled(Weekday)`
${({ className }) => {
    const selector = className ? `&.${className.split(' ').join('.')}` : '&';

    return css`
    ${selector} {
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
    }
    `;
  }}`;

export default WeekdayPicker;
