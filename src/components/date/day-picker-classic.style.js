import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  font-weight: 700;
  padding: 10px;
  font-weight: 600;
  color: ${theme.text.color};

  .DayPicker-Caption {
    background-color: ${theme.colors.white};
    color: rgba(0, 0, 0, .85);
    font-weight: 600;
  }

  .DayPicker-Day {
    width: 14.28571%;
    border-color: ${theme.colors.white};
    border-style: solid;
    border-width: 0 3px 3px 3px;
    font-weight: 600;

    &:hover {
      background-color: ${theme.disabled.input};
      color: ${theme.colors.white};
    }
  }

  .DayPicker-Day--disabled, .DayPicker-Day--disabled:hover {
    background-color: ${theme.colors.white};
    cursor: default;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${theme.colors.blue};
    color: ${theme.colors.white};
    font-weight: 700;
  }

  .DayPicker-Day--outside {
    color: ${theme.disabled.disabled};

    &:hover {
      background-color: ${theme.disabled.input};
      color: ${theme.colors.white};
    }
  }

  .DayPicker-Day--today, .DayPicker-Day--today.DayPicker-Day--outside {
    background-color: ${theme.disabled.border};
    color: ${theme.colors.white};
  }

  .DayPicker-Day--disabled, .DayPicker-Day--disabled:hover {
    color: ${theme.disabled.disabled};
  }
`;
