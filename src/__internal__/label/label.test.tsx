import React from "react";
import { render, screen } from "@testing-library/react";
import Label from ".";

test("should render", () => {
  render(<Label size="medium">Test Label</Label>);

  expect(screen.getByText("Test Label")).toBeInTheDocument();
});

test("should render with `htmlFor` prop", () => {
  render(
    <Label size="medium" htmlFor="input-id">
      Label Text
    </Label>,
  );

  const label = screen.getByText("Label Text");
  expect(label).toHaveAttribute("for", "input-id");
});

test("should render with `id` prop", () => {
  render(
    <Label size="medium" id="label-id">
      Label Text
    </Label>,
  );

  const label = screen.getByText("Label Text");
  expect(label).toHaveAttribute("id", "label-id");
});

test("should apply large font size when `isLarge` prop is true", () => {
  render(<Label size="large">Large</Label>);

  const label = screen.getByText("Large");
  expect(label).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-l)",
  );
});

test("should apply medium font size when `isLarge` prop is false", () => {
  render(<Label size="medium">Medium</Label>);

  const label = screen.getByText("Medium");
  expect(label).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-m)",
  );
});

test("should apply medium font size by default", () => {
  render(<Label size="medium">Default</Label>);

  const label = screen.getByText("Default");
  expect(label).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-m)",
  );
});

test("should render required indicator when `isRequired` prop is true", () => {
  render(
    <Label size="medium" isRequired>
      Required
    </Label>,
  );

  const label = screen.getByText("Required");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-required)",
    { modifier: "::after" },
  );
});

test("should render required indicator when `isRequired` and `disabled` props are true", () => {
  render(
    <Label size="medium" isRequired disabled>
      Required
    </Label>,
  );

  const label = screen.getByText("Required");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
    { modifier: "::after" },
  );
});

test("should apply large font to required indicator when `isLarge` prop is true", () => {
  render(
    <Label size="large" isRequired>
      Large Required
    </Label>,
  );

  const label = screen.getByText("Large Required");
  expect(label).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-l)",
    { modifier: "::after" },
  );
});

test("should apply medium font to required indicator by default", () => {
  render(
    <Label size="medium" isRequired>
      Required
    </Label>,
  );

  const label = screen.getByText("Required");
  expect(label).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-m)",
    { modifier: "::after" },
  );
});

test("should apply disabled colour and set aria-disabled when `disabled` prop is true", () => {
  render(
    <Label size="medium" disabled>
      Disabled
    </Label>,
  );

  const label = screen.getByText("Disabled");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
  );
  expect(label).toHaveAttribute("aria-disabled", "true");
});

test("should apply default colour when `disabled` prop is false", () => {
  render(
    <Label size="medium" disabled={false}>
      Enabled
    </Label>,
  );

  const label = screen.getByText("Enabled");
  expect(label).toHaveStyleRule("color", "var(--input-labelset-label-default)");
});

test("should apply readOnly colour when `readOnly` prop is true", () => {
  render(
    <Label size="medium" readOnly>
      ReadOnly
    </Label>,
  );

  const label = screen.getByText("ReadOnly");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-readOnly)",
  );
});

test("should apply default colour when `readOnly` prop is false", () => {
  render(
    <Label size="medium" readOnly={false}>
      Writable
    </Label>,
  );

  const label = screen.getByText("Writable");
  expect(label).toHaveStyleRule("color", "var(--input-labelset-label-default)");
});

test("should apply disabled colour when both `disabled` and `readOnly` props are true", () => {
  render(
    <Label size="medium" disabled readOnly>
      Both
    </Label>,
  );

  const label = screen.getByText("Both");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
  );
});
