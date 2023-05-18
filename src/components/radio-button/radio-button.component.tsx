import React, { useCallback } from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import { CommonCheckableInputProps } from "../../__internal__/checkable-input";
import RadioButtonStyle from "./radio-button.style";
import CheckableInput from "../../__internal__/checkable-input/checkable-input.component";
import RadioButtonSvg from "./radio-button-svg.component";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";

interface InternalRadioButtonProps {
  inline?: boolean;
  required?: boolean;
}

export interface RadioButtonProps
  extends CommonCheckableInputProps,
    MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** Accepts a callback function which is triggered on click event */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** the value of the Radio Button, passed on form submit */
  value: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
  /** A callback to retrieve the input reference (deprecated) */
  inputRef?: React.Ref<HTMLInputElement>;
}

let deprecateInputRefWarnTriggered = false;

export const RadioButton = React.forwardRef<
  HTMLInputElement,
  RadioButtonProps & InternalRadioButtonProps
>(
  (
    {
      autoFocus,
      checked,
      disabled,
      fieldHelp,
      fieldHelpInline,
      id,
      inline,
      inputWidth,
      label,
      labelHelp,
      labelAlign,
      labelSpacing = 1,
      labelWidth,
      name,
      onChange,
      onBlur,
      onFocus,
      value,
      reverse = false,
      required,
      size,
      error,
      warning,
      info,
      tooltipPosition,
      "data-component": dataComponent = "radio-button",
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      inputRef,
      ...props
    }: RadioButtonProps & InternalRadioButtonProps,
    ref
  ) => {
    const marginProps = filterStyledSystemMarginProps(props);
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        /* istanbul ignore else */
        if (onChange) {
          onChange(event);
        }

        // trigger focus, as Safari doesn't focus radioButtons on click by default
        event.target.focus();
      },
      [onChange]
    );

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `RadioButton` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const commonProps = {
      disabled,
      fieldHelpInline,
      inputWidth,
      labelSpacing,
      error,
      warning,
      info,
    };

    const inputProps = {
      ...commonProps,
      autoFocus,
      checked,
      fieldHelp,
      name,
      onChange: handleChange,
      onBlur,
      onFocus,
      labelAlign,
      labelInline: true,
      labelWidth,
      label,
      labelHelp,
      id,
      value,
      type: "radio",
      /**
       * Invert the reverse prop, to ensure the FormField component renders the components
       * in the desired order (other elements which use FormField render their sub-components the
       * opposite way around by default)
       */
      reverse: !reverse,
      required,
      ref: ref || inputRef,
      ...props,
    };

    invariant(
      !props.children,
      "This component is meant to be used as a self-closing tag. " +
        "You should probably use the label prop instead."
    );

    return (
      <TooltipProvider
        helpAriaLabel={helpAriaLabel}
        tooltipPosition={tooltipPosition}
      >
        <RadioButtonStyle
          data-component={dataComponent}
          data-role={dataRole}
          data-element={dataElement}
          inline={inline}
          reverse={reverse}
          size={size}
          {...commonProps}
          {...marginProps}
        >
          <CheckableInput {...inputProps}>
            <RadioButtonSvg />
          </CheckableInput>
        </RadioButtonStyle>
      </TooltipProvider>
    );
  }
);

RadioButton.displayName = "RadioButton";

export default React.memo(RadioButton);
