import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import DateInput from "../date";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledDateRange from "./date-range.style";
import DateHelper from "../../__internal__/date";
import LocaleContext from "../../__internal__/i18n-context";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const DateRange = ({
  defaultValue,
  endDateProps = {},
  id,
  labelsInline,
  name,
  onBlur,
  onChange,
  startDateProps = {},
  tooltipPosition,
  validationOnLabel,
  value,
  ...rest
}) => {
  const { locale, date } = useContext(LocaleContext);
  const format = date.formats.javascript();
  const formats = date.formats.inputs();
  const localeData = useMemo(
    () => ({ locale: locale(), formats, format }),
    [format, formats, locale]
  );
  const inlineLabelWidth = 40;
  const today = DateHelper.todayFormatted();
  const isControlled = value !== undefined;
  const startDateInputRef = useRef();
  const endDateInputRef = useRef();

  /** The startDate value */
  const getStartDate = useCallback(() => {
    const { value: startValue } = startDateProps;
    const computedValue = isControlled ? value : defaultValue;

    return startValue || computedValue ? computedValue[0] : undefined;
  }, [defaultValue, isControlled, startDateProps, value]);

  /** The endDate value */
  const getEndDate = useCallback(() => {
    const { value: endValue } = endDateProps;
    const computedValue = isControlled ? value : defaultValue;

    return endValue || computedValue ? computedValue[1] : undefined;
  }, [defaultValue, isControlled, endDateProps, value]);

  const [startDateValue, setStartDateValue] = useState({
    formattedValue: DateHelper.formatDateToCurrentLocale({
      value: getStartDate(),
      ...localeData,
    }),
    rawValue: DateHelper.formatValue({
      value: getStartDate() || (!isControlled ? today : ""),
      ...localeData,
    }),
  });

  const [endDateValue, setEndDateValue] = useState({
    formattedValue: DateHelper.formatDateToCurrentLocale({
      value: getEndDate(),
      ...localeData,
    }),
    rawValue: DateHelper.formatValue({
      value: getEndDate() || (!isControlled ? today : ""),
      ...localeData,
    }),
  });

  const updateValues = useCallback(() => {
    setStartDateValue({
      formattedValue: DateHelper.formatDateToCurrentLocale({
        value: getStartDate(),
        ...localeData,
      }),
      rawValue: DateHelper.formatValue({
        value: getStartDate() || today,
        ...localeData,
      }),
    });

    setEndDateValue({
      formattedValue: DateHelper.formatDateToCurrentLocale({
        value: getEndDate(),
        ...localeData,
      }),
      rawValue: DateHelper.formatValue({
        value: getEndDate() || today,
        ...localeData,
      }),
    });
  }, [getEndDate, getStartDate, localeData, today]);

  function usePrevious(arg) {
    const ref = useRef();
    useEffect(() => {
      ref.current = arg;
    });
    return ref.current;
  }

  const previousValue = usePrevious(value);

  useEffect(() => {
    const hasPreviousValues = previousValue?.length;
    const hasUpdated =
      isControlled &&
      hasPreviousValues &&
      (value[0] !== previousValue[0] || value[1] !== previousValue[1]);

    if (hasUpdated) {
      updateValues();
    }
  }, [value, previousValue, updateValues, isControlled]);

  const buildCustomEvent = useCallback(
    (changedDate, newValue) => {
      const startValue =
        changedDate === "startDate" && newValue ? newValue : startDateValue;
      const endValue =
        changedDate === "endDate" && newValue ? newValue : endDateValue;

      return {
        target: {
          ...(name && { name }),
          ...(id && { id }),
          value: [startValue, endValue],
        },
      };
    },
    [endDateValue, id, name, startDateValue]
  );

  const handleOnChange = (changedDate, ev) => {
    if (changedDate === "startDate") {
      setStartDateValue({ ...ev.target.value });
    } else {
      setEndDateValue({ ...ev.target.value });
    }

    if (onChange) {
      const event = buildCustomEvent(changedDate, ev.target.value);
      onChange(event);
    }
  };

  const startDateOnChange = (ev) => {
    handleOnChange("startDate", ev);
  };

  const endDateOnChange = (ev) => {
    handleOnChange("endDate", ev);
  };

  const isBlurBlocked = () => {
    const startBlocked =
      startDateInputRef?.current?.isBlurBlocked ||
      startDateInputRef?.current?.inputFocusedViaPicker;
    const endBlocked =
      endDateInputRef?.current?.isBlurBlocked ||
      endDateInputRef?.current?.inputFocusedViaPicker;

    return startBlocked || endBlocked;
  };

  const handleOnBlur = () => {
    if (isBlurBlocked()) {
      return;
    }

    if (onBlur) {
      const event = buildCustomEvent();
      onBlur(event);
    }
  };

  const blockBlur = (blockId) => {
    if (blockId === "start") {
      startDateInputRef.current.isBlurBlocked = true;
      startDateInputRef.current.inputFocusedViaPicker = true;
    } else {
      endDateInputRef.current.isBlurBlocked = true;
      endDateInputRef.current.inputFocusedViaPicker = true;
    }
  };

  const focusStart = () => {
    blockBlur("start");

    endDateInputRef.current.closeDatePicker();
  };

  const focusEnd = () => {
    blockBlur("end");

    startDateInputRef.current.closeDatePicker();
  };

  const dateProps = (propsKey) => {
    const props = propsKey === "start" ? startDateProps : endDateProps;

    const { rawValue } = propsKey === "start" ? startDateValue : endDateValue;
    const onChangeCallback =
      propsKey === "start" ? startDateOnChange : endDateOnChange;

    return {
      label: rest[`${propsKey}Label`],
      labelInline: labelsInline,
      value: rawValue,
      error: rest[`${propsKey}Error`],
      warning: rest[`${propsKey}Warning`],
      info: rest[`${propsKey}Info`],
      validationOnLabel,
      onBlur: handleOnBlur,
      onChange: onChangeCallback,
      ...props,
    };
  };

  return (
    <StyledDateRange
      {...tagComponent("date-range", rest)}
      labelsInline={labelsInline}
      {...filterStyledSystemMarginProps(rest)}
    >
      <DateInput
        {...dateProps("start")}
        onFocus={focusStart}
        data-element="start-date"
        ref={startDateInputRef}
        labelWidth={inlineLabelWidth} // Textbox only applies this when labelsInLine prop is true
        tooltipPosition={tooltipPosition}
      />
      <DateInput
        {...dateProps("end")}
        onFocus={focusEnd}
        data-element="end-date"
        ref={endDateInputRef}
        labelWidth={inlineLabelWidth} // Textbox only applies this when labelsInLine prop is true
        tooltipPosition={tooltipPosition}
      />
    </StyledDateRange>
  );
};

DateRange.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /**
   * Optional label for endDate field
   */
  endLabel: PropTypes.string,
  /** Custom callback - receives array of startDate and endDate */
  onChange: PropTypes.func,
  /** Custom callback - receives array of startDate and endDate */
  onBlur: PropTypes.func,
  /** An array containing the value of startDate and endDate */
  value: PropTypes.arrayOf(PropTypes.string),
  /* The default value of the input if it's meant to be used as an uncontrolled component */
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  /** Indicate that error has occurred on start date
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  startError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred on start date
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  startWarning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information for start date
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  startInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that error has occurred on end date
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  endError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred on end date
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  endWarning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information for end date
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  endInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icons will be placed on labels instead of being placed on the inputs */
  validationOnLabel: PropTypes.bool,
  /**
   * Optional label for startDate field
   */
  startLabel: PropTypes.string,
  /** Display labels inline */
  labelsInline: PropTypes.bool,
  /** Props for the child start Date component */
  startDateProps: PropTypes.shape({
    ...DateInput.propTypes,
    value: PropTypes.string,
  }),
  /** Props for the child end Date component */
  endDateProps: PropTypes.shape({
    ...DateInput.propTypes,
    value: PropTypes.string,
  }),
  /** An optional string prop to provide a name to the component */
  name: PropTypes.string,
  /** An optional string prop to provide an id to the component */
  id: PropTypes.string,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default DateRange;
