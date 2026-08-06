import React from "react";
import { render, screen } from "@testing-library/react";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Logger from "../../__internal__/utils/logger";
import Icon from "./icon.component";
import StyledIcon, { BackgroundShape } from "./icon.style";
import iconConfig from "./icon-config";
import browserTypeCheck from "../../__internal__/utils/helpers/browser-type-check";
import { IconType } from "./icon-type";
import { TooltipPositions } from "../tooltip/tooltip.config";

jest.mock("../../__internal__/utils/helpers/browser-type-check");

test("renders with an icon type, via the `type` prop", () => {
  render(<Icon type="home" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveAttribute("type", "home");
});

test.each([
  ["question", "help"],
  ["settings", "maintenance"],
  ["gift", "new"],
  ["tick", "success"],
  ["message", "messages"],
  ["message", "email"],
] as [IconType, IconType][])(
  "renders with the %s icon type, when the `type` prop is %s",
  (newType, type) => {
    render(<Icon type={type} />);

    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("type", newType);
  },
);

test("supports arbitrary CSS color values for backward compatibility", () => {
  render(<Icon type="home" color="#123456" />);

  expect(screen.getByTestId("icon")).toHaveStyleRule("color", "#123456");
});

test.each(["negative", "#123456"])(
  "uses the disabled icon token instead of the %s color",
  (color) => {
    render(<Icon type="home" color={color} disabled />);

    expect(screen.getByTestId("icon")).toHaveStyleRule(
      "color",
      "var(--mode-color-action-inactive-icon)",
    );
  },
);

test.each([
  "white",
  "#fff",
  "#ffffff",
  "rgb(255,255,255)",
  "rgb(255, 255, 255)",
  "rgba(255,255,255,1)",
  "rgba(255, 255, 255, 1)",
])("maps the legacy color value %s to inverse styling", (color) => {
  render(<Icon type="home" color={color} />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--page-content-inverse-icon-default)",
  );
});

test("renders with custom data tags", () => {
  render(
    <Icon
      type="home"
      data-role="icon"
      data-component="icon"
      data-element="icon"
    />,
  );

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveAttribute("data-component", "icon");
  expect(icon).toHaveAttribute("data-element", "icon");
});

test("does not render a data-color attribute when the `color` prop is not provided", () => {
  render(<Icon type="home" />);

  expect(screen.getByTestId("icon")).not.toHaveAttribute("data-color");
});

test("renders a data-color attribute and no color DOM attribute when the `color` prop is provided", () => {
  render(<Icon type="home" color="gold" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveAttribute("data-color", "gold");
  expect(icon).not.toHaveAttribute("color");
});

test("renders with the 'aria-hidden' attribute with the `aria-hidden` prop is true", () => {
  render(<Icon type="home" aria-hidden />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveAttribute("aria-hidden", "true");
});

test("renders with a custom 'aria-label' attribute, via the `ariaLabel` prop", () => {
  render(<Icon type="home" ariaLabel="foo" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveAccessibleName("foo");
});

test("renders with a custom 'id' attribute, via the `id` prop", () => {
  render(<Icon type="home" id="foo" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveAttribute("id", "foo");
});

test("renders with a specific role, via the `role` prop", () => {
  render(<Icon type="home" role="img" />);

  const icon = screen.getByRole("img");
  expect(icon).toBeVisible();
});

test("does not throw when the `tooltipFlipOverrides` prop is provided", () => {
  expect(() =>
    render(
      <Icon
        type="home"
        tooltipMessage="foo"
        tooltipFlipOverrides={
          ["invalid-position"] as unknown as TooltipPositions[]
        }
      />,
    ),
  ).not.toThrow();
});

test('maps the `fontSize` value "extra-large" to "large" and logs a warning', () => {
  const loggerSpy = jest.spyOn(Logger, "warn").mockImplementation(() => {});

  render(<Icon type="home" fontSize="extra-large" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    `[Icon] The \`fontSize\` value "extra-large" is no longer supported and has been mapped to "large".`,
  );
  loggerSpy.mockRestore();
});

/* styling test for coverage */
test.each(["circle", "rounded-rect", "square"] as BackgroundShape[])(
  "renders with the correct border radius on the icon background when the `bgShape` is %s",
  (bgShape) => {
    render(<Icon type="home" bgShape={bgShape} />);

    expect(screen.getByTestId("icon")).toHaveStyleRule(
      `border-radius: ${iconConfig.backgroundShape[bgShape]}`,
    );
  },
);

const mockBrowserTypeCheck = browserTypeCheck as jest.MockedFunction<
  typeof browserTypeCheck
>;

/* styling test for coverage */
test("renders with the correct margin-top when rendered in chrome or firefox and the `fontSize` prop is small", () => {
  mockBrowserTypeCheck.mockImplementation(() => true);

  render(<Icon type="services" fontSize="small" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveStyleRule("margin-top", "-7px", { modifier: "&::before" });
});

/* styling test for coverage */
test("renders with the correct margin-top when rendered in chrome or firefox and the `fontSize` prop is not small", () => {
  mockBrowserTypeCheck.mockImplementation(() => true);

  render(<Icon type="services" fontSize="medium" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveStyleRule("margin-top", "-8px", { modifier: "&::before" });
});

/* styling test for coverage */
test("renders with the inverse icon colour token when the `inverse` prop is true", () => {
  render(<Icon type="home" inverse />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--page-content-inverse-icon-default)",
  );
});

/* styling test for coverage */
test("renders with the standard icon colour token when the `inverse` prop is not set", () => {
  render(<Icon type="home" />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--page-content-icon-default)",
  );
});

test.each([
  ["neutral", "var(--page-content-icon-default)"],
  ["subtle", "var(--page-content-icon-alt)"],
  ["caution", "var(--page-content-caution-icon)"],
  ["info", "var(--page-content-info-icon)"],
  ["negative", "var(--page-content-negative-icon)"],
  ["positive", "var(--page-content-positive-icon)"],
] as const)(
  "renders the %s color preset with the correct token",
  (color, token) => {
    render(<Icon type="home" color={color} />);

    expect(screen.getByTestId("icon")).toHaveStyleRule("color", token);
  },
);

test("renders the inverse subtle color preset with the correct token", () => {
  render(<Icon type="home" color="subtle" inverse />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--page-content-inverse-icon-alt)",
  );
});

test.each([
  ["caution", "var(--page-content-caution-icon)"],
  ["info", "var(--page-content-info-icon)"],
  ["negative", "var(--page-content-negative-icon)"],
  ["positive", "var(--page-content-positive-icon)"],
] as const)(
  "status color %s ignores the `inverse` prop — status semantics are surface-independent",
  (color, token) => {
    render(<Icon type="home" color={color} inverse />);

    expect(screen.getByTestId("icon")).toHaveStyleRule("color", token);
  },
);

test("normalizes semantic color values", () => {
  render(<Icon type="home" color=" INFO " />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--page-content-info-icon)",
  );
});

/* styling test for coverage */
test("renders with the hover brightness filter when the `isInteractive` prop is true", () => {
  render(<StyledIcon type="home" isInteractive data-role="icon" />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "filter",
    "brightness(0.9)",
    { modifier: "&:not(:focus):hover" },
  );
});

testStyledSystemMargin(
  (props) => <Icon type="add" {...props} />,
  () => screen.getByTestId("icon"),
);
