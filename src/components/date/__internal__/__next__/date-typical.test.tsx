import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { testStyledSystemMargin } from "../../../../__spec_helper__/__internal__/test-utils";
import useIsAboveBreakpoint from "../../../../hooks/__internal__/useIsAboveBreakpoint";

import DateInput from "../../date.component";

jest.mock("../../../../hooks/__internal__/useIsAboveBreakpoint");

const mockUseIsAboveBreakpoint = useIsAboveBreakpoint as jest.MockedFunction<
  typeof useIsAboveBreakpoint
>;

const TypicalDateInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof DateInput>
>((props, ref) => <DateInput variant="typical" ref={ref} {...props} />);

TypicalDateInput.displayName = "TypicalDateInput";

const formatDateInputValue = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const ControlledTypicalDateInput = ({
  initialValue,
}: {
  initialValue: string;
}) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={(ev) => setValue(ev.target.value.formattedValue)}
      value={value}
    />
  );
};

testStyledSystemMargin(
  (props) => <TypicalDateInput onChange={() => {}} value="" {...props} />,
  () => screen.getAllByRole("presentation")[0],
);

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  mockUseIsAboveBreakpoint.mockReset();
});

afterAll(() => {
  jest.useRealTimers();
});

test("should keep tab order from input to calendar button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  await user.tab();
  expect(screen.getByRole("textbox")).toHaveFocus();

  await user.tab();
  const calendarButton = screen.getByRole("button", { name: "calendar" });
  expect(calendarButton).toHaveFocus();
  expect(calendarButton).toHaveAttribute("aria-haspopup", "dialog");
  expect(calendarButton).toHaveAttribute("aria-expanded", "false");
});

test("should move focus from toggle to next interactive element when picker is closed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <>
      <TypicalDateInput
        label="Date"
        name="typical-date"
        onChange={() => {}}
        value=""
      />
      <button type="button">After</button>
    </>,
  );

  await user.tab();
  await user.tab();
  expect(screen.getByRole("button", { name: "calendar" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
});

test("should not open picker when focusing the input", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  await user.tab();
  expect(screen.getByRole("textbox")).toHaveFocus();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("should open picker and focus selected day when Enter is pressed on calendar button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="04/04/2019"
    />,
  );

  await user.tab();
  await user.tab();
  await user.keyboard("{Enter}");
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("grid")).toBeVisible();
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: /Thursday, April 4th, 2019/ }),
    ).toHaveFocus();
  });
});

test("should open picker and focus selected day when Space is pressed on calendar button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="04/04/2019"
    />,
  );

  const calendarButton = screen.getByRole("button", { name: "calendar" });
  calendarButton.focus();
  await user.keyboard("[Space]");
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("grid")).toBeVisible();
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: /Thursday, April 4th, 2019/ }),
    ).toHaveFocus();
  });
});

test("should open picker and focus a day when calendar button is clicked", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  const calendarButton = screen.getByRole("button", { name: "calendar" });
  await user.click(calendarButton);
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(calendarButton).toHaveAttribute("aria-expanded", "true");

  const picker = screen.getByRole("grid");
  expect(picker).toBeVisible();

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /today/i })).toHaveFocus();
  });
});

test("should wire dialog and calendar labelling to month and year selectors", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");

  const monthSelector = within(dialog).getByRole("combobox", {
    name: "Choose the Month",
  });
  const yearSelector = within(dialog).getByRole("combobox", {
    name: "Choose the Year",
  });
  const labelledBy = dialog.getAttribute("aria-labelledby");
  const labelledByIds = labelledBy?.split(" ") || [];

  expect(labelledByIds).toContain(monthSelector.getAttribute("id"));
  expect(labelledByIds).toContain(yearSelector.getAttribute("id"));

  const grid = within(dialog).getByRole("grid");
  expect(grid).toHaveAttribute("aria-labelledby", labelledBy);
});

test("should render date buttons with type button and hidden full date text", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const selectedDay = screen.getByRole("button", {
    name: "Tuesday, July 15th, 2025, selected",
  });
  expect(selectedDay).toHaveAttribute("type", "button");
  expect(selectedDay).toHaveTextContent("Tuesday, July 15th, 2025, selected");
  expect(within(selectedDay).getByText("15")).toBeInTheDocument();

  const dateButtons = within(screen.getByRole("grid")).getAllByRole("button");
  expect(dateButtons.length).toBeGreaterThan(0);
  dateButtons.forEach((button) => {
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent(/\w+, \w+ \d/);
  });
});

test("should render today indicator when today is selected", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value={formatDateInputValue(new Date())}
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const todayButton = screen.getByRole("button", { name: /today/i });
  expect(
    within(todayButton).getByTestId("date-picker-today-indicator"),
  ).toBeInTheDocument();
});

test("should cycle focus inside picker for tab and shift-tab in single mode", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const todayButton = screen.getByRole("button", { name: /today/i });
  const closeButton = screen.getByRole("button", { name: "Close" });
  const monthSelector = screen.getByRole("combobox", {
    name: "Choose the Month",
  });
  const yearSelector = screen.getByRole("combobox", {
    name: "Choose the Year",
  });

  expect(todayButton).toHaveFocus();

  await user.tab();
  expect(closeButton).toHaveFocus();
  await user.tab();
  expect(monthSelector).toHaveFocus();
  await user.tab();
  expect(yearSelector).toHaveFocus();
  await user.tab();
  expect(todayButton).toHaveFocus();

  await user.tab({ shift: true });
  expect(yearSelector).toHaveFocus();
  await user.tab({ shift: true });
  expect(monthSelector).toHaveFocus();
  await user.tab({ shift: true });
  expect(closeButton).toHaveFocus();
  await user.tab({ shift: true });
  expect(todayButton).toHaveFocus();
});

test("should render the footer close action as a button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
    "type",
    "button",
  );
});

test("should use inputHint instead of unsupported legacy fieldHelp", () => {
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
      fieldHelp="Legacy field help"
      inputHint="Typical input hint"
      validationIconId="legacy-validation-icon"
      validationMessagePositionTop
    />,
  );

  expect(screen.getByText("Typical input hint")).toBeVisible();
  expect(screen.queryByText("Legacy field help")).not.toBeInTheDocument();
  expect(screen.getByRole("textbox")).not.toHaveAttribute("validationIconId");
});

test("should render inputHint and describe the input when no label is provided", () => {
  render(
    <TypicalDateInput
      name="typical-date"
      onChange={() => {}}
      value=""
      inputHint="Use DD/MM/YYYY"
    />,
  );

  const hint = screen.getByText("Use DD/MM/YYYY");
  const input = screen.getByRole("textbox");

  expect(hint).toBeVisible();
  expect(input).toHaveAttribute("aria-describedby", hint.getAttribute("id"));
});

test("should close picker on Escape", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("dialog")).toBeVisible();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("should close picker and call onPickerClose when clicking outside", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onPickerClose = jest.fn();
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      onPickerClose={onPickerClose}
      value=""
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("dialog")).toBeVisible();

  await user.click(document.body);

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(onPickerClose).toHaveBeenCalledTimes(1);
});

test("should close picker and call onPickerClose when clicking the input", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onPickerClose = jest.fn();
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      onPickerClose={onPickerClose}
      value=""
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("dialog")).toBeVisible();

  await user.click(screen.getByRole("textbox"));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(onPickerClose).toHaveBeenCalledTimes(1);
});

test("should close in single mode when date is selected with Enter", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(
    screen.getByRole("button", { name: /Tuesday, July 15th, 2025/ }),
  ).toHaveFocus();
  await user.keyboard("{Enter}");

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("should move focus into the picker when disablePortal is false", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
      disablePortal={false}
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  await user.click(screen.getByRole("textbox"));
  await user.tab();

  expect(
    screen.getByRole("button", { name: /Tuesday, July 15th, 2025/ }),
  ).toHaveFocus();
});

test("should close in single mode when date is selected with Space", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  await user.keyboard("[Space]");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("should keep focus on selector when selecting with keyboard arrows", async () => {
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
    />,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const monthSelector = screen.getByRole("combobox", {
    name: "Choose the Month",
  });

  act(() => {
    monthSelector.focus();
  });
  expect(monthSelector).toHaveFocus();

  await user.keyboard("[ArrowDown]");

  expect(monthSelector).toHaveFocus();
});

test("should keep focus on month selector until Tab after month change", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/01/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const monthSelector = screen.getByRole("combobox", {
    name: "Choose the Month",
  });
  act(() => {
    monthSelector.focus();
  });
  fireEvent.change(monthSelector, { target: { value: "2" } });
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(monthSelector).toHaveFocus();
  expect(monthSelector).toHaveValue("2");

  const firstAvailableDay = within(screen.getByRole("grid")).getAllByRole(
    "button",
  )[0];

  await user.tab();
  await waitFor(() => {
    expect(firstAvailableDay).toHaveFocus();
  });
});

test("should update input value when selected date month is changed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<ControlledTypicalDateInput initialValue="15/01/2025" />);

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const monthSelector = screen.getByRole("combobox", {
    name: "Choose the Month",
  });
  act(() => {
    monthSelector.focus();
  });
  fireEvent.change(monthSelector, { target: { value: "1" } });
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("textbox")).toHaveValue("15/02/2025");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(monthSelector).toHaveFocus();
});

test("should keep focus on year selector until Tab after year change", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/01/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const yearSelector = screen.getByRole("combobox", {
    name: "Choose the Year",
  });
  act(() => {
    yearSelector.focus();
  });
  fireEvent.change(yearSelector, { target: { value: "2026" } });
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(yearSelector).toHaveFocus();
  expect(yearSelector).toHaveValue("2026");

  const firstAvailableDay = within(screen.getByRole("grid")).getAllByRole(
    "button",
  )[0];

  await user.tab();
  await waitFor(() => {
    expect(firstAvailableDay).toHaveFocus();
  });
});

test("should update input value when selected date year is changed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<ControlledTypicalDateInput initialValue="15/01/2025" />);

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const yearSelector = screen.getByRole("combobox", {
    name: "Choose the Year",
  });
  act(() => {
    yearSelector.focus();
  });
  fireEvent.change(yearSelector, { target: { value: "2026" } });
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("textbox")).toHaveValue("15/01/2026");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(yearSelector).toHaveFocus();
});

test("should move focus with up and down arrows by week", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const selectedDay = screen.getByRole("button", {
    name: /Tuesday, July 15th, 2025/,
  });
  expect(selectedDay).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  expect(
    screen.getByRole("button", { name: /Tuesday, July 8th, 2025/ }),
  ).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(selectedDay).toHaveFocus();
});

test("should wrap left arrow to previous month boundary", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="01/07/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(
    screen.getByRole("button", { name: /Tuesday, July 1st, 2025/ }),
  ).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(
    screen.getByRole("button", { name: /Monday, June 30th, 2025/ }),
  ).toHaveFocus();
});

test("should wrap right arrow to next month boundary", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="31/07/2025"
    />,
  );

  await user.click(screen.getByRole("button", { name: "calendar" }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(
    screen.getByRole("button", { name: /Thursday, July 31st, 2025/ }),
  ).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(
    screen.getByRole("button", { name: /Friday, August 1st, 2025/ }),
  ).toHaveFocus();
});

test("should disable calendar button when readOnly or disabled", () => {
  const { rerender } = render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
      readOnly
    />,
  );

  expect(screen.getByRole("button", { name: "calendar" })).toBeDisabled();

  rerender(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
      disabled
    />,
  );

  expect(screen.getByRole("button", { name: "calendar" })).toBeDisabled();
});

test("should render inline required label without hint", () => {
  render(
    <TypicalDateInput
      label="Date"
      labelInline
      required
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );
  expect(screen.getByText("Date")).toBeInTheDocument();
  expect(screen.queryByText("*")).not.toBeInTheDocument();
});

test("should render stacked layout when adaptiveLabelBreakpoint is set and screen is below breakpoint", () => {
  mockUseIsAboveBreakpoint.mockReturnValue(false);
  render(
    <TypicalDateInput
      adaptiveLabelBreakpoint={1000}
      label="Date"
      labelInline
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  expect(screen.getByTestId("date-input-wrapper")).toHaveStyleRule(
    "flex-direction",
    "column",
  );
});

test("should render inline layout when adaptiveLabelBreakpoint is set and screen is above breakpoint", () => {
  mockUseIsAboveBreakpoint.mockReturnValue(true);
  render(
    <TypicalDateInput
      adaptiveLabelBreakpoint={1000}
      label="Date"
      labelInline
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  expect(screen.getByTestId("date-input-wrapper")).toHaveStyleRule(
    "flex-direction",
    "row",
  );
});

test("should align stacked label and hint when labelAlign is right", () => {
  render(
    <TypicalDateInput
      inputHint="Hint text"
      label="Date"
      labelAlign="right"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  expect(screen.getByTestId("label-wrapper")).toHaveStyleRule(
    "align-items",
    "flex-end",
  );
  expect(screen.getByTestId("label-wrapper")).toHaveStyleRule(
    "text-align",
    "right",
  );
});

test("should align inline label and hint when labelAlign is left", () => {
  render(
    <TypicalDateInput
      inputHint="Hint text"
      label="Date"
      labelAlign="left"
      labelInline
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  expect(screen.getByTestId("label-wrapper")).toHaveStyleRule(
    "align-items",
    "flex-start",
  );
  expect(screen.getByTestId("label-wrapper")).toHaveStyleRule(
    "text-align",
    "left",
  );
});

test("should use custom labelId when provided", () => {
  render(
    <TypicalDateInput
      label="Date"
      labelId="custom-date-label"
      name="typical-date"
      onChange={() => {}}
      value="15/07/2025"
    />,
  );

  expect(screen.getByText("Date")).toHaveAttribute("id", "custom-date-label");
});

test("should call onFocus when input receives focus", () => {
  const onFocus = jest.fn();
  render(
    <TypicalDateInput
      label="Date"
      name="typical-date"
      onChange={() => {}}
      value=""
      onFocus={onFocus}
    />,
  );

  act(() => {
    screen.getByRole("textbox").focus();
  });

  expect(onFocus).toHaveBeenCalled();
});
