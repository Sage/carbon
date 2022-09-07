import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ChildrenMapperProvider from "../../__internal__/children-mapper-provider";

const RadioButtonMapper = ({
  children,
  name,
  onBlur,
  onChange,
  onMouseDown,
  onKeyDown,
  value,
}) => {
  const filteredChildren = useMemo(() => React.Children.toArray(children), [
    children,
  ]);
  const anyChecked = useMemo(() => {
    let result = false;
    filteredChildren.forEach((child) => {
      if (Object.prototype.hasOwnProperty.call(child.props, "defaultChecked")) {
        result = true;
      }
    });
    return result;
  }, [filteredChildren]);

  const isControlled = useMemo(() => value !== undefined, [value]);
  const [checkedValue, setCheckedValue] = useState(false);
  const [registeredRadioButtons, setRegisteredRadioButtons] = useState([]);
  const [isCheckedMap, setIsCheckedMap] = useState({});

  const updateIsCheckedMap = useCallback(
    (array) => {
      setIsCheckedMap(
        array.reduce((acc, [id, inputProps]) => {
          if (!acc[id]) {
            acc[id] = {};
          }

          const { inputValue, defaultChecked } = inputProps;

          if (isControlled) {
            // The user is controlling the input via the value prop
            acc[id].checked = value === inputValue;
          } else if (!checkedValue && anyChecked) {
            // Uncontrolled and the user has not made a selection, but at least one has a checked prop
            acc[id].checked = defaultChecked || false;
          } else {
            // Uncontrolled, existing selection or none marked as checked
            acc[id].checked = checkedValue === inputValue;
          }

          return acc;
        }, {})
      );
    },
    [anyChecked, checkedValue, isControlled, value]
  );

  const onChangeProp = useCallback(
    (e) => {
      if (onChange) {
        onChange(e);
      }
      if (!isControlled) {
        setCheckedValue(e.target.value);
      }
    },
    [onChange, isControlled]
  );

  useEffect(() => {
    updateIsCheckedMap(registeredRadioButtons);
  }, [value, checkedValue, registeredRadioButtons, updateIsCheckedMap]);

  return (
    <ChildrenMapperProvider
      registeredChildren={registeredRadioButtons}
      setRegisteredChildren={setRegisteredRadioButtons}
      childrenMap={isCheckedMap}
      name={name}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onChange={onChangeProp}
      onKeyDown={onKeyDown}
    >
      {filteredChildren}
    </ChildrenMapperProvider>
  );
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
  /** Callback fired on mouse down */
  onMouseDown: PropTypes.func,
  /** Value of the selected RadioButton */
  value: PropTypes.string,
};

export default RadioButtonMapper;
