import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pill from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import { baseTheme } from "../../style/themes";
import { toColor } from "../../style/utils/color";

test("renders provided children", () => {
  render(<Pill>Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toBeVisible();
});

test("calls onClick when clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Pill onClick={onClick}>Test Pill</Pill>);

  await user.click(screen.getByText("Test Pill"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("renders remove button when onDelete is set and calls onDelete on click", async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();
  render(<Pill onDelete={onDelete}>Test Pill</Pill>);

  const removeButton = screen.getByRole("button", {
    name: "Remove Test Pill pill",
  });
  expect(removeButton).toBeVisible();

  await user.click(removeButton);
  expect(onDelete).toHaveBeenCalledTimes(1);
});

test("renders remove button with custom aria-label when ariaLabelOfRemoveButton is set", () => {
  render(
    <Pill onDelete={() => {}} ariaLabelOfRemoveButton="custom aria label">
      Test Pill
    </Pill>,
  );

  expect(
    screen.getByRole("button", { name: "custom aria label" }),
  ).toBeVisible();
});

test("renders with provided data tags", () => {
  render(
    <Pill data-element="bar" data-role="foo">
      Test Pill
    </Pill>,
  );

  const pill = screen.getByText("Test Pill");
  expect(pill).toHaveAttribute("data-element", "bar");
  expect(pill).toHaveAttribute("data-role", "foo");
});

test("renders icon when provided", () => {
  render(<Pill icon={<span>i</span>}>Test Pill</Pill>);

  expect(screen.getByText("i")).toBeVisible();
});

test("renders with expected max-width when maxWidth is set", () => {
  render(<Pill maxWidth="20px">Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toHaveStyle({ maxWidth: "20px" });
});

test("renders with expected styles when wrapText is true", () => {
  render(<Pill wrapText>Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toHaveStyle({
    overflowWrap: "anywhere",
    hyphens: "auto",
  });
});

test("renders grey outlined styles by default", () => {
  render(<Pill>Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-s) solid var(--pill-gray-border-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--pill-gray-bg-alt-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--pill-generic-label-alt-default)",
  );
});

test("renders filled styles for variant=red", () => {
  render(
    <Pill variant="red" fill>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-s) solid var(--pill-red-border-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--pill-red-bg-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--pill-generic-label-default)",
  );
});

test("renders filled styles for legacy colorVariant=positive", () => {
  render(
    <Pill colorVariant="positive" fill>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-s) solid var(--pill-green-border-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--pill-green-bg-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--pill-generic-label-default)",
  );
});

test("renders inverse styles for semantic variants", () => {
  render(
    <Pill variant="blue" inverse fill>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-s) solid var(--pill-blue-inverse-border-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--pill-blue-inverse-bg-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--pill-generic-inverse-label-default)",
  );
});

test("renders inverse styles when legacy isDarkBackground is true", () => {
  render(
    <Pill variant="blue" isDarkBackground fill>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-s) solid var(--pill-blue-inverse-border-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--pill-blue-inverse-bg-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--pill-generic-inverse-label-default)",
  );
});

test("uses non-inverse teal surface tokens even when inverse is true", () => {
  render(
    <Pill variant="teal" inverse fill>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-s) solid var(--pill-teal-border-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--pill-teal-bg-default)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--pill-generic-inverse-label-default)",
  );
});

test.each([
  "grey",
  "green",
  "red",
  "orange",
  "blue",
  "purple",
  "teal",
  "lime",
  "pink",
  "slate",
] as const)("renders variant %s", (variant) => {
  render(<Pill variant={variant}>Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toBeVisible();
});

test("renders with contrast-safe text color when borderColor is set to red", () => {
  render(
    <Pill borderColor="red" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin090)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    `${toColor(baseTheme, "red")}`,
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    `var(--global-borderwidth-s) solid ${toColor(baseTheme, "red")}`,
  );
});

test("renders with contrast-safe text color when borderColor is set to lightblue", () => {
  render(
    <Pill borderColor="lightblue" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    `var(--global-borderwidth-s) solid ${toColor(baseTheme, "lightblue")}`,
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin090)",
  );
});

test("renders inverse contrast color for outlined custom border pills", () => {
  render(
    <Pill borderColor="red" inverse onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYang100)",
  );
  expect(screen.getByRole("button")).toBeVisible();
});

test("renders non-inverse contrast color for outlined custom border pills", () => {
  render(
    <Pill borderColor="red" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin090)",
  );
  expect(screen.getByRole("button")).toBeVisible();
});

test("renders filled removable pills without a custom border color", () => {
  render(
    <Pill fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByRole("button")).toBeVisible();
});

test("renders expected delete spacing for size XL", () => {
  render(
    <Pill size="XL" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding: "0 calc(32px + var(--global-space-comp-xs)) 0 12px",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    width: "32px",
    padding: "0",
    lineHeight: "18px",
  });
});

test("throws an error when an invalid value is passed to borderColor", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  render(<Pill borderColor="invalidColour">Test Pill</Pill>);

  expect(consoleSpy).toHaveBeenCalledWith(
    'Could not parse "invalidColour", please provide a valid hex, rgb, rgba, hsl, hsla or named color.',
  );
  expect(consoleSpy).toHaveBeenCalledTimes(1);

  consoleSpy.mockRestore();
});

test("renders expected delete spacing for size S", () => {
  render(
    <Pill size="S" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding:
      "0 calc(20px + var(--global-space-comp-xs)) 0 var(--global-space-comp-s)",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    width: "20px",
    padding: "0",
  });
});

test("renders expected delete spacing for size M", () => {
  render(
    <Pill size="M" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding:
      "0 calc(24px + var(--global-space-comp-xs)) 0 var(--global-space-comp-s)",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    width: "24px",
    padding: "0",
  });
});

test("renders expected delete spacing for size L", () => {
  render(
    <Pill size="L" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding:
      "0 calc(28px + var(--global-space-comp-xs)) 0 var(--global-space-comp-s)",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    width: "28px",
    padding: "0",
  });
});

testStyledSystemMargin(
  (props) => <Pill {...props}>test content</Pill>,
  () => screen.getByText("test content"),
);
