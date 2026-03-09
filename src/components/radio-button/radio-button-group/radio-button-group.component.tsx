import React, { useRef } from "react";
import { MarginProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../../__internal__/fieldset/__next__/fieldset.component";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { RadioButtonGroupProvider } from "../___internal___/radio-button-group.context";
import StyledRadioButtonGroupContent from "./radio-button-group.style";
import guid from "../../../__internal__/utils/helpers/guid";

export interface RadioButtonGroupProps extends MarginProps, TagProps {
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** The RadioButton objects to be rendered within the group. */
  children: React.ReactNode;
  /** When true, RadioButton children are inline. */
  inline?: boolean;
  /** The content for the RadioButtonGroup legend. */
  legend?: string;
  /** Content for the hint text below the legend. */
  legendHint?: string;
  /** Alignment of the legend. */
  legendAlign?: "left" | "right";
  /** Specifies the name prop to be applied to each RadioButton in the group. */
  name: string;
  /** Value of the selected RadioButton child. */
  value: string;
  /** Callback fired when a RadioButton child is blurred. */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback fired when a RadioButton child is selected. */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Flag to disable the RadioButtonGroup. */
  disabled?: boolean;
  /** Flag to configure RadioButtonGroup as mandatory. */
  required?: boolean;
  /** Size of the RadioButtonGroup. */
  size?: "small" | "medium" | "large";
  /** Error message to be displayed when validation fails. */
  error?: string;
  /**
   * Warning message to be displayed when validation warning occurs.
   * @deprecated The `warning` state is deprecated and will be removed in a future release.
   */
  warning?: string;
  /**
   * Render the ValidationMessage above the RadioButtonGroup
   * @deprecated The `validationMessagePositionTop` prop is deprecated and will be removed in a future release.
   */
  validationMessagePositionTop?: boolean;
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
  id,
  name,
  legend,
  legendHint,
  legendAlign,
  error,
  onBlur,
  onChange,
  value,
  inline = false,
  required,
  validationMessagePositionTop = true,
  size = "medium",
  disabled,
  adaptiveLegendBreakpoint,
  adaptiveSpacingBreakpoint,
  labelSpacing,
  legendHelp,
  legendInline,
  legendSpacing,
  legendWidth,
  tooltipPosition,
  warning,
  info,
  ...rest
}: RadioButtonGroupProps) => {
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;

  return (
    <Fieldset
      id={uniqueId}
      legend={legend}
      legendHint={legendHint || legendHelp}
      legendAlign={legendAlign}
      isDisabled={disabled}
      isRequired={required}
      error={error}
      warning={warning}
      validationMessagePositionTop={validationMessagePositionTop}
      size={size}
      {...tagComponent("radio-button-group", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      <RadioButtonGroupProvider
        value={{
          error: !!error,
          warning: !!warning,
          inline,
          onBlur,
          onChange,
          value,
          name,
          size,
          required,
          disabled,
        }}
      >
        <StyledRadioButtonGroupContent
          data-role="radio-button-group-content"
          $inline={inline}
          $size={size}
        >
          {children}
        </StyledRadioButtonGroupContent>
      </RadioButtonGroupProvider>
    </Fieldset>
  );
};

RadioButtonGroup.displayName = "RadioButtonGroup";

export default RadioButtonGroup;
