import styled, { css } from "styled-components";

import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

const officialReactDayPickerStyling = () => css`
  /* Variables declaration */
  /* prettier-ignore */
  .rdp-root {
    --rdp-accent-color: blue; /* The accent color used for selected days and UI elements. */
    --rdp-accent-background-color: #f0f0ff; /* The accent background color used for selected days and UI elements. */

    --rdp-day-height: 2.75rem; /* The height of the day cells. */
    --rdp-day-width: 2.75rem; /* The width of the day cells. */

    --rdp-day_button-border-radius: 100%; /* The border radius of the day cells. */
    --rdp-day_button-border: 2px solid transparent; /* The border of the day cells. */
    --rdp-day_button-height: var(--rdp-day-height); /* The height of the day cells. */
    --rdp-day_button-width: var(--rdp-day-width); /* The width of the day cells. */

    --rdp-selected-border: 2px solid var(--rdp-accent-color); /* The border of the selected days. */
    --rdp-disabled-opacity: 0.5; /* The opacity of the disabled days. */
    --rdp-outside-opacity: 0.75; /* The opacity of the days outside the current month. */
    --rdp-today-color: var(--rdp-accent-color); /* The color of the today's date. */

    --rdp-dropdown-gap: 0.5rem;/* The gap between the dropdowns used in the month captons. */

    --rdp-months-gap: 2rem; /* The gap between the months in the multi-month view. */

    --rdp-nav_button-disabled-opacity: 0.5; /* The opacity of the disabled navigation buttons. */
    --rdp-nav_button-height: 2.25rem; /* The height of the navigation buttons. */
    --rdp-nav_button-width: 2.25rem; /* The width of the navigation buttons. */
    --rdp-nav-height: 2.75rem; /* The height of the navigation bar. */

    --rdp-range_middle-background-color: var(--rdp-accent-background-color); /* The color of the background for days in the middle of a range. */
    --rdp-range_middle-foreground-color: white; /* The foregraound color for days in the middle of a range. */
    --rdp-range_middle-color: inherit;/* The color of the range text. */

    --rdp-range_start-color: white; /* The color of the range text. */
    --rdp-range_start-background: linear-gradient(var(--rdp-gradient-direction), transparent 50%, var(--rdp-range_middle-background-color) 50%); /* Used for the background of the start of the selected range. */
    --rdp-range_start-date-background-color: var(--rdp-accent-color); /* The background color of the date when at the start of the selected range. */

    --rdp-range_end-background: linear-gradient(var(--rdp-gradient-direction), var(--rdp-range_middle-background-color) 50%, transparent 50%); /* Used for the background of the end of the selected range. */
    --rdp-range_end-color: white;/* The color of the range text. */
    --rdp-range_end-date-background-color: var(--rdp-accent-color); /* The background color of the date when at the end of the selected range. */

    --rdp-week_number-border-radius: 100%; /* The border radius of the week number. */
    --rdp-week_number-border: 2px solid transparent; /* The border of the week number. */

    --rdp-week_number-height: var(--rdp-day-height); /* The height of the week number cells. */
    --rdp-week_number-opacity: 0.75; /* The opacity of the week number. */
    --rdp-week_number-width: var(--rdp-day-width); /* The width of the week number cells. */
    --rdp-weeknumber-text-align: center; /* The text alignment of the weekday cells. */

    --rdp-weekday-opacity: 0.75; /* The opacity of the weekday. */
    --rdp-weekday-padding: 0.5rem 0rem; /* The padding of the weekday. */
    --rdp-weekday-text-align: center; /* The text alignment of the weekday cells. */

    --rdp-gradient-direction: 90deg;
  }

  .rdp-root[dir="rtl"] {
    --rdp-gradient-direction: -90deg;
  }

  /* Root of the component. */
  .rdp-root {
    position: relative; /* Required to position the navigation toolbar. */
    box-sizing: border-box;
  }

  .rdp-root * {
    box-sizing: border-box;
  }

  .rdp-day {
    width: var(--sizing500);
    height: var(--sizing450);
    text-align: center;
  }

  .rdp-day_button {
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
    justify-content: center;
    align-items: center;
    display: flex;
    min-width: var(--sizing500);
    height: var(--sizing450);
    border: var(--rdp-day_button-border);
    border-radius: var(--rdp-day_button-border-radius);
  }

  .rdp-day_button:disabled {
    cursor: revert;
  }

  .rdp-day_button {
    outline: none;
  }

  .rdp-caption_label {
    z-index: 1;
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    border: 0;
  }

  .rdp-button_next,
  .rdp-button_previous {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
    -moz-appearance: none;
    -webkit-appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    appearance: none;
    width: var(--rdp-nav_button-width);
    height: var(--rdp-nav_button-height);
  }

  .rdp-button_next:disabled,
  .rdp-button_previous:disabled {
    cursor: revert;
    opacity: var(--rdp-nav_button-disabled-opacity);
  }

  .rdp-chevron {
    display: inline-block;
    fill: var(--rdp-accent-color);
  }

  .rdp-root[dir="rtl"] .rdp-nav .rdp-chevron {
    transform: rotate(180deg);
  }

  .rdp-root[dir="rtl"] .rdp-nav .rdp-chevron {
    transform: rotate(180deg);
    transform-origin: 50%;
  }

  .rdp-dropdowns {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--rdp-dropdown-gap);
  }
  .rdp-dropdown {
    z-index: 2;
    /* Reset */
    opacity: 0;
    appearance: none;
    position: absolute;
    inset-block-start: 0;
    inset-block-end: 0;
    inset-inline-start: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    cursor: inherit;
    border: none;
    line-height: inherit;
  }

  .rdp-dropdown_root {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .rdp-dropdown_root[data-disabled="true"] .rdp-chevron {
    opacity: var(--rdp-disabled-opacity);
  }

  .rdp-month_caption {
    display: flex;
    align-content: center;
    height: var(--rdp-nav-height);
    font-weight: bold;
    font-size: large;
  }

  .rdp-months {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: var(--rdp-months-gap);
    max-width: fit-content;
  }

  .rdp-month_grid {
    border-collapse: collapse;
  }

  .rdp-nav {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    display: flex;
    align-items: center;
    height: var(--rdp-nav-height);
    width: 100%;
  }

  .rdp-weekday {
    opacity: var(--rdp-weekday-opacity);
    padding: var(--rdp-weekday-padding);
    font-weight: 500;
    font-size: smaller;
    text-align: var(--rdp-weekday-text-align);
    text-transform: var(--rdp-weekday-text-transform);
  }

  .rdp-week_number {
    opacity: var(--rdp-week_number-opacity);
    font-weight: 400;
    font-size: small;
    height: var(--rdp-week_number-height);
    width: var(--rdp-week_number-width);
    border: var(--rdp-week_number-border);
    border-radius: var(--rdp-week_number-border-radius);
    text-align: var(--rdp-weeknumber-text-align);
  }

  /* DAY MODIFIERS */
  .rdp-today:not(.rdp-outside) {
    color: var(--rdp-today-color);
  }

  .rdp-selected {
    font-weight: bold;
    font-size: large;
  }

  .rdp-selected .rdp-day_button {
    border: var(--rdp-selected-border);
  }

  .rdp-outside {
    opacity: var(--rdp-outside-opacity);
  }

  .rdp-disabled {
    opacity: var(--rdp-disabled-opacity);
  }

  .rdp-hidden {
    visibility: hidden;
    color: var(--rdp-range_start-color);
  }

  .rdp-range_start {
    background: var(--rdp-range_start-background);
  }

  .rdp-range_start .rdp-day_button {
    background-color: var(--rdp-range_start-date-background-color);
    color: var(--rdp-range_start-color);
  }

  .rdp-range_middle {
    background-color: var(--rdp-range_middle-background-color);
  }

  .rdp-range_middle .rdp-day_button {
    border-color: transparent;
    border: unset;
    border-radius: unset;
    color: var(--rdp-range_middle-color);
  }

  .rdp-range_end {
    background: var(--rdp-range_end-background);
    color: var(--rdp-range_end-color);
  }

  .rdp-range_end .rdp-day_button {
    color: var(--rdp-range_start-color);
    background-color: var(--rdp-range_end-date-background-color);
  }

  .rdp-range_start.rdp-range_end {
    background: revert;
  }

  .rdp-focusable {
    cursor: pointer;
  }
`;

const StyledDayPicker = styled.div.attrs(applyBaseTheme)`
  ${officialReactDayPickerStyling}

  .rdp-root {
    z-index: 2000;
    top: calc(100% + 1px);
    left: 0;
    background-color: var(--colorsUtilityYang100);
    box-shadow: var(--boxShadow100);
    display: block;
    overflow: hidden;
    padding: var(--spacing300);
    text-align: center;
    user-select: none;
    border-radius: var(--borderRadius050);
  }

  .rdp-root * {
    box-sizing: border-box;
  }

  .rdp-root:focus {
    outline: none;
  }

  .rdp-root abbr[title] {
    border: none;
    cursor: initial;
  }

  .rdp-months {
    padding: 0;
  }

  .rdp-month {
    margin: 0 0 2px;
  }

  .rdp-month_grid,
  .rdp_weeks {
    width: 100%;
    margin-top: 8px;
  }

  .rdp-month_caption {
    color: var(--colorsActionMajorYin090);
    line-height: var(--sizing500);
    height: var(--sizing500);
    font-size: 16px;
    font-weight: 800;
    display: block;

    > div {
      margin: 0 auto;
      width: 80%;
    }
  }

  .rdp-weekday {
    border: medium;
    width: var(--sizing500);
    height: var(--sizing450);
    font-weight: 800;
    color: var(--colorsActionMinor500);
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
  }

  .rdp-day {
    min-width: var(--sizing500);
    height: var(--sizing450);
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    border: none;
    font-weight: var(--fontWeights500);
    font-size: var(--fontSizes100);
    line-height: var(--lineHeights500);
    border-radius: var(--borderRadius400);

    &:hover {
      background-color: var(--colorsActionMinor050);
      color: var(--colorsActionMajorYin090);
    }

    + * {
      border-left: 1px;
    }

    abbr {
      text-decoration: none;
    }
  }

  .rdp-today,
  .rdp-today.rdp-outside {
    color: var(--colorsActionMajorYin090);
    background-color: var(--colorsActionMinor200);
  }

  .rdp-outside {
    color: var(--colorsActionMajorYin055);
    background-color: transparent;
  }

  .rdp-today:not(.rdp-outside) {
    font-weight: var(--fontWeights500);
    border-radius: var(--borderRadius400);
    color: inherit;
  }

  .rdp-disabled,
  .rdp-disabled:hover {
    color: var(--colorsActionMajorYin030);
    background-color: var(--colorsUtilityYang100);
    cursor: default;

    &.rdp-today {
      background-color: var(--colorsActionMinor200);
    }
  }

  .rdp-selected:not(.rdp-disabled):not(.rdp-outside) {
    background-color: var(--colorsActionMajor500);
    color: var(--colorsUtilityYang100);
    border-radius: var(--borderRadius400);
  }

  .rdp-selected.rdp-disabled:not(.rdp-outside) {
    background-color: var(--colorsActionMajor500);
    color: var(--colorsUtilityYang100);
  }

  .rdp-selected {
    &:focus-visible {
      outline: none;
    }
  }

  .rdp-selected .rdp-day_button {
    border: none;
    &:focus-visible {
      outline: none;
    }
  }

  .rdp-focused:not(.rdp-disabled):not(.rdp-outside) {
    ${addFocusStyling(true)}
    border-radius: var(--borderRadius400);
  }

  .rdp-day.rdp-selected {
    &:focus {
      ${addFocusStyling(true)}
    }
  }
`;

export default StyledDayPicker;
