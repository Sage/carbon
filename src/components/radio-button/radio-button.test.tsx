import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton, RadioButtonGroup } from ".";

test("renders with provided `label`", () => {
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" label="Radio Button" />
    </RadioButtonGroup>,
  );

  expect(
    screen.getByRole("radio", { name: "Radio Button" }),
  ).toBeInTheDocument();
  expect(screen.getByTestId("radio-svg")).toBeVisible();
  expect(screen.getByText("Radio Button")).toBeVisible();
});

test("renders with provided `inputHint`", () => {
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" label="Radio Button" inputHint="Input Hint" />
    </RadioButtonGroup>,
  );

  expect(screen.getByText("Input Hint")).toBeVisible();
  expect(
    screen.getByRole("radio", { name: "Radio Button" }),
  ).toHaveAccessibleDescription("Input Hint");
});

test("calls `onChange` when provided and the radio button is clicked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" onChange={onChange} />
    </RadioButtonGroup>,
  );

  await user.click(screen.getByRole("radio"));

  expect(onChange).toHaveBeenCalledTimes(1);
});

test("calls `onChange` from context when provided and the radio button is clicked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={onChange}>
      <RadioButton value="radio" />
    </RadioButtonGroup>,
  );

  await user.click(screen.getByRole("radio"));

  expect(onChange).toHaveBeenCalledTimes(1);
});

test("calls `onBlur` when provided and the radio button is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" onBlur={onBlur} />
    </RadioButtonGroup>,
  );

  await user.click(screen.getByRole("radio"));
  await user.tab();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("calls `onBlur` from context when provided and the radio button is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onBlur={onBlur}
      onChange={() => {}}
    >
      <RadioButton value="radio" />
    </RadioButtonGroup>,
  );

  await user.click(screen.getByRole("radio"));
  await user.tab();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("calls `onClick` when provided and the radio button is clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" onClick={onClick} />
    </RadioButtonGroup>,
  );

  await user.click(screen.getByRole("radio"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("calls `onFocus` when provided and the radio button is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" onFocus={onFocus} />
    </RadioButtonGroup>,
  );

  await user.click(screen.getByRole("radio"));

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls `onMouseEnter` when provided and the radio button is hovered", async () => {
  const user = userEvent.setup();
  const onMouseEnter = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" onMouseEnter={onMouseEnter} />
    </RadioButtonGroup>,
  );

  await user.hover(screen.getByRole("radio"));

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

test("calls `onMouseLeave` when provided and the radio button is unhovered", async () => {
  const user = userEvent.setup();
  const onMouseLeave = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" onMouseLeave={onMouseLeave} />
    </RadioButtonGroup>,
  );

  const radio = screen.getByRole("radio");

  await user.hover(radio);
  await user.unhover(radio);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

test("should accept ref as an object", () => {
  const ref = { current: null };
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" ref={ref} />
    </RadioButtonGroup>,
  );

  expect(ref.current).not.toBeNull();
});

test("should accept ref as a callback", () => {
  const ref = jest.fn();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" ref={ref} />
    </RadioButtonGroup>,
  );

  expect(ref).toHaveBeenCalledTimes(1);
});

test("should set ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" ref={ref} />
    </RadioButtonGroup>,
  );

  unmount();
  expect(ref.current).toBeNull();
});

test("renders disabled when `disabled` prop is true", () => {
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" disabled />
    </RadioButtonGroup>,
  );

  expect(screen.getByRole("radio")).toBeDisabled();
});

test("forwards the provided ref to the input", () => {
  const ref = React.createRef<HTMLInputElement>();
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" label="Radio Button" ref={ref} />
    </RadioButtonGroup>,
  );

  const radioButton = screen.getByRole("radio", { name: "Radio Button" });

  expect(ref.current).toBe(radioButton);
});

test("renders with `labelHelp` as `inputHint`", async () => {
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" label="Radio Button" labelHelp="Input Hint" />
    </RadioButtonGroup>,
  );

  expect(screen.getByText("Input Hint")).toBeVisible();
  expect(
    screen.getByRole("radio", { name: "Radio Button" }),
  ).toHaveAccessibleDescription("Input Hint");
});

test("renders with `fieldHelp` as `inputHint`", async () => {
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" label="Radio Button" fieldHelp="Input Hint" />
    </RadioButtonGroup>,
  );

  expect(screen.getByText("Input Hint")).toBeVisible();
  expect(
    screen.getByRole("radio", { name: "Radio Button" }),
  ).toHaveAccessibleDescription("Input Hint");
});
