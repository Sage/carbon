import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import Fieldset from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

test("renders with provided `children`", () => {
  render(
    <Fieldset>
      <input />
    </Fieldset>,
  );

  const input = within(screen.getByRole("group")).getByRole("textbox");

  expect(input).toBeVisible();
});

test("renders fieldset with provided `legend`", () => {
  render(
    <Fieldset legend="Legend">
      <input />
    </Fieldset>,
  );

  const fieldset = screen.getByRole("group", { name: "Legend" });

  expect(fieldset).toBeVisible();
});

test("sets child inputs as required when `isRequired` is true", () => {
  render(
    <Fieldset isRequired>
      <input />
      <input />
    </Fieldset>,
  );

  const inputs = screen.getAllByRole("textbox");

  expect(inputs[0]).toBeRequired();
  expect(inputs[1]).toBeRequired();
});

test("renders validation icon when `legend` and `error` are provided", () => {
  render(
    <Fieldset legend="Legend" error="error">
      <input />
    </Fieldset>,
  );

  const icon = screen.getByTestId("icon-error");

  expect(icon).toBeVisible();
});

test("renders validation icon when `legend` and `warning` are provided", () => {
  render(
    <Fieldset legend="Legend" warning="warning">
      <input />
    </Fieldset>,
  );

  const icon = screen.getByTestId("icon-warning");

  expect(icon).toBeVisible();
});

test("renders validation icon when `legend` and `info` are provided", () => {
  render(
    <Fieldset legend="Legend" info="info">
      <input />
    </Fieldset>,
  );

  const icon = screen.getByTestId("icon-info");

  expect(icon).toBeVisible();
});

test("renders help icon when `labelHelp` is provided", () => {
  render(
    <Fieldset legend="Legend" labelHelp="label help">
      <input />
    </Fieldset>,
  );

  const help = screen.getByRole("button", { name: "help" });

  expect(help).toBeVisible();
});

// coverage - tested in Help component
test("sets `aria-describedby` on help icon as tooltip content when focused and removes it on blur", () => {
  render(
    <Fieldset legend="Legend" labelHelp="label help">
      <input />
    </Fieldset>,
  );
  const help = screen.getByRole("button", { name: "help" });

  act(() => {
    help.focus();
  });
  expect(help).toHaveAccessibleDescription("label help");

  act(() => {
    help.blur();
  });
  expect(help).not.toHaveAttribute("aria-describedby");
});

// coverage
test("renders legend with provided `legendWidth` when `inline` is true", () => {
  render(
    <Fieldset legend="Legend" inline legendWidth={30}>
      <input />
    </Fieldset>,
  );

  const legend = screen.getByTestId("legend");

  expect(legend).toHaveStyle({ width: "30%" });
});

// coverage
test("renders with expected styles when `inline` is true and `align` is 'left'", () => {
  render(
    <Fieldset legend="Legend" inline legendAlign="left">
      <input />
    </Fieldset>,
  );

  const legend = screen.getByTestId("legend");

  expect(legend).toHaveStyle({ justifyContent: "flex-start" });
});

// coverage
test("renders with expected padding when `inline` is true and `legendSpacing` is 1", () => {
  render(
    <Fieldset legend="Legend" inline legendSpacing={1}>
      <input />
    </Fieldset>,
  );

  const legend = screen.getByTestId("legend");

  expect(legend).toHaveStyleRule("padding-right", "var(--spacing100)");
});

testStyledSystemMargin(
  (props) => (
    <Fieldset {...props}>
      <input />
    </Fieldset>
  ),
  () => screen.getByRole("group"),
);
