import { act, renderHook, within } from "@testing-library/react";
import React from "react";

import useDatePickerKeyboardNavigation from "./useDatePickerKeyboardNavigation";

const renderKeyboardNavigation = (
  picker: HTMLDivElement,
  { open = true, onEscape = jest.fn() } = {},
) => {
  document.body.appendChild(picker);
  const ref = { current: picker } as React.RefObject<HTMLDivElement>;

  return renderHook(() =>
    useDatePickerKeyboardNavigation({
      ref,
      open,
      monthSelectId: "month",
      yearSelectId: "year",
      onEscape,
    }),
  );
};

const keyboardEvent = (key: string, { shiftKey = false } = {}) =>
  ({
    key,
    shiftKey,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  }) as unknown as React.KeyboardEvent<HTMLDivElement>;

afterEach(() => {
  document.body.innerHTML = "";
});

test("returns the first enabled day when selected and today are disabled", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <div class="rdp-selected"><button class="rdp-day_button" disabled>Selected</button></div>
    <div class="rdp-today"><button class="rdp-day_button" disabled>Today</button></div>
    <button class="rdp-day_button">Available</button>
  `;
  const { result } = renderKeyboardNavigation(picker);

  expect(result.current.getPickerDayFocusTarget()).toHaveTextContent(
    "Available",
  );
});

test("ignores disabled and aria-disabled days when choosing a focus target", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <div class="rdp-selected"><button class="rdp-day_button" aria-disabled="true">Selected</button></div>
    <div class="rdp-today"><button class="rdp-day_button" disabled>Today</button></div>
    <button class="rdp-day_button">Available</button>
  `;
  const { result } = renderKeyboardNavigation(picker);

  expect(result.current.getPickerDayFocusTarget()).toHaveTextContent(
    "Available",
  );
});

test("returns no day focus target when every day is disabled", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button" disabled>Disabled</button>
    <button class="rdp-day_button" aria-disabled="true">Aria disabled</button>
  `;
  const { result } = renderKeyboardNavigation(picker);

  expect(result.current.getPickerDayFocusTarget()).toBeNull();
});

test.each([
  [
    "focused",
    '<button class="rdp-day_button">Fallback</button><button class="rdp-day_button">Focused</button>',
    "Focused",
  ],
  [
    "selected",
    '<button class="rdp-day_button">Fallback</button><div class="rdp-selected"><button class="rdp-day_button">Selected</button></div>',
    "Selected",
  ],
  [
    "today",
    '<button class="rdp-day_button">Fallback</button><div class="rdp-today"><button class="rdp-day_button">Today</button></div>',
    "Today",
  ],
])("prioritizes the %s day as the focus target", (_, markup, expected) => {
  const picker = document.createElement("div");
  // Test cases contain fixed local markup rather than user-provided content.
  // eslint-disable-next-line no-unsanitized/property
  picker.innerHTML = markup;
  const { result } = renderKeyboardNavigation(picker);
  const target = within(picker).getByRole("button", { name: expected });
  if (expected === "Focused") target.focus();

  expect(result.current.getPickerDayFocusTarget()).toBe(target);
});

test("handles Escape only while the picker is open", () => {
  const picker = document.createElement("div");
  const onEscape = jest.fn();
  const { result, rerender } = renderKeyboardNavigation(picker, {
    onEscape,
  });
  const escapeEvent = keyboardEvent("Escape");

  act(() => result.current.handleKeyUp(escapeEvent));

  expect(onEscape).toHaveBeenCalledTimes(1);
  expect(escapeEvent.stopPropagation).toHaveBeenCalledTimes(1);

  rerender();
  const enterEvent = keyboardEvent("Enter");
  act(() => result.current.handleKeyUp(enterEvent));
  expect(onEscape).toHaveBeenCalledTimes(1);

  const { result: closedResult } = renderKeyboardNavigation(
    document.createElement("div"),
    { open: false, onEscape },
  );
  act(() => closedResult.current.handleKeyUp(keyboardEvent("Escape")));
  expect(onEscape).toHaveBeenCalledTimes(1);
});

test("moves focus forward through enabled controls and wraps", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close">Close</button>
    <select id="month" disabled><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const day = within(picker).getByRole("button", { name: "Day" });
  const close = within(picker).getByRole("button", { name: "Close" });
  const year = within(picker).getAllByRole("combobox")[1];

  day.focus();
  const firstTab = keyboardEvent("Tab");
  act(() => result.current.handleKeyDown(firstTab));
  expect(firstTab.preventDefault).toHaveBeenCalledTimes(1);
  expect(close).toHaveFocus();

  close.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));
  expect(year).toHaveFocus();

  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));
  expect(day).toHaveFocus();
});

test("preserves the established day, close, month, year focus order", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close">Close</button>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const day = within(picker).getByRole("button", { name: "Day" });
  const close = within(picker).getByRole("button", { name: "Close" });
  const [month, year] = within(picker).getAllByRole("combobox");

  day.focus();
  [close, month, year, day].forEach((expectedControl) => {
    act(() => result.current.handleKeyDown(keyboardEvent("Tab")));
    expect(expectedControl).toHaveFocus();
  });
});

test("excludes disabled and aria-disabled controls from the focus order", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close" aria-disabled="true">Close</button>
    <select id="month" disabled><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const day = within(picker).getByRole("button", { name: "Day" });
  const year = within(picker).getAllByRole("combobox")[1];

  day.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));

  expect(year).toHaveFocus();
});

test("excludes controls disabled by a fieldset from the focus order", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close">Close</button>
    <fieldset disabled><button>Disabled action</button></fieldset>
    <button>Enabled action</button>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const close = within(picker).getByRole("button", { name: "Close" });
  const enabledAction = within(picker).getByRole("button", {
    name: "Enabled action",
  });

  close.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));

  expect(enabledAction).toHaveFocus();
});

test("includes custom focusable picker content in the focus trap", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close">Close</button>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
    <a href="#custom">Custom action</a>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const day = within(picker).getByRole("button", { name: "Day" });
  const customAction = within(picker).getByRole("link", {
    name: "Custom action",
  });

  customAction.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));
  expect(day).toHaveFocus();

  day.focus();
  act(() =>
    result.current.handleKeyDown(keyboardEvent("Tab", { shiftKey: true })),
  );
  expect(customAction).toHaveFocus();
});

test("includes contenteditable picker content in the focus trap", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close">Close</button>
    <div contenteditable="true">Editable content</div>
  `;
  const editableContent = within(picker).getByText("Editable content");
  // JSDOM does not implement contenteditable's native tabIndex behavior.
  Object.defineProperty(editableContent, "tabIndex", { value: 0 });
  const { result } = renderKeyboardNavigation(picker);
  const close = within(picker).getByRole("button", { name: "Close" });

  close.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));

  expect(editableContent).toHaveFocus();
});

test("excludes hidden and inert custom content from the focus trap", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close">Close</button>
    <button hidden>Hidden</button>
    <div inert><button>Inert</button></div>
    <button style="display: none">Not displayed</button>
    <button style="visibility: hidden">Not visible</button>
    <button>Visible custom control</button>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const close = within(picker).getByRole("button", { name: "Close" });
  const visibleCustomControl = within(picker).getByRole("button", {
    name: "Visible custom control",
  });

  close.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));
  expect(visibleCustomControl).toHaveFocus();

  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));
  expect(within(picker).getByRole("button", { name: "Day" })).toHaveFocus();
});

test("traps focus among enabled controls when no enabled day exists", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button" disabled>Day</button>
    <button data-role="date-picker-close">Close</button>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const close = within(picker).getByRole("button", { name: "Close" });
  const year = within(picker).getAllByRole("combobox")[1];

  year.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));

  expect(close).toHaveFocus();
});

test("continues the focus order after a selector changes when no day is enabled", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button" disabled>Day</button>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const [month, year] = within(picker).getAllByRole("combobox");
  month.focus();

  act(() => {
    result.current.markSelectorChanged("month");
    result.current.handleKeyDown(keyboardEvent("Tab"));
  });

  expect(year).toHaveFocus();
});

test("moves focus backward, wraps, and clears a pending selector change", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <button data-role="date-picker-close">Close</button>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const day = within(picker).getByRole("button", { name: "Day" });
  const year = within(picker).getAllByRole("combobox")[1];
  day.focus();

  act(() => {
    result.current.markSelectorChanged("year");
    result.current.handleKeyDown(keyboardEvent("Tab", { shiftKey: true }));
  });
  expect(year).toHaveFocus();

  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));
  expect(day).toHaveFocus();
});

test("does not handle Tab when focus is outside the managed controls", () => {
  const picker = document.createElement("div");
  picker.innerHTML = '<button class="rdp-day_button">Available</button>';
  const outside = document.createElement("button");
  document.body.appendChild(outside);
  const { result } = renderKeyboardNavigation(picker);
  outside.focus();
  const preventDefault = jest.fn();

  act(() => {
    result.current.handleKeyDown({
      key: "Tab",
      shiftKey: false,
      preventDefault,
    } as unknown as React.KeyboardEvent<HTMLDivElement>);
  });

  expect(preventDefault).not.toHaveBeenCalled();
  expect(outside).toHaveFocus();
});

test("does not handle a day control outside the picker", () => {
  const picker = document.createElement("div");
  const outside = document.createElement("button");
  outside.className = "rdp-day_button";
  document.body.appendChild(outside);
  const { result } = renderKeyboardNavigation(picker);
  outside.focus();
  const event = keyboardEvent("Tab");

  act(() => result.current.handleKeyDown(event));

  expect(event.preventDefault).not.toHaveBeenCalled();
  expect(outside).toHaveFocus();
});

test("focuses the first current-month day after a selector changes", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <select id="month"><option>January</option></select>
    <div class="rdp-day rdp-outside"><button class="rdp-day_button">Outside</button></div>
    <div class="rdp-day"><button class="rdp-day_button">Current month</button></div>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const monthSelector = within(picker).getByRole("combobox");
  monthSelector.focus();
  const preventDefault = jest.fn();

  act(() => {
    result.current.markSelectorChanged("month");
    result.current.handleKeyDown({
      key: "Tab",
      shiftKey: false,
      preventDefault,
    } as unknown as React.KeyboardEvent<HTMLDivElement>);
  });

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(
    within(picker).getByRole("button", { name: "Current month" }),
  ).toHaveFocus();
});

test("focuses the fallback day after the year changes when no current-month day exists", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <select id="year"><option>2026</option></select>
    <button class="rdp-day_button">Fallback</button>
  `;
  const { result } = renderKeyboardNavigation(picker);
  within(picker).getByRole("combobox").focus();

  act(() => {
    result.current.markSelectorChanged("year");
    result.current.handleKeyDown(keyboardEvent("Tab"));
  });

  expect(
    within(picker).getByRole("button", { name: "Fallback" }),
  ).toHaveFocus();
});

test("resetChangedSelector restores the normal Tab order", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const [month, year] = within(picker).getAllByRole("combobox");
  month.focus();

  act(() => {
    result.current.markSelectorChanged("month");
    result.current.resetChangedSelector();
    result.current.handleKeyDown(keyboardEvent("Tab"));
  });

  expect(year).toHaveFocus();
});

test("restores the normal Tab order after focus leaves a changed selector", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const [month, year] = within(picker).getAllByRole("combobox");
  month.focus();

  act(() => {
    result.current.markSelectorChanged("month");
    result.current.handleBlur({
      target: month,
    } as unknown as React.FocusEvent<HTMLDivElement>);
  });
  month.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));

  expect(year).toHaveFocus();
});

test.each([
  ["month", "Close"],
  ["year", "Month"],
] as const)(
  "moves backward from a changed %s selector",
  (changedSelector, expectedControl) => {
    const picker = document.createElement("div");
    picker.innerHTML = `
      <button class="rdp-day_button">Day</button>
      <button data-role="date-picker-close">Close</button>
      <select id="month" aria-label="Month"><option>January</option></select>
      <select id="year" aria-label="Year"><option>2026</option></select>
    `;
    const { result } = renderKeyboardNavigation(picker);
    const selector = within(picker).getByRole("combobox", {
      name: changedSelector === "month" ? "Month" : "Year",
    });
    selector.focus();

    act(() => {
      result.current.markSelectorChanged(changedSelector);
      result.current.handleKeyDown(keyboardEvent("Tab", { shiftKey: true }));
    });

    expect(
      within(picker).getByRole(
        expectedControl === "Close" ? "button" : "combobox",
        { name: expectedControl },
      ),
    ).toHaveFocus();
  },
);

test("ignores non-Tab keydown events", () => {
  const picker = document.createElement("div");
  picker.innerHTML = '<button class="rdp-day_button">Day</button>';
  const { result } = renderKeyboardNavigation(picker);
  const day = within(picker).getByRole("button");
  day.focus();
  const event = keyboardEvent("Enter");

  act(() => result.current.handleKeyDown(event));

  expect(event.preventDefault).not.toHaveBeenCalled();
  expect(day).toHaveFocus();
});

test("does not handle Tab when there is no active element", () => {
  const picker = document.createElement("div");
  picker.innerHTML = '<button class="rdp-day_button">Day</button>';
  const { result } = renderKeyboardNavigation(picker);
  const activeElement = jest
    .spyOn(document, "activeElement", "get")
    .mockReturnValue(null);
  const event = keyboardEvent("Tab");

  act(() => result.current.handleKeyDown(event));

  expect(event.preventDefault).not.toHaveBeenCalled();
  activeElement.mockRestore();
});

test("returns no controls while the picker ref is empty", () => {
  const ref = { current: null } as React.RefObject<HTMLDivElement>;
  const { result } = renderHook(() =>
    useDatePickerKeyboardNavigation({
      ref,
      open: true,
      monthSelectId: "month",
      yearSelectId: "year",
      onEscape: jest.fn(),
    }),
  );

  expect(result.current.getPickerDayFocusTarget()).toBeNull();
  expect(() =>
    act(() => result.current.handleKeyDown(keyboardEvent("Tab"))),
  ).not.toThrow();
});

test("clears a pending year change when the year selector blurs", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <button class="rdp-day_button">Day</button>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const year = within(picker).getAllByRole("combobox")[1];

  act(() => {
    result.current.markSelectorChanged("year");
    result.current.handleBlur({
      target: year,
    } as unknown as React.FocusEvent<HTMLDivElement>);
  });
  year.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));

  expect(within(picker).getByRole("button", { name: "Day" })).toHaveFocus();
});

test("keeps a selector change pending when a different control blurs", () => {
  const picker = document.createElement("div");
  picker.innerHTML = `
    <div class="rdp-day"><button class="rdp-day_button">Day</button></div>
    <select id="month"><option>January</option></select>
    <select id="year"><option>2026</option></select>
  `;
  const { result } = renderKeyboardNavigation(picker);
  const [month, year] = within(picker).getAllByRole("combobox");

  act(() => {
    result.current.markSelectorChanged("month");
    result.current.handleBlur({
      target: year,
    } as unknown as React.FocusEvent<HTMLDivElement>);
  });
  month.focus();
  act(() => result.current.handleKeyDown(keyboardEvent("Tab")));

  expect(within(picker).getByRole("button", { name: "Day" })).toHaveFocus();
});
