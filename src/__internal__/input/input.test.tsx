import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input, { EnterKeyHintTypes } from "./input.component";
import { InputContext } from "../input-behaviour";

test("renders an input element with type 'text'", () => {
  render(<Input />);

  const input = screen.getByRole("textbox");
  expect(input).toBeVisible();
});

test("focuses the input element when rendered if the `autoFocus` prop is true", () => {
  render(<Input autoFocus />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
});

test.each([
  "enter",
  "done",
  "go",
  "next",
  "previous",
  "search",
  "send",
] as EnterKeyHintTypes[])(
  "'enterKeyHint' is correctly passed to the input when prop value is %s",
  (keyHint) => {
    render(<Input enterKeyHint={keyHint} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("enterKeyHint", keyHint);
  },
);

test("should invoke the `inputRef` callback from the input context provider, when the input is rendered", () => {
  const inputRef = jest.fn();
  render(
    <InputContext.Provider value={{ inputRef }}>
      <Input />
    </InputContext.Provider>,
  );

  expect(inputRef).toHaveBeenCalled();
});

test("triggers a passed function via the `onFocus` prop when the input is focused", () => {
  const onFocusMock = jest.fn();
  render(<Input onFocus={onFocusMock} />);

  const input = screen.getByRole("textbox");
  input.focus();

  expect(onFocusMock).toHaveBeenCalled();
});

test("triggers a passed function via the `onFocus` prop from the input context provider, when the input is focused", () => {
  const onFocusMock = jest.fn();
  render(
    <InputContext.Provider value={{ onFocus: onFocusMock }}>
      <Input />
    </InputContext.Provider>,
  );

  const input = screen.getByRole("textbox");
  input.focus();

  expect(onFocusMock).toHaveBeenCalled();
});

test("triggers a passed function via the `onBlur` prop when the input is blurred", async () => {
  const onBlurMock = jest.fn();
  render(<Input onBlur={onBlurMock} />);

  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.tab();

  expect(onBlurMock).toHaveBeenCalled();
});

test("triggers a passed function via the `onBlur` prop from the input context provider, when the input is blurred", async () => {
  const onBlurMock = jest.fn();
  render(
    <InputContext.Provider value={{ onBlur: onBlurMock }}>
      <Input />
    </InputContext.Provider>,
  );

  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.tab();

  expect(onBlurMock).toHaveBeenCalled();
});

test("triggers a passed function via the `onChange` prop when the input is changed", async () => {
  const onChangeMock = jest.fn();
  render(<Input onChange={onChangeMock} />);

  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "Hello, World!");

  expect(onChangeMock).toHaveBeenCalled();
});

test("when the `onChangeDeferred `prop is passed and no `deferTimeout` prop is passed, the `handleDeferred` function is triggered after 750 ms", async () => {
  const onChangeDeferredProp = jest.fn();
  render(<Input onChangeDeferred={onChangeDeferredProp} />);

  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const input = screen.getByRole("textbox");

  await user.type(input, "test");

  jest.advanceTimersByTime(500);
  expect(onChangeDeferredProp).not.toHaveBeenCalled();

  jest.advanceTimersByTime(250);
  expect(onChangeDeferredProp).toHaveBeenCalled();

  jest.useRealTimers();
});

test("when the `onChangeDeferred` prop is passed with the `deferTimeout` prop, the `handleDeferred` function is triggered after the time passed to `deferTimeout`", async () => {
  const onChangeDeferredProp = jest.fn();
  render(<Input onChangeDeferred={onChangeDeferredProp} deferTimeout={1000} />);

  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const input = screen.getByRole("textbox");

  await user.type(input, "test");

  jest.advanceTimersByTime(800);
  expect(onChangeDeferredProp).not.toHaveBeenCalled();

  jest.advanceTimersByTime(200);
  expect(onChangeDeferredProp).toHaveBeenCalled();

  jest.useRealTimers();
});

test("triggers a passed function via the `onClick` prop when the input is clicked", async () => {
  const onClickMock = jest.fn();
  render(<Input onClick={onClickMock} />);

  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.click(input);

  expect(onClickMock).toHaveBeenCalled();
});

test("selects all of the text when the first character within the input is focused", () => {
  render(<Input value="hello" />);

  jest.useFakeTimers();
  const input = screen.getByRole("textbox") as HTMLInputElement;
  const setSelectionRangeSpy = jest.spyOn(input, "setSelectionRange");

  input.selectionStart = 0;
  input.selectionEnd = 0;
  input.focus();
  jest.runAllTimers();

  expect(setSelectionRangeSpy).toHaveBeenCalledWith(0, 5);
  jest.useRealTimers();
});

test("selects all of the text if the last character within the input is focused", async () => {
  render(<Input value="hello" />);

  jest.useFakeTimers();
  const input = screen.getByRole("textbox") as HTMLInputElement;
  const setSelectionRangeSpy = jest.spyOn(input, "setSelectionRange");

  input.selectionStart = 5;
  input.selectionEnd = 5;
  input.focus();
  jest.runAllTimers();

  expect(setSelectionRangeSpy).toHaveBeenCalledWith(0, 5);
  jest.useRealTimers();
});

test("does not select all of the text if an intermediate character within the input is focused", async () => {
  render(<Input value="hello" />);

  jest.useFakeTimers();
  const input = screen.getByRole("textbox") as HTMLInputElement;
  const setSelectionRangeSpy = jest.spyOn(input, "setSelectionRange");

  input.selectionStart = 2;
  input.selectionEnd = 2;
  input.focus();
  jest.runAllTimers();

  expect(setSelectionRangeSpy).not.toHaveBeenCalled();
  jest.useRealTimers();
});

test("when the input is rendered with a type other than 'text', setSelectionRange is not triggered on focus", () => {
  render(<Input type="radio" />);

  jest.useFakeTimers();

  const input = screen.getByRole("radio") as HTMLInputElement;
  const setSelectionRangeSpy = jest.spyOn(input, "setSelectionRange");

  input.focus();
  jest.runAllTimers();

  expect(setSelectionRangeSpy).not.toHaveBeenCalled();
  jest.useRealTimers();
});

test("sets the provided `aria-describedby` to the accessible description of the input", () => {
  render(<Input aria-describedby="description" />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("aria-describedby", "description");
});

test("does not call onClick handler when input is disabled and is clicked", async () => {
  const onClickMock = jest.fn();
  const user = userEvent.setup();

  render(<Input onClick={onClickMock} disabled />);

  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(onClickMock).not.toHaveBeenCalled();
});

test("does not call onClick handler when input is readOnly and is clicked", async () => {
  const onClickMock = jest.fn();
  const user = userEvent.setup();

  render(<Input onClick={onClickMock} readOnly />);

  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(onClickMock).not.toHaveBeenCalled();
});
