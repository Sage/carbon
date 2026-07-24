import React from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CalendarSelect from "./index";
import useCustomizableSelectMarkup from "./useCustomizableSelectMarkup";

const options = [
  { value: 0, label: "January" },
  { value: 1, label: "February", disabled: true },
  { value: "2", label: "March" },
];

const noop = () => {};

test("renders options and coerces values to strings", () => {
  render(
    <CalendarSelect
      aria-label="Choose month"
      onChange={noop}
      options={options}
      value={0}
    />,
  );

  const selector = screen.getByRole("combobox", { name: "Choose month" });
  expect(selector).toHaveValue("0");
  expect(screen.getByRole("option", { name: "January" })).toHaveValue("0");
  expect(screen.getByRole("option", { name: "March" })).toHaveValue("2");
});

test("passes native select props to the select element", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const onFocus = jest.fn();

  render(
    <CalendarSelect
      aria-label="Choose month"
      name="month"
      required
      options={options}
      value={0}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />,
  );

  const selector = screen.getByRole("combobox", { name: "Choose month" });
  expect(selector).toHaveAttribute("name", "month");
  expect(selector).toBeRequired();

  await user.click(selector);
  expect(onFocus).toHaveBeenCalled();

  await user.selectOptions(selector, "2");
  expect(onChange).toHaveBeenCalledTimes(1);

  await user.tab();
  expect(onBlur).toHaveBeenCalled();
});

test("supports native uncontrolled usage with defaultValue", () => {
  render(
    <CalendarSelect
      aria-label="Choose month"
      defaultValue="2"
      options={options}
    />,
  );

  expect(screen.getByRole("combobox", { name: "Choose month" })).toHaveValue(
    "2",
  );
});

test("supports accessible naming with aria-labelledby and descriptions", () => {
  render(
    <>
      <span id="month-label">Month</span>
      <span id="month-hint">Pick a month</span>
      <CalendarSelect
        aria-describedby="month-hint"
        aria-labelledby="month-label"
        onChange={noop}
        options={options}
        value={0}
      />
    </>,
  );

  const selector = screen.getByRole("combobox", { name: "Month" });
  expect(selector).toHaveAccessibleDescription("Pick a month");
});

test("renders disabled option and disabled select states", () => {
  render(
    <CalendarSelect
      aria-label="Choose month"
      disabled
      onChange={noop}
      options={options}
      value={0}
    />,
  );

  expect(screen.getByRole("combobox", { name: "Choose month" })).toBeDisabled();
  expect(screen.getByRole("option", { name: "February" })).toBeDisabled();
});

test("applies carbon data tags to the root element", () => {
  render(
    <CalendarSelect
      aria-label="Choose month"
      data-element="month-selector"
      data-role="date-picker-month-selector"
      onChange={noop}
      options={options}
      value={0}
    />,
  );

  const wrapper = screen.getByTestId("date-picker-month-selector");
  expect(wrapper).toHaveAttribute("data-component", "calendar-select");
  expect(wrapper).toHaveAttribute("data-element", "month-selector");
});

test("does not add an extra tab stop for the customizable select button", async () => {
  const user = userEvent.setup();

  render(
    <>
      <button type="button">Before</button>
      <CalendarSelect
        aria-label="Choose month"
        onChange={noop}
        options={options}
        value={0}
      />
      <button type="button">After</button>
    </>,
  );

  await user.tab();
  expect(screen.getByRole("button", { name: "Before" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("combobox", { name: "Choose month" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
});

test("exposes the native select element through ref", () => {
  const ref = React.createRef<HTMLSelectElement>();

  render(
    <CalendarSelect
      ref={ref}
      aria-label="Choose month"
      onChange={noop}
      options={options}
      value={0}
    />,
  );

  expect(ref.current).toBe(screen.getByRole("combobox"));
});

test("supports a callback ref and a null controlled value", () => {
  const ref = jest.fn();

  render(
    <CalendarSelect
      ref={ref}
      aria-label="Choose month"
      onChange={noop}
      options={[{ value: "", label: "None" }, ...options]}
      value={null as unknown as string}
    />,
  );

  expect(ref).toHaveBeenCalledWith(screen.getByRole("combobox"));
  expect(screen.getByRole("combobox")).toHaveValue("");
});

test("preserves customizable-select markup when React updates options", () => {
  const ref = React.createRef<HTMLSelectElement>();
  const { rerender } = render(
    <CalendarSelect
      ref={ref}
      aria-label="Choose month"
      onChange={noop}
      options={options.slice(0, 2)}
      value={0}
    />,
  );

  const select = screen.getByRole("combobox", { name: "Choose month" });
  /* eslint-disable testing-library/no-node-access -- selectedcontent and the
   * customizable select button are browser markup with no Testing Library role. */
  const selectButton = select.querySelector(":scope > button");
  const selectedContent = selectButton?.querySelector("selectedcontent");

  // React 18 cannot create this new browser markup itself, so our hook adds it.
  // Updating the options must not make React remove it or add a second copy.
  expect(select.firstElementChild).toBe(selectButton);
  expect(selectedContent).toBeInTheDocument();

  rerender(
    <CalendarSelect
      ref={ref}
      aria-label="Choose month"
      onChange={noop}
      options={[
        { value: 2, label: "March" },
        { value: 1, label: "February", disabled: true },
        { value: 3, label: "April" },
      ]}
      value={2}
    />,
  );

  expect(ref.current).toBe(select);
  expect(select).toHaveValue("2");
  expect(select.querySelectorAll(":scope > button")).toHaveLength(1);
  expect(select.firstElementChild).toBe(selectButton);
  expect(selectButton?.querySelector("selectedcontent")).toBe(selectedContent);
  /* eslint-enable testing-library/no-node-access */
  expect(
    screen.queryByRole("option", { name: "January" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("option", { name: "March" })).toHaveValue("2");
  expect(screen.getByRole("option", { name: "February" })).toBeDisabled();
  expect(screen.getByRole("option", { name: "April" })).toHaveValue("3");
});

test("does not duplicate existing customizable-select markup after the ref changes", () => {
  const firstRef = jest.fn();
  const secondRef = jest.fn();
  const { rerender } = render(
    <CalendarSelect
      ref={firstRef}
      aria-label="Choose month"
      options={options}
    />,
  );
  const select = screen.getByRole("combobox");

  rerender(
    <CalendarSelect
      ref={secondRef}
      aria-label="Choose month"
      options={options}
    />,
  );

  /* eslint-disable-next-line testing-library/no-node-access -- customizable
   * select markup has no Testing Library role in React 18. */
  expect(select.querySelectorAll(":scope > button")).toHaveLength(1);
  expect(secondRef).toHaveBeenCalledWith(select);
});

/* eslint-disable testing-library/no-node-access -- these tests exercise
 * standardized customizable-select child markup, which has no RTL role. */
test("leaves complete customizable-select markup unchanged", () => {
  const select = document.createElement("select");
  const button = document.createElement("button");
  button.appendChild(document.createElement("selectedcontent"));
  select.appendChild(button);
  const { result, rerender } = renderHook(() =>
    useCustomizableSelectMarkup(null),
  );

  act(() => result.current(select));
  rerender();

  expect(select.firstElementChild).toBe(button);
  expect(select.children).toHaveLength(1);
});

test("adds customizable markup when an existing button is incomplete", () => {
  const TestSelect = () => {
    const selectRef = useCustomizableSelectMarkup(null);
    return (
      <select
        aria-label="Test select"
        ref={(select) => {
          if (select && !select.firstElementChild) {
            const button = document.createElement("button");
            button.appendChild(document.createElement("span"));
            select.appendChild(button);
          }
          selectRef(select);
        }}
      />
    );
  };

  render(<TestSelect />);
  const select = screen.getByRole("combobox", { name: "Test select" });

  expect(select.firstElementChild?.firstElementChild?.tagName).toBe(
    "SELECTEDCONTENT",
  );
  expect(select.querySelector("selectedcontent")).toBeInTheDocument();
});
/* eslint-enable testing-library/no-node-access */
