/* eslint-disable react/no-did-update-set-state */
import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import invariant from "invariant";
import Textbox from "../textbox";
import I18nHelper from "../../../utils/helpers/i18n";
import { filterStyledSystemMarginProps } from "../../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

class Decimal extends React.Component {
  static maxPrecision = 15;

  emptyValue = this.props.allowEmptyValue ? "" : "0.00";

  constructor(props) {
    super(props);

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
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const delimiterMatcher = new RegExp(`[${delimiter}]*`, "g");
    const noDelimiters = value.replace(delimiterMatcher, "");
    return noDelimiters;
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

    return I18nHelper.formatDecimal(value, this.props.precision, {
      round: false,
    });
  };

  /**
   * Convert raw input to a standard decimal format
   */
  toStandardDecimal = (i18nValue) => {
    /* If a value is passed in that is a number but has too many delimiters in succession, we want to handle this
    value without formatting it or removing delimiters. We also want to consider that,
    if a value consists of only delimiters, we want to treat that 
    value in the same way as if the value was NaN. We want to pass this value to the 
    formatValue function, before the delimiters can be removed. */
    const errorsWithDelimiter = new RegExp(
      `([^A-Za-z0-9]{2,})|(^[^A-Za-z0-9-]+)|([^0-9a-z-,.])|([^0-9-,.]+)|([W,.])$`,
      "g"
    );
    if (i18nValue.match(errorsWithDelimiter)) {
      return i18nValue;
    }

    const withoutDelimiters = this.removeDelimiters(i18nValue);
    const { separator } = I18nHelper.format();
    return withoutDelimiters.replace(new RegExp(`\\${separator}`, "g"), ".");
  };

  render() {
    const { name, defaultValue, ...rest } = this.props;
    return (
      <>
        <Textbox
          {...rest}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.visibleValue}
          data-component="decimal"
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

Decimal.propTypes = {
  /** Styled-system margin props */
  ...marginPropTypes,
  /**
   * The default value alignment on the input
   */
  align: PropTypes.string,
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
};

Decimal.defaultProps = {
  align: "right",
  precision: 2,
  allowEmptyValue: false,
};

export default Decimal;
