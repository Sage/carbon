import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SubtleSelect from "./index";

const options = [
  { value: 0, label: "January" },
  { value: 1, label: "February", disabled: true },
  { value: "2", label: "March" },
];

const noop = () => {};

test("renders options and coerces values to strings", () => {
  render(
    <SubtleSelect
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
    <SubtleSelect
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
    <SubtleSelect
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
      <SubtleSelect
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
    <SubtleSelect
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
    <SubtleSelect
      aria-label="Choose month"
      data-element="month-selector"
      data-role="date-picker-month-selector"
      onChange={noop}
      options={options}
      value={0}
    />,
  );

  const wrapper = screen.getByTestId("date-picker-month-selector");
  expect(wrapper).toHaveAttribute("data-component", "subtle-select");
  expect(wrapper).toHaveAttribute("data-element", "month-selector");
});

test("does not add an extra tab stop for the customizable select button", async () => {
  const user = userEvent.setup();

  render(
    <>
      <button type="button">Before</button>
      <SubtleSelect
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
    <SubtleSelect
      ref={ref}
      aria-label="Choose month"
      onChange={noop}
      options={options}
      value={0}
    />,
  );

  expect(ref.current).toBe(screen.getByRole("combobox"));
});

test.each([
  ["small", "var(--global-size-s)"],
  ["medium", "var(--global-size-m)"],
  ["large", "var(--global-size-l)"],
] as const)("applies %s size styling", (size, expectedMinHeight) => {
  render(
    <SubtleSelect
      aria-label="Choose month"
      onChange={noop}
      options={options}
      size={size}
      value={0}
    />,
  );

  expect(screen.getByRole("combobox")).toHaveStyleRule(
    "min-height",
    expectedMinHeight,
  );
});
