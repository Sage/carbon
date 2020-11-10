import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

const RadioButtonMapper = ({
  children,
  name,
  onBlur,
  onChange,
  onMouseDown,
  onKeyDown,
  value,
}) => {
  const anyChecked = useMemo(() => {
    let result = false;
    React.Children.forEach(children, (child) => {
      if (Object.prototype.hasOwnProperty.call(child.props, "defaultChecked")) {
        result = true;
      }
    });
    return result;
  }, [children]);

  const isControlled = value !== undefined;

  const [checkedValue, setCheckedValue] = useState(false);
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

  const buttons = React.Children.map(children, (child) => {
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

    return React.cloneElement(child, {
      defaultChecked: undefined,
      checked,
      name,
      onBlur,
      onMouseDown,
      onChange: onChangeProp,
      onKeyDown,
    });
  });

  return buttons;
};

RadioButtonMapper.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
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
