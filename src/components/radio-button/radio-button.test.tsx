import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButton from ".";

test("renders with provided `label`", () => {
  render(<RadioButton value="radio1" label="Radio Button 1" />);

  const radioButton = screen.getByRole("radio", { name: "Radio Button 1" });

  expect(radioButton).toBeInTheDocument();
  expect(screen.getByTestId("radio-svg")).toBeVisible();
  expect(screen.getByText("Radio Button 1")).toBeVisible();
});

test("calls `onClick` when provided and the radio button is clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <RadioButton value="radio1" label="Radio Button 1" onClick={onClick} />,
  );

  const radioButton = screen.getByRole("radio");

  await user.click(radioButton);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("calls `onChange` when provided and the radio button is clicked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <RadioButton value="radio1" label="Radio Button 1" onChange={onChange} />,
  );

  const radioButton = screen.getByRole("radio");

  await user.click(radioButton);

  expect(onChange).toHaveBeenCalledTimes(1);
});

test("calls `onFocus` when provided and the radio button is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(
    <RadioButton value="radio1" label="Radio Button 1" onFocus={onFocus} />,
  );

  const radioButton = screen.getByRole("radio", { name: "Radio Button 1" });
  await user.click(radioButton);

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls `onBlur` when provided and the radio button is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(<RadioButton value="radio1" label="Radio Button 1" onBlur={onBlur} />);

  const radioButton = screen.getByRole("radio", { name: "Radio Button 1" });
  await user.click(radioButton);
  await user.tab();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("calls `onMouseEnter` when provided and the radio button is hovered", async () => {
  const user = userEvent.setup();
  const onMouseEnter = jest.fn();
  render(
    <RadioButton
      value="radio1"
      label="Radio Button 1"
      onMouseEnter={onMouseEnter}
    />,
  );

  const radioButton = screen.getByRole("radio");

  await user.hover(radioButton);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

test("calls `onMouseLeave` when provided and the radio button is no longer hovered", async () => {
  const user = userEvent.setup();
  const onMouseLeave = jest.fn();
  render(
    <RadioButton
      value="radio1"
      label="Radio Button 1"
      onMouseLeave={onMouseLeave}
    />,
  );

  const radioButton = screen.getByRole("radio");

  await user.hover(radioButton);
  await user.unhover(radioButton);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

test("forwards the provided ref to the input", () => {
  const ref = React.createRef<HTMLInputElement>();
  render(<RadioButton value="radio1" label="Radio Button 1" ref={ref} />);

  const radioButton = screen.getByRole("radio", { name: "Radio Button 1" });

  expect(ref.current).toBe(radioButton);
});

test("throws an error if children are passed", () => {
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => {
    render(
      <RadioButton value="radio1" label="Radio Button 1">
        <div>child</div>
      </RadioButton>,
    );
  }).toThrow(
    "This component is meant to be used as a self-closing tag. " +
      "You should probably use the label prop instead.",
  );

  consoleError.mockRestore();
});

test("renders disabled when `disabled` prop is true", () => {
  render(<RadioButton value="radio1" label="Radio Button 1" disabled />);

  const radioButton = screen.getByRole("radio");

  expect(radioButton).toBeDisabled();
});

test("renders checked when `checked` prop is true", () => {
  render(<RadioButton value="radio1" label="Radio Button 1" checked />);

  const radioButton = screen.getByRole("radio");

  expect(radioButton).toBeChecked();
});

test("renders with a help tooltip if `labelHelp` is provided", async () => {
  const user = userEvent.setup();
  render(
    <RadioButton value="radio1" label="Radio Button 1" labelHelp="labelHelp" />,
  );

  const helpIcon = screen.getByRole("button", { name: "help" });
  await user.hover(helpIcon);

  const helpTooltip = screen.getByRole("tooltip", { name: "labelHelp" });

  expect(helpTooltip).toBeVisible();
});

test("sets the aria-label of the help icon to the provided `helpAriaLabel`", () => {
  render(
    <RadioButton
      value="radio1"
      label="Radio Button 1"
      labelHelp="labelHelp"
      helpAriaLabel="helpAriaLabel"
    />,
  );

  const helpIcon = screen.getByRole("button", { name: "helpAriaLabel" });

  expect(helpIcon).toBeVisible();
});

// coverage
test("renders with expected styles when `size` is 'large'", () => {
  render(<RadioButton value="radio1" label="Radio Button 1" size="large" />);

  const radioButton = screen.getByRole("radio");

  expect(radioButton).toHaveStyle({ width: "24px", height: "24px" });
  expect(screen.getByTestId("radio-svg")).toHaveStyle({
    width: "24px",
    height: "24px",
  });
});

// coverage
test("renders with expected styles when `reverse` prop is true", () => {
  render(
    <RadioButton
      value="radio1"
      label="Radio Button 1"
      fieldHelp="fieldHelp"
      reverse
    />,
  );

  expect(screen.getByText("fieldHelp")).toHaveStyle({
    marginLeft: "0px",
    marginRight: "6px",
  });

  expect(screen.getByText("Radio Button 1")).toHaveStyle({ flex: "0 1 auto" });
});

// coverage
test("renders `fieldHelp` with expected styles when `size` is 'large' and `reverse` is true", () => {
  render(
    <RadioButton
      value="radio1"
      label="Radio Button 1"
      size="large"
      fieldHelp="fieldHelp"
      reverse
    />,
  );

  expect(screen.getByText("fieldHelp")).toHaveStyle({
    padding: "0",
  });
});
