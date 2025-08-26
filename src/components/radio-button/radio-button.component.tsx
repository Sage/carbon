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
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

interface InternalRadioButtonProps {
  inline?: boolean;
}

export interface RadioButtonProps
  extends Omit<CommonCheckableInputProps, "required">,
    MarginProps,
    TagProps {
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
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      ...props
    }: RadioButtonProps & InternalRadioButtonProps,
    ref,
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
      [onChange],
    );

    const validationProps = {
      error,
      warning,
      info,
    };

    const commonProps = {
      ...validationProps,
      disabled,
      inputWidth,
      fieldHelpInline,
      labelSpacing,
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
      ref,
      ...props,
      "data-component": undefined,
    };

    invariant(
      !props.children,
      "This component is meant to be used as a self-closing tag. " +
        "You should probably use the label prop instead.",
    );

    const componentToRender = (
      <RadioButtonStyle
        applyNewValidation={validationRedesignOptIn}
        inline={inline}
        reverse={reverse}
        size={size}
        {...commonProps}
        {...marginProps}
        {...tagComponent("radio-button", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
      >
        <CheckableInput {...inputProps}>
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
  },
);

RadioButton.displayName = "RadioButton";

export default React.memo(RadioButton);
