import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  .DayPicker {
    font-weight: 700;
    margin-top: 0;
    padding: 10px;
    font-weight: 600;
    color: ${theme.text.color};
  }

  .DayPicker-Caption {
    background-color: ${theme.colors.white};
    color: rgba(0, 0, 0, .85);
    font-weight: 600;
    font-size: 14px;
  }

  .DayPicker-Day {
    min-width: auto;
    border-color: ${theme.colors.white};
    border-style: solid;
    border-width: 0 3px 3px 3px;
    font-weight: 600;

    &:hover {
      background-color: ${theme.disabled.input};
      color: ${theme.colors.white};
    }
  }

  .DayPicker-Day--outside {
    color: ${theme.colors.greyDarkBlue50};

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
    background-color: ${theme.colors.white};
    cursor: default;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    color: ${theme.colors.white};
    background-color: ${theme.colors.baseBlue};
    font-weight: 700;
  }

  .DayPicker-Day--selected.DayPicker-Day--disabled:not(.DayPicker-Day--outside) {
    background-color: ${theme.colors.baseBlue};
  }
`;
