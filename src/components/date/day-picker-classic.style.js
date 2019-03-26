import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  font-weight: 700;
  padding: 10px;
  font-weight: 600;

  .DayPicker-Caption {
    background-color: #fff;
    color: rgba(0, 0, 0, .85);
    font-weight: 600;
  }

  .DayPicker-Day {
    color: #255bc7;
    width: 14.28571%;
    border-color: #fff;
    border-style: solid;
    border-width: 0 3px 3px 3px;
    font-weight: 600;

    &:hover {
      background-color: #1e499f;
      color: #fff;
    }
  }

  .DayPicker-Day--disabled, .DayPicker-Day--disabled:hover {
    background-color: #fff;
    cursor: default;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: #255bc7;
    color: #fff;
    font-weight: 700;
  }

  .DayPicker-Day--outside {
    color: #8099a4;

    &:hover {
      background-color: #004b87;
      color: #fff;
    }
  }

  .DayPicker-Day--today, .DayPicker-Day--today.DayPicker-Day--outside {
    background-color: #4d7080;
    color: #fff;
  }

  .DayPicker-Day--disabled, .DayPicker-Day--disabled:hover {
    color: #b3c2c8;
  }
`;
