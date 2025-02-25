import React, { useState, useCallback, useMemo } from "react";

interface InputEvents {
  /** Callback fired when each RadioButton is blurred */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback fired when the user selects a RadioButton */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback fired on mouse down */
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void;
  /** Callback fired on key down */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface RadioButtonMapperProps extends InputEvents {
  /** The RadioButton objects to be rendered in the group */
  children?: React.ReactNode;
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** Value of the selected RadioButton */
  value?: string | null;
}

export interface MappedChildProps {
  defaultChecked?: boolean;
  checked: boolean;
  name: string;
}

const RadioButtonMapper = ({
  children,
  name,
  onBlur,
  onChange,
  onMouseDown,
  onKeyDown,
  value,
}: RadioButtonMapperProps) => {
  const filteredChildren = useMemo(
    () => React.Children.toArray(children),
    [children],
  );
  const anyChecked = useMemo(() => {
    let result = false;
    filteredChildren.forEach((child) => {
      if (
        React.isValidElement(child) &&
        Object.prototype.hasOwnProperty.call(child.props, "defaultChecked")
      ) {
        result = true;
      }
    });
    return result;
  }, [filteredChildren]);

  const isControlled = value !== undefined;

  const [checkedValue, setCheckedValue] = useState("");
  const onChangeProp = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      if (!isControlled) {
        setCheckedValue(event.target.value);
      }
    },
    [onChange, setCheckedValue, isControlled],
  );

  const buttons = filteredChildren.map((child) => {
    let checked;

    if (!React.isValidElement(child)) {
      return child;
    }

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

    const childProps: MappedChildProps & InputEvents = {
      defaultChecked: undefined,
      checked,
      name,
      onBlur,
      onMouseDown,
      onChange: onChangeProp,
      onKeyDown,
    };

    return React.cloneElement(child, childProps);
  });

  return <>{buttons}</>;
};

RadioButtonMapper.displayName = "RadioButtonMapper";

export default RadioButtonMapper;
