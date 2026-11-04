import { renderHook } from "@testing-library/react";

import useDatePickerFocus from "./useDatePickerFocus";

test("focuses a day on open and resets selector state on close", () => {
  jest.useFakeTimers();
  const focusTarget = document.createElement("button");
  document.body.appendChild(focusTarget);
  const resetChangedSelector = jest.fn();
  const getPickerDayFocusTarget = jest.fn(() => focusTarget);
  const { rerender } = renderHook(
    ({ open }) =>
      useDatePickerFocus({
        open,
        pickerDescriptionId: "description",
        getPickerDayFocusTarget,
        resetChangedSelector,
      }),
    { initialProps: { open: false } },
  );

  expect(resetChangedSelector).toHaveBeenCalledTimes(1);

  rerender({ open: true });
  jest.runOnlyPendingTimers();
  expect(getPickerDayFocusTarget).toHaveBeenCalledTimes(1);
  expect(focusTarget).toHaveFocus();

  rerender({ open: false });

  expect(resetChangedSelector).toHaveBeenCalledTimes(2);
  focusTarget.remove();
  jest.useRealTimers();
});

test("describes the focused day and removes the description on close", () => {
  jest.useFakeTimers();
  const day = document.createElement("button");
  document.body.appendChild(day);
  const { rerender } = renderHook(
    ({ open }) =>
      useDatePickerFocus({
        open,
        pickerDescriptionId: "description",
        getPickerDayFocusTarget: () => day,
        resetChangedSelector: jest.fn(),
      }),
    { initialProps: { open: true } },
  );

  jest.runOnlyPendingTimers();
  expect(day).toHaveFocus();
  expect(day).toHaveAttribute("aria-describedby", "description");

  rerender({ open: false });
  expect(day).not.toHaveAttribute("aria-describedby");

  day.remove();
  jest.useRealTimers();
});

test("does not throw when there is no day target", () => {
  jest.useFakeTimers();
  renderHook(() =>
    useDatePickerFocus({
      open: true,
      pickerDescriptionId: "description",
      getPickerDayFocusTarget: () => null,
      resetChangedSelector: jest.fn(),
    }),
  );

  expect(() => jest.runOnlyPendingTimers()).not.toThrow();
  jest.useRealTimers();
});
