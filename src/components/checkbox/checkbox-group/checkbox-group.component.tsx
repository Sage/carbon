import React, { useContext, useRef } from "react";
import { MarginProps } from "styled-system";
import StyledCheckboxGroup from "./checkbox-group.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../../__internal__/fieldset";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { TooltipProvider } from "../../../__internal__/tooltip-provider";
import { ValidationProps } from "../../../__internal__/validations";
import NewValidationContext from "../../carbon-provider/__internal__/new-validation.context";
import ValidationMessage from "../../../__internal__/validation-message/validation-message.component";
import Box from "../../box";
import ErrorBorder from "../../textbox/textbox.style";
import CheckboxGroupContext from "./__internal__/checkbox-group.context";
import guid from "../../../__internal__/utils/helpers/guid";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility";
import HintText from "../../../__internal__/hint-text";

export interface CheckboxGroupProps
  extends ValidationProps,
    MarginProps,
    TagProps {
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** The content for the CheckboxGroup Legend */
  legend?: string;
  /**
   * The content for the CheckboxGroup hint text,
   * will only be rendered when `validationRedesignOptIn` is true.
   */
  legendHelp?: string;
  /** [Legacy] When true, legend is placed inline with the checkboxes */
  legendInline?: boolean;
  /** [Legacy] Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** [Legacy] Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** [Legacy] Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** The Checkboxes to be rendered in the group */
  children: React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** [Legacy] Overrides the default tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** When true, Checkboxes are inline */
  inline?: boolean;
  /** Render the ValidationMessage above the Checkbox inputs when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
}

export const CheckboxGroup = ({
  children,
  legend,
  error,
  warning,
  info,
  required,
  legendInline,
  legendWidth,
  legendAlign = "left",
  legendSpacing,
  legendHelp,
  tooltipPosition,
  inline,
  id,
  validationMessagePositionTop = true,
  ...rest
}: CheckboxGroupProps) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;
  const inputHintId = legendHelp ? `${uniqueId}-hint` : undefined;

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
          id={uniqueId}
          legend={legend}
          legendAlign={legendAlign}
          error={error}
          warning={warning}
          isRequired={required}
          width="fit-content"
          {...(combinedAriaDescribedBy && {
            "aria-describedby": combinedAriaDescribedBy,
          })}
          {...tagComponent("checkboxgroup", rest)}
          blockGroupBehaviour={!(error || warning)}
          {...filterStyledSystemMarginProps(rest)}
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
                  <ErrorBorder warning={!!(!error && warning)} />
                )}
              </>
            )}
            <StyledCheckboxGroup
              data-component="checkbox-group"
              data-role="checkbox-group"
              inline={inline}
            >
              <CheckboxGroupContext.Provider
                value={{
                  error: !!error,
                  warning: !!warning,
                }}
              >
                {children}
              </CheckboxGroupContext.Provider>
            </StyledCheckboxGroup>
            {!validationMessagePositionTop && (
              <>
                <ValidationMessage
                  error={error}
                  warning={warning}
                  validationId={validationId}
                  validationMessagePositionTop={validationMessagePositionTop}
                />
                {(error || warning) && (
                  <ErrorBorder warning={!!(!error && warning)} />
                )}
              </>
            )}
          </Box>
        </Fieldset>
      ) : (
        <TooltipProvider tooltipPosition={tooltipPosition}>
          <Fieldset
            id={uniqueId}
            legend={legend}
            inline={legendInline}
            legendWidth={legendWidth}
            legendAlign={legendAlign}
            legendSpacing={legendSpacing}
            error={error}
            warning={warning}
            info={info}
            isRequired={required}
            aria-describedby={ariaDescribedBy}
            validationId={validationId}
            {...tagComponent("checkboxgroup", rest)}
            blockGroupBehaviour={!(error || warning || info)}
            {...filterStyledSystemMarginProps(rest)}
          >
            <StyledCheckboxGroup
              data-component="checkbox-group"
              data-role="checkbox-group"
              legendInline={legendInline}
            >
              <CheckboxGroupContext.Provider
                value={{
                  error: !!error,
                  warning: !!warning,
                  info: !!info,
                }}
              >
                {children}
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
