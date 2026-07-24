import React, { useEffect, useRef } from "react";

interface UseDatePickerMonthSyncProps {
  open?: boolean;
  selectedDate?: Date;
  focusedMonth?: Date;
  setFocusedMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const useDatePickerMonthSync = ({
  open,
  selectedDate,
  focusedMonth,
  setFocusedMonth,
}: UseDatePickerMonthSyncProps) => {
  const previousSelectedDate = useRef<number>();

  // Keep the selected date's day and time when synchronizing. Consumers use the
  // month and year for display, while preserving the complete selected value.
  useEffect(() => {
    const selectedDateTime = selectedDate?.getTime();
    const selectedDateChanged =
      previousSelectedDate.current !== selectedDateTime;
    previousSelectedDate.current = selectedDateTime;

    if (!selectedDate || (open && !selectedDateChanged)) return;

    const focusedMonthMatches =
      focusedMonth?.getMonth() === selectedDate.getMonth() &&
      focusedMonth.getFullYear() === selectedDate.getFullYear();

    if (!focusedMonthMatches) setFocusedMonth(selectedDate);
  }, [focusedMonth, open, selectedDate, setFocusedMonth]);
};

export default useDatePickerMonthSync;
