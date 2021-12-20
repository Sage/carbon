import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import invariant from "invariant";
import Textbox from "../textbox";
import { filterStyledSystemMarginProps } from "../../style/utils";
import LocaleContext from "../../__internal__/i18n-context";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);
const Decimal = ({
  align = "right",
  defaultValue,
  precision = 2,
  inputWidth,
  readOnly,
  onChange,
  onBlur,
  onKeyPress,
  id,
  name,
  allowEmptyValue = false,
  required,
  locale,
  value,
  ...rest
}) => {
  const l = useContext(LocaleContext);

  const emptyValue = allowEmptyValue ? "" : "0.00";

  const getSafeValueProp = (initialValue) => {
    // We're intentionally preventing the use of number values to help prevent any unintentional rounding issues
    invariant(
      typeof initialValue === "string",
      "Decimal `value` prop must be a string"
    );

    if (initialValue && !allowEmptyValue) {
      invariant(
        initialValue !== "",
        "Decimal `value` must not be an empty string. Please use `allowEmptyValue` or `0.00`"
      );
    }
    return initialValue;
  };

  const getSeparator = useCallback(
    (separatorType) => {
      const numberWithGroupAndDecimalSeparator = 10000.1;
      return Intl.NumberFormat(locale || l.locale())
        .formatToParts(numberWithGroupAndDecimalSeparator)
        .find((part) => part.type === separatorType).value;
    },
    [l, locale]
  );

  const isNaN = useCallback((valueToTest) => {
    return Number.isNaN(Number(valueToTest));
  }, []);

  /**
   * Format a user defined value
   */
  const formatValue = useCallback(
    (valueToFormat) => {
      if (isNaN(valueToFormat)) {
        return valueToFormat;
      }

      /* Guards against any white-space only strings like "   " being 
       mishandled and returned as `NaN` for the value displayed in the textbox */
      if (valueToFormat === "" || valueToFormat.match(/\s+/g)) {
        return valueToFormat;
      }

      const separator = getSeparator("decimal");
      const [integer, remainder] = valueToFormat.split(".");

      const formattedInteger = Intl.NumberFormat(locale || l.locale(), {
        maximumFractionDigits: 0,
      }).format(integer);

      let formattedNumber = formattedInteger;
      if (remainder?.length > precision) {
        formattedNumber += `${separator + remainder}`;
      } else if (remainder?.length <= precision) {
        formattedNumber += `${
          separator + remainder + "0".repeat(precision - remainder.length)
        }`;
      } else {
        formattedNumber += `${
          precision ? separator + "0".repeat(precision) : ""
        }`;
      }
      return formattedNumber;
    },
    [getSeparator, isNaN, l, locale, precision]
  );

  // Return previous value before state is changed. Used to compare prevState and newState.
  function usePrevious(arg) {
    const ref = useRef();
    useEffect(() => {
      ref.current = arg;
    });
    return ref.current;
  }

  /**
   * Determine if the precision value has changed from the previous ref value for precision
   */
  const prevPrecisionValue = usePrevious(precision);

  useEffect(() => {
    if (prevPrecisionValue && prevPrecisionValue !== precision) {
      // eslint-disable-next-line no-console
      console.error(
        "Decimal `precision` prop has changed value. Changing the Decimal `precision` prop has no effect."
      );
    }
  }, [precision]);

  const removeDelimiters = useCallback(
    (valueToFormat) => {
      const delimiterMatcher = new RegExp(
        `[\\${getSeparator("group")} ]*`,
        "g"
      );
      return valueToFormat.replace(delimiterMatcher, "");
    },
    [getSeparator]
  );

  /**
   * Convert raw input to a standard decimal format
   */
  const toStandardDecimal = useCallback(
    (i18nValue) => {
      const valueWithoutNBS =
        getSeparator("group").match(/\s+/) && !i18nValue.match(/\s{2,}/)
          ? i18nValue.replace(/\s+/g, "")
          : i18nValue;
      /* If a value is passed in that is a number but has too many delimiters in succession, we want to handle this
    value without formatting it or removing delimiters. We also want to consider that,
    if a value consists of only delimiters, we want to treat that 
    value in the same way as if the value was NaN. We want to pass this value to the 
    formatValue function, before the delimiters can be removed. */
      const errorsWithDelimiter = new RegExp(
        `([^A-Za-z0-9]{2,})|(^[^A-Za-z0-9-]+)|([^0-9a-z-,.])|([^0-9-,.]+)|([W,.])$`,
        "g"
      );
      const separator = getSeparator("decimal");
      const separatorRegex = new RegExp(
        separator === "." ? `\\${separator}` : separator,
        "g"
      );
      if (
        valueWithoutNBS.match(errorsWithDelimiter) ||
        (valueWithoutNBS.match(separatorRegex) || []).length > 1
      ) {
        return valueWithoutNBS;
      }

      const withoutDelimiters = removeDelimiters(valueWithoutNBS);
      return withoutDelimiters.replace(new RegExp(`\\${separator}`, "g"), ".");
    },
    [getSeparator, removeDelimiters]
  );

  const decimalValue = getSafeValueProp(defaultValue || value || emptyValue);
  const [stateValue, setStateValue] = useState(
    isNaN(toStandardDecimal(decimalValue))
      ? decimalValue
      : formatValue(decimalValue)
  );

  const createEvent = (formatted, raw) => {
    return {
      target: {
        name,
        id,
        value: {
          formattedValue: formatValue(toStandardDecimal(formatted)),
          rawValue: raw || toStandardDecimal(formatted),
        },
      },
    };
  };

  const handleOnChange = (ev) => {
    const { value: val } = ev.target;
    setStateValue(val);
    if (onChange) onChange(createEvent(val));
  };

  const handleOnBlur = (ev) => {
    const { value: updatedValue } = ev.target;
    let event;

    if (updatedValue) {
      const standardVisible = toStandardDecimal(updatedValue);
      const formattedValue = isNaN(standardVisible)
        ? updatedValue
        : formatValue(standardVisible);

      event = createEvent(formattedValue, standardVisible);
      setStateValue(formattedValue);
    } else {
      event = createEvent(emptyValue);
      setStateValue(emptyValue);
    }

    if (onBlur) onBlur(event);
  };

  const isComponentControlled = value !== undefined;

  const prevControlledState = usePrevious(isComponentControlled);

  useEffect(() => {
    const message =
      "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
      "Decide between using a controlled or uncontrolled input element for the lifetime of the component";

    invariant(prevControlledState !== isComponentControlled, message);
  }, [isComponentControlled]);

  useEffect(() => {
    const unformattedValue = toStandardDecimal(stateValue);

    if (isComponentControlled) {
      const valueProp = getSafeValueProp(value);
      if (unformattedValue !== valueProp) {
        setStateValue(formatValue(value));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Textbox
        onKeyPress={onKeyPress}
        align={align}
        readOnly={readOnly}
        required={required}
        inputWidth={inputWidth}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={stateValue}
        data-component="decimal"
        {...rest}
      />
      <input
        name={name}
        value={toStandardDecimal(stateValue)}
        type="hidden"
        data-component="hidden-input"
      />
    </>
  );
};

Decimal.propTypes = {
  /** Styled-system margin props */
  ...marginPropTypes,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /**
   * The default value alignment on the input
   */
  align: PropTypes.oneOf(["right", "left"]),
  /**
   * The decimal precision of the value in the input
   */
  // eslint-disable-next-line consistent-return
  precision: (props) => {
    if (
      !Number.isInteger(props.precision) ||
      props.precision < 0 ||
      props.precision > 15
    ) {
      return new Error(
        "Precision prop must be a number greater than 0 or equal to or less than 15."
      );
    }
  },
  /**
   * The width of the input as a percentage
   */
  inputWidth: PropTypes.number,
  /**
   * If true, the component will be read-only
   */
  readOnly: PropTypes.bool,
  /**
   * The default value of the input if it's meant to be used as an uncontrolled component
   */
  defaultValue: PropTypes.string,
  /**
   * The value of the input if it's used as a controlled component
   */
  value: PropTypes.string,
  /**
   * Handler for change event if input is meant to be used as a controlled component
   */
  onChange: PropTypes.func,
  /**
   * Handler for blur event
   */
  onBlur: PropTypes.func,
  /**
   * Handler for key press event
   */
  onKeyPress: PropTypes.func,
  /**
   * The input name
   */
  name: PropTypes.string,
  /**
   * The input id
   */
  id: PropTypes.string,
  /**
   * Allow an empty value instead of defaulting to 0.00
   */
  allowEmptyValue: PropTypes.bool,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /**
   * Override the locale string, default from I18nProvider
   */
  locale: PropTypes.string,
  /** Aria label for rendered help component */
  helpAriaLabel: PropTypes.string,
};

export default Decimal;
