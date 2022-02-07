import * as React from "react";
import { DayPickerProps } from "react-day-picker";

export interface DatePickerProps extends Pick<DayPickerProps, "onDayClick"> {
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal?: boolean;
  /** Minimum possible date YYYY-MM-DD */
  minDate?: string;
  /** Maximum possible date YYYY-MM-DD */
  maxDate?: string;
  /** Pass any props that match the DayPickerProps interface to override default behaviors */
  pickerProps?: DayPickerProps;
  /** Element that the DatePicker will be displayed under */
  inputElement: React.RefObject<HTMLElement>;
  /** Currently selected date */
  selectedDays?: Date;
  /** Callback to handle mousedown event on picker container */
  pickerMouseDown?: () => void;
}

declare function DatePicker(
  props: DatePickerProps & React.RefAttributes<HTMLElement>
): JSX.Element;

export default DatePicker;
