import React from "react";
import { render, screen } from "@testing-library/react";
import Label from ".";

test("should render", () => {
  render(<Label>Test Label</Label>);

  expect(screen.getByText("Test Label")).toBeInTheDocument();
});

test("should render with `htmlFor` prop", () => {
  render(<Label htmlFor="input-id">Label Text</Label>);

  const label = screen.getByText("Label Text");
  expect(label).toHaveAttribute("for", "input-id");
});

test("should render with `id` prop", () => {
  render(<Label id="label-id">Label Text</Label>);

  const label = screen.getByText("Label Text");
  expect(label).toHaveAttribute("id", "label-id");
});

test("should apply large font size when `isLarge` prop is true", () => {
  render(<Label isLarge>Large</Label>);

  const label = screen.getByText("Large");
  expect(label).toHaveStyleRule(
    "font-size",
    "var(--global-font-static-body-regular-l)",
  );
});

test("should apply medium font size when `isLarge` prop is false", () => {
  render(<Label isLarge={false}>Medium</Label>);

  const label = screen.getByText("Medium");
  expect(label).toHaveStyleRule(
    "font-size",
    "var(--global-font-static-body-regular-m)",
  );
});

test("should apply medium font size by default", () => {
  render(<Label>Default</Label>);

  const label = screen.getByText("Default");
  expect(label).toHaveStyleRule(
    "font-size",
    "var(--global-font-static-body-regular-m)",
  );
});

test("should render required indicator when `isRequired` prop is true", () => {
  render(<Label isRequired>Required</Label>);

  const label = screen.getByText("Required");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-required)",
    { modifier: "::after" },
  );
});

test("should apply large font to required indicator when `isLarge` prop is true", () => {
  render(
    <Label isRequired isLarge>
      Large Required
    </Label>,
  );

  const label = screen.getByText("Large Required");
  expect(label).toHaveStyleRule(
    "font-size",
    "var(--global-font-static-body-regular-l)",
    { modifier: "::after" },
  );
});

test("should apply medium font to required indicator by default", () => {
  render(<Label isRequired>Required</Label>);

  const label = screen.getByText("Required");
  expect(label).toHaveStyleRule(
    "font-size",
    "var(--global-font-static-body-regular-m)",
    { modifier: "::after" },
  );
});

test("should apply disabled colour when `disabled` prop is true", () => {
  render(<Label disabled>Disabled</Label>);

  const label = screen.getByText("Disabled");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
  );
});

test("should apply default colour when `disabled` prop is false", () => {
  render(<Label disabled={false}>Enabled</Label>);

  const label = screen.getByText("Enabled");
  expect(label).toHaveStyleRule("color", "var(--input-labelset-label-default)");
});

test("should apply readOnly colour when `readOnly` prop is true", () => {
  render(<Label readOnly>ReadOnly</Label>);

  const label = screen.getByText("ReadOnly");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-readOnly)",
  );
});

test("should apply default colour when `readOnly` prop is false", () => {
  render(<Label readOnly={false}>Writable</Label>);

  const label = screen.getByText("Writable");
  expect(label).toHaveStyleRule("color", "var(--input-labelset-label-default)");
});

test("should apply disabled colour when both `disabled` and `readOnly` props are true", () => {
  render(
    <Label disabled readOnly>
      Both
    </Label>,
  );

  const label = screen.getByText("Both");
  expect(label).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
  );
});
