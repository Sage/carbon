import styled, { css } from 'styled-components';
import DayPicker from 'react-day-picker';

const classicStyle = css`
background-color: #fff;
box-shadow: 0 5px 5px 0 rgba(0,20,29,.2), 0 10px 10px 0 rgba(0,20,29,.1);
color: rgba(0,0,0,.85);
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

.DayPicker-wrapper {
  padding: 0;
}

.DayPicker-Month {
  margin: 0 0 2px;
}

.DayPicker-Body, .DayPicker-Week {
  width: 100%;
}

.DayPicker-Day {
  padding: 10px 12px;
  border-color: #fff;
  border-style: solid;
  border-width: 0 3px 3px 3px;

  abbr {
    text-decoration: none;
  }
}

.DayPicker-Day {
  width: 14.28571%;
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
  color: rgba(0,0,0,.6);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
}

.DayPicker-Day {
  background-color: #fff;
  color: #255bc7;
  cursor: pointer;

  &:hover {
    background-color: mix(black, #255bc7, 20);
    color: #fff;
  }

  +* {
    border-left: 1px;
  }
}

.DayPicker-Day {
  padding: 10px 12px;
  border-color: #fff;
  border-style: solid;
  border-width: 0 3px 3px 3px;
}

.DayPicker-Day {
  width: 14.28571%;
}

.DayPicker-Day--selected, .DayPicker-Day--selected.DayPicker-Day--outside {
  background-color: #255bc7 !important;
  color: #fff;
  font-weight: 700;
}

.DayPicker-Day--today, .DayPicker-Day--today.DayPicker-Day--outside {
  background-color: #255bc7 !important;
  color: #fff;
  font-weight: 700;
}

.DayPicker-Day--outside {
  background-color: #fff;
  color: #8099a4;

  &:hover {
    background-color: #004b87;
    color: #fff;
  }
}

.DayPicker-Day--disabled, .DayPicker-Day--disabled:hover {
  background-color: #fff;
  color: #b3c2c8;
  cursor: default;
}
`;

const themeStyle = css`
background-color: #fff;
box-shadow: 0 5px 5px 0 rgba(0,20,29,0.2), 0 10px 10px 0 rgba(0,20,29,0.1);
color: ${({ theme }) => theme.text.color};
display: block;
font-size: 14px;
font-weight: 800;
overflow: hidden;
padding: 32px;
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
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 800;

  >div {
    margin: 0 auto;
    width: 80%;
  }
}

.DayPicker-Day {
  background-color: #fff;
  cursor: pointer;
  padding: 10px;
  border: none;
  font-weight: 800;

  &:hover {
    background-color: #F2F5F6;
    color: ${({ theme }) => theme.text.color};
  }

  +* {
    border-left: 1px;
  }

  abbr {
    text-decoration: none;
  }
}

.DayPicker-Day {
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
}`;

const StyledDayPicker = styled(DayPicker)`
  ${({ theme }) => (theme.name === 'classic' ? classicStyle : themeStyle)}
}`;

export default StyledDayPicker;
