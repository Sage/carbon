import * as React from "react";
import { MarginProps } from "styled-system";
import { ValidationPropTypes } from "../../../components/validations";
import { SimpleColorProps } from "./simple-color/simple-color";

type SimpleColorPickerChild = React.ReactElement<SimpleColorProps> | boolean | null | undefined;

export interface SimpleColorPickerProps extends ValidationPropTypes, MarginProps {
  /** The SimpleColor components to be rendered in the group */
  children?: SimpleColorPickerChild | SimpleColorPickerChild[];
  /** prop that represents childWidth */
  childWidth?: string;
  /** Should the onBlur callback prop be initially blocked? */
  isBlurBlocked?: boolean;
  /** The content for the Legend */
  legend: string;
  /** prop that sets max-width in css */
  maxWidth?: string;
  /** The name to apply to the input. */
  name?: string;
  /** Prop for `onChange` events */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onKeyDown` events */
  onKeyDown?: (ev: React.SyntheticEvent) => void;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** When true, validation icon will be placed on legend instead of being placed by the input */
  validationOnLegend?: boolean;
  /** The currently selected color. */
  value?: string;
}

declare function SimpleColorPicker(props: SimpleColorPickerProps): JSX.Element;

export default SimpleColorPicker;
