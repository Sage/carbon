import { MarginProps } from "styled-system";
import * as OptionsHelper from "../../../utils/helpers/options-helper/options-helper";
import { CommonCheckableInputProps } from "../../../__internal__/checkable-input";

export interface RadioButtonProps extends CommonCheckableInputProps, MarginProps {
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
  /** When true, sets the component in line (for RadioButtonGroup) */
  inline?: boolean;
  /** Text alignment of the label */
  labelAlign?: OptionsHelper.AlignBinaryType;
  /**
   * Set the size of the radio button to 'small' (16x16 - default) or 'large' (24x24).
   */
  size?: OptionsHelper.SizesType;
  /** the value of the Radio Button, passed on form submit */
  value: string;
}

declare function RadioButton(props: RadioButtonProps): JSX.Element;

export { RadioButton as PrivateRadioButton };
export default RadioButton;
