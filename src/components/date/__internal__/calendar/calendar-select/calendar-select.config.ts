import type { DatePickerSize } from "../../date-picker";

export type CalendarSelectSize = DatePickerSize;

interface CalendarSelectSizeConfig {
  checkmarkWidth: string;
  controlFont: string;
  optionFont: string;
  inlinePadding: string;
  blockPadding: string;
}

export const calendarSelectSizeConfig: Record<
  CalendarSelectSize,
  CalendarSelectSizeConfig
> = {
  small: {
    checkmarkWidth: "var(--global-size-2-xs)",
    controlFont: "var(--global-font-static-comp-medium-s)",
    optionFont: "var(--global-font-static-comp-regular-s)",
    inlinePadding: "var(--global-space-comp-s)",
    blockPadding: "var(--global-space-comp-xs)",
  },
  medium: {
    checkmarkWidth: "var(--global-size-xs)",
    controlFont: "var(--global-font-static-comp-medium-m)",
    optionFont: "var(--global-font-static-comp-regular-m)",
    inlinePadding: "var(--global-space-comp-m)",
    blockPadding: "var(--global-space-comp-s)",
  },
  large: {
    checkmarkWidth: "var(--global-size-xs)",
    controlFont: "var(--global-font-static-comp-medium-l)",
    optionFont: "var(--global-font-static-comp-regular-l)",
    inlinePadding: "var(--global-space-comp-l)",
    blockPadding: "var(--global-space-comp-m)",
  },
};
