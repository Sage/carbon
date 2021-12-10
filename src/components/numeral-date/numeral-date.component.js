import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import invariant from "invariant";

import { filterStyledSystemMarginProps } from "../../style/utils";
import Events from "../../__internal__/utils/helpers/events";
import { StyledNumeralDate, StyledDateField } from "./numeral-date.style";
import Textbox from "../textbox";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import FormField from "../../__internal__/form-field";
import { InputGroupBehaviour } from "../../__internal__/input-behaviour";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const ALLOWED_DATE_FORMATS = [
  ["dd", "mm", "yyyy"],
  ["mm", "dd", "yyyy"],
  ["dd", "mm"],
  ["mm", "dd"],
  ["mm", "yyyy"],
];

const isDayValid = (day) => (day ? +day > 0 && +day < 32 : true);

const isMonthValid = (month) => (month ? +month > 0 && +month < 13 : true);

const isYearValid = (year) => (year ? +year > 1799 && +year < 2201 : true);

const validations = {
  dd: isDayValid,
  mm: isMonthValid,
  yyyy: isYearValid,
};

const NumeralDate = ({
  dateFormat = ["dd", "mm", "yyyy"],
  defaultValue,
  disabled,
  error = "",
  warning = "",
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  info,
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
  labelSpacing,
  fieldHelp,
  adaptiveLabelBreakpoint,
  required,
  readOnly,
  size,
  enableInternalError,
  enableInternalWarning,
  tooltipPosition,
  helpAriaLabel,
  ...rest
}) => {
  const l = useLocale();
  const { current: uniqueId } = useRef(id || guid());
  const isControlled = useRef(value !== undefined);
  const initialValue = isControlled.current ? value : defaultValue;

  const refs = useRef(dateFormat.map(() => React.createRef()));

  const [internalMessages, setInternalMessages] = useState({});

  useEffect(() => {
    const modeSwitchedMessage =
      "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
      "Decide between using a controlled or uncontrolled input element for the lifetime of the component";

    invariant(
      isControlled.current === (value !== undefined),
      modeSwitchedMessage
    );
  }, [value]);

  const validationMessages = {
    dd: l.numeralDate.validation.day(),
    mm: l.numeralDate.validation.month(),
    yyyy: l.numeralDate.validation.year(),
  };

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

  const handleBlur = (datePart) => {
    const internalValidationEnabled =
      enableInternalError || enableInternalWarning;
    /* istanbul ignore else */
    if (validations[datePart] && internalValidationEnabled) {
      const errorMessage = validations[datePart](dateValue[datePart])
        ? ""
        : validationMessages[datePart];

      setInternalMessages((prev) => ({
        ...prev,
        [datePart]: errorMessage,
      }));
    }
    setTimeout(() => {
      const hasBlurred = !refs.current.find(
        (ref) => ref.current === document.activeElement
      );
      /* istanbul ignore else */
      if (onBlur && hasBlurred) {
        onBlur(createCustomEventObject(dateValue));
      }
    }, 5);
  };

  const internalMessage = Object.keys(internalMessages).reduce(
    (string, key) =>
      internalMessages[key] ? `${string + internalMessages[key]}\n` : string,
    ""
  );
  const internalError = enableInternalError ? internalMessage + error : error;

  const internalWarning = enableInternalWarning
    ? internalMessage + warning
    : warning;

  return (
    <TooltipProvider helpAriaLabel={helpAriaLabel}>
      <InputGroupBehaviour>
        <FormField
          data-component={dataComponent}
          data-element={dataElement}
          data-role={dataRole}
          disabled={disabled}
          useValidationIcon={validationOnLabel}
          id={uniqueId}
          error={internalError}
          warning={internalWarning}
          info={info}
          label={label}
          labelInline={labelInline}
          labelWidth={labelWidth}
          labelAlign={labelAlign}
          labelHelp={labelHelp}
          labelSpacing={labelSpacing}
          fieldHelp={fieldHelp}
          adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
          isRequired={required}
          {...filterStyledSystemMarginProps(rest)}
        >
          <StyledNumeralDate
            name={name}
            onKeyPress={onKeyPress}
            data-component="numeral-date"
          >
            {dateFormat.map((datePart, index) => {
              const isEnd = index === dateFormat.length - 1;
              const isMiddle = index === 1;

              const validation = error || warning || info;
              const isStringValidation = typeof validation === "string";
              const hasValidationIcon = isStringValidation && validation.length;

              return (
                <StyledDateField
                  key={datePart}
                  isYearInput={datePart.length === 4}
                  isMiddle={isMiddle}
                  isEnd={isEnd}
                  hasValidationIcon={hasValidationIcon}
                >
                  <Textbox
                    {...(index === 0 && { id: uniqueId })}
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={datePart}
                    value={dateValue[datePart]}
                    onChange={(e) => handleChange(e, datePart)}
                    inputRef={(ref) => {
                      refs.current[index] = ref;
                    }}
                    onBlur={() => handleBlur(datePart)}
                    error={!!internalError}
                    warning={!!internalWarning}
                    info={!!info}
                    {...(required && { required })}
                    {...(isEnd &&
                      !validationOnLabel && {
                        error: internalError,
                        warning: internalWarning,
                        info,
                      })}
                    size={size}
                    tooltipPosition={tooltipPosition}
                  />
                </StyledDateField>
              );
            })}
          </StyledNumeralDate>
        </FormField>
      </InputGroupBehaviour>
    </TooltipProvider>
  );
};

NumeralDate.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** If true, the component will be disabled */
  disabled: PropTypes.bool,
  /** If true, the component will be read-only */
  readOnly: PropTypes.bool,
  /** Array of strings to define custom input layout.
  Allowed formats:
  ['dd', 'mm', 'yyyy'],
  ['mm', 'dd', 'yyyy'],
  ['dd', 'mm'],
  ['mm', 'dd'],
  ['mm', 'yyyy'] */
  dateFormat: (props, propName, componentName) => {
    const dateFormat = props[propName];
    const isAllowed =
      !dateFormat ||
      ALLOWED_DATE_FORMATS.find(
        (allowedDateFormat) =>
          JSON.stringify(allowedDateFormat) === JSON.stringify(dateFormat)
      );
    if (!isAllowed) {
      return new Error(
        `Forbidden prop \`${propName}\` supplied to \`${componentName}\`. ` +
          "Only one of these date formats is allowed: " +
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
  /** When true, enables the internal errors to be displayed */
  enableInternalError: PropTypes.bool,
  /** When true, enables the internal warnings to be displayed */
  enableInternalWarning: PropTypes.bool,
  /** Label */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.node,
  /** When true, label is placed in line with an input */
  labelInline: PropTypes.bool,
  /** Label alignment. Works only when labelInline is true */
  labelAlign: PropTypes.oneOf(["left", "right"]),
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** Size of an input */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Aria label for rendered help component */
  helpAriaLabel: PropTypes.string,
};

export default NumeralDate;
