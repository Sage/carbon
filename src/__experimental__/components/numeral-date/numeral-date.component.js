import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import Events from "../../../utils/helpers/events";
import OptionsHelper from "../../../utils/helpers/options-helper";
import { StyledNumeralDate, StyledDateField } from "./numeral-date.style";
import Textbox from "../textbox";
import guid from "../../../utils/helpers/guid";
import FormField from "../form-field";
import { InputGroupBehaviour } from "../../../__internal__/input-behaviour";

const NumeralDate = ({
  dateFormat = ["dd", "mm", "yyyy"],
  defaultValue,
  error,
  info,
  warning,
  id,
  name,
  onBlur,
  onChange,
  value,
  validationOnLabel = false,
  label,
  labelInline,
  labelWidth,
  labelAlign,
  labelHelp,
  fieldHelp,
  adaptiveLabelBreakpoint,
  required,
}) => {
  const { current: uniqueId } = useRef(id || guid());
  const isControlled = useRef(value !== undefined);
  const initialValue = isControlled.current ? value : defaultValue;

  useEffect(() => {
    const modeSwitchedMessage =
      "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
      "Decide between using a controlled or uncontrolled input element for the lifetime of the component";

    invariant(
      isControlled.current === (value !== undefined),
      modeSwitchedMessage
    );
  }, [value]);

  const [dateValue, setDateValue] = useState({
    ...(initialValue ||
      dateFormat.reduce((dateObject, key) => {
        dateObject[key] = "";
        return dateObject;
      }, {})),
  });

  const createCustomEventObject = (newValue) => ({
    target: {
      name,
      id: uniqueId,
      value: newValue,
    },
  });

  const onKeyPress = (ev) => {
    const isValidKey =
      Events.isNumberKey(ev) || Events.isDeletingKey(ev) || Events.isTabKey(ev);

    if (!isValidKey) {
      ev.preventDefault();
    }
  };

  const handleChange = (e, datePart) => {
    const { value: newValue } = e.target;

    if (newValue.length <= datePart.length) {
      const newDateValue = { ...dateValue, [datePart]: newValue };
      setDateValue(newDateValue);

      /* istanbul ignore else */
      if (onChange) {
        onChange(createCustomEventObject(newDateValue));
      }
    }
  };

  const handleBlur = () => {
    /* istanbul ignore else */
    if (onBlur) {
      onBlur(createCustomEventObject(dateValue));
    }
  };

  return (
    <InputGroupBehaviour>
      <FormField
        label={label}
        useValidationIcon={validationOnLabel}
        id={uniqueId}
        error={error}
        warning={warning}
        info={info}
        labelInline={labelInline}
        labelWidth={labelWidth}
        labelAlign={labelAlign}
        labelHelp={labelHelp}
        fieldHelp={fieldHelp}
        adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
        isRequired={required}
      >
        <StyledNumeralDate
          name={name}
          onBlur={handleBlur}
          onKeyPress={onKeyPress}
          data-component="numeral-date"
        >
          {dateFormat.map((datePart, index) => {
            const isEnd = index === dateFormat.length - 1;
            const isMiddle = index === 1;

            return (
              <StyledDateField
                key={datePart}
                isYearInput={datePart.length === 4}
                isMiddle={isMiddle}
                isEnd={isEnd}
                hasValidationIcon={
                  typeof (error || warning || info) === "string"
                }
              >
                <Textbox
                  {...(index === 0 && { id: uniqueId })}
                  placeholder={datePart}
                  value={dateValue[datePart]}
                  onChange={(e) => handleChange(e, datePart)}
                  onBlur={handleBlur}
                  error={!!error}
                  warning={!!warning}
                  info={!!info}
                  {...(required && { required })}
                  {...(isEnd &&
                    !validationOnLabel && {
                      error,
                      warning,
                      info,
                    })}
                />
              </StyledDateField>
            );
          })}
        </StyledNumeralDate>
      </FormField>
    </InputGroupBehaviour>
  );
};

NumeralDate.propTypes = {
  /** Array of strings to define custom input layout.
  Allowed formats:
  ['dd', 'mm', 'yyyy'],
  ['mm', 'dd', 'yyyy'],
  ['dd', 'mm'],
  ['mm', 'dd'],
  ['mm', 'yyyy'] */
  dateFormat: (props, propName, componentName) => {
    const dateFormat = props[propName];
    const isAllowed = OptionsHelper.dateFormats.find(
      (allowedDateFormat) =>
        JSON.stringify(allowedDateFormat) === JSON.stringify(dateFormat)
    );
    if (!isAllowed) {
      return new Error(
        `Forbidden prop \`${propName}\` supplied to \`${componentName}\`. ` +
          "Onle one of these date formats is allowed: " +
          "['dd', 'mm', 'yyyy'], " +
          "['mm', 'dd', 'yyyy'], " +
          "['dd', 'mm'], " +
          "['mm', 'dd'], " +
          "['mm', 'yyyy']"
      );
    }
    return null;
  },
  /** Default value for use in uncontrolled mode  */
  defaultValue: PropTypes.object,
  /**  Value for use in controlled mode  */
  value: PropTypes.object,
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
  /** Blur event handler  */
  onBlur: PropTypes.func,
  /** Change event handler */
  onChange: PropTypes.func,
  /** `id` for events */
  id: PropTypes.string,
  /** `name` for events */
  name: PropTypes.string,
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel: PropTypes.bool,
  /** Label */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.string,
  /** When true, label is placed in line with an input */
  labelInline: PropTypes.bool,
  /** Label alignment. Works only when labelInline is true */
  labelAlign: PropTypes.oneOf(["left", "right"]),
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

export default NumeralDate;
