import React, { useContext } from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import CheckboxStyle from "./checkbox.style";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input/checkable-input.component";
import CheckboxSvg from "./checkbox-svg.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import CheckboxGroupContext from "./checkbox-group/__internal__/checkbox-group.context";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Logger from "../../__internal__/utils/logger";

export interface CheckboxProps
  extends CommonCheckableInputProps,
    MarginProps,
    TagProps {
  /** @deprecated Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** Prop to specify the aria-labelledby property of the input */
  "aria-labelledby"?: string;
  /** [Legacy] Aria label for rendered help component */
  helpAriaLabel?: string;
  /** When true label is inline */
  labelInline?: boolean;
  /** Accepts a callback function which is triggered on click event */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** The value of the checkbox, passed on form submit */
  value?: string;
  /** Handler for change events */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checked state of the input */
  checked: boolean;
}

let deprecateFieldHelpWarningTriggered = false;
let deprecateAdaptiveSpacingBreakpointWarningTriggered = false;

export const Checkbox = React.forwardRef(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      id,
      label,
      onChange,
      name,
      /* FIXME: FE-4102 */
      onClick,
      onBlur,
      onFocus,
      value,
      fieldHelp,
      autoFocus,
      labelHelp,
      labelSpacing = 1,
      labelWidth,
      adaptiveSpacingBreakpoint,
      required,
      error,
      warning,
      info,
      fieldHelpInline,
      reverse = false,
      checked,
      disabled,
      inputWidth,
      size,
      tooltipPosition,
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      ...rest
    }: CheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    if (fieldHelp !== undefined && !deprecateFieldHelpWarningTriggered) {
      Logger.deprecate(
        "The `fieldHelp` prop of the `Checkbox` component is deprecated and will soon be removed.",
      );
      deprecateFieldHelpWarningTriggered = true;
    }

    if (
      adaptiveSpacingBreakpoint &&
      !deprecateAdaptiveSpacingBreakpointWarningTriggered
    ) {
      Logger.deprecate(
        "The `adaptiveSpacingBreakpoint` prop of the `Checkbox` component is deprecated and will soon be removed.",
      );
      deprecateAdaptiveSpacingBreakpointWarningTriggered = true;
    }

    const { validationRedesignOptIn } = useContext(NewValidationContext);

    const largeScreen = useIsAboveBreakpoint(adaptiveSpacingBreakpoint);
    const adaptiveSpacingSmallScreen = !!(
      adaptiveSpacingBreakpoint && !largeScreen
    );
    const checkboxGroupContext = useContext(CheckboxGroupContext);
    const {
      error: contextError,
      warning: contextWarning,
      info: contextInfo,
    } = checkboxGroupContext;

    const inputProps = {
      ariaLabelledBy,
      onClick,
      onChange,
      onBlur,
      onFocus,
      labelInline: true,
      id,
      label,
      value,
      type: "checkbox",
      name,
      reverse: !reverse,
      fieldHelp,
      autoFocus,
      labelHelp,
      labelSpacing,
      required,
      fieldHelpInline,
      checked,
      disabled,
      inputWidth,
      labelWidth,
      ref,
      ...rest,
      "data-component": undefined,
    };

    const validationProps = {
      error: contextError || error,
      warning: contextWarning || warning,
      ...(validationRedesignOptIn
        ? { validationOnLabel: false }
        : { info: contextInfo || info }),
    };

    const marginProps = filterStyledSystemMarginProps(rest);

    const componentToRender = (
      <CheckboxStyle
        disabled={disabled}
        labelSpacing={labelSpacing}
        inputWidth={inputWidth}
        adaptiveSpacingSmallScreen={adaptiveSpacingSmallScreen}
        {...validationProps}
        fieldHelpInline={fieldHelpInline}
        reverse={reverse}
        size={size}
        applyNewValidation={validationRedesignOptIn}
        {...marginProps}
        {...tagComponent("checkbox", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
      >
        <CheckableInput {...inputProps} {...validationProps}>
          <CheckboxSvg />
        </CheckableInput>
      </CheckboxStyle>
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

Checkbox.displayName = "Checkbox";

export default Checkbox;
