import React from "react";
import type { DayPickerProps } from "react-day-picker";
import DateInputLegacy, {
  DateChangeEvent as LegacyDateChangeEvent,
  DateInputLegacyProps,
} from "./date-legacy.component";
import DateInputTypical from "./__internal__/__next__/date-typical.component";

export type DateChangeEvent = LegacyDateChangeEvent;

type DateInputPickerProps = NonNullable<DateInputLegacyProps["pickerProps"]> & {
  mode?: DayPickerProps["mode"];
};

export interface DateInputProps
  extends Omit<DateInputLegacyProps, "pickerProps"> {
  /** Legacy label id override retained for source compatibility. */
  labelId?: string;
  pickerProps?: DateInputPickerProps;
  /**
   * Specify the variant of the DateInput to use.
   * 'legacy' (default) uses the original implementation.
   * 'typical' uses the new implementation.
   */
  variant?: "legacy" | "typical";
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (props: DateInputProps, ref) => {
    const { variant = "legacy", ...restProps } = props;

    if (variant === "legacy") {
      return (
        <DateInputLegacy ref={ref} {...(restProps as DateInputLegacyProps)} />
      );
    }

    return (
      <DateInputTypical ref={ref} {...(restProps as DateInputLegacyProps)} />
    );
  },
);

DateInput.displayName = "DateInput";

export default DateInput;
