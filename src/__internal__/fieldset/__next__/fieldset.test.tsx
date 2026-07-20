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
test("renders legend with asterisk when `isRequired` is true", () => {
  render(
    <Fieldset legend="Legend" isRequired>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  expect(screen.getByText("Legend")).toHaveStyleRule("content", '"*"', {
    modifier: "::after",
  });
});

// coverage
test("renders with expected styles when `isDisabled` is true", () => {
  render(
    <Fieldset legend="Legend" isDisabled>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  expect(screen.getByText("Legend")).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
  );
  expect(screen.getByText("Legend")).toHaveAttribute("aria-disabled", "true");
});

testStyledSystemMargin(
  (props) => (
    <Fieldset {...props}>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>
  ),
  () => screen.getByRole("group"),
);
