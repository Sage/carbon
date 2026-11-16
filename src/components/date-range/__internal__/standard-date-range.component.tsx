import React, { useCallback, useState, useContext, useRef } from "react";
import DateInput, { DateChangeEvent } from "../../date";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import StyledDateRange from "../date-range.style";
import Events from "../../../__internal__/utils/helpers/events";
import DateRangeContext, {
  DateRangeContextProps,
  InputName,
  SetInputRefMapValue,
} from "./date-range.context";
import NewValidationContext from "../../carbon-provider/__internal__/new-validation.context";
import FieldsetContext from "../../fieldset/__internal__/fieldset.context";
import useDateRangeValue from "./useDateRangeValue";
import type { DateInputValue, DateRangeProps } from "../date-range.component";

export const StandardDateRange = ({
  rangeType: _rangeType,
  endDateProps = {},
  id,
  labelsInline,
  name,
  onBlur,
  onChange,
  size: sizeProp,
  startDateProps = {},
  startInfo: _startInfo,
  endInfo: _endInfo,
  tooltipPosition: _tooltipPosition,
  validationOnLabel: _validationOnLabel,
  value,
  startRef,
  endRef,
  required,
  dateFormatOverride,
  datePickerStartAriaLabel: _datePickerStartAriaLabel,
  datePickerStartAriaLabelledBy: _datePickerStartAriaLabelledBy,
  datePickerEndAriaLabel: _datePickerEndAriaLabel,
  datePickerEndAriaLabelledBy: _datePickerEndAriaLabelledBy,
  validationMessagePositionTop = true,
  ...rest
}: DateRangeProps) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const { size: fieldsetSize } = useContext(FieldsetContext);
  const size = fieldsetSize || sizeProp || startDateProps.size || "medium";
  const labelsInlineWithNewValidation = validationRedesignOptIn
    ? false
    : labelsInline;

  const { toDisplayValue, toDateInputValue, toRangeChangeEvent } =
    useDateRangeValue({
      dateFormatOverride,
      id,
      name,
    });
  const inlineLabelWidth = 40;
  const lastChangedDate = useRef("");

  const getStartDate = useCallback(() => {
    const { value: startValue } = startDateProps;

    return toDisplayValue(startValue || value[0]);
  }, [startDateProps, value, toDisplayValue]);

  const getEndDate = useCallback(() => {
    const { value: endValue } = endDateProps;

    return toDisplayValue(endValue || value[1]);
  }, [endDateProps, value, toDisplayValue]);

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

  const startDateValue = toDateInputValue(getStartDate(), startDateProps);
  const endDateValue = toDateInputValue(getEndDate(), endDateProps);

  const buildEventForChangedDate = (
    changedDate: string,
    newValue: DateInputValue,
  ) => {
    const startValue = changedDate === "start" ? newValue : startDateValue;
    const endValue = changedDate === "end" ? newValue : endDateValue;

    lastChangedDate.current = changedDate;

    return toRangeChangeEvent(startValue, endValue);
  };

  const handleOnChange = (changedDate: InputName, ev: DateChangeEvent) => {
    const event = buildEventForChangedDate(changedDate, ev.target.value);
    onChange(event);
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
      const event = buildEventForChangedDate(
        lastChangedDate.current,
        ev.target.value,
      );
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
    activeInput: InputName,
  ) => {
    if (Events.isTabKey(ev) && Events.isShiftKey(ev) && inputRefMap?.start) {
      inputRefMap.start.isBlurBlocked.current = !(activeInput === "start");
    } else if (Events.isTabKey(ev) && inputRefMap?.end) {
      inputRefMap.end.isBlurBlocked.current = !(activeInput === "end");
    }
  };

  const handleFocus = (inputName: InputName) => {
    closePicker(inputName);
    lastChangedDate.current = inputName === "start" ? "end" : "start";
  };

  const dateProps = (propsKey: InputName) => {
    const {
      onChange: consumerOnChange,
      onBlur: consumerOnBlur,
      onKeyDown: consumerOnKeyDown,
      onFocus: consumerOnFocus,
      ...props
    } = propsKey === "start" ? startDateProps : endDateProps;
    const otherInput = propsKey === "start" ? "end" : "start";

    const { formattedValue: inputValue } =
      propsKey === "start" ? startDateValue : endDateValue;

    return {
      label: rest[`${propsKey}Label`],
      labelInline: labelsInlineWithNewValidation,
      value: inputValue,
      error: rest[`${propsKey}Error`],
      warning: rest[`${propsKey}Warning`],
      name: name ? `${name}-${propsKey}` : undefined,
      dateFormatOverride,
      ...props,
      onBlur: (ev: DateChangeEvent) => {
        handleOnBlur(ev);
        consumerOnBlur?.(ev);
      },
      onChange: (ev: DateChangeEvent) => {
        handleOnChange(propsKey, ev);
        consumerOnChange?.(ev);
      },
      onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => {
        handleOnKeyDown(ev, propsKey);
        consumerOnKeyDown?.(ev);
      },
      onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
        handleFocus(otherInput);
        consumerOnFocus?.(ev);
      },
      size,
      required,
    };
  };

  return (
    <StyledDateRange
      {...tagComponent("date-range", rest)}
      labelsInline={labelsInlineWithNewValidation}
      $size={size}
      {...filterStyledSystemMarginProps(rest)}
      validationMessagePositionTop={validationMessagePositionTop}
    >
      <DateRangeContext.Provider
        value={{
          inputRefMap,
          setInputRefMap: updateInputMap,
          validationMessagePositionTop,
        }}
      >
        <DateInput
          my={0} // prevents any form spacing being applied
          {...dateProps("start")}
          data-element="start-date"
          inputName="start"
          labelWidth={inlineLabelWidth}
          ref={startRef}
        />
        <DateInput
          my={0} // prevents any form spacing being applied
          {...dateProps("end")}
          data-element="end-date"
          inputName="end"
          labelWidth={inlineLabelWidth}
          ref={endRef}
        />
      </DateRangeContext.Provider>
    </StyledDateRange>
  );
};

export default StandardDateRange;
