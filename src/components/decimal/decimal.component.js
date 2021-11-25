/* eslint-disable react/no-did-update-set-state */
import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import invariant from "invariant";
import Textbox from "../textbox";
import { filterStyledSystemMarginProps } from "../../style/utils";
import LocaleContext from "../../__internal__/i18n-context";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);
class Decimal extends React.Component {
  static maxPrecision = 15;

  emptyValue = this.props.allowEmptyValue ? "" : "0.00";

  constructor(props, context) {
    super(props, context);

    const isControlled = this.isControlled();
    const value = isControlled
      ? this.getSafeValueProp(true)
      : this.props.defaultValue || this.emptyValue;

    this.state = {
      value,
      visibleValue: this.formatValue(value),
      isControlled,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const message =
      "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
      "Decide between using a controlled or uncontrolled input element for the lifetime of the component";
    const isControlled = this.isControlled();
    invariant(this.state.isControlled === isControlled, message);
    if (prevProps.precision !== this.props.precision) {
      // eslint-disable-next-line no-console
      console.error(
        "Decimal `precision` prop has changed value. Changing the Decimal `precision` prop has no effect."
      );
    }
    if (isControlled) {
      const valueProp = this.getSafeValueProp();
      if (valueProp !== prevState.value) {
        this.setState({
          value: valueProp,
          visibleValue: this.formatValue(valueProp),
        });
      }
    }
  }

  callOnChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.createEvent());
    }
  };

  onChange = (ev) => {
    const {
      target: { value },
    } = ev;
    this.setState(
      { value: this.toStandardDecimal(value), visibleValue: value },
      () => {
        this.callOnChange();
      }
    );
  };

  onBlur = () => {
    let shouldCallOnChange = false;
    this.setState(
      ({ value, visibleValue }) => {
        if (!visibleValue) {
          shouldCallOnChange = value !== this.emptyValue;
          return {
            value: this.emptyValue,
            visibleValue: this.formatValue(this.emptyValue),
          };
        }
        return {
          visibleValue: this.formatValue(value),
        };
      },
      () => {
        if (shouldCallOnChange) {
          this.callOnChange();
        }
        if (this.props.onBlur) {
          this.props.onBlur(this.createEvent());
        }
      }
    );
  };

  createEvent = () => {
    const standardVisible = this.toStandardDecimal(this.state.visibleValue);
    const formattedValue = this.isNaN(standardVisible)
      ? this.state.visibleValue
      : this.formatValue(standardVisible);
    return {
      target: {
        name: this.props.name,
        id: this.props.id,
        value: {
          rawValue: this.state.value,
          formattedValue,
        },
      },
    };
  };

  /**
   * Determine if the component is controlled at the time of call
   */
  isControlled() {
    return this.props.value !== undefined;
  }

  isNaN = (value) => {
    return Number.isNaN(Number(value));
  };

  getSafeValueProp = (isInitialValue) => {
    const { value, allowEmptyValue } = this.props;
    // We're intentionally preventing the use of number values to help prevent any unintentional rounding issues
    invariant(
      typeof value === "string",
      "Decimal `value` prop must be a string"
    );

    if (isInitialValue && !allowEmptyValue) {
      invariant(
        value !== "",
        "Decimal `value` must not be an empty string. Please use `allowEmptyValue` or `0.00`"
      );
    }
    return value;
  };

  removeDelimiters = (value) => {
    const delimiterMatcher = new RegExp(
      `[\\${this.getSeparator("group")} ]*`,
      "g"
    );
    return value.replace(delimiterMatcher, "");
  };

  /**
   * Format a user defined value
   */
  formatValue = (value) => {
    if (this.isNaN(value)) {
      return value;
    }

    /* Guards against any white-space only strings like "   " being 
       mishandled and returned as `NaN` for visibleValue */
    if (value === "" || value.match(/\s+/g)) {
      return value;
    }

    const separator = this.getSeparator("decimal");
    const [integer, remainder] = value.split(".");

    const formattedInteger = Intl.NumberFormat(
      this.props.locale || this.context.locale(),
      {
        maximumFractionDigits: 0,
      }
    ).format(integer);

    let formattedNumber = formattedInteger;
    if (remainder && remainder.length > this.props.precision) {
      formattedNumber += `${separator + remainder}`;
    } else if (remainder && remainder.length <= this.props.precision) {
      formattedNumber += `${
        separator +
        remainder +
        "0".repeat(this.props.precision - remainder.length)
      }`;
    } else {
      formattedNumber += `${
        this.props.precision ? separator + "0".repeat(this.props.precision) : ""
      }`;
    }
    return formattedNumber;
  };

  /**
   * Convert raw input to a standard decimal format
   */
  toStandardDecimal = (i18nValue) => {
    const valueWithoutNBS =
      this.getSeparator("group").match(/\s+/) && !i18nValue.match(/\s{2,}/)
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
    const separator = this.getSeparator("decimal");
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

    const withoutDelimiters = this.removeDelimiters(valueWithoutNBS);
    return withoutDelimiters.replace(new RegExp(`\\${separator}`, "g"), ".");
  };

  getSeparator(separatorType) {
    const numberWithGroupAndDecimalSeparator = 10000.1;
    return Intl.NumberFormat(this.props.locale || this.context.locale())
      .formatToParts(numberWithGroupAndDecimalSeparator)
      .find((part) => part.type === separatorType).value;
  }

  render() {
    const { name, defaultValue, locale, ...rest } = this.props;
    return (
      <>
        <Textbox
          {...rest}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.visibleValue}
        />
        <input
          name={name}
          value={this.toStandardDecimal(this.state.visibleValue)}
          type="hidden"
          data-component="hidden-input"
        />
      </>
    );
  }
}

Decimal.contextType = LocaleContext;

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
      props.precision > Decimal.maxPrecision
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

Decimal.defaultProps = {
  align: "right",
  precision: 2,
  allowEmptyValue: false,
  "data-component": "decimal",
};

export default Decimal;
