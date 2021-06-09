import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import FormField from "../../__experimental__/components/form-field";
import ButtonToggleGroupStyle from "./button-toggle-group.style";
import RadioButtonMapper from "../../__experimental__/components/radio-button/radio-button-mapper.component";
import ValidationIcon from "../validations/validation-icon.component";
import ButtonToggle from "../button-toggle";
import { InputGroupBehaviour } from "../../__internal__/input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const ButtonToggleGroup = (props) => {
  const {
    name,
    inputWidth,
    error,
    warning,
    info,
    label,
    onChange,
    onBlur,
    children,
    value,
    validationOnLabel,
  } = props;

  const validationProps = {
    error,
    warning,
    info,
  };
  return (
    <InputGroupBehaviour>
      <FormField useValidationIcon={validationOnLabel} {...props}>
        <ButtonToggleGroupStyle
          data-component="button-toggle-group"
          aria-label={label}
          role="group"
          inputWidth={inputWidth}
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
        </ButtonToggleGroupStyle>
      </FormField>
    </InputGroupBehaviour>
  );
};

ButtonToggleGroup.propTypes = {
  ...marginPropTypes,
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** Children to be rendered (ButtonToggle). */
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (ButtonToggle.displayName !== child.type.displayName) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${ButtonToggle.displayName}\`.`
        );
      }
    });

    return error;
  },
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel: PropTypes.bool,
  /** Text for the label. */
  label: PropTypes.string,
  /** Text for the labels help tooltip. */
  labelHelp: PropTypes.node,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth: PropTypes.number,
  /** The text for the field help. */
  fieldHelp: PropTypes.string,
  /** Sets the field help to inline. */
  fieldHelpInline: PropTypes.bool,
  /** Sets the label to be inline. */
  labelInline: PropTypes.bool,
  /** The percentage width of the label. */
  labelWidth: PropTypes.number,
  /** The alignment for the text in the label. */
  labelAlign: PropTypes.string,
  /** callback to handle change event */
  onChange: PropTypes.func,
  /** Callback fired when each RadioButton is blurred */
  onBlur: PropTypes.func,
  /** The value of the Button Toggle Group */
  value: PropTypes.string,
};

ButtonToggleGroup.defaultProps = {
  validationOnLabel: false,
};

ButtonToggleGroup.displayName = "ButtonToggleGroup";

export default ButtonToggleGroup;
