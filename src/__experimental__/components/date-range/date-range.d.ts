import * as React from "react";
import DateInput from "../date";

export interface DateRangeProps {
  /** Optional label for endDate field */
  endLabel?: string;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** An array containing the value of startDate and endDate */
  value?: string[];
  /* The default value of the input if it's meant to be used as an uncontrolled component */
  defaultValue?: string[];
  /** Indicate that error has occurred on start date
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  startError?: boolean | string;
  /** Indicate that warning has occurred on start date
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  startWarning?: boolean | string;
  /** Indicate additional information for start date
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  startInfo?: boolean | string;
  /** Indicate that error has occurred on end date
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  endError?: boolean | string;
  /** Indicate that warning has occurred on end date
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  endWarning?: boolean | string;
  /** Indicate additional information for end date
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  endInfo?: boolean | string;
  /** When true, validation icons will be placed on labels instead of being placed on the inputs */
  validationOnLabel?: boolean;
  /** Optional label for startDate field */
  startLabel?: string;
  /** Display labels inline */
  labelsInline?: boolean;
  /** Props for the child start Date component */
  startDateProps?: DateInput;
  /** Props for the child end Date component */
  endDateProps?: DateInput;
  /** An optional string prop to provide a name to the component */
  name?: string;
  /** An optional string prop to provide an id to the component */
  id?: string;
}

declare const DateRange: React.ComponentClass<DateRangeProps>;

export default DateRange;
