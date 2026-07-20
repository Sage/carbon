import React, { useRef } from "react";
import { MarginProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../../__internal__/fieldset/__next__/fieldset.component";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import CheckboxGroupContext from "../__internal__/checkbox-group.context";
import StyledCheckboxGroupContent from "./checkbox-group.style";
import guid from "../../../__internal__/utils/helpers/guid";

export type CheckboxSizes = "small" | "medium" | "large";
export interface CheckboxGroupProps extends MarginProps, TagProps {
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** The content for the CheckboxGroup Legend */
  legend?: string;
  /** Content for the hint text below the legend. */
  legendHint?: string;
  /** Size of the CheckboxGroup. */
  size?: CheckboxSizes;
  /** Error message to be displayed when validation fails. */
  error?: string;
  /**
   * Warning message to be displayed when validation warning occurs.
   * @deprecated The `warning` state is deprecated and will be removed in a future release.
   */
  warning?: string;
  /**
   * [Legacy] Indicate additional information.
   * @deprecated Information validation is no longer supported on this component.
   */
  info?: string | boolean;
  /**
   * The content for the RadioButtonGroup hint text,
   * will only be rendered when `validationRedesignOptIn` is true.
   * @deprecated The `legendHelp` prop is deprecated and will be removed in a future release. Please use the `legendHint` prop instead.
   */
  legendHelp?: string;
  /**
   * [Legacy] When true, legend is placed in line with the Checkboxes.
   * @deprecated Inline legends are no longer supported on this component.
   */
  legendInline?: boolean;
  /**
   * [Legacy] Percentage width of legend (only when legend is inline)
   * @deprecated Inline legends are no longer supported on this component.
   */
  legendWidth?: number;
  /**
   * [Legacy] Alignment of the legend.
   * @deprecated Right legend alignment is no longer supported.
   */
  legendAlign?: "left" | "right";
  /**
   * [Legacy] Spacing between legend and field for inline legend, number multiplied by base spacing unit (8)
   * @deprecated Custom spacing for legends is no longer supported on this component.
   */
  legendSpacing?: 1 | 2;
  /** The Checkboxes to be rendered in the group */
  children: React.ReactNode;
  /**
   * Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8)
   * @deprecated Custom spacing for labels is no longer supported on this component.
   */
  labelSpacing?: 1 | 2;
  /** Flag to disable the CheckboxGroup. */
  disabled?: boolean;
  /** Flag to configure CheckboxGroup as mandatory*/
  required?: boolean;
  /**
   * Overrides the default tooltip position
   * @deprecated Tooltips are no longer supported on this component.
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** When true, Checkbox children are inline. */
  inline?: boolean;
  /**
   * Render the ValidationMessage above the CheckboxGroup
   * @deprecated The `validationMessagePositionTop` prop is deprecated and will be removed in a future release.
   */
  validationMessagePositionTop?: boolean;
}

export const CheckboxGroup = ({
  children,
  legend,
  legendHint,
  size = "medium",
  error,
  warning,
  info,
  disabled,
  required,
  legendInline,
  legendWidth,
  legendAlign,
  legendSpacing,
  legendHelp,
  tooltipPosition,
  inline,
  id,
  validationMessagePositionTop = true,
  ...rest
}: CheckboxGroupProps) => {
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;

  return (
    <Fieldset
      id={uniqueId}
      legend={legend}
      legendHint={legendHint || legendHelp}
      isDisabled={disabled}
      isRequired={required}
      error={error}
      warning={warning}
      validationMessagePositionTop={validationMessagePositionTop}
      size={size}
      {...tagComponent("checkbox-group", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      <CheckboxGroupContext.Provider
        value={{
          error: !!error,
          warning: !!warning,
          inline,
          size,
          disabled,
          required,
        }}
      >
        <StyledCheckboxGroupContent
          data-role="checkbox-group-content"
          $inline={inline}
          $size={size}
        >
          {children}
        </StyledCheckboxGroupContent>
      </CheckboxGroupContext.Provider>
    </Fieldset>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
