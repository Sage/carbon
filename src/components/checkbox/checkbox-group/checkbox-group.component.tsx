import React, { useContext } from "react";
import { MarginProps } from "styled-system";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import StyledCheckboxGroup, { StyledHintText } from "./checkbox-group.style";
import Fieldset from "../../../__internal__/fieldset";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { TooltipProvider } from "../../../__internal__/tooltip-provider";
import { ValidationProps } from "../../../__internal__/validations";
import FormSpacingProvider from "../../../__internal__/form-spacing-provider";
import { NewValidationContext } from "../../carbon-provider/carbon-provider.component";
import ValidationMessage from "../../../__internal__/validation-message/validation-message.component";
import Box from "../../box";
import { ErrorBorder } from "../../textbox/textbox.style";

export interface CheckboxGroupProps extends ValidationProps, MarginProps {
  /** The content for the CheckboxGroup Legend */
  legend?: string;
  /** The content for the CheckboxGroup Legend Help text  */
  legendHelp?: string;
  /** When true, legend is placed inline with the checkboxes */
  legendInline?: boolean;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** The Checkboxes to be rendered in the group */
  children: React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Overrides the default tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** When true, Checkboxes are in line */
  inline?: boolean;
}

export const CheckboxGroupContext = React.createContext<ValidationProps>({});

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);

  const {
    children,
    legend,
    error,
    warning,
    info,
    required,
    legendInline,
    legendWidth,
    legendAlign,
    legendSpacing,
    legendHelp,
    tooltipPosition,
    inline,
  } = props;

  return (
    <>
      {validationRedesignOptIn ? (
        <Fieldset
          legend={legend}
          inline={legendInline}
          legendWidth={legendWidth}
          legendAlign={legendAlign}
          legendSpacing={legendSpacing}
          error={error}
          warning={warning}
          info={info}
          isRequired={required}
          {...tagComponent("checkboxgroup", props)}
          blockGroupBehaviour={!(error || warning)}
          {...filterStyledSystemMarginProps(props)}
        >
          {legendHelp && <StyledHintText>{legendHelp}</StyledHintText>}
          <Box position="relative">
            <ValidationMessage error={error} warning={warning} />
            {(error || warning) && (
              <ErrorBorder warning={!!(!error && warning)} inline={inline} />
            )}
            <StyledCheckboxGroup
              data-component="checkbox-group"
              legendInline={legendInline}
              inline={inline}
            >
              <CheckboxGroupContext.Provider
                value={{
                  error: !!error,
                  warning: !!warning,
                }}
              >
                <FormSpacingProvider marginBottom={undefined}>
                  {children}
                </FormSpacingProvider>
              </CheckboxGroupContext.Provider>
            </StyledCheckboxGroup>
          </Box>
        </Fieldset>
      ) : (
        <TooltipProvider tooltipPosition={tooltipPosition}>
          <Fieldset
            legend={legend}
            inline={legendInline}
            legendWidth={legendWidth}
            legendAlign={legendAlign}
            legendSpacing={legendSpacing}
            error={error}
            warning={warning}
            info={info}
            isRequired={required}
            {...tagComponent("checkboxgroup", props)}
            blockGroupBehaviour={!(error || warning || info)}
            {...filterStyledSystemMarginProps(props)}
          >
            <StyledCheckboxGroup
              data-component="checkbox-group"
              legendInline={legendInline}
            >
              <CheckboxGroupContext.Provider
                value={{
                  error: !!error,
                  warning: !!warning,
                  info: !!info,
                }}
              >
                <FormSpacingProvider marginBottom={undefined}>
                  {children}
                </FormSpacingProvider>
              </CheckboxGroupContext.Provider>
            </StyledCheckboxGroup>
          </Fieldset>
        </TooltipProvider>
      )}
    </>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
