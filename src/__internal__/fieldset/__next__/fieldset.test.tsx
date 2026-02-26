import React from "react";
import { render, screen } from "@testing-library/react";
import Fieldset from "./fieldset.component";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

test("renders with provided `children`", () => {
  render(
    <Fieldset>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const input = screen.getByRole("textbox");

  expect(input).toBeVisible();
});

test("renders with provided `name`", () => {
  render(
    <Fieldset name="test-name">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const fieldset = screen.getByRole("group");

  expect(fieldset).toHaveAttribute("name", "test-name");
});

test("renders with provided `id`", () => {
  render(
    <Fieldset id="test-id">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const fieldset = screen.getByRole("group");

  expect(fieldset).toHaveAttribute("id", "test-id");
});

test("renders fieldset with provided `legend`", () => {
  render(
    <Fieldset legend="Legend">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const fieldset = screen.getByRole("group", { name: "Legend" });

  expect(fieldset).toBeVisible();
});

test("renders with provided `legendHint`", () => {
  render(
    <Fieldset legendHint="This is a hint">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const hint = screen.getByText("This is a hint");

  expect(hint).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleDescription(
    "This is a hint",
  );
});

test("renders with provided `error`", () => {
  render(
    <Fieldset error="This is an error">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const error = screen.getByText("This is an error");

  expect(error).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleDescription(
    "This is an error",
  );
});

test("renders with provided `warning`", () => {
  render(
    <Fieldset warning="This is a warning">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const warning = screen.getByText("This is a warning");

  expect(warning).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleDescription(
    "This is a warning",
  );
});

test("combines `legendHint` and validation message in `aria-describedby` when both are provided", () => {
  render(
    <Fieldset legendHint="This is a hint" error="This is an error">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const fieldset = screen.getByRole("group");
  expect(fieldset).toHaveAccessibleDescription(
    "This is a hint This is an error",
  );
});

// coverage
test("renders with `validationMessagePositionTop` set to true", () => {
  render(
    <Fieldset validationMessagePositionTop error="This is an error">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const error = screen.getByText("This is an error");

  expect(error).toBeVisible();
});

// coverage
test("renders with  expected styles when `size` is set to large", () => {
  render(
    <Fieldset legend="Legend" size="large">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  expect(screen.getByText("Legend")).toHaveStyleRule(
    "font-size",
    "var(--core-fontSize-static-large-step1,16px)",
  );
});

// coverage
test("renders with expected styles when `align` is  set to left", () => {
  render(
    <Fieldset legend="Legend" legendAlign="left">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const legend = screen.getByText("Legend");

  expect(legend).toHaveStyleRule("justify-content", "flex-start");
  expect(legend).toHaveStyleRule("text-align", "left");
});

// coverage
test("renders with expected styles when `align` is  set to right", () => {
  render(
    <Fieldset legend="Legend" legendAlign="right">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const legend = screen.getByText("Legend");

  expect(legend).toHaveStyleRule("justify-content", "flex-end");
  expect(legend).toHaveStyleRule("text-align", "right");
});

// coverage
test("renders with expected styles when `inline` is true", () => {
  render(
    <Fieldset legend="Legend" inline>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const content = screen.getByTestId("fieldset-content");

  expect(content).toHaveStyleRule("flex-direction", "row");
  expect(content).toHaveStyleRule(
    "gap",
    "12px var(--global-space-comp-l,16px)",
  );
});

testStyledSystemMargin(
  (props) => (
    <Fieldset {...props}>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>
  ),
  () => screen.getByRole("group"),
);
