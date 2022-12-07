import React, { useMemo } from "react";
import invariant from "invariant";

import { MarginProps } from "styled-system";
import { ValidationProps } from "../../__internal__/validations";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import FormField from "../../__internal__/form-field";
import StyledButtonToggleGroup from "./button-toggle-group.style";
import ButtonToggle from "../button-toggle";
import RadioButtonMapper from "../../__internal__/radio-button-mapper";
import ValidationIcon from "../../__internal__/validations/validation-icon.component";
import { InputGroupBehaviour } from "../../__internal__/input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

export interface ButtonToggleGroupProps
  extends ValidationProps,
    MarginProps,
    TagProps {
  /** Unique id for the root element of the component */
  id: string;
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** Togglable buttons to be rendered. Only accepts children of type ButtonToggle */
  children?: React.ReactNode;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** Text for the label. */
  label?: string;
  /** Text for the labels help tooltip. */
  labelHelp?: React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth?: number | string;
  /** The text for the field help. */
  fieldHelp?: string;
  /** Sets the field help to inline. */
  fieldHelpInline?: boolean;
  /** Sets the label to be inline. */
  labelInline?: boolean;
  /** The percentage width of the label. */
  labelWidth?: number;
  /** If true all ButtonToggle children will flex to the full width of the ButtonToggleGroup parent */
  fullWidth?: boolean;
  /** The alignment for the text in the label. */
  labelAlign?: "left" | "right";
  /** Callback triggered by blur event on the input. */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback triggered by change event on the input. */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** The value of the Button Toggle Group */
  value?: string;
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
}

const ButtonToggleGroup = ({
  children,
  name,
  error,
  warning,
  info,
  validationOnLabel = false,
  label,
  labelHelp,
  labelSpacing,
  inputWidth,
  fullWidth,
  fieldHelp,
  fieldHelpInline,
  labelInline,
  labelWidth,
  labelAlign,
  onChange,
  onBlur,
  value,
  "data-component": dataComponent = "button-toggle-group",
  "data-element": dataElement,
  "data-role": dataRole,
  helpAriaLabel,
  id,
  ...props
}: ButtonToggleGroupProps) => {
  const validationProps = {
    error,
    warning,
    info,
  };

  const hasCorrectItemStructure = useMemo(() => {
    const incorrectChild = React.Children.toArray(children).find(
      (child: React.ReactNode) => {
        return (
          !React.isValidElement(child) ||
          (child.type as React.FunctionComponent).displayName !==
            ButtonToggle.displayName
        );
      }
    );
    return !incorrectChild;
  }, [children]);

  invariant(
    hasCorrectItemStructure,
    `\`ButtonToggleGroup\` only accepts children of type \`${ButtonToggle.displayName}\``
  );

  return (
    <TooltipProvider helpAriaLabel={helpAriaLabel}>
      <InputGroupBehaviour>
        <FormField
          useValidationIcon={validationOnLabel}
          label={label}
          labelHelp={labelHelp}
          labelSpacing={labelSpacing}
          fieldHelp={fieldHelp}
          fieldHelpInline={fieldHelpInline}
          labelInline={labelInline}
          labelWidth={labelWidth}
          labelAlign={labelAlign}
          data-component={dataComponent}
          data-role={dataRole}
          data-element={dataElement}
          id={id}
          {...validationProps}
          {...filterStyledSystemMarginProps(props)}
        >
          <StyledButtonToggleGroup
            aria-label={label}
            role="radiogroup"
            inputWidth={inputWidth}
            fullWidth={fullWidth}
            {...validationProps}
          >
            <RadioButtonMapper
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            >
              {children}
            </RadioButtonMapper>
            {!validationOnLabel && (
              <ValidationIcon
                {...validationProps}
                tooltipFlipOverrides={["top", "bottom"]}
              />
            )}
          </StyledButtonToggleGroup>
        </FormField>
      </InputGroupBehaviour>
    </TooltipProvider>
  );
};

ButtonToggleGroup.displayName = "ButtonToggleGroup";
export default ButtonToggleGroup;
