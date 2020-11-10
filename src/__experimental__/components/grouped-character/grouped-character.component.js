import React, { useState } from "react";
import PropTypes from "prop-types";
import Textbox from "../textbox";
import { generateGroups, toSum } from "./grouped-character.utils";

const buildCustomTarget = ({ target }, value) => {
  const { name, id } = target;
  return {
    ...(name && { name }),
    ...(id && { id }),
    value,
  };
};

const GroupedCharacter = ({
  defaultValue,
  groups,
  onBlur,
  onChange,
  separator: rawSeparator,
  value: externalValue,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const isControlled = externalValue !== undefined;

  const separator = rawSeparator.substring(0, 1); // Ensure max length is 1

  const maxRawLength = groups.reduce(toSum);

  const formatValue = (val) => generateGroups(groups, val).join(separator);

  const sanitizeValue = (val) =>
    val.split(separator).join("").substring(0, maxRawLength);

  const value = isControlled ? externalValue : internalValue;

  const handleChange = (ev) => {
    const { target } = ev;
    const { selectionEnd } = target;
    let newCursorPos = selectionEnd;

    const rawValue = sanitizeValue(target.value);
    const formattedValue = formatValue(rawValue);

    const isLastPosition = target.value.length === newCursorPos;
    const isAtOneBeyondSeparator =
      formattedValue[selectionEnd - 1] === separator;

    if (isLastPosition) {
      const targetValSeparatorCount = target.value.split(separator).length - 1;
      const formatValSeparatorCount =
        formattedValue.split(separator).length - 1;
      const separatorDiff = formatValSeparatorCount - targetValSeparatorCount;
      newCursorPos += separatorDiff;
    } else if (isAtOneBeyondSeparator) {
      const isDeleting = value.length > rawValue.length;
      newCursorPos += isDeleting ? -1 : 1;
    }

    ev.target = buildCustomTarget(ev, {
      rawValue,
      formattedValue,
    });

    onChange(ev);
    if (!isControlled) {
      setInternalValue(rawValue);
    }
    setTimeout(() => target.setSelectionRange(newCursorPos, newCursorPos));
  };

  const handleBlur = (ev) => {
    if (onBlur) {
      const { target } = ev;
      const rawValue = sanitizeValue(target.value);
      const formattedValue = formatValue(rawValue);

      ev.target = buildCustomTarget(ev, {
        rawValue,
        formattedValue,
      });
      onBlur(ev);
    }
  };

  const handleKeyPress = (ev) => {
    const { selectionStart, selectionEnd } = ev.target;
    const hasSelection = selectionEnd - selectionStart > 0;

    if (maxRawLength === value.length && !hasSelection) {
      ev.preventDefault();
    }
  };

  return (
    <Textbox
      {...rest}
      value={value}
      formattedValue={formatValue(value)}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
    />
  );
};

GroupedCharacter.propTypes = {
  /** character to be used as separator */
  separator: (props, propName, componentName) => {
    if (typeof props[propName] !== "string" || props[propName].length > 1) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Must be string of length 1.`
      );
    }
    return null;
  },
  /** pattern by which input value should be grouped */
  groups: PropTypes.array,
  /** Input value if component is meant to be used as a controlled component */
  value: PropTypes.string,
  /** Default input value if component is meant to be used as an uncontrolled component */
  defaultValue: PropTypes.string,
  /** on change handler which receives the event with object as a value containing rawValue and formattedValue */
  onChange: PropTypes.func,
  /** on blur handler which receives the event with object as a value containing rawValue and formattedValue */
  onBlur: PropTypes.func,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

export default GroupedCharacter;
