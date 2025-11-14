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
import NewValidationContext from "../../carbon-provider/__internal__/new-validation.context";
import guid from "../../../__internal__/utils/helpers/guid";

/**
 * @deprecated This version of `RadioButtonGroup` is deprecated. See the Carbon documentation for more details.
 */
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
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** value of the selected RadioButton */
  value: string;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Render the ValidationMessage above the RadioButton inputs when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
}

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
  tooltipPosition,
  validationMessagePositionTop = true,
  ...rest
}: RadioButtonGroupProps) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;

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

  return (
    <>
      {validationRedesignOptIn ? (
        <Fieldset
          applyNewValidation
          id={uniqueId}
          legend={legend}
          inputHint={legendHelp}
          legendAlign={legendAlign}
          isRequired={required}
          error={error}
          warning={warning}
          validationMessagePositionTop={validationMessagePositionTop}
          width="fit-content"
          {...tagComponent("radiogroup", rest)}
          {...marginProps}
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
                  ...child.props,
                });
              })}
            </RadioButtonMapper>
          </RadioButtonGroupStyle>
        </Fieldset>
      ) : (
        <TooltipProvider tooltipPosition={tooltipPosition}>
          <Fieldset
            id={uniqueId}
            legend={legend}
            error={error}
            warning={warning}
            info={info}
            inline={inlineLegend}
            legendWidth={legendWidth}
            legendAlign={legendAlign}
            legendSpacing={legendSpacing}
            isRequired={required}
            {...tagComponent("radiogroup", rest)}
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
