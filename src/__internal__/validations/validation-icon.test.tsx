import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ValidationIcon from "./validation-icon.component";
import { InputContext, InputGroupContext } from "../input-behaviour";
import {
  render,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";

testStyledSystemMargin(
  (props) => <ValidationIcon {...props} error="error" />,
  () => screen.getByTestId("validation-icon-wrapper"),
);

test("renders an icon with the error type when the `error` prop is a string", () => {
  render(<ValidationIcon error="error" />);

  const icon = screen.getByTestId("icon-error");
  expect(icon).toBeVisible();
});

test("renders an icon with the warning type when the `warning` prop is a string", () => {
  render(<ValidationIcon warning="Message" />);

  const icon = screen.getByTestId("icon-warning");
  expect(icon).toBeVisible();
});

test("renders an icon with the info type when the `info` prop is a string", () => {
  render(<ValidationIcon info="Message" />);

  const icon = screen.getByTestId("icon-info");
  expect(icon).toBeVisible();
});

test("does not render any icon if the `error` prop is a boolean", () => {
  render(<ValidationIcon error />);

  const icon = screen.queryByTestId(/^icon-/);
  expect(icon).not.toBeInTheDocument();
});

test("does not render any icon if the `warning` prop is a boolean", () => {
  render(<ValidationIcon warning />);

  const icon = screen.queryByTestId(/^icon-/);
  expect(icon).not.toBeInTheDocument();
});

test("does not render any icon if the `info` prop is a boolean", () => {
  render(<ValidationIcon info />);

  const icon = screen.queryByTestId(/^icon-/);
  expect(icon).not.toBeInTheDocument();
});

test("renders a tooltip if the `hasFocus` prop is true on the input context provider", () => {
  render(
    <InputContext.Provider value={{ hasFocus: true }}>
      <ValidationIcon error="error" />
    </InputContext.Provider>,
  );
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();
});

test("renders a tooltip if the `hasMouseOver` prop is true on the input context provider", () => {
  render(
    <InputContext.Provider value={{ hasMouseOver: true }}>
      <ValidationIcon error="error" />
    </InputContext.Provider>,
  );
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();
});

test("renders a tooltip if the `hasFocus` prop is true on the input group context provider", () => {
  render(
    <InputGroupContext.Provider value={{ hasFocus: true }}>
      <ValidationIcon error="error" />
    </InputGroupContext.Provider>,
  );
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();
});

test("renders a tooltip if the `hasMouseOver` prop is true on the input group context provider", () => {
  render(
    <InputGroupContext.Provider value={{ hasMouseOver: true }}>
      <ValidationIcon error="error" />
    </InputGroupContext.Provider>,
  );
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();
});

test("renders a tooltip when the validation icon is hovered", async () => {
  render(<ValidationIcon error="error" />);

  const user = userEvent.setup();
  const validationIcon = screen.getByTestId("icon-error");
  await user.hover(validationIcon);

  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();
});

test("renders a tooltip when the validation icon is hovered, then is not rendered when un hovered", async () => {
  render(<ValidationIcon error="error" />);

  const user = userEvent.setup();
  const validationIcon = screen.getByTestId("icon-error");

  await user.hover(validationIcon);
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();

  await user.unhover(validationIcon);
  expect(tooltip).not.toBeVisible();
});

test("renders a tooltip when the validation icon is focused", () => {
  render(<ValidationIcon error="error" />);

  const validationIcon = screen.getByTestId("icon-error");
  act(() => {
    validationIcon.focus();
  });

  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();
});

test("renders a tooltip when validation icon is focused, then is not rendered on blur", async () => {
  render(<ValidationIcon error="error" />);

  const user = userEvent.setup();
  const validationIcon = screen.getByTestId("icon-error");

  act(() => {
    validationIcon.focus();
  });
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toBeVisible();

  await user.tab();
  expect(tooltip).not.toBeVisible();
});

test("sets the 'id' attribute on the tooltip via the `tooltipId` prop on the validation icon", () => {
  render(<ValidationIcon tooltipId="foo" error="error" />);

  const validationIcon = screen.getByTestId("icon-error");
  act(() => {
    validationIcon.focus();
  });

  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toHaveAttribute("id", "foo");
});

test("triggers a passed function via the `onFocus` prop when the validation icon is focused", () => {
  const mockOnFocus = jest.fn();
  render(<ValidationIcon error="error" onFocus={mockOnFocus} />);

  const validationIcon = screen.getByTestId("icon-error");
  act(() => {
    validationIcon.focus();
  });

  expect(mockOnFocus).toHaveBeenCalled();
});

test("triggers a passed function via the `onBlur` prop when the validation icon is blurred", async () => {
  const mockOnBlur = jest.fn();
  render(<ValidationIcon error="error" onBlur={mockOnBlur} />);

  const user = userEvent.setup();
  const validationIcon = screen.getByTestId("icon-error");

  await user.click(validationIcon);
  await user.tab();

  expect(mockOnBlur).toHaveBeenCalled();
});

test("throws an error when `tooltipFlipOverride` props value is not an array", () => {
  const mockGlobal = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);
  const errorMessage = `The tooltipFlipOverrides prop supplied to ValidationIcon must be an array containing some or all of ["top", "bottom", "left", "right"].`;

  expect(() => {
    render(
      <ValidationIcon
        isPartOfInput
        /* @ts-expect-error testing invalid prop value */
        tooltipFlipOverrides="top"
        error="error"
      />,
    );
  }).toThrow(errorMessage);

  mockGlobal.mockReset();
});

test("throws an error when the `tooltipFlipOverride` props value is an array, but contains an invalid element", () => {
  const mockGlobal = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);
  const errorMessage = `The tooltipFlipOverrides prop supplied to ValidationIcon must be an array containing some or all of ["top", "bottom", "left", "right"].`;

  expect(() => {
    render(
      <ValidationIcon
        isPartOfInput
        /* @ts-expect-error testing invalid prop value */
        tooltipFlipOverrides={["top", "foo"]}
        error="error"
      />,
    );
  }).toThrow(errorMessage);

  mockGlobal.mockReset();
});
