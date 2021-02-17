import * as React from "react";
import { SimpleColorProps } from "./simple-color/simple-color";

export interface SimpleColorPickerProps {
  /** The SimpleColor components to be rendered in the group */
  children: Array<React.ReactElement<SimpleColorProps>>;
  /** Should the onBlur callback prop be initially blocked? */
  isBlurBlocked?: boolean;
  /** Indicate that error has occurred
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  error?: boolean | string;
  /** Indicate that warning has occurred
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  warning?: boolean | string;
  /** Indicate additional information
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  info?: boolean | string;
  /** When true, validation icon will be placed on legend instead of being placed by the input */
  validationOnLegend?: boolean;
  /** The content for the Legend */
  legend: string;
  /** The currently selected color. */
  value?: string;
  /** The name to apply to the input. */
  name?: string;
  /** Prop for `onChange` events */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onKeyDown` events */
  onKeyDown?: (ev: React.SyntheticEvent) => void;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** prop that sets max-width in css */
  maxWidth?: string;
  /** prop that represents childWidth */
  childWidth?: string;
  /** Flag to configure component as mandatory */
  required?: boolean;
}
declare const SimpleColorPicker: React.ComponentType<SimpleColorPickerProps>;

export default SimpleColorPicker;
