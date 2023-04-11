import React from "react";
import { MarginProps } from "styled-system";

import {
  StyledFieldset,
  StyledLegend,
  StyledLegendContent,
} from "./fieldset.style";
import ValidationIcon from "../validations/validation-icon.component";
import { InputGroupBehaviour, InputGroupContext } from "../input-behaviour";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";

export interface FieldsetProps extends MarginProps {
  /** Role */
  role?: string;
  /** Fieldset content */
  children: React.ReactNode;
  /** The content for the Fieldset Legend */
  legend?: string;
  /* Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error?: boolean | string;
  /* Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning?: boolean | string;
  /* Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info?: boolean | string;
  /** When true, legend is placed in line with the children */
  inline?: boolean;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** If true, an asterisk will be added to the label */
  isRequired?: boolean;
  /** Controls whether group behaviour should be enabled */
  blockGroupBehaviour?: boolean;
}

const Fieldset = ({
  legend,
  children,
  inline = false,
  legendWidth,
  legendAlign = "right",
  legendSpacing = 2,
  error,
  warning,
  info,
  isRequired,
  blockGroupBehaviour,
  ...rest
}: FieldsetProps) => {
  const marginProps = useFormSpacing(rest);

  return (
    <InputGroupBehaviour blockGroupBehaviour={blockGroupBehaviour}>
      <StyledFieldset data-component="fieldset" {...rest} {...marginProps}>
        {legend && (
          <InputGroupContext.Consumer>
            {({ onMouseEnter, onMouseLeave }) => (
              <StyledLegend
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                inline={inline}
                width={legendWidth}
                align={legendAlign}
                rightPadding={legendSpacing}
              >
                <StyledLegendContent isRequired={isRequired}>
                  {legend}
                  <ValidationIcon
                    error={error}
                    warning={warning}
                    info={info}
                    tooltipFlipOverrides={["top", "bottom"]}
                  />
                </StyledLegendContent>
              </StyledLegend>
            )}
          </InputGroupContext.Consumer>
        )}
        {children}
      </StyledFieldset>
    </InputGroupBehaviour>
  );
};

export default Fieldset;
