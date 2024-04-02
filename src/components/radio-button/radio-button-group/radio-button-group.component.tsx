import React, { useContext } from "react";
import { MarginProps } from "styled-system";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../../__internal__/fieldset";
import RadioButtonGroupStyle, {
  StyledHintText,
} from "../radio-button-group/radio-button-group.style";
import RadioButtonMapper from "../../../__internal__/radio-button-mapper/radio-button-mapper.component";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { TooltipProvider } from "../../../__internal__/tooltip-provider";
import { ValidationProps } from "../../../__internal__/validations";
import Logger from "../../../__internal__/utils/logger";
import { NewValidationContext } from "../../carbon-provider/carbon-provider.component";
import ValidationMessage from "../../../__internal__/validation-message/validation-message.component";
import Box from "../../box";
import { ErrorBorder } from "../../textbox/textbox.style";

let deprecateUncontrolledWarnTriggered = false;
export interface RadioButtonGroupProps extends ValidationProps, MarginProps {
  /** Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLegendBreakpoint?: number;
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** The RadioButton objects to be rendered in the group */
  children: React.ReactNode;
  /** When true, RadioButtons are in line */
  inline?: boolean;
  /** Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** The content for the RadioGroup Legend */
  legend?: string;
  /** The content for the hint text of the RadioGroup Legend */
  legendHelp?: string;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** When true, legend is placed in line with the radiobuttons */
  legendInline?: boolean;
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** Callback fired when each RadioButton is blurred */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback fired when the user selects a RadioButton */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** value of the selected RadioButton */
  value?: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

export const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const {
    children,
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
    legendAlign,
    legendSpacing,
    labelSpacing = 1,
    adaptiveLegendBreakpoint,
    adaptiveSpacingBreakpoint,
    required,
    tooltipPosition,
  } = props;

  const { validationRedesignOptIn } = useContext(NewValidationContext);

  if (!deprecateUncontrolledWarnTriggered && !onChange) {
    deprecateUncontrolledWarnTriggered = true;
    Logger.deprecate(
      "Uncontrolled behaviour in `Radio Button` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  }

  const marginProps = filterStyledSystemMarginProps(props);

  const isAboveLegendBreakpoint = useIsAboveBreakpoint(
    adaptiveLegendBreakpoint
  );

  const isAboveSpacingBreakpoint = useIsAboveBreakpoint(
    adaptiveSpacingBreakpoint
  );

  let inlineLegend = legendInline;
  if (adaptiveLegendBreakpoint) {
    inlineLegend = !!isAboveLegendBreakpoint;
  }

  let marginLeft = marginProps.ml;
  if (adaptiveSpacingBreakpoint && !isAboveSpacingBreakpoint) {
    marginLeft = undefined;
  }

  return (
    <>
      {validationRedesignOptIn ? (
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
          {...tagComponent("radiogroup", props)}
          {...marginProps}
          ml={marginLeft}
          blockGroupBehaviour={!(error || warning)}
        >
          {legendHelp && <StyledHintText>{legendHelp}</StyledHintText>}
          <Box position="relative">
            <ValidationMessage error={error} warning={warning} />
            {(error || warning) && (
              <ErrorBorder inline={inline} warning={!!(!error && warning)} />
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
                    info: !!info,
                    required,
                    ...child.props,
                  });
                })}
              </RadioButtonMapper>
            </RadioButtonGroupStyle>
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
            {...tagComponent("radiogroup", props)}
            {...marginProps}
            ml={marginLeft}
            blockGroupBehaviour={!(error || warning || info)}
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
                    required,
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
