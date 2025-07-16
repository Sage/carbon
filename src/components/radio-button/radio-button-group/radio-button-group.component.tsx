import React, { useContext, useRef } from "react";
import { MarginProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../../__internal__/fieldset";
import RadioButtonGroupStyle from "../radio-button-group/radio-button-group.style";
import RadioButtonMapper from "../../../__internal__/radio-button-mapper/radio-button-mapper.component";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { TooltipProvider } from "../../../__internal__/tooltip-provider";
import { ValidationProps } from "../../../__internal__/validations";
import Logger from "../../../__internal__/utils/logger";
import NewValidationContext from "../../carbon-provider/__internal__/new-validation.context";
import ValidationMessage from "../../../__internal__/validation-message/validation-message.component";
import Box from "../../box";
import guid from "../../../__internal__/utils/helpers/guid";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility";
import ErrorBorder from "../../textbox/textbox.style";
import HintText from "../../../__internal__/hint-text";

let deprecateUncontrolledWarnTriggered = false;

export interface RadioButtonGroupProps
  extends ValidationProps,
    MarginProps,
    TagProps {
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLegendBreakpoint?: number;
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** The RadioButton objects to be rendered in the group */
  children: React.ReactNode;
  /** When true, RadioButtons children are in line */
  inline?: boolean;
  /** Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** The content for the RadioButtonGroup Legend */
  legend?: string;
  /**
   * The content for the RadioButtonGroup hint text,
   * will only be rendered when `validationRedesignOptIn` is true.
   */
  legendHelp?: string;
  /** [Legacy] Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** [Legacy] When true, legend is placed in line with the RadioButtons */
  legendInline?: boolean;
  /** [Legacy] Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** [Legacy] Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** Callback fired when each RadioButton is blurred */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback fired when the user selects a RadioButton */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /**
   * [Legacy] Flag to configure component as optional.
   * @deprecated If the value of this component is not required, use the `required` prop and set it to false instead.
   */
  isOptional?: boolean;
  /** value of the selected RadioButton */
  value?: string;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Render the ValidationMessage above the RadioButton inputs when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
}

let deprecateOptionalWarnTriggered = false;

export const RadioButtonGroup = ({
  children,
  id,
  name,
  legend,
  legendHelp,
  error,
  warning,
  info,
  onBlur,
  onChange,
  value,
  inline = false,
  legendInline = false,
  legendWidth,
  legendAlign = "left",
  legendSpacing,
  labelSpacing = 1,
  adaptiveLegendBreakpoint,
  adaptiveSpacingBreakpoint,
  required,
  isOptional,
  tooltipPosition,
  validationMessagePositionTop = true,
  ...rest
}: RadioButtonGroupProps) => {
  if (!deprecateOptionalWarnTriggered && isOptional) {
    deprecateOptionalWarnTriggered = true;
    Logger.deprecate(
      "`isOptional` is deprecated in RadioButtonGroup and support will soon be removed. If the value of this component is not required, use the `required` prop and set it to false instead.",
    );
  }
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;
  const inputHintId = legendHelp ? `${uniqueId}-hint` : undefined;

  if (!deprecateUncontrolledWarnTriggered && !onChange) {
    deprecateUncontrolledWarnTriggered = true;
    Logger.deprecate(
      "Uncontrolled behaviour in `Radio Button` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
    );
  }

  const marginProps = filterStyledSystemMarginProps(rest);

  const isAboveLegendBreakpoint = useIsAboveBreakpoint(
    adaptiveLegendBreakpoint,
  );

  const isAboveSpacingBreakpoint = useIsAboveBreakpoint(
    adaptiveSpacingBreakpoint,
  );

  let inlineLegend = legendInline;
  if (adaptiveLegendBreakpoint) {
    inlineLegend = !!isAboveLegendBreakpoint;
  }

  let marginLeft = marginProps.ml;
  if (adaptiveSpacingBreakpoint && !isAboveSpacingBreakpoint) {
    marginLeft = undefined;
  }

  const { validationId, ariaDescribedBy } = useInputAccessibility({
    id: uniqueId,
    validationRedesignOptIn: true,
    error,
    warning,
    info,
  });

  const describedByArray =
    validationRedesignOptIn && validationMessagePositionTop
      ? [ariaDescribedBy, inputHintId]
      : [inputHintId, ariaDescribedBy];

  const combinedAriaDescribedBy = describedByArray.filter(Boolean).join(" ");

  return (
    <>
      {validationRedesignOptIn ? (
        <Fieldset
          legend={legend}
          error={error}
          warning={warning}
          legendAlign={legendAlign}
          isRequired={required}
          isOptional={isOptional}
          width="fit-content"
          {...tagComponent("radiogroup", rest)}
          {...marginProps}
          ml={marginLeft}
          blockGroupBehaviour={!(error || warning)}
          {...(combinedAriaDescribedBy && {
            "aria-describedby": combinedAriaDescribedBy,
          })}
        >
          {legendHelp && (
            <HintText align={legendAlign} id={inputHintId} marginTop="-4px">
              {legendHelp}
            </HintText>
          )}
          <Box position="relative">
            {validationMessagePositionTop && (
              <>
                <ValidationMessage
                  error={error}
                  warning={warning}
                  validationId={validationId}
                  validationMessagePositionTop={validationMessagePositionTop}
                />
                {(error || warning) && (
                  <ErrorBorder
                    data-role="radio-error-border"
                    warning={!!(!error && warning)}
                  />
                )}
              </>
            )}
            <RadioButtonGroupStyle
              data-component="radio-button-group"
              role="radiogroup"
              inline={inline}
              legendInline={inlineLegend}
            >
              <RadioButtonMapper
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              >
                {React.Children.map(children, (child) => {
                  if (!React.isValidElement(child)) {
                    return child;
                  }

                  return React.cloneElement(child, {
                    inline,
                    labelSpacing,
                    error: !!error,
                    warning: !!warning,
                    ...child.props,
                  });
                })}
              </RadioButtonMapper>
            </RadioButtonGroupStyle>
            {!validationMessagePositionTop && (
              <>
                <ValidationMessage
                  error={error}
                  warning={warning}
                  validationId={validationId}
                  validationMessagePositionTop={validationMessagePositionTop}
                />
                {(error || warning) && (
                  <ErrorBorder
                    data-role="radio-error-border"
                    warning={!!(!error && warning)}
                  />
                )}
              </>
            )}
          </Box>
        </Fieldset>
      ) : (
        <TooltipProvider tooltipPosition={tooltipPosition}>
          <Fieldset
            legend={legend}
            error={error}
            warning={warning}
            info={info}
            inline={inlineLegend}
            legendWidth={legendWidth}
            legendAlign={legendAlign}
            legendSpacing={legendSpacing}
            isRequired={required}
            isOptional={isOptional}
            {...tagComponent("radiogroup", rest)}
            {...marginProps}
            ml={marginLeft}
            blockGroupBehaviour={!(error || warning || info)}
            aria-describedby={ariaDescribedBy}
            validationId={validationId}
          >
            <RadioButtonGroupStyle
              data-component="radio-button-group"
              role="radiogroup"
              inline={inline}
              legendInline={inlineLegend}
            >
              <RadioButtonMapper
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              >
                {React.Children.map(children, (child) => {
                  if (!React.isValidElement(child)) {
                    return child;
                  }

                  return React.cloneElement(child, {
                    inline,
                    labelSpacing,
                    error: !!error,
                    warning: !!warning,
                    info: !!info,
                    ...child.props,
                  });
                })}
              </RadioButtonMapper>
            </RadioButtonGroupStyle>
          </Fieldset>
        </TooltipProvider>
      )}
    </>
  );
};

RadioButtonGroup.displayName = "RadioButtonGroup";

export default RadioButtonGroup;
