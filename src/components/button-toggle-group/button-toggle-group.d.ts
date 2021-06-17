import * as React from "react";

import { ButtonToggleProps } from "../button-toggle";
import { ValidationPropTypes } from "../../__internal__/validations";

type ButtonToggle = React.ReactElement<ButtonToggleProps>;

export interface ButtonToggleGroupProps extends ValidationPropTypes {
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** Children to be rendered (ButtonToggle). */
  children: ButtonToggle | ButtonToggle[];
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** Text for the label. */
  label?: string;
  /** Text for the labels help tooltip. */
  labelHelp?: React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth?: number;
  /** The text for the field help. */
  fieldHelp?: string;
  /** Sets the field help to inline. */
  fieldHelpInline?: boolean;
  /** Sets the label to be inline. */
  labelInline?: boolean;
  /** The percentage width of the label. */
  labelWidth?: number;
  /** The alignment for the text in the label. */
  labelAlign?: string;
  /** Callback triggered by blur event on the input. */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback triggered by change event on the input. */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** The value of the Button Toggle Group */
  value?: string;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
}

declare function ButtonToggleGroup(props: ButtonToggleGroupProps): JSX.Element;

export default ButtonToggleGroup;
