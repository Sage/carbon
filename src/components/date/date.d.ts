import { DayPickerProps } from "react-day-picker";
import { Expand } from "../../__internal__/utils/helpers/types";
import { TextboxProps } from "../textbox";

export interface DateChangeEvent {
  target: {
    value: {
      formattedValue: string;
      rawValue: string;
    };
  };
}

export interface DateInputProps
  extends Omit<
    TextboxProps,
    | "value"
    | "formattedValue"
    | "rawValue"
    | "onChange"
    | "onMouseDown"
    | "onChangeDeferred"
    | "deferTimeout"
    | "children"
    | "leftChildren"
    | "placeholder"
    | "iconOnClick"
    | "iconOnMouseDown"
    | "enforceCharacterLimit"
    | "characterLimit"
    | "warnOverLimit"
    | "iconTabIndex"
  > {
  /** Boolean to allow the input to have an empty value */
  allowEmptyValue?: boolean;
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal?: boolean;
  /** Minimum possible date YYYY-MM-DD */
  minDate?: string;
  /** Maximum possible date YYYY-MM-DD */
  maxDate?: string;
  /** Specify a callback triggered on change */
  onChange: (ev: Expand<DateChangeEvent>) => void;
  /** The current date string */
  value: string;
  /** Pass any props that match the DayPickerProps interface to override default behaviors */
  pickerProps?: Expand<DayPickerProps>;
}

declare function DateInput(props: DateInputProps): JSX.Element;

export default DateInput;
