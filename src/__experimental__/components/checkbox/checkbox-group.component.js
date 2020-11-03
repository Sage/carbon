import React from "react";
import PropTypes from "prop-types";
import tagComponent from "../../../utils/helpers/tags";
import { StyledCheckboxGroup } from "./checkbox.style";
import FormField from "../form-field";
import { InputGroupBehaviour } from "../../../__internal__/input-behaviour";

const CheckboxGroup = (props) => {
  const { children, groupName, error, warning, info } = props;

  const groupLabelId = `${groupName}-label`;

  return (
    <InputGroupBehaviour>
      <StyledCheckboxGroup
        aria-labelledby={groupLabelId}
        role="checkbox"
        error={error}
        warning={warning}
        info={info}
        {...tagComponent("checkboxgroup", props)}
      >
        <FormField {...props}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              inputName: groupName,
              error: !!error,
              warning: !!warning,
              info: !!info,
              ...child.props,
            })
          )}
        </FormField>
      </StyledCheckboxGroup>
    </InputGroupBehaviour>
  );
};

CheckboxGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
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
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
};

export default CheckboxGroup;
