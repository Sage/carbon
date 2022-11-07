import React from "react";
import { MarginProps } from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledCheckboxGroup from "./checkbox-group.style";
import Fieldset from "../../__internal__/fieldset";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import { ValidationProps } from "../../__internal__/validations";

export interface CheckboxGroupProps
  extends ValidationProps,
    Expand<MarginProps> {
  /** The content for the CheckboxGroup Legend */
  legend?: string;
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
}

export const CheckboxGroupContext = React.createContext<ValidationProps>({});

export const CheckboxGroup = (props: CheckboxGroupProps) => {
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
    tooltipPosition,
  } = props;

  return (
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
            {children}
          </CheckboxGroupContext.Provider>
        </StyledCheckboxGroup>
      </Fieldset>
    </TooltipProvider>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
