import styled from "styled-components";

import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

const DatePickerPopover = styled.div.attrs(applyBaseTheme)`
  --date-picker-day-cell-size: var(--global-size-m);
  --date-picker-grid-width: calc(7 * var(--date-picker-day-cell-size));
  --date-picker-day-button-size: calc(
    var(--date-picker-day-cell-size) - 2 * var(--global-borderwidth-s)
  );

  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  position: relative;
  z-index: 2000;
  width: 320px;
  min-width: 288px;
  max-width: 320px;
  padding: var(--global-space-layout-2-xs);
  background: var(--popover-bg-default);
  box-shadow: var(--global-depth-lvl1);
  border-radius: var(--global-radius-container-m);

  .rdp-root,
  .rdp-root * {
    box-sizing: border-box;
  }

  .rdp-root {
    width: 100%;
    padding: 0;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    text-align: center;
    font: var(--global-font-static-body-medium-m);
    color: var(--input-calendar-txt-default);
  }

  .rdp-months {
    display: block;
    width: 100%;
    max-width: none;
    padding: 0;
  }

  .rdp-month {
    width: 100%;
    margin: 0;
  }

  .rdp-month_caption {
    display: none;
  }

  .rdp-month_grid,
  .rdp-weeks,
  .rdp-weekdays,
  .rdp-week {
    width: var(--date-picker-grid-width);
    max-width: 100%;
  }

  .rdp-month_grid {
    margin: 0 auto;
  }

  .rdp-weeks {
    display: flex;
    flex-direction: column;
    gap: var(--global-space-comp-s);
    margin-top: 0;
  }

  .rdp-weekday {
    opacity: 1;
    color: var(--input-calendar-txt-alt);
    text-transform: none;
  }

  .rdp-weekdays {
    display: flex;
    height: var(--date-picker-day-cell-size);
  }

  .rdp-week {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--date-picker-day-cell-size);
  }

  .rdp-day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--date-picker-day-cell-size);
    height: var(--date-picker-day-cell-size);
    padding: 0;
    color: var(--input-calendar-txt-default);
    border-radius: var(--global-radius-action-circle);
  }

  .rdp-day_button {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--date-picker-day-button-size);
    min-width: var(--date-picker-day-button-size);
    height: var(--date-picker-day-button-size);
    margin: 0;
    border: none;
    border-radius: var(--global-radius-action-circle);
    background: transparent;
    font: var(--global-font-static-body-medium-m);
    color: inherit;
    text-align: center;
    cursor: pointer;
    transform: rotate(0deg);

    &:focus-visible {
      ${addFocusStyling()}
      border-radius: var(--global-radius-action-circle);
    }
  }

  .rdp-selected:not(.rdp-outside),
  .rdp-today:not(.rdp-outside) {
    background: transparent;
    border-radius: var(--global-radius-action-circle);
    color: inherit;
    font-weight: inherit;
  }

  .rdp-day:not(.rdp-selected):not(.rdp-disabled):not(.rdp-outside):not(
      :has(.rdp-day_button:disabled)
    ):hover
    .rdp-day_button {
    background: var(--input-calendar-bg-hover);
    color: var(--input-calendar-txt-hover);
  }

  .rdp-selected .rdp-day_button {
    z-index: 2;
    background: var(--input-calendar-bg-active);
    color: var(--input-calendar-txt-active);
    border-radius: var(--global-radius-action-circle);
  }

  .rdp-selected {
    z-index: 1;
  }

  .rdp-range_start {
    position: relative;
    background: transparent;
    color: var(--input-calendar-txt-duration);

    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      inset: 0;
      background: var(--input-calendar-bg-duration);
      border-color: var(--input-calendar-border-duration);
      border-style: solid;
      border-width: var(--global-borderwidth-s) 0 var(--global-borderwidth-s)
        var(--global-borderwidth-s);
      border-radius: var(--global-radius-action-circle) 0 0
        var(--global-radius-action-circle);
      pointer-events: none;
    }
  }

  .rdp-range_middle,
  .rdp-range_middle.rdp-today {
    background: var(--input-calendar-bg-duration);
    border-radius: 0;
    border-block: var(--global-borderwidth-s) solid
      var(--input-calendar-border-duration);
    color: var(--input-calendar-txt-duration);

    &.rdp-outside {
      color: var(--input-calendar-txt-duration);
    }
  }

  .rdp-range_end {
    position: relative;
    background: transparent;
    color: var(--input-calendar-txt-duration);

    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      inset: 0;
      background: var(--input-calendar-bg-duration);
      border-color: var(--input-calendar-border-duration);
      border-style: solid;
      border-width: var(--global-borderwidth-s) var(--global-borderwidth-s)
        var(--global-borderwidth-s) 0;
      border-radius: 0 var(--global-radius-action-circle)
        var(--global-radius-action-circle) 0;
      pointer-events: none;
    }
  }

  .rdp-range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button {
    z-index: 2;
    background: var(--input-calendar-bg-active);
    color: var(--input-calendar-txt-active);
  }

  .rdp-range_start.rdp-range_end {
    background: transparent;
    border-radius: var(--global-radius-action-circle);

    &::before {
      content: "";
      border: var(--global-borderwidth-s) solid
        var(--input-calendar-border-duration);
      border-radius: var(--global-radius-action-circle);
    }
  }

  .rdp-disabled {
    color: var(--input-calendar-txt-disabled);
  }

  .rdp-disabled .rdp-day_button,
  .rdp-day_button:disabled {
    cursor: not-allowed;
    background: transparent;
    color: var(--input-calendar-txt-disabled);
  }

  .rdp-outside {
    color: var(--input-calendar-txt-alt);
  }

  .rdp-today:not(.rdp-selected):not(.rdp-range_start):not(.rdp-range_end)
    .rdp-day_button {
    background: transparent;
  }

  .rdp-focused:not(.rdp-disabled):not(.rdp-outside) {
    outline: none;
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  [data-role="date-picker-today-indicator"] {
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: calc(var(--global-size-4-xs) - var(--global-borderwidth-s));
    transform: translateX(-50%);
    width: var(--global-size-3-xs);
    height: var(--global-size-5-xs);
    background: var(--input-calendar-bg-active);
    border-radius: var(--global-radius-action-circle);
    pointer-events: none;
  }

  .rdp-selected [data-role="date-picker-today-indicator"] {
    background: var(--input-calendar-bg-hover);
  }

  .rdp-outside [data-role="date-picker-today-indicator"] {
    background: var(--input-calendar-bg-duration);
  }

  .rdp-disabled [data-role="date-picker-today-indicator"] {
    background: var(--input-calendar-bg-disabled);
  }
`;

export default DatePickerPopover;
