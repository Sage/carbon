import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Icon from "./icon.component";
import { BackgroundShape } from "./icon.style";
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

test("renders a tooltip, populated with a custom value that is passed to the 'tooltipMessage' prop", async () => {
  render(<Icon type="home" tooltipMessage="foo" />);

  const user = userEvent.setup();
  const icon = screen.getByTestId("icon");
  await user.hover(icon);
  const tooltip = await screen.findByText("foo");

  expect(tooltip).toBeVisible();
});

test("does not render a tooltip, when the `disabled` prop is true", async () => {
  render(<Icon type="home" tooltipMessage="foo" disabled />);

  const user = userEvent.setup();
  const icon = screen.getByTestId("icon");
  await user.hover(icon);
  const tooltip = screen.queryByText("foo");

  expect(tooltip).not.toBeInTheDocument();
});

test("allows a tooltip to be shown via the `tooltipVisible` prop", () => {
  render(<Icon type="home" tooltipMessage="foo" tooltipVisible />);

  const tooltip = screen.getByText("foo");
  expect(tooltip).toBeVisible();
});

test("allows a custom 'id' attribute to be set on the tooltip via the `tooltipId` prop", () => {
  render(
    <Icon type="home" tooltipMessage="foo" tooltipVisible tooltipId="foo" />,
  );

  const tooltip = screen.getByText("foo");
  expect(tooltip).toBeVisible();
});

test("does not render, as an invariant is fired due to the `tooltipFlipOverrides` prop not being an array", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
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
  ).toThrow(
    `The tooltipFlipOverrides prop supplied to \`Icon\` must be an array containing some or all of ["top", "bottom", "left", "right"].`,
  );

  consoleSpy.mockRestore();
});

test("logs a warning when the `fontSize` props value is larger than the `bgSize` props value", () => {
  const loggerSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

  const bgSizeValue = "small";
  const fontSizeValue = "large";

  render(<Icon type="home" bgSize={bgSizeValue} fontSize={fontSizeValue} />);

  expect(loggerSpy).toHaveBeenCalledWith(
    `[WARNING - Icon] The "${bgSizeValue}" \`bgSize\` is smaller than "${fontSizeValue}" \`fontSize\`, the \`bgSize\` has been auto adjusted to a larger size.`,
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
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

testStyledSystemMargin(
  (props) => <Icon type="add" {...props} />,
  () => screen.getByTestId("icon"),
);
