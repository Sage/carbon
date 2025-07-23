import React, { useState, useEffect, useCallback, useContext } from "react";
import invariant from "invariant";

import Textbox, { CommonTextboxProps } from "../textbox";
import LocaleContext from "../../__internal__/i18n-context";
import usePrevious from "../../hooks/__internal__/usePrevious";
import Logger from "../../__internal__/utils/logger";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";

export interface CustomEvent {
  target: {
    name?: string;
    id?: string;
    value: {
      formattedValue: string;
      rawValue: string;
    };
  };
}

export interface DecimalProps
  extends Omit<CommonTextboxProps, "onChange" | "onBlur" | "data-component"> {
  /** Text alignment of the label */
  align?: "left" | "right";
  /** Allow an empty value instead of defaulting to 0.00 */
  allowEmptyValue?: boolean;
  /** The input id */
  id?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** Handler for change event */
  onChange: (ev: CustomEvent) => void;
  /** Handler for blur event */
  onBlur?: (ev: CustomEvent) => void;
  /** The input name */
  name?: string;
  /** The decimal precision of the value in the input */
  precision?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** The value of the input */
  value: string;
  /** The locale string - default en */
  locale?: string;
}

export const Decimal = React.forwardRef(
  (
    {
      align = "right",
      precision = 2,
      inputWidth,
      readOnly,
      onChange,
      onBlur,
      id,
      name,
      allowEmptyValue = false,
      locale,
      value,
      ...rest
    }: DecimalProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const l = useContext(LocaleContext);

    const getSeparator = useCallback(
      (separatorType: string) => {
        const numberWithGroupAndDecimalSeparator = 10000.1;
        return Intl.NumberFormat(locale || l.locale())
          .formatToParts(numberWithGroupAndDecimalSeparator)
          .find((part) => part.type === separatorType)?.value;
      },
      [l, locale],
    );

    const isNaN = useCallback((valueToTest: string) => {
      return Number.isNaN(Number(valueToTest));
    }, []);

    /**
     * Format a user defined value
     */
    const formatValue = useCallback(
      (valueToFormat: string) => {
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
        }).format(+integer);

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
      [getSeparator, isNaN, l, locale, precision],
    );

    const emptyValue = allowEmptyValue
      ? ""
      : formatValue((0).toFixed(precision));

    const getSafeValueProp = useCallback(
      (initialValue?: string) => {
        // We're intentionally preventing the use of number values to help prevent any unintentional rounding issues
        invariant(
          typeof initialValue === "string",
          "Decimal `value` prop must be a string",
        );

        if (initialValue && !allowEmptyValue) {
          invariant(
            initialValue !== "",
            "Decimal `value` must not be an empty string. Please use `allowEmptyValue` or specify a non-empty initialValue",
          );
        }
        return initialValue;
      },
      [allowEmptyValue],
    );

    /**
     * Determine if the precision value has changed from the previous ref value for precision
     */
    const prevPrecisionValue = usePrevious(precision);

    useEffect(() => {
      // Skipped coverage test - see notes in test file
      /* istanbul ignore if */
      if (prevPrecisionValue && prevPrecisionValue !== precision) {
        Logger.error(
          "Decimal `precision` prop has changed value. Changing the Decimal `precision` prop has no effect.",
        );
      }
    }, [precision, prevPrecisionValue]);

    const removeDelimiters = useCallback(
      (valueToFormat: string) => {
        const delimiterMatcher = new RegExp(
          `[\\${getSeparator("group")} ]*`,
          "g",
        );
        return valueToFormat.replace(delimiterMatcher, "");
      },
      [getSeparator],
    );

    /**
     * Convert raw input to a standard decimal format
     */
    const toStandardDecimal = useCallback(
      (i18nValue: string) => {
        const valueWithoutNBS =
          getSeparator("group")?.match(/\s+/) && !i18nValue.match(/\s{2,}/)
            ? i18nValue.replace(/\s+/g, "")
            : i18nValue;
        /* If a value is passed in that is a number but has too many delimiters in succession, we want to handle this
    value without formatting it or removing delimiters. We also want to consider that,
    if a value consists of only delimiters, we want to treat that
    value in the same way as if the value was NaN. We want to pass this value to the
    formatValue function, before the delimiters can be removed. */
        const errorsWithDelimiter = new RegExp(
          `([^A-Za-z0-9]{2,})|(^[^A-Za-z0-9-]+)|([^0-9a-z-,.])|([^0-9-,.]+)|([W,.])$`,
          "g",
        );
        const separator = getSeparator("decimal") as string;
        const separatorRegex = new RegExp(
          separator === "." ? `\\${separator}` : separator,
          "g",
        );
        if (
          valueWithoutNBS.match(errorsWithDelimiter) ||
          (valueWithoutNBS.match(separatorRegex) || []).length > 1
        ) {
          return valueWithoutNBS;
        }

        const withoutDelimiters = removeDelimiters(valueWithoutNBS);
        return withoutDelimiters.replace(
          new RegExp(`\\${separator}`, "g"),
          ".",
        );
      },
      [getSeparator, removeDelimiters],
    );

    const decimalValue = getSafeValueProp(value || emptyValue);
    const [stateValue, setStateValue] = useState(
      isNaN(toStandardDecimal(decimalValue))
        ? decimalValue
        : formatValue(decimalValue),
    );

    const createEvent = (formatted: string, raw?: string): CustomEvent => {
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

    const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { value: val } = ev.target;
      setStateValue(val);
      /* istanbul ignore else */
      if (onChange) onChange(createEvent(val));
    };

    const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
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

    const isControlled = value !== undefined;

    const prevValue = usePrevious(value);

    useEffect(() => {
      const standardDecimalValue = toStandardDecimal(stateValue);

      const valueProp = getSafeValueProp(value);
      if (standardDecimalValue !== valueProp) {
        if (valueProp === "" && prevValue === "") {
          setStateValue(formatValue(emptyValue));
        } else {
          setStateValue(formatValue(valueProp));
        }
      }
    }, [
      emptyValue,
      formatValue,
      getSafeValueProp,
      isControlled,
      prevValue,
      stateValue,
      toStandardDecimal,
      value,
    ]);

    return (
      <>
        <Textbox
          align={align}
          readOnly={readOnly}
          inputWidth={inputWidth}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={stateValue}
          data-component="decimal"
          id={id}
          ref={ref}
          {...rest}
          {...tagComponent("decimal", rest)}
        />
        <input
          name={name}
          value={toStandardDecimal(stateValue)}
          type="hidden"
          data-component="hidden-input"
          data-role="hidden-input"
        />
      </>
    );
  },
);

Decimal.displayName = "Decimal";

export default Decimal;
