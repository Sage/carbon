import React from "react";
import { MarginProps } from "styled-system";
import { DateInputProps } from "../date";
import { PickerProps } from "../date/__internal__/date-picker";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import { StyledDateRangeProps } from "./date-range.style";
import StandardDateRange from "./__internal__/standard-date-range.component";
import CombinedDateRange from "./__internal__/combined-date-range.component";

export interface DateInputValue {
  formattedValue: string;
  rawValue: string | null;
}

export interface DateRangeChangeEvent {
  target: {
    name?: string;
    id?: string;
    value: [DateInputValue, DateInputValue];
  };
}

export interface DateRangeBaseProps extends MarginProps, TagProps {
  /** An array containing the value of the start date and the end date */
  value: string[];
  /**
   * Specify a callback triggered when the value changes.
   * Standard: called whenever a date changes.
   * Combined: called when Apply is pressed and the value differs, including a partial range.
   */
  onChange: (ev: DateRangeChangeEvent) => void;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: DateRangeChangeEvent) => void;
  /** An optional string prop to provide an id to the component */
  id?: string;
  /**
   * An optional string prop to provide a name to the component.
   * Form fields are named `${name}-start` and `${name}-end`.
   */
  name?: string;
  /** Flag to configure component as mandatory. */
  required?: boolean;
  /** Size of the field or fields. A parent Fieldset's size takes priority. */
  size?: "small" | "medium" | "large";
  /** Date format string to be applied to the dates */
  dateFormatOverride?: string;
}

/**
 * Props for the standard date range. For the combined date range, use `CombinedDateRangeProps`.
 * In the next major release this will include every range type.
 */
export interface DateRangeProps
  extends DateRangeBaseProps,
    StyledDateRangeProps {
  /** Standard only. Renders two date inputs, each with its own calendar. This is the default. */
  rangeType?: "standard";
  /** Standard only. Props for the child end Date component */
  endDateProps?: Omit<Partial<DateInputProps>, "required">;
  /** Standard only. Optional label for endDate field */
  endLabel?: string;
  /**
   * Standard only. Indicate that error has occurred on end date.
   * Pass string to display icon, tooltip and red border.
   * Pass true boolean to only display red border.
   */
  endError?: boolean | string;
  /**
   * @deprecated Not supported. Use `endDateProps.inputHint`, `endWarning`, or `endError` as appropriate.
   */
  endInfo?: boolean | string;
  /**
   * Standard only. Indicate that warning has occurred on end date.
   * Pass string to display icon, tooltip and orange border.
   * Pass true boolean to only display orange border.
   */
  endWarning?: boolean | string;
  /**
   * Standard only. A React ref to pass to the second of the two Date Input fields
   */
  endRef?: React.ForwardedRef<HTMLInputElement>;
  /** Standard only. Props for the child start Date component */
  startDateProps?: Omit<Partial<DateInputProps>, "required">;
  /** Standard only. Optional label for startDate field */
  startLabel?: string;
  /**
   * Standard only. Indicate that error has occurred on start date.
   * Pass string to display icon, tooltip and red border.
   * Pass true boolean to only display red border.
   */
  startError?: boolean | string;
  /**
   * Standard only. Indicate that warning has occurred on start date.
   * Pass string to display icon, tooltip and orange border.
   * Pass true boolean to only display orange border.
   */
  startWarning?: boolean | string;
  /**
   * @deprecated Not supported. Use `startDateProps.inputHint`, `startWarning`, or `startError` as appropriate.
   */
  startInfo?: boolean | string;
  /**
   * Standard only. A React ref to pass to the first of the two Date Input fields
   */
  startRef?: React.ForwardedRef<HTMLInputElement>;
  /** @deprecated Not supported. Use inline `warning` or `error` messages. */
  validationOnLabel?: boolean;
  /** @deprecated Not supported. Use inline `inputHint`, `warning`, or `error` content. */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * @deprecated The calendar is now named by its date input's label (`startLabel` or `endLabel`).
   * Remove this prop; it has no effect.
   */
  datePickerStartAriaLabel?: string;
  /**
   * @deprecated The calendar is now named by its date input's label (`startLabel` or `endLabel`).
   * Remove this prop; it has no effect.
   */
  datePickerStartAriaLabelledBy?: string;
  /**
   * @deprecated The calendar is now named by its date input's label (`startLabel` or `endLabel`).
   * Remove this prop; it has no effect.
   */
  datePickerEndAriaLabel?: string;
  /**
   * @deprecated The calendar is now named by its date input's label (`startLabel` or `endLabel`).
   * Remove this prop; it has no effect.
   */
  datePickerEndAriaLabelledBy?: string;
}

export interface CombinedDateRangeProps extends DateRangeBaseProps {
  /** Combined only. Renders one button that opens a single calendar for the whole range. */
  rangeType: "combined";
  /** Combined only. Label for the field. */
  label: string;
  /**
   * Combined only. Indicate that error has occurred on the field.
   * Pass string to display the message and red border.
   * Pass true boolean to only display red border.
   */
  error?: boolean | string;
  /**
   * Combined only. Indicate that warning has occurred on the field.
   * Pass string to display the message and orange border.
   * Pass true boolean to only display orange border.
   */
  warning?: boolean | string;
  /** Combined only. A hint rendered after the label, intended to describe the field. */
  inputHint?: React.ReactNode;
  /** Combined only. If true, the field is disabled. */
  disabled?: boolean;
  /** Combined only. Minimum selectable date, YYYY-MM-DD. */
  minDate?: string;
  /** Combined only. Maximum selectable date, YYYY-MM-DD. */
  maxDate?: string;
  /**
   * Combined only. Pass DayPickerProps (except `locale`) to override default behaviors.
   * Selection and locale are owned by the component/I18nProvider.
   * See [DayPickerProps](https://daypicker.dev/api/type-aliases/DayPickerProps) for a full list of available props
   */
  pickerProps?: Omit<
    PickerProps,
    | "selected"
    | "onSelect"
    | "footer"
    | "required"
    | "min"
    | "max"
    | "excludeDisabled"
  >;
  /** Combined only. A React ref to pass to the button that opens the calendar. */
  triggerRef?: React.ForwardedRef<HTMLButtonElement>;
}

type Forbid<T> = { [K in keyof T]?: never };
type OwnProps<T> = Omit<T, keyof DateRangeBaseProps | "rangeType">;
/** The props of the other types that this type doesn't have. */
type OthersOnly<T, Others> = Forbid<Omit<Others, keyof T>>;

type DateRangeComponentProps =
  | (DateRangeProps &
      OthersOnly<DateRangeProps, OwnProps<CombinedDateRangeProps>>)
  | (CombinedDateRangeProps &
      OthersOnly<CombinedDateRangeProps, OwnProps<DateRangeProps>>);

export const DateRange = (props: DateRangeComponentProps) => {
  if (props.rangeType === "combined") {
    return <CombinedDateRange {...(props as CombinedDateRangeProps)} />;
  }

  return <StandardDateRange {...(props as DateRangeProps)} />;
};

DateRange.displayName = "DateRange";

export default DateRange;
