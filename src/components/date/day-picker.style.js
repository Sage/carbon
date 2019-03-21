import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import baseTheme from '../../style/themes/base';

const StyledDayPicker = styled(DayPicker)`
  background-color: #fff;
  box-shadow: 0 5px 5px 0 rgba(0,20,29,0.2), 0 10px 10px 0 rgba(0,20,29,0.1);
  color: ${({ theme }) => theme.text.color};
  display: block;
  font-size: 14px;
  font-weight: 700;
  overflow: hidden;
  padding: 10px;
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

  .DayPicker-Month {
    margin: 0 0 2px;
  }

  .DayPicker-Body, .DayPicker-Week {
    width: 100%;
  }

  .DayPicker-Day, .DayPicker-Weekday {
    padding: 10px;
    border: none;
  
    abbr {
      text-decoration: none;
    }
  }

  .DayPicker-Caption {
    background-color: #fff;
    color: $black-85;
    height: 40px;
    line-height: 40px;
  
    >div {
      margin: 0 auto;
      width: 80%;
    }
  }

  .DayPicker-Weekday {
    background-color: #fff;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    text-transform: capitalize;
  }

  .DayPicker-Day {
    background-color: #fff;
    cursor: pointer;
  
    &:hover {
      background-color: #F2F5F6;
      color: ${({ theme }) => theme.text.color};
    }
  
    +* {
      border-left: 1px;
    }
  }

  .DayPicker-Day, .DayPicker-Weekday {
    padding: 10px 12px;
    width: 40px;
  }
  
  .DayPicker-Day--today, .DayPicker-Day--today.DayPicker-Day--outside {
    font-weight: 700;
  }

  .DayPicker-Day--today {
    color: ${({ theme }) => theme.text.color};
    background-color: #ccd6db;
  }

  .DayPicker-Day--outside {
    color: ${({ theme }) => theme.disabled.disabled};

  }
  
  .DayPicker-Day--outside {
    background-color: #fff;
  }
  
  .DayPicker-Day--disabled, .DayPicker-Day--disabled:hover {
    background-color: #fff;
    cursor: default;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: #fff;
    font-weight: 700;
  }
`;

StyledDayPicker.defaultProps = {
  theme: baseTheme
};

export default StyledDayPicker;
