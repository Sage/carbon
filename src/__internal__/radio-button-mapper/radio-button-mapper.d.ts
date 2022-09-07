import React from "react";

export interface RadioButtonMapperProps {
  /** The RadioButton objects to be rendered in the group */
  children?: React.ReactNode;
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** Callback fired when each RadioButton is blurred */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback fired when the user selects a RadioButton */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback fired on key down */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Value of the selected RadioButton */
  value?: string;
}

declare function RadioButtonMapper(props?: RadioButtonMapperProps): JSX.Element;
RadioButtonMapper.displayName = "RadioButtonMapper";

export default RadioButtonMapper;
