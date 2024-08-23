import React, { useCallback, useContext } from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import { CommonCheckableInputProps } from "../../__internal__/checkable-input";
import RadioButtonStyle from "./radio-button.style";
import CheckableInput from "../../__internal__/checkable-input/checkable-input.component";
import RadioButtonSvg from "./radio-button-svg.component";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";

interface InternalRadioButtonProps {
  inline?: boolean;
}

export interface RadioButtonProps
  extends Omit<CommonCheckableInputProps, "required" | "IsOptional">,
    MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Accepts a callback function which is triggered on click event */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** the value of the Radio Button, passed on form submit */
  value: string;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] Aria label for rendered help component */
  helpAriaLabel?: string;
}

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
      labelSpacing = 1,
      labelWidth,
      name,
      onChange,
      onBlur,
      onFocus,
      value,
      reverse = false,
      size,
      error,
      warning,
      info,
      tooltipPosition,
      "data-component": dataComponent = "radio-button",
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      ...props
    }: RadioButtonProps & InternalRadioButtonProps,
    ref
  ) => {
    const { validationRedesignOptIn } = useContext(NewValidationContext);

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

    const validationProps = {
      error,
      warning,
      info,
    };

    const commonProps = {
      fieldHelpInline,
      labelHelp,
      fieldHelp,
    };

    const inputProps = {
      ...(!validationRedesignOptIn && { ...commonProps }),
      autoFocus,
      checked,
      name,
      onChange: handleChange,
      onBlur,
      onFocus,
      labelInline: true,
      labelWidth,
      labelSpacing,
      label,
      disabled,
      inputWidth,
      id,
      value,
      type: "radio",
      /**
       * Invert the reverse prop, to ensure the FormField component renders the components
       * in the desired order (other elements which use FormField render their sub-components the
       * opposite way around by default)
       */
      reverse: !reverse,
      ref,
      ...props,
    };

    invariant(
      !props.children,
      "This component is meant to be used as a self-closing tag. " +
        "You should probably use the label prop instead."
    );

    const componentToRender = (
      <RadioButtonStyle
        applyNewValidation={validationRedesignOptIn}
        data-component={dataComponent}
        data-role={dataRole}
        data-element={dataElement}
        inline={inline}
        reverse={reverse}
        size={size}
        disabled={disabled}
        inputWidth={inputWidth}
        labelSpacing={labelSpacing}
        fieldHelpInline={fieldHelpInline}
        {...validationProps}
        {...marginProps}
      >
        <CheckableInput {...inputProps} {...validationProps}>
          <RadioButtonSvg />
        </CheckableInput>
      </RadioButtonStyle>
    );

    return (
      <>
        {validationRedesignOptIn ? (
          componentToRender
        ) : (
          <TooltipProvider
            helpAriaLabel={helpAriaLabel}
            tooltipPosition={tooltipPosition}
          >
            {componentToRender}
          </TooltipProvider>
        )}
      </>
    );
  }
);

RadioButton.displayName = "RadioButton";

export default React.memo(RadioButton);
