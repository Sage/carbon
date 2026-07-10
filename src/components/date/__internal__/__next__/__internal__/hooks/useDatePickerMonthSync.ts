import React, { useEffect } from "react";

interface UseDatePickerMonthSyncProps {
  open?: boolean;
  selectedDays?: Date;
  focusedMonth?: Date;
  setFocusedMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const useDatePickerMonthSync = ({
  open,
  selectedDays,
  focusedMonth,
  setFocusedMonth,
}: UseDatePickerMonthSyncProps) => {
  // Update the picker grid to the month containing a newly selected date.
  useEffect(() => {
    if (selectedDays) setFocusedMonth(selectedDays);
  }, [selectedDays, setFocusedMonth]);

  // After closing the picker, reset navigation so reopening shows the selected date.
  useEffect(() => {
    if (
      !open &&
      selectedDays &&
      (focusedMonth?.getMonth() !== selectedDays.getMonth() ||
        focusedMonth?.getFullYear() !== selectedDays.getFullYear())
    ) {
      setFocusedMonth(selectedDays);
    }
  }, [focusedMonth, open, selectedDays, setFocusedMonth]);
};

export default useDatePickerMonthSync;
