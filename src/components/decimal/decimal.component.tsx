import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import invariant from "invariant";

import Textbox, { CommonTextboxProps } from "../textbox";
import LocaleContext from "../../__internal__/i18n-context";
import usePrevious from "../../hooks/__internal__/usePrevious";
import Logger from "../../__internal__/utils/logger";

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
  extends Omit<CommonTextboxProps, "onChange" | "onBlur"> {
  /** Text alignment of the label */
  align?: "left" | "right";
  /** Allow an empty value instead of defaulting to 0.00 */
  allowEmptyValue?: boolean;
  /** The default value of the input if it's meant to be used as an uncontrolled component */
  defaultValue?: string;
  /** The input id */
  id?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** Handler for change event if input is meant to be used as a controlled component */
  onChange?: (ev: CustomEvent) => void;
  /** Handler for blur event */
  onBlur?: (ev: CustomEvent) => void;
  /** Handler for key press event */
  onKeyPress?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
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
  /** The value of the input if it's used as a controlled component */
  value?: string;
  /** The locale string - default en */
  locale?: string;
}

let deprecateUncontrolledWarnTriggered = false;

export const Decimal = React.forwardRef(
  (
    {
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
      locale,
      value,
      ...rest
    }: DecimalProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const l = useContext(LocaleContext);

    const getSeparator = useCallback(
      (separatorType) => {
        const numberWithGroupAndDecimalSeparator = 10000.1;
        return Intl.NumberFormat(locale || l.locale())
          .formatToParts(numberWithGroupAndDecimalSeparator)
          .find((part) => part.type === separatorType)?.value;
      },
      [l, locale],
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
      [getSeparator, isNaN, l, locale, precision],
    );

    const emptyValue = allowEmptyValue
      ? ""
      : formatValue((0).toFixed(precision));

    const getSafeValueProp = useCallback(
      (initialValue) => {
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
      if (prevPrecisionValue && prevPrecisionValue !== precision) {
        // eslint-disable-next-line no-console
        console.error(
          "Decimal `precision` prop has changed value. Changing the Decimal `precision` prop has no effect.",
        );
      }
    }, [precision, prevPrecisionValue]);

    const removeDelimiters = useCallback(
      (valueToFormat) => {
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
      (i18nValue) => {
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

    const decimalValue = getSafeValueProp(defaultValue || value || emptyValue);
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
    const prevControlledRef = useRef<boolean>();

    useEffect(() => {
      const message =
        "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
        "Decide between using a controlled or uncontrolled input element for the lifetime of the component";

      invariant(prevControlledRef.current !== isControlled, message);

      prevControlledRef.current = isControlled;
    }, [isControlled]);

    const prevValue = usePrevious(value);

    useEffect(() => {
      const standardDecimalValue = toStandardDecimal(stateValue);

      if (isControlled) {
        const valueProp = getSafeValueProp(value);
        if (standardDecimalValue !== valueProp) {
          if (valueProp === "" && prevValue === "") {
            setStateValue(formatValue(emptyValue));
          } else {
            setStateValue(formatValue(valueProp));
          }
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

    if (!deprecateUncontrolledWarnTriggered && !isControlled) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Decimal` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
      );
    }

    return (
      <>
        <Textbox
          onKeyPress={onKeyPress}
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
