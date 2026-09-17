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
