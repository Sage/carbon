import React, { useCallback } from "react";
import RadioButtonSvg from "./___internal___/radio-button-svg.component";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import CheckableInput, {
  CommonCheckableInputProps,
} from "../../../__internal__/checkable-input/__next__/checkable-input.component";
import RadioButtonStyle from "./radio-button.style";
import { useRadioButtonGroupContext } from "./___internal___/radio-button-group.context";

export interface RadioButtonProps extends CommonCheckableInputProps, TagProps {
  /** Callback fired when the RadioButton is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** The value of the RadioButton. */
  value: string;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      autoFocus,
      disabled,
      id,
      label,
      inputHint,
      name,
      onChange,
      onBlur,
      value,
      conditionalContent,
      ...props
    }: RadioButtonProps,
    ref,
  ) => {
    const {
      error: contextError,
      inline,
      onBlur: contextOnBlur,
      onChange: contextOnChange,
      value: contextValue,
      name: contextName,
      size: contextSize,
      disabled: contextDisabled,
      required: contextRequired,
    } = useRadioButtonGroupContext();

    const isChecked = contextValue === value;

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event);
        }

        /* istanbul ignore else */
        if (contextOnChange) {
          contextOnChange(event);
        }
      },
      [onChange, contextOnChange],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
          onBlur(event);
        }

        if (contextOnBlur) {
          contextOnBlur(event);
        }
      },
      [onBlur, contextOnBlur],
    );

    return (
      <RadioButtonStyle
        size={contextSize}
        error={contextError}
        disabled={contextDisabled || disabled}
        {...tagComponent("radio-button", props)}
      >
        <CheckableInput
          type="radio"
          id={id}
          name={name || contextName}
          value={value}
          label={label}
          inputHint={inputHint}
          disabled={contextDisabled || disabled}
          required={contextRequired}
          checked={isChecked}
          ref={ref}
          onChange={handleChange}
          onBlur={handleBlur}
          size={contextSize}
          {...(!inline && { conditionalContent })}
          {...props}
        >
          <RadioButtonSvg />
        </CheckableInput>
      </RadioButtonStyle>
    );
  },
);

RadioButton.displayName = "RadioButton";

export default RadioButton;
