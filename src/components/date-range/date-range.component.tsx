import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import { MarginProps } from "styled-system";
import {
  formatToISO,
  formattedValue,
  parseISODate,
  checkISOFormatAndLength,
} from "../date/__internal__/utils";
import DateInput, { DateChangeEvent, DateInputProps } from "../date";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import StyledDateRange, { StyledDateRangeProps } from "./date-range.style";
import Events from "../../__internal__/utils/helpers/events";
import useLocale from "../../hooks/__internal__/useLocale";
import usePrevious from "../../hooks/__internal__/usePrevious";
import getFormatData from "../date/__internal__/date-formats";
import DateRangeContext, {
  DateRangeContextProps,
  InputName,
  SetInputRefMapValue,
} from "./__internal__/date-range.context";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";

interface DateInputValue {
  formattedValue: string;
  rawValue: string | null;
}

export interface DateRangeChangeEvent {
  target: {
    name?: string;
    id?: string;
    value: [DateInputValue, DateInputValue];
  };
}

export interface DateRangeProps
  extends StyledDateRangeProps,
    MarginProps,
    TagProps {
  /** Props for the child end Date component */
  endDateProps?: Omit<Partial<DateInputProps>, "required">;
  /** Optional label for endDate field */
  endLabel?: string;
  /**
   * Indicate that error has occurred on end date.
   * Pass string to display icon, tooltip and red border.
   * Pass true boolean to only display red border.
   */
  endError?: boolean | string;
  /**
   * [Legacy] Indicate additional information for end date.
   * Pass string to display icon, tooltip and blue border.
   * Pass true boolean to only display blue border.
   */
  endInfo?: boolean | string;
  /**
   * Indicate that warning has occurred on end date.
   * Pass string to display icon, tooltip and orange border.
   * Pass true boolean to only display orange border.
   */
  endWarning?: boolean | string;
  /**
   * A React ref to pass to the second of the two Date Input fields
   */
  endRef?: React.ForwardedRef<HTMLInputElement>;
  /** An optional string prop to provide an id to the component */
  id?: string;
  /** An optional string prop to provide a name to the component */
  name?: string;
  /** Specify a callback triggered on change */
  onChange: (ev: DateRangeChangeEvent) => void;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: DateRangeChangeEvent) => void;
  /** Props for the child start Date component */
  startDateProps?: Omit<Partial<DateInputProps>, "required">;
  /** Optional label for startDate field */
  startLabel?: string;
  /**
   * Indicate that error has occurred on start date.
   * Pass string to display icon, tooltip and red border.
   * Pass true boolean to only display red border.
   */
  startError?: boolean | string;
  /**
   * Indicate that warning has occurred on start date.
   * Pass string to display icon, tooltip and orange border.
   * Pass true boolean to only display orange border.
   */
  startWarning?: boolean | string;
  /**
   * [Legacy] Indicate additional information for start date.
   * Pass string to display icon, tooltip and blue border.
   * Pass true boolean to only display blue border.
   */
  startInfo?: boolean | string;
  /**
   * A React ref to pass to the first of the two Date Input fields
   */
  startRef?: React.ForwardedRef<HTMLInputElement>;
  /** An array containing the value of startDate and endDate */
  value: string[];
  /** [Legacy] When true, validation icons will be placed on labels instead of being placed on the inputs */
  validationOnLabel?: boolean;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Flag to configure component as mandatory. */
  required?: boolean;
  /** Flag to configure component as optional. */
  isOptional?: boolean;
}

export const DateRange = ({
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
  startRef,
  endRef,
  required,
  isOptional,
  ...rest
}: DateRangeProps) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const labelsInlineWithNewValidation = validationRedesignOptIn
    ? false
    : labelsInline;

  const l = useLocale();
  const { dateFnsLocale } = l.date;
  const { format } = useMemo(() => getFormatData(dateFnsLocale()), [
    dateFnsLocale,
  ]);
  const inlineLabelWidth = 40;
  const [lastChangedDate, setLastChangedDate] = useState("");

  const computedValue = useCallback(
    (valueString) => {
      if (checkISOFormatAndLength(valueString)) {
        return formattedValue(format, parseISODate(valueString));
      }

      return valueString;
    },
    [format]
  );

  const getStartDate = useCallback(() => {
    const { value: startValue } = startDateProps;

    return computedValue(startValue || value[0]);
  }, [startDateProps, value, computedValue]);

  const getEndDate = useCallback(() => {
    const { value: endValue } = endDateProps;

    return computedValue(endValue || value[1]);
  }, [endDateProps, value, computedValue]);

  const [inputRefMap, setInputRefMap] = useState<
    DateRangeContextProps["inputRefMap"]
  >({
    start: {
      isBlurBlocked: { current: false },
      setOpen: null,
    },
    end: {
      isBlurBlocked: { current: false },
      setOpen: null,
    },
  });

  function isEmptyValue(allowEmpty: boolean, inputValue: string) {
    return allowEmpty && !inputValue.length;
  }

  const [startDateValue, setStartDateValue] = useState<DateInputValue>({
    formattedValue: getStartDate(),
    rawValue: isEmptyValue(!!startDateProps.allowEmptyValue, getStartDate())
      ? ""
      : formatToISO(format, getStartDate()),
  });

  const [endDateValue, setEndDateValue] = useState<DateInputValue>({
    formattedValue: getEndDate(),
    rawValue: isEmptyValue(!!endDateProps.allowEmptyValue, getEndDate())
      ? ""
      : formatToISO(format, getEndDate()),
  });

  const previousValue = usePrevious(value);

  useEffect(() => {
    const updateValues = () => {
      setStartDateValue({
        formattedValue: getStartDate(),
        rawValue: isEmptyValue(!!startDateProps.allowEmptyValue, getStartDate())
          ? ""
          : formatToISO(format, getStartDate()),
      });

      setEndDateValue({
        formattedValue: getEndDate(),
        rawValue: isEmptyValue(!!endDateProps.allowEmptyValue, getEndDate())
          ? ""
          : formatToISO(format, getEndDate()),
      });
    };

    const hasPreviousValues = previousValue?.length;
    const hasUpdated =
      hasPreviousValues &&
      (value[0] !== previousValue[0] || value[1] !== previousValue[1]);

    if (hasUpdated) {
      updateValues();
    }
  }, [
    value,
    previousValue,
    endDateProps.allowEmptyValue,
    format,
    getEndDate,
    getStartDate,
    startDateProps.allowEmptyValue,
  ]);

  const buildCustomEvent = useCallback(
    (changedDate: string, newValue: DateInputValue) => {
      const startValue = changedDate === "start" ? newValue : startDateValue;
      const endValue = changedDate === "end" ? newValue : endDateValue;

      setLastChangedDate(changedDate);

      return {
        target: {
          ...(name && { name }),
          ...(id && { id }),
          value: [startValue, endValue] as [DateInputValue, DateInputValue],
        },
      };
    },
    [endDateValue, id, name, startDateValue]
  );

  const handleOnChange = (changedDate: InputName, ev: DateChangeEvent) => {
    if (changedDate === "start") {
      setStartDateValue({ ...ev.target.value });
    } else {
      setEndDateValue({ ...ev.target.value });
    }

    const event = buildCustomEvent(changedDate, ev.target.value);
    onChange(event);
  };

  const startDateOnChange = (ev: DateChangeEvent) => {
    handleOnChange("start", ev);
  };

  const endDateOnChange = (ev: DateChangeEvent) => {
    handleOnChange("end", ev);
  };

  const updateInputMap = (newState: SetInputRefMapValue) => {
    setInputRefMap((prev) => {
      return {
        ...prev,
        ...newState,
      };
    });
  };

  const isBlurBlocked = () =>
    inputRefMap?.start?.isBlurBlocked.current ||
    inputRefMap?.end?.isBlurBlocked.current;

  const handleOnBlur = (ev: DateChangeEvent) => {
    if (isBlurBlocked()) {
      return;
    }

    if (onBlur) {
      const event = buildCustomEvent(lastChangedDate, ev.target.value);
      onBlur(event);
    }
  };

  const closePicker = (activeInput: InputName) => {
    const refMap = inputRefMap?.[activeInput];

    /* istanbul ignore else */
    if (refMap) {
      refMap.setOpen?.(false);
      refMap.isBlurBlocked.current = false;
    }
  };

  const handleOnKeyDown = (
    ev: React.KeyboardEvent<HTMLInputElement>,
    activeInput: InputName
  ) => {
    if (Events.isTabKey(ev) && Events.isShiftKey(ev) && inputRefMap?.start) {
      inputRefMap.start.isBlurBlocked.current = !(activeInput === "start");
    } else if (Events.isTabKey(ev) && inputRefMap?.end) {
      inputRefMap.end.isBlurBlocked.current = !(activeInput === "end");
    }
  };

  const handleFocus = (inputName: InputName) => {
    closePicker(inputName);
    setLastChangedDate(inputName === "start" ? "end" : "start");
  };

  const dateProps = (propsKey: InputName) => {
    const props = propsKey === "start" ? startDateProps : endDateProps;

    const { formattedValue: inputValue } =
      propsKey === "start" ? startDateValue : endDateValue;
    const onChangeCallback =
      propsKey === "start" ? startDateOnChange : endDateOnChange;

    return {
      label: rest[`${propsKey}Label`],
      labelInline: labelsInlineWithNewValidation,
      value: inputValue,
      error: rest[`${propsKey}Error`],
      warning: rest[`${propsKey}Warning`],
      info: rest[`${propsKey}Info`],
      validationOnLabel,
      onBlur: handleOnBlur,
      onChange: onChangeCallback,
      onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) =>
        handleOnKeyDown(ev, propsKey),
      ...props,
      required,
      isOptional,
    };
  };

  return (
    <StyledDateRange
      {...tagComponent("date-range", rest)}
      labelsInline={labelsInlineWithNewValidation}
      {...filterStyledSystemMarginProps(rest)}
    >
      <DateRangeContext.Provider
        value={{ inputRefMap, setInputRefMap: updateInputMap }}
      >
        <DateInput
          my={0} // prevents any form spacing being applied
          {...dateProps("start")}
          onFocus={() => handleFocus("end")}
          data-element="start-date"
          inputName="start"
          labelWidth={inlineLabelWidth} // Textbox only applies this when labelsInLine prop is true
          tooltipPosition={tooltipPosition}
          ref={startRef}
        />
        <DateInput
          my={0} // prevents any form spacing being applied
          {...dateProps("end")}
          onFocus={() => handleFocus("start")}
          data-element="end-date"
          inputName="end"
          labelWidth={inlineLabelWidth} // Textbox only applies this when labelsInLine prop is true
          tooltipPosition={tooltipPosition}
          ref={endRef}
        />
      </DateRangeContext.Provider>
    </StyledDateRange>
  );
};

DateRange.displayName = "DateRange";

export default DateRange;
