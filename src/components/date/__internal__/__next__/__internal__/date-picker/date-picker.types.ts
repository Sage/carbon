import type React from "react";
import type { RefObject } from "react";
import type { DayPickerProps } from "react-day-picker";

import type { PickerProps as LegacyPickerProps } from "../../../date-picker";

export type PickerProps = LegacyPickerProps & {
  mode?: DayPickerProps["mode"];
};

export type DatePickerSize = "small" | "medium" | "large";

export interface DatePickerProps {
  /** @deprecated Portal placement is retained for legacy API compatibility. */
  disablePortal?: boolean;
  /** Minimum possible date in YYYY-MM-DD format. */
  minDate?: string;
  /** Maximum possible date in YYYY-MM-DD format. */
  maxDate?: string;
  /** Legacy DayPicker configuration. DateInput remains single-select. */
  pickerProps?: PickerProps;
  /** Element that the DatePicker will be displayed under. */
  inputElement: RefObject<HTMLElement>;
  /** Currently selected date. */
  selectedDays?: Date;
  /** Callback to handle mousedown on the picker container. */
  pickerMouseDown?: () => void;
  /** Sets whether the picker should be displayed. */
  open?: boolean;
  /** Callback triggered when a day is clicked. */
  onDayClick?: (date: Date, ev: React.MouseEvent<HTMLDivElement>) => void;
  /** Callback triggered when month or year selectors update the selected date. */
  onMonthYearChange?: (
    date: Date,
    ev: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  /** Sets the picker open state. */
  setOpen: (isOpen: boolean) => void;
  /** Id passed to the tab guard element. */
  pickerTabGuardId?: string;
  /** Callback triggered when the picker is closed. */
  onPickerClose?: () => void;
  /** aria-label for the date picker. */
  ariaLabel?: string;
  /** aria-labelledby for the date picker. */
  ariaLabelledBy?: string;
  /** Id for the date picker container. */
  pickerId?: string;
  /** Size of the associated date input. */
  size?: DatePickerSize;
}
