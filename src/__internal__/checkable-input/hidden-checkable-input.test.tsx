import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputContext, InputGroupContext } from "../input-behaviour";
import HiddenCheckableInput from "./hidden-checkable-input.component";

test("renders with provided `type`", () => {
  render(<HiddenCheckableInput type="checkbox" />);

  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});

test("renders with provided `role`", () => {
  render(<HiddenCheckableInput type="checkbox" role="switch" />);

  expect(screen.getByRole("switch")).toBeInTheDocument();
});

test("calls `onFocus` callback passed via props when input is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(<HiddenCheckableInput type="checkbox" onFocus={onFocus} />);

  await user.tab();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls `onBlur` callback passed via props when input is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(<HiddenCheckableInput type="checkbox" onBlur={onBlur} />);

  await user.tab();
  await user.tab();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("calls `onMouseEnter` callback passed via props when input is hovered", async () => {
  const user = userEvent.setup();
  const onMouseEnter = jest.fn();
  render(<HiddenCheckableInput type="checkbox" onMouseEnter={onMouseEnter} />);

  await user.hover(screen.getByRole("checkbox"));

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

test("calls `onMouseLeave` callback passed via props when input is unhovered", async () => {
  const user = userEvent.setup();
  const onMouseLeave = jest.fn();
  render(<HiddenCheckableInput type="checkbox" onMouseLeave={onMouseLeave} />);

  const checkbox = screen.getByRole("checkbox");

  await user.hover(checkbox);
  await user.unhover(checkbox);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

test("calls `onFocus` callback from InputContext when input is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(
    <InputContext.Provider value={{ onFocus }}>
      <HiddenCheckableInput type="checkbox" />
    </InputContext.Provider>,
  );

  await user.tab();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls `onBlur` callback from InputContext when input is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <InputContext.Provider value={{ onBlur }}>
      <HiddenCheckableInput type="checkbox" />
    </InputContext.Provider>,
  );

  await user.tab();
  await user.tab();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("calls `onMouseEnter` callback from InputContext when input is hovered", async () => {
  const user = userEvent.setup();
  const onMouseEnter = jest.fn();
  render(
    <InputContext.Provider value={{ onMouseEnter }}>
      <HiddenCheckableInput type="checkbox" />
    </InputContext.Provider>,
  );

  await user.hover(screen.getByRole("checkbox"));

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

test("calls `onMouseLeave` callback from InputContext when input is unhovered", async () => {
  const user = userEvent.setup();
  const onMouseLeave = jest.fn();
  render(
    <InputContext.Provider value={{ onMouseLeave }}>
      <HiddenCheckableInput type="checkbox" />
    </InputContext.Provider>,
  );

  const checkbox = screen.getByRole("checkbox");

  await user.hover(checkbox);
  await user.unhover(checkbox);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

test("calls `onFocus` callback from InputGroupContext when input is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(
    <InputGroupContext.Provider value={{ onFocus }}>
      <HiddenCheckableInput type="checkbox" />
    </InputGroupContext.Provider>,
  );

  await user.tab();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls `onBlur` callback from InputGroupContext when input is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <InputGroupContext.Provider value={{ onBlur }}>
      <HiddenCheckableInput type="checkbox" />
    </InputGroupContext.Provider>,
  );

  await user.tab();
  await user.tab();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("calls `onMouseEnter` callback from InputGroupContext when input is hovered", async () => {
  const user = userEvent.setup();
  const onMouseEnter = jest.fn();
  render(
    <InputGroupContext.Provider value={{ onMouseEnter }}>
      <HiddenCheckableInput type="checkbox" />
    </InputGroupContext.Provider>,
  );

  await user.hover(screen.getByRole("checkbox"));

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

test("calls `onMouseLeave` callback from InputGroupContext when input is unhovered", async () => {
  const user = userEvent.setup();
  const onMouseLeave = jest.fn();
  render(
    <InputGroupContext.Provider value={{ onMouseLeave }}>
      <HiddenCheckableInput type="checkbox" />
    </InputGroupContext.Provider>,
  );

  const checkbox = screen.getByRole("checkbox");

  await user.hover(checkbox);
  await user.unhover(checkbox);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

test("sets passed aria attributes to the input", () => {
  const ariaProps = {
    ariaLabelledBy: "test-labelled-by",
    ariaDescribedBy: "test-described-by",
    "aria-invalid": true,
  };
  render(<HiddenCheckableInput type="checkbox" {...ariaProps} />);

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).toHaveAttribute("aria-labelledby", "test-labelled-by");
  expect(checkbox).toHaveAttribute("aria-describedby", "test-described-by");
  expect(checkbox).toHaveAttribute("aria-invalid", "true");
});

test("sets 'data-has-autofocus' attribute to the input when `autoFocus` prop is true", () => {
  render(<HiddenCheckableInput type="checkbox" autoFocus />);

  expect(screen.getByRole("checkbox")).toHaveAttribute("data-has-autofocus");
});
