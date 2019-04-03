import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import baseTheme from '../../../style/themes/base';
import dayPickerClassicStyle from './day-picker-classic.style';

const StyledDayPicker = styled(DayPicker)`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.depth1};
  color: ${({ theme }) => theme.text.color};
  display: block;
  font-size: 14px;
  font-weight: 800;
  overflow: hidden;
  padding: 24px;
  position: absolute;
  text-align: center;
  user-select: none;

  * {
    box-sizing: border-box;
  }

  &:focus {
    outline: none;
  }

  abbr[title] {
    border: none;
    cursor: initial;
  }

  .DayPicker-wrapper {
    padding: 0;
  }

  .DayPicker-Month {
    margin: 0 0 2px;
  }

  .DayPicker-Body, .DayPicker-Week {
    width: 100%;
  }

  .DayPicker-Caption {
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    font-weight: 800;

    >div {
      margin: 0 auto;
      width: 80%;
    }
  }

  .DayPicker-Day {
    min-width: 40px;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    border: none;
    font-weight: 800;
    padding: 10px 0;

    &:hover {
      background-color: ${({ theme }) => theme.disabled.input};
      color: ${({ theme }) => theme.text.color};
    }

    +* {
      border-left: 1px;
    }

    abbr {
      text-decoration: none;
    }
  }

  .DayPicker-Day--today, .DayPicker-Day--today.DayPicker-Day--outside {
    font-weight: 800;
    color: ${({ theme }) => theme.text.color};
    background-color: ${({ theme }) => theme.disabled.border};
  }

  .DayPicker-Day--outside {
    color: ${({ theme }) => theme.disabled.disabled};
    background-color: $${({ theme }) => theme.colors.white};
  }

  .DayPicker-Day--disabled, .DayPicker-Day--disabled:hover {
    color: ${({ theme }) => theme.disabled.disabled};
    background-color: ${({ theme }) => theme.colors.white};
    cursor: default;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 800;
  }

  .DayPicker-Day--selected.DayPicker-Day--disabled:not(.DayPicker-Day--outside) {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  ${dayPickerClassicStyle}
`;

StyledDayPicker.defaultProps = {
  theme: baseTheme
};

export default StyledDayPicker;
