import React, { useRef } from "react";
import { MarginProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../../../__internal__/fieldset/__next__/fieldset.component";
import { filterStyledSystemMarginProps } from "../../../../style/utils";
import { RadioButtonGroupProvider } from "../___internal___/radio-button-group.context";
import guid from "../../../../__internal__/utils/helpers/guid";

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
  /** Render the ValidationMessage above the RadioButtonGroup when validationRedesignOptIn flag is set. */
  validationMessagePositionTop?: boolean;
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
  ...rest
}: RadioButtonGroupProps) => {
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;

  return (
    <Fieldset
      id={uniqueId}
      legend={legend}
      legendHint={legendHint}
      legendAlign={legendAlign}
      isDisabled={disabled}
      isRequired={required}
      error={error}
      validationMessagePositionTop={validationMessagePositionTop}
      size={size}
      inline={inline}
      {...tagComponent("radio-button-group", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      <RadioButtonGroupProvider
        value={{
          error: !!error,
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
        {children}
      </RadioButtonGroupProvider>
    </Fieldset>
  );
};

RadioButtonGroup.displayName = "RadioButtonGroup";

export default RadioButtonGroup;
