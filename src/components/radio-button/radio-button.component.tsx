import React, { useCallback } from "react";
import RadioButtonSvg from "./___internal___/radio-button-svg.component";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input/__next__/checkable-input.component";
import RadioButtonStyle from "./radio-button.style";
import { useRadioButtonGroupContext } from "./___internal___/radio-button-group.context";

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
  /**
   * Overrides the default tooltip position
   * @deprecated Tooltips are no longer supported on this component.
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * Aria label for rendered help component
   * @deprecated Help tooltips are no longer supported on this component.
   */
  helpAriaLabel?: string;
  /**
   * Indicate that an error has occurred.
   * @deprecated Error validation is no longer supported on this component. Please pass validation messages to the `RadioButtonGroup` component instead.
   */
  error?: string | boolean;
  /**
   * [Legacy] Indicate additional information.
   * @deprecated Information validation is no longer supported on this component.
   */
  info?: string | boolean;
  /**
   * Indicate that warning has occurred.
   * @deprecated Warning validation is no longer supported on this component. Please pass validation messages to the `RadioButtonGroup` component instead.
   */
  warning?: string | boolean;
  /**
   * If true the label switches position with the input
   * @deprecated Reversed layout is no longer supported on this component.
   */
  reverse?: boolean;
  /**
   * Id of the validation icon
   * @deprecated Validation icons with tooltips are no longer supported on this component.
   */
  validationIconId?: string;
  /**
   * Help content to be displayed under an input
   * @deprecated The `fieldHelp` prop is deprecated and will be removed in a future release. Please use the `inputHint` prop instead.
   */
  fieldHelp?: React.ReactNode;
  /**
   * Sets percentage-based input width
   * @deprecated Custom input widths are no longer supported on this component.
   */
  inputWidth?: React.ReactNode;
  /**
   * The content for the help tooltip, to appear next to the Label
   * @deprecated The `labelHelp` prop is deprecated and will be removed in a future release. Please use the `inputHint` prop instead.
   */
  labelHelp?: React.ReactNode;
  /**
   * Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8)
   * @deprecated Custom spacing for labels is no longer supported on this component.
   */
  labelSpacing?: 1 | 2;
  /**
   * Label width
   * @deprecated Custom label widths are no longer supported on this component.
   */
  labelWidth?: number;
  /**
   * When true, displays validation icon on label
   * @deprecated Validation icons with tooltips are no longer supported on this component.
   */
  validationOnLabel?: boolean;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   * @deprecated The `fieldHelpInline` prop is no longer supported on this component.
   */
  fieldHelpInline?: boolean;
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
      progressiveDisclosure,
      size,
      "data-element": dataElement,
      "data-role": dataRole,
      tooltipPosition,
      helpAriaLabel,
      error,
      info,
      warning,
      reverse,
      validationIconId,
      fieldHelp,
      inputWidth,
      labelHelp,
      labelSpacing,
      labelWidth,
      validationOnLabel,
      fieldHelpInline,
      ...props
    }: RadioButtonProps,
    ref,
  ) => {
    const {
      error: contextError,
      warning: contextWarning,
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
        onChange?.(event);
        contextOnChange?.(event);
      },
      [onChange, contextOnChange],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
        contextOnBlur?.(event);
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
          inputHint={inputHint || labelHelp || fieldHelp}
          disabled={contextDisabled || disabled}
          required={contextRequired}
          checked={isChecked}
          ref={ref}
          autoFocus={autoFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          size={size || contextSize}
          error={contextError}
          warning={contextWarning}
          {...(!inline && { progressiveDisclosure })}
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
