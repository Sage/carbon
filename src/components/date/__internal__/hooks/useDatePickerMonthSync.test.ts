import { renderHook } from "@testing-library/react";

import useDatePickerMonthSync from "./useDatePickerMonthSync";

test("updates the focused month when the selected date changes", () => {
  const setFocusedMonth = jest.fn();
  const initialSelectedDay = new Date(2025, 0, 10);
  const nextSelectedDay = new Date(2025, 5, 15);
  const { rerender } = renderHook(
    ({ selectedDate }) =>
      useDatePickerMonthSync({
        open: true,
        selectedDate,
        focusedMonth: initialSelectedDay,
        setFocusedMonth,
      }),
    { initialProps: { selectedDate: initialSelectedDay } },
  );

  setFocusedMonth.mockClear();
  rerender({ selectedDate: nextSelectedDay });

  expect(setFocusedMonth).toHaveBeenCalledTimes(1);
  expect(setFocusedMonth).toHaveBeenCalledWith(nextSelectedDay);
});

test("resets the focused month to the selected date when the picker closes", () => {
  const setFocusedMonth = jest.fn();
  const selectedDate = new Date(2025, 0, 10);
  const focusedMonth = new Date(2025, 5, 1);
  const { rerender } = renderHook(
    ({ open }) =>
      useDatePickerMonthSync({
        open,
        selectedDate,
        focusedMonth,
        setFocusedMonth,
      }),
    { initialProps: { open: true } },
  );

  setFocusedMonth.mockClear();
  rerender({ open: false });

  expect(setFocusedMonth).toHaveBeenCalledTimes(1);
  expect(setFocusedMonth).toHaveBeenCalledWith(selectedDate);
});

test("resets on close when the month matches but the year differs", () => {
  const setFocusedMonth = jest.fn();
  const selectedDate = new Date(2025, 0, 10);
  const focusedMonth = new Date(2026, 0, 1);

  renderHook(() =>
    useDatePickerMonthSync({
      open: false,
      selectedDate,
      focusedMonth,
      setFocusedMonth,
    }),
  );

  expect(setFocusedMonth).toHaveBeenCalledWith(selectedDate);
});

test("does not reset on close when the focused month and year already match", () => {
  const setFocusedMonth = jest.fn();

  renderHook(() =>
    useDatePickerMonthSync({
      open: false,
      selectedDate: new Date(2025, 0, 10),
      focusedMonth: new Date(2025, 0, 1),
      setFocusedMonth,
    }),
  );

  expect(setFocusedMonth).not.toHaveBeenCalled();
});

test("does not update the focused month when there is no selected date", () => {
  const setFocusedMonth = jest.fn();

  renderHook(() =>
    useDatePickerMonthSync({
      open: false,
      focusedMonth: new Date(2025, 0, 1),
      setFocusedMonth,
    }),
  );

  expect(setFocusedMonth).not.toHaveBeenCalled();
});

test("updates exactly once when the selected date changes while closed", () => {
  const setFocusedMonth = jest.fn();
  const initialSelectedDate = new Date(2025, 0, 10, 9, 30);
  const nextSelectedDate = new Date(2025, 5, 15, 14, 45);
  const { rerender } = renderHook(
    ({ selectedDate, focusedMonth }) =>
      useDatePickerMonthSync({
        open: false,
        selectedDate,
        focusedMonth,
        setFocusedMonth,
      }),
    {
      initialProps: {
        selectedDate: initialSelectedDate,
        focusedMonth: initialSelectedDate,
      },
    },
  );

  setFocusedMonth.mockClear();
  rerender({
    selectedDate: nextSelectedDate,
    focusedMonth: initialSelectedDate,
  });

  expect(setFocusedMonth).toHaveBeenCalledTimes(1);
  expect(setFocusedMonth).toHaveBeenCalledWith(nextSelectedDate);
});

test("does not update when the selected date changes within the focused month", () => {
  const setFocusedMonth = jest.fn();
  const focusedMonth = new Date(2025, 5, 1);
  const { rerender } = renderHook(
    ({ selectedDate }) =>
      useDatePickerMonthSync({
        open: false,
        selectedDate,
        focusedMonth,
        setFocusedMonth,
      }),
    { initialProps: { selectedDate: new Date(2025, 5, 10) } },
  );

  rerender({ selectedDate: new Date(2025, 5, 20) });

  expect(setFocusedMonth).not.toHaveBeenCalled();
});

test("does not undo month navigation while the picker is open", () => {
  const setFocusedMonth = jest.fn();
  const selectedDate = new Date(2025, 0, 10);
  const { rerender } = renderHook(
    ({ focusedMonth }) =>
      useDatePickerMonthSync({
        open: true,
        selectedDate,
        focusedMonth,
        setFocusedMonth,
      }),
    { initialProps: { focusedMonth: selectedDate } },
  );

  rerender({ focusedMonth: new Date(2025, 5, 1) });

  expect(setFocusedMonth).not.toHaveBeenCalled();
});
