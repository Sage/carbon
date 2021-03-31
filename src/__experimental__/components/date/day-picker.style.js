import styled from "styled-components";
import baseTheme from "../../../style/themes/base";

// Styles copied from https://github.com/gpbl/react-day-picker/blob/v6.1.1/src/style.css
const addReactDayPickerStyles = () => `
  .DayPicker {
    display: inline-block;
  }

  .DayPicker-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    user-select: none;
    flex-direction: row;
    padding: 1rem 0;
  }

  .DayPicker-Month {
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
    user-select: none;
    margin: 0 1rem;
  }

  .DayPicker-NavBar {
    position: absolute;
    left: 0;
    right: 0;
  }

  .DayPicker-NavButton {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    cursor: pointer;
  }

  .DayPicker-NavButton--prev {
    left: 1rem;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wcmV2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InByZXYiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzLjM5MzE5MywgMjUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMy4zOTMxOTMsIC0yNS4wMDAwMDApIHRyYW5zbGF0ZSgwLjg5MzE5MywgMC4wMDAwMDApIiBmaWxsPSIjNTY1QTVDIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsNDkuMTIzNzMzMSBMMCw0NS4zNjc0MzQ1IEwyMC4xMzE4NDU5LDI0LjcyMzA2MTIgTDAsNC4yMzEzODMxNCBMMCwwLjQ3NTA4NDQ1OSBMMjUsMjQuNzIzMDYxMiBMMCw0OS4xMjM3MzMxIEwwLDQ5LjEyMzczMzEgWiIgaWQ9InJpZ2h0IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
  }

  .DayPicker-NavButton--next {
    right: 1rem;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5uZXh0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Im5leHQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuOTUxNDUxLCAwLjAwMDAwMCkiIGZpbGw9IiM1NjVBNUMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMCw0OS4xMjM3MzMxIEwwLDQ1LjM2NzQzNDUgTDIwLjEzMTg0NTksMjQuNzIzMDYxMiBMMCw0LjIzMTM4MzE0IEwwLDAuNDc1MDg0NDU5IEwyNSwyNC43MjMwNjEyIEwwLDQ5LjEyMzczMzEgTDAsNDkuMTIzNzMzMSBaIiBpZD0icmlnaHQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
  }

  .DayPicker-NavButton--interactionDisabled {
    display: none;
  }

  .DayPicker-Caption {
    display: table-caption;
    height: 1.5rem;
    text-align: center;
  }

  .DayPicker-Weekdays {
    display: table-header-group;
  }

  .DayPicker-WeekdaysRow {
    display: table-row;
  }

  .DayPicker-Weekday {
    display: table-cell;
  }

  .DayPicker-Body {
    display: table-row-group;
  }

  .DayPicker-Week {
    display: table-row;
  }

  .DayPicker-Day {
    display: table-cell;
    padding: 0.5rem;
    border: 1px solid #eaecec;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
  }

  .DayPicker-WeekNumber {
    display: table-cell;
    padding: 0.5rem;
    text-align: right;
    vertical-align: middle;
    min-width: 1rem;
    font-size: 0.75em;
    cursor: pointer;
    color: #8b9898;
  }

  .DayPicker--interactionDisabled .DayPicker-Day {
    cursor: default;
  }

  .DayPicker-Footer {
    display: table-caption;
    caption-side: bottom;
    padding-top: 0.5rem;
  }

  .DayPicker-TodayButton {
    border: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
    color: #4a90e2;
    font-size: 0.875em;
  }

  /* Default modifiers */

  .DayPicker-Day--today {
    color: #d0021b;
    font-weight: 500;
  }

  .DayPicker-Day--disabled {
    color: #dce0e0;
    cursor: default;
    background-color: #eff1f1;
  }

  .DayPicker-Day--outside {
    cursor: default;
    color: #dce0e0;
  }

  /* Example modifiers */

  .DayPicker-Day--sunday {
    background-color: #f7f8f8;
  }

  .DayPicker-Day--sunday:not(.DayPicker-Day--today) {
    color: #dce0e0;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    color: #fff;
    background-color: #4a90e2;
  }

  /* DayPickerInput */

  .DayPickerInput {
    display: inline-block;
  }

  .DayPickerInput-OverlayWrapper {
    position: relative;
  }

  .DayPickerInput-Overlay {
    left: 0;
    position: absolute;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`;

const StyledDayPicker = styled.div`
  ${addReactDayPickerStyles}

  position: absolute;
  height: 352px;
  width: 352px;
  z-index: ${({ theme }) => theme.zIndex.popover};

  .DayPicker {
    z-index: 1000;
    top: calc(100% + 1px);
    left: 0;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.depth1};
    color: ${({ theme }) => theme.text.color};
    display: block;
    font-size: 14px;
    font-weight: 800;
    overflow: hidden;
    padding: 24px;
    text-align: center;
    user-select: none;
  }

  .DayPicker * {
    box-sizing: border-box;
  }

  .DayPicker:focus {
    outline: none;
  }

  .DayPicker abbr[title] {
    border: none;
    cursor: initial;
  }

  .DayPicker-wrapper {
    padding: 0;
  }

  .DayPicker-Month {
    margin: 0 0 2px;
  }

  .DayPicker-Body,
  .DayPicker-Week {
    width: 100%;
  }

  .DayPicker-Caption {
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    font-weight: 800;

    > div {
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

    + * {
      border-left: 1px;
    }

    abbr {
      text-decoration: none;
    }
  }

  .DayPicker-Day--today,
  .DayPicker-Day--today.DayPicker-Day--outside {
    font-weight: 800;
    color: ${({ theme }) => theme.text.color};
    background-color: ${({ theme }) => theme.disabled.border};
  }

  .DayPicker-Day--outside {
    color: ${({ theme }) => theme.disabled.disabled};
    background-color: ${({ theme }) => theme.colors.white};
  }

  .DayPicker-Day--disabled,
  .DayPicker-Day--disabled:hover {
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
`;

StyledDayPicker.defaultProps = {
  theme: baseTheme,
};

export default StyledDayPicker;
