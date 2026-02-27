import React from "react";
import {
  RadioButtonGroupProps as NextProps,
  RadioButtonGroup as NextRadioButtonGroup,
} from "../___internal___/__next__/radio-button-group/radio-button-group.component";

export interface RadioButtonGroupProps extends NextProps {
  /**
   * Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set
   * @deprecated The adaptive legend behaviour is no longer supported on this component.
   */
  adaptiveLegendBreakpoint?: number;
  /**
   * Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set
   * @deprecated The adaptive spacing behaviour is no longer supported on this component.
   */
  adaptiveSpacingBreakpoint?: number;
  /**
   * Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8)
   * @deprecated Custom spacing for labels is no longer supported on this component.
   */
  labelSpacing?: 1 | 2;
  /**
   * The content for the RadioButtonGroup hint text,
   * will only be rendered when `validationRedesignOptIn` is true.
   * @deprecated The `legendHelp` prop is deprecated and will be removed in a future release. Please use the `legendHint` prop instead.
   */
  legendHelp?: string;
  /** Text alignment of legend when inline
   * @deprecated Inline legends are no longer supported on this component.
   */
  legendAlign?: "left" | "right";
  /**
   * When true, legend is placed in line with the RadioButtons
   * @deprecated Inline legends are no longer supported on this component.
   */
  legendInline?: boolean;
  /**
   * Spacing between legend and field for inline legend, number multiplied by base spacing unit (8)
   * @deprecated Custom spacing for legends is no longer supported on this component.
   */
  legendSpacing?: 1 | 2;
  /**
   * Percentage width of legend (only when legend is inline)
   * @deprecated Inline legends are no longer supported on this component.
   */
  legendWidth?: number;
  /**
   * Overrides the default tooltip position
   * @deprecated Tooltips are no longer supported on this component.
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * [Legacy] Indicate additional information.
   * @deprecated Information validation is no longer supported on this component.
   */
  info?: string | boolean;
}

export const RadioButtonGroup = ({
  children,
  legendHint,
  legendHelp,
  ...rest
}: RadioButtonGroupProps) => {
  return (
    <NextRadioButtonGroup legendHint={legendHint || legendHelp} {...rest}>
      {children}
    </NextRadioButtonGroup>
  );
};

RadioButtonGroup.displayName = "RadioButtonGroup";

export default RadioButtonGroup;
