import { MarginProps } from "styled-system";
import { CommonCheckableInputProps } from "../../__internal__/checkable-input";

export interface RadioButtonProps
  extends CommonCheckableInputProps,
    MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** When true, sets the component in line (for RadioButtonGroup) */
  inline?: boolean;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** the value of the Radio Button, passed on form submit */
  value: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
}

declare function RadioButton(
  props: RadioButtonProps & React.RefAttributes<HTMLInputElement>
): JSX.Element;

export { RadioButton as PrivateRadioButton };
export default RadioButton;
