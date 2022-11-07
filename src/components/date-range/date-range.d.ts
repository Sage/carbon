import * as React from "react";
import { MarginProps } from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";
import { DateInputProps } from "../date/date";

export interface DateRangeChangeEvent {
  target: {
    value: [
      {
        formattedValue: string;
        rawValue: string;
      },
      {
        formattedValue: string;
        rawValue: string;
      }
    ];
  };
}

export interface DateRangeProps extends Expand<MarginProps> {
  /** Props for the child end Date component */
  endDateProps?: Expand<Partial<DateInputProps>>;
  /** Optional label for endDate field */
  endLabel?: string;
  /**
   * Indicate that error has occurred on end date
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  endError?: boolean | string;
  /**
   * Indicate additional information for end date
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  endInfo?: boolean | string;
  /**
   * Indicate that warning has occurred on end date
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  endWarning?: boolean | string;
  /** An optional string prop to provide an id to the component */
  id?: string;
  /** Display labels inline */
  labelsInline?: boolean;
  /** An optional string prop to provide a name to the component */
  name?: string;
  /** Specify a callback triggered on change */
  onChange: (ev: Expand<DateRangeChangeEvent>) => void;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: DateRangeChangeEvent) => void;
  /** Props for the child start Date component */
  startDateProps?: Expand<Partial<DateInputProps>>;
  /** Optional label for startDate field */
  startLabel?: string;
  /**
   * Indicate that error has occurred on start date
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  startError?: boolean | string;
  /**
   * Indicate that warning has occurred on start date
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  startWarning?: boolean | string;
  /** Indicate additional information for start date
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  startInfo?: boolean | string;
  /** An array containing the value of startDate and endDate */
  value: string[];
  /** When true, validation icons will be placed on labels instead of being placed on the inputs */
  validationOnLabel?: boolean;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

declare function DateRange(props: DateRangeProps): JSX.Element;

export default DateRange;
