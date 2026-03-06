import React, { useCallback } from "react";
import RadioButtonSvg from "../radio-button-svg.component";
import tagComponent, {
  TagProps,
} from "../../../../__internal__/utils/helpers/tags";

import CheckableInput, {
  CommonCheckableInputProps,
} from "../../../../__internal__/checkable-input/__next__/checkable-input.component";
import RadioButtonStyle from "./radio-button.style";
import { useRadioButtonGroupContext } from "../radio-button-group.context";

export interface RadioButtonProps extends CommonCheckableInputProps, TagProps {
  /** Callback fired when the RadioButton is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** The value of the RadioButton. */
  value: string;
  /**
   * Size of the RadioButton.
   * @deprecated The `size` prop is deprecated and will be removed in a future release. Please set the size on the `RadioButtonGroup` component instead.
   */
  size?: "small" | "large";
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
      size,
      "data-element": dataElement,
      "data-role": dataRole,
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
        $size={size || contextSize}
        $error={contextError}
        $isDisabled={contextDisabled || disabled}
        {...tagComponent("radio-button", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
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
          size={size || contextSize}
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
