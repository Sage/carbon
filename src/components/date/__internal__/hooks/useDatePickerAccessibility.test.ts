import { renderHook, within } from "@testing-library/react";

import useDatePickerAccessibility from "./useDatePickerAccessibility";

const createPickerRef = () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <table class="rdp-month_grid" role="grid"></table>
    <table class="rdp-month_grid" role="grid"></table>
  `;

  return {
    picker,
    ref: { current: picker },
  };
};

test("does not label grids while the picker is closed", () => {
  const { picker, ref } = createPickerRef();

  renderHook(() =>
    useDatePickerAccessibility({
      ref,
      open: false,
      focusedMonth: new Date(2025, 0, 1),
      labelledBy: "month year",
    }),
  );

  within(picker)
    .getAllByRole("grid")
    .forEach((grid) => {
      expect(grid).not.toHaveAttribute("aria-labelledby");
    });
});

test("labels every grid and reapplies the label when the focused month changes", () => {
  const { picker, ref } = createPickerRef();
  const { rerender } = renderHook(
    ({ focusedMonth }) =>
      useDatePickerAccessibility({
        ref,
        open: true,
        focusedMonth,
        labelledBy: "month year",
      }),
    { initialProps: { focusedMonth: new Date(2025, 0, 1) } },
  );
  const grids = within(picker).getAllByRole("grid");

  grids.forEach((grid) => {
    expect(grid).toHaveAttribute("aria-labelledby", "month year");
    grid.removeAttribute("aria-labelledby");
  });

  rerender({ focusedMonth: new Date(2025, 1, 1) });

  grids.forEach((grid) => {
    expect(grid).toHaveAttribute("aria-labelledby", "month year");
  });
});
