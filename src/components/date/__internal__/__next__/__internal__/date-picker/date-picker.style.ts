import styled from "styled-components";

import StyledDayPicker from "../../../date-picker/day-picker.style";
import addFocusStyling from "../../../../../../style/utils/add-focus-styling";

const DatePickerPopover = styled(StyledDayPicker)`
  --date-picker-content-width: 280px;

  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  position: relative;
  width: 320px;
  min-width: 288px;
  max-width: 320px;
  padding: var(--global-space-layout-2-xs);
  background: var(--popover-bg-default);
  box-shadow: var(--global-depth-lvl1);
  border-radius: var(--global-radius-container-m);

  .rdp-root {
    width: 100%;
    top: 0;
    left: 0;
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

  .rdp-caption_label {
    font: var(--global-font-static-body-medium-m);
    color: var(--input-calendar-txt-default);
  }

  .rdp-month_grid {
    width: var(--date-picker-content-width);
    max-width: 100%;
    margin: 0 auto;
  }

  .rdp-weeks {
    width: var(--date-picker-content-width);
    max-width: 100%;
    margin-top: 0;
  }

  .rdp-weekday {
    opacity: 1;
    padding: 0;
    color: var(--input-calendar-txt-alt);
    text-transform: none;
  }

  .rdp-weekdays {
    width: var(--date-picker-content-width);
    max-width: 100%;
    height: 40px;
    display: flex;
  }

  .rdp-week {
    width: var(--date-picker-content-width);
    max-width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rdp-weeks {
    display: flex;
    flex-direction: column;
    gap: var(--global-space-comp-s);
  }

  .rdp-day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--global-size-m);
    height: var(--global-size-m);
    padding: 0;
    color: var(--input-calendar-txt-default);
    border-radius: 32px;
  }

  .rdp-day_button {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--global-size-m);
    min-width: var(--global-size-m);
    height: var(--global-size-m);
    margin: 0;
    border: none;
    border-radius: 32px;
    background: transparent;
    font: var(--global-font-static-body-medium-m);
    color: inherit;
    text-align: center;
    transform: rotate(0deg);
  }

  .rdp-day_button:focus-visible {
    outline: none;
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  .rdp-selected:not(.rdp-disabled):not(.rdp-outside),
  .rdp-selected.rdp-disabled:not(.rdp-outside),
  .rdp-day_selected:not(.rdp-day_disabled):not(.rdp-day_outside),
  .rdp-day_selected.rdp-day_disabled:not(.rdp-day_outside),
  .rdp-today:not(.rdp-outside),
  .rdp-day_today:not(.rdp-day_outside) {
    background: transparent;
    border-radius: var(--global-radius-action-circle);
    color: inherit;
    font-weight: inherit;
  }

  .rdp-day:not(.rdp-selected):not(.rdp-disabled):not(.rdp-outside):hover
    .rdp-day_button,
  .rdp-day:not(.rdp-day_selected):not(.rdp-day_disabled):not(
      .rdp-day_outside
    ):hover
    .rdp-day_button {
    background: var(--input-calendar-bg-hover);
    color: var(--input-calendar-txt-hover);
  }

  .rdp-selected:not(.rdp-range_start):not(.rdp-range_end) .rdp-day_button,
  .rdp-day_selected:not(.rdp-day_range_start):not(.rdp-day_range_end)
    .rdp-day_button,
  .rdp-range_start .rdp-day_button,
  .rdp-day_range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button,
  .rdp-day_range_end .rdp-day_button {
    background: var(--input-calendar-bg-active);
    color: var(--input-calendar-txt-active);
    border-radius: var(--global-radius-action-circle);
  }

  .rdp-selected .rdp-day_button,
  .rdp-day_selected .rdp-day_button,
  .rdp-range_start .rdp-day_button,
  .rdp-day_range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button,
  .rdp-day_range_end .rdp-day_button {
    z-index: 2;
  }

  .rdp-selected,
  .rdp-day_selected,
  .rdp-range_start,
  .rdp-day_range_start,
  .rdp-range_end,
  .rdp-day_range_end {
    z-index: 1;
  }

  .rdp-range_start,
  .rdp-day_range_start {
    position: relative;
    background: transparent;
    border: none;
    border-radius: 0;
  }

  .rdp-range_start::before,
  .rdp-day_range_start::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    left: 50%;
    right: 0;
    background: var(--input-calendar-bg-duration);
    border-top: var(--global-borderwidth-s) solid
      var(--input-calendar-border-duration);
    border-bottom: var(--global-borderwidth-s) solid
      var(--input-calendar-border-duration);
  }

  .rdp-range_end,
  .rdp-day_range_end {
    position: relative;
    background: transparent;
    border: none;
    border-radius: 0;
  }

  .rdp-range_end::before,
  .rdp-day_range_end::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 50%;
    background: var(--input-calendar-bg-duration);
    border-top: var(--global-borderwidth-s) solid
      var(--input-calendar-border-duration);
    border-bottom: var(--global-borderwidth-s) solid
      var(--input-calendar-border-duration);
  }

  .rdp-disabled,
  .rdp-day_disabled {
    color: var(--input-calendar-txt-disabled);
  }

  .rdp-selected.rdp-disabled .rdp-day_button,
  .rdp-day_selected.rdp-day_disabled .rdp-day_button {
    background: transparent;
    color: var(--input-calendar-txt-disabled);
  }

  .rdp-outside,
  .rdp-day_outside {
    color: var(--input-calendar-txt-alt);
  }

  .rdp-range_middle,
  .rdp-day_range_middle {
    position: relative;
    background: transparent;
    border-radius: 0;
    border: none;
  }

  .rdp-range_middle::before,
  .rdp-day_range_middle::before {
    content: "";
    position: absolute;
    z-index: 0;
    inset: 0;
    background: var(--input-calendar-bg-duration);
    border-top: var(--global-borderwidth-s) solid
      var(--input-calendar-border-duration);
    border-bottom: var(--global-borderwidth-s) solid
      var(--input-calendar-border-duration);
  }

  .rdp-selected.rdp-range_middle,
  .rdp-day_selected.rdp-day_range_middle,
  .rdp-today.rdp-range_middle,
  .rdp-day_today.rdp-day_range_middle {
    background: var(--input-calendar-bg-duration);
  }

  .rdp-range_middle .rdp-day_button,
  .rdp-day_range_middle .rdp-day_button {
    border-radius: 0;
    color: var(--input-calendar-txt-default);
  }

  .rdp-range_middle:hover .rdp-day_button,
  .rdp-day_range_middle:hover .rdp-day_button {
    width: var(--global-size-m);
    min-width: var(--global-size-m);
    max-width: var(--global-size-m);
    height: var(--global-size-m);
    min-height: var(--global-size-m);
    max-height: var(--global-size-m);
    border-radius: var(--global-radius-action-circle);
  }

  .rdp-today:not(.rdp-range_start):not(.rdp-range_middle):not(.rdp-range_end),
  .rdp-day_today:not(.rdp-day_range_start):not(.rdp-day_range_middle):not(
      .rdp-day_range_end
    ) {
    background: transparent;

    &:not([disabled]):hover:not(.rdp-day_selected):not(.rdp-day_outside) {
      background: transparent;
    }
  }

  .rdp-today.rdp-range_start:not(.rdp-outside),
  .rdp-today.rdp-range_middle:not(.rdp-outside),
  .rdp-today.rdp-range_end:not(.rdp-outside),
  .rdp-day_today.rdp-day_range_start:not(.rdp-day_outside),
  .rdp-day_today.rdp-day_range_middle:not(.rdp-day_outside),
  .rdp-day_today.rdp-day_range_end:not(.rdp-day_outside) {
    font-weight: inherit;
    border-radius: 0;
    color: inherit;
  }

  .rdp-day_today.rdp-range_start .rdp-day_button:not(:focus-visible),
  .rdp-day_today.rdp-day_range_start .rdp-day_button:not(:focus-visible) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .rdp-day_today.rdp-range_end .rdp-day_button:not(:focus-visible),
  .rdp-day_today.rdp-day_range_end .rdp-day_button:not(:focus-visible) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .rdp-day_today:not(.rdp-selected):not(.rdp-day_selected) .rdp-day_button {
    background: transparent;
  }

  .rdp-range_middle:hover .rdp-day_button,
  .rdp-day_range_middle:hover .rdp-day_button {
    background: var(--input-calendar-bg-hover);
    color: var(--input-calendar-txt-hover);
  }

  .rdp-focused:not(.rdp-disabled):not(.rdp-outside),
  .rdp-day.rdp-selected:focus {
    outline: none;
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  .rdp-day_button:focus-visible {
    ${addFocusStyling()}
    border-radius: var(--global-radius-action-circle);
  }

  .rdp-range_middle.rdp-focused .rdp-day_button,
  .rdp-day_range_middle.rdp-focused .rdp-day_button,
  .rdp-range_middle:has(.rdp-day_button:focus-visible) .rdp-day_button,
  .rdp-day_range_middle:has(.rdp-day_button:focus-visible) .rdp-day_button {
    background: transparent;
    color: var(--input-calendar-txt-default);
    border-radius: var(--global-radius-action-circle);
  }

  .rdp-day_today-indicator {
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: 8px;
    transform: translateX(-50%);
    width: var(--global-size-3-xs);
    height: var(--global-size-5-xs);
    background: var(--input-calendar-txt-default);
    border-radius: var(--global-radius-action-circle);
    pointer-events: none;
  }

  .rdp-selected .rdp-day_today-indicator,
  .rdp-day_selected .rdp-day_today-indicator {
    background: var(--input-calendar-txt-active);
  }
`;

export default DatePickerPopover;
