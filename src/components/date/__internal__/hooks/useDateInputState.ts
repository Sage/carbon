import { useEffect, useRef, useState } from "react";

import {
  checkISOFormatAndLength,
  findMatchedFormatAndValue,
  formattedValue,
  parseISODate,
} from "../utils/utils";
import {
  buildDateChangeEvent,
  type DateInputEvent,
  getDateInputState,
} from "../utils/date-input-value.utils";

interface UseDateInputStateProps {
  allowEmptyValue?: boolean;
  format: string;
  formats: string[];
  value: string;
}

const useDateInputState = ({
  allowEmptyValue,
  format,
  formats,
  value,
}: UseDateInputStateProps) => {
  const [isInputPristine, setIsInputPristine] = useState(true);

  // Store the value prop at the time of the edit and the edited input value.
  // Preserve the user's formatting while value matches either.
  const valueChangeTracking = useRef<{
    editedInputValue?: string;
    valuePropBeforeEdit?: string;
  }>({});
  const shouldFormatValue =
    isInputPristine || value !== valueChangeTracking.current.editedInputValue;

  useEffect(() => {
    if (
      !isInputPristine &&
      value !== valueChangeTracking.current.valuePropBeforeEdit &&
      value !== valueChangeTracking.current.editedInputValue
    ) {
      valueChangeTracking.current = {};
      setIsInputPristine(true);
    }
  }, [isInputPristine, value]);

  // Changing locale or dateFormatOverride while the user is editing is unsupported.
  const { displayValue, selectedDate } = getDateInputState(
    value,
    format,
    formats,
    shouldFormatValue,
  );

  const trackEditedValue = (editedValue: string) => {
    valueChangeTracking.current = {
      editedInputValue: editedValue,
      valuePropBeforeEdit: value,
    };
    setIsInputPristine(false);
  };

  const createDateChangeEvent = (event: DateInputEvent) =>
    buildDateChangeEvent({
      allowEmptyValue,
      event,
      format,
      formats,
      selectedDate,
    });

  const valueForComparison = checkISOFormatAndLength(value)
    ? formattedValue(format, parseISODate(value))
    : value;
  const [, matchedValue] = findMatchedFormatAndValue(
    valueForComparison,
    formats,
  );
  const valueNeedsFormatting =
    formattedValue(format, selectedDate) !== matchedValue;

  return {
    displayValue,
    selectedDate,
    createDateChangeEvent,
    valueNeedsFormatting,
    trackEditedValue,
  };
};

export default useDateInputState;
