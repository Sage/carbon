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
import CheckboxGroupContext from "./__internal__/checkbox-group.context";
import guid from "../../../__internal__/utils/helpers/guid";
import Logger from "../../../__internal__/utils/logger";

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
   * @deprecated The content for the CheckboxGroup hint text,
   * will only be rendered when `validationRedesignOptIn` is true.
   */
  legendHelp?: string;
  /** @deprecated When true, legend is placed inline with the checkboxes */
  legendInline?: boolean;
  /** @deprecated Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** @deprecated Text alignment of legend when inline */
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

let deprecateLegendHelpWarningTriggered = false;
let deprecateLegendInlineWarningTriggered = false;
let deprecateLegendWidthWarningTriggered = false;
let deprecateLegendAlignWarningTriggered = false;

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

  if (legendHelp && !deprecateLegendHelpWarningTriggered) {
    Logger.deprecate(
      "The `legendHelp` prop in `CheckboxGroup` is deprecated and will soon be removed.",
    );
    deprecateLegendHelpWarningTriggered = true;
  }

  if (legendInline && !deprecateLegendInlineWarningTriggered) {
    Logger.deprecate(
      "The `legendInline` prop in `CheckboxGroup` is deprecated and will soon be removed.",
    );
    deprecateLegendInlineWarningTriggered = true;
  }

  if (legendWidth && !deprecateLegendWidthWarningTriggered) {
    Logger.deprecate(
      "The `legendWidth` prop in `CheckboxGroup` is deprecated and will soon be removed.",
    );
    deprecateLegendWidthWarningTriggered = true;
  }

  if (legendAlign !== "left" && !deprecateLegendAlignWarningTriggered) {
    Logger.deprecate(
      "The `legendAlign` prop in `CheckboxGroup` is deprecated and will soon be removed.",
    );
    deprecateLegendAlignWarningTriggered = true;
  }

  return (
    <>
      {validationRedesignOptIn ? (
        <Fieldset
          applyNewValidation
          id={uniqueId}
          legend={legend}
          inputHint={legendHelp}
          legendAlign={legendAlign}
          error={error}
          warning={warning}
          isRequired={required}
          validationMessagePositionTop={validationMessagePositionTop}
          width="fit-content"
          {...tagComponent("checkboxgroup", rest)}
          {...filterStyledSystemMarginProps(rest)}
        >
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
