import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import RadioButtonMapperContext from "./__internal__/radio-button-context";
import RadioButton from "./radio-button.component";

const RadioButtonMapper = ({
  children,
  name,
  onBlur,
  onChange,
  onMouseDown,
  onKeyDown,
  value,
  inline,
  labelSpacing,
  error,
  warning,
  info,
  required,
}) => {
  const isControlled = value !== undefined;
  const [checkedValue, setCheckedValue] = useState(false);

  const filteredChildren = useMemo(
    () =>
      React.Children.toArray(children).map((child) => {
        if (child.type !== RadioButton) {
          const candidate = React.Children.toArray(child.props.children).find(
            (c) => c.type === RadioButton
          );

          if (candidate) {
            return candidate;
          }
        }

        return child;
      }),
    [children]
  );

  const anyChecked = useMemo(() => {
    let result = false;
    filteredChildren.forEach((child) => {
      if (Object.prototype.hasOwnProperty.call(child.props, "defaultChecked")) {
        result = true;
      }
    });
    return result;
  }, [filteredChildren]);

  const onChangeProp = useCallback(
    (e) => {
      if (onChange) {
        onChange(e);
      }
      if (!isControlled) {
        setCheckedValue(e.target.value);
      }
    },
    [onChange, setCheckedValue, isControlled]
  );

  const buttons = filteredChildren.map((child) => {
    let checked;

    if (isControlled) {
      // The user is controlling the input via the value prop
      checked = value === child.props.value;
    } else if (!checkedValue && anyChecked) {
      // Uncontrolled and the user has not made a selection, but at least one has a checked prop
      checked = child.props.defaultChecked || false;
    } else {
      // Uncontrolled, existing selection or none marked as checked
      checked = checkedValue === child.props.value;
    }

    return (
      <RadioButtonMapperContext.Provider
        value={{
          defaultChecked: undefined,
          checked,
          name,
          onBlur,
          onMouseDown,
          onChange: onChangeProp,
          onKeyDown,
          inline,
          labelSpacing,
          error,
          warning,
          info,
          required,
        }}
      >
        {child}
      </RadioButtonMapperContext.Provider>
    );
  });

  return buttons;
};

RadioButtonMapper.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node,
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** Callback fired when each RadioButton is blurred */
  onBlur: PropTypes.func,
  /** Callback fired when the user selects a RadioButton */
  onChange: PropTypes.func,
  /** Callback fired on key down */
  onKeyDown: PropTypes.func,
  /** Value of the selected RadioButton */
  value: PropTypes.string,
};

export default RadioButtonMapper;
