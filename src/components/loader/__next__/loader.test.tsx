import React from "react";
import { render, screen } from "@testing-library/react";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";
import Loader from ".";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Button from "../../button/button.component";
import StyledNextButton from "../../button/__next__/button.style";
import NextButton from "../../button/__next__/button.component";

jest.mock("../../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

beforeEach(() => {
  jest.clearAllMocks();
  mockUseMediaQuery.mockReturnValue(true);
});

afterAll(() => {
  jest.restoreAllMocks();
});

testStyledSystemMargin(
  (props) => <Loader data-role="loader" {...props} />,
  () => screen.getByTestId("loader"),
);

test.each([
  {
    size: "small",
    barHeight: "var(--global-size-5-xs)",
    labelFont: "var(--global-font-static-comp-medium-s)",
  },
  {
    size: "medium",
    barHeight: "var(--global-size-4-xs)",
    labelFont: "var(--global-font-static-comp-medium-m)",
  },
  {
    size: "large",
    barHeight: "var(--global-size-3-xs)",
    labelFont: "var(--global-font-static-comp-medium-l)",
  },
] as const)(
  "applies correct height for the standalone loader when size is '%s'",
  (params) => {
    const { size, barHeight, labelFont } = params;

    render(<Loader loaderType="standalone" size={size} />);
    expect(screen.getByTestId("outer-bar")).toHaveStyleRule(
      "height",
      barHeight,
    );
    expect(screen.getByTestId("loader-label")).toHaveStyleRule(
      "font",
      labelFont,
    );
  },
);

test.each([
  {
    size: "extra-small",
    ringHeight: "20px",
    labelFont: "var(--global-font-static-comp-medium-xs)",
  },
  {
    size: "small",
    ringHeight: "32px",
    labelFont: "var(--global-font-static-comp-medium-s)",
  },
  {
    size: "medium",
    ringHeight: "64px",
    labelFont: "var(--global-font-static-comp-medium-m)",
  },
  {
    size: "large",
    ringHeight: "80px",
    labelFont: "var(--global-font-static-comp-medium-l)",
  },
] as const)(
  "applies correct height for the ring loader when size is '%s'",
  (params) => {
    const { size, ringHeight, labelFont } = params;

    render(<Loader loaderType="ring" size={size} />);
    expect(screen.getByRole("presentation")).toHaveStyleRule(
      "height",
      ringHeight,
    );
    expect(screen.getByTestId("loader-label")).toHaveStyleRule(
      "font",
      labelFont,
    );
  },
);

test("when the user disallows animations, alternative loading text is rendered with correct colour", () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(<Loader />);

  expect(screen.getByText("Loading...")).toBeVisible();
  expect(screen.getByText("Loading...")).toHaveStyleRule(
    "color",
    "var(--progress-label-alt)",
  );
});

test("when the user disallows animations, alternative loading text is rendered with correct colour in `inverse` colour scheme", () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(<Loader inverse />);

  expect(screen.getByText("Loading...")).toBeVisible();
  expect(screen.getByText("Loading...")).toHaveStyleRule(
    "color",
    "var(--progress-inverse-label-alt)",
  );
});

test("when the user disallows animations and loader is inside a primary `Button`, alternative loading text is rendered with inverse colour", () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(
    <Button buttonType="primary" onClick={() => {}}>
      <Loader />
    </Button>,
  );

  expect(screen.getByText("Loading...")).toHaveStyleRule(
    "color",
    "var(--progress-inverse-label-alt)",
  );
});

test("when the user disallows animations or their preference cannot be determined, alternative loading text is rendered", () => {
  mockUseMediaQuery.mockReturnValueOnce(undefined);
  render(<Loader />);

  expect(screen.getByText("Loading...")).toBeVisible();
});

test("when the user disallows animations or their preference cannot be determined, the provided `loaderLabel` is rendered", () => {
  render(<Loader loaderLabel="Still loading" />);

  expect(screen.getByText("Still loading")).toBeVisible();
});

test("when `showLabel` prop is not set, the correct aria attributes are applied", () => {
  render(<Loader showLabel={false} data-role="loader" />);

  expect(screen.getByTestId("loader")).toHaveAttribute(
    "aria-label",
    "Loading...",
  );
});

test("when no `loaderType` is specified it renders the `standalone` type", () => {
  render(<Loader loaderLabel="Loading" />);

  expect(screen.getByTestId("outer-bar")).toBeVisible();
});

test("renders correctly when `loaderType` is `standalone`", () => {
  render(<Loader loaderLabel="Loading" loaderType="standalone" />);

  expect(screen.getByTestId("outer-bar")).toBeVisible();
});

test("switches loader types without changing Loader's hook order", () => {
  const { rerender } = render(<Loader loaderType="standalone" />);

  rerender(<Loader loaderType="ring" />);
  expect(screen.getByTestId("inner-arc")).toBeVisible();

  rerender(<Loader loaderType="star" />);
  expect(screen.getByTestId("sparkle-svg")).toBeVisible();
});

test("renders correctly when `loaderType` is `standalone` and `inverse` prop is set", () => {
  render(<Loader loaderLabel="Loading" loaderType="standalone" inverse />);

  expect(screen.getByTestId("outer-bar")).toBeVisible();
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background",
    "var(--progress-loader-inverse-fg-default)",
  );
});

test("renders correctly when `loaderType` is `standalone` and variant is `ai`", () => {
  render(<Loader loaderLabel="Loading" loaderType="standalone" variant="ai" />);

  expect(screen.getByTestId("outer-bar")).toBeVisible();
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background",
    "linear-gradient(90deg,var(--mode-color-ai-alt-stop-1) 0%,var(--mode-color-ai-alt-stop-2) 40%,var(--mode-color-ai-alt-stop-3) 90%)",
  );
});

test("renders correctly when `loaderType` is `standalone` and variant is `ai` and `inverse` prop is set", () => {
  render(
    <Loader
      loaderLabel="Loading"
      loaderType="standalone"
      variant="ai"
      inverse
    />,
  );

  expect(screen.getByTestId("outer-bar")).toBeVisible();
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background",
    "linear-gradient(90deg,var(--mode-color-ai-alt-stop-1) 0%,var(--mode-color-ai-alt-stop-2) 40%,var(--mode-color-ai-alt-stop-3) 90%)",
  );
});

test("renders correctly when `loaderType` is `standalone` and `hasMotion` prop is not set", () => {
  render(<Loader loaderLabel="Loading" hasMotion={false} />);
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule("animation", "none");
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "transform",
    "translateX(50%)",
  );
});

test("renders correctly when `loaderType` is `standalone` and `animationTime` prop is set", () => {
  render(<Loader animationTime={3} />);

  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "animation",
    expect.stringContaining("3s cubic-bezier(0.66,0,0.34,1) infinite"),
  );
});

test("uses the v4 standalone geometry and default duration", () => {
  render(<Loader />);

  expect(screen.getByTestId("inner-bar")).toHaveStyleRule("width", "50%");
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "animation",
    expect.stringContaining("0.983s cubic-bezier(0.66,0,0.34,1) infinite"),
  );
});

test("renders correctly when `loaderType` is `ring`", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" />);

  expect(screen.getByTestId("outer-arc")).toBeVisible();
  expect(screen.getByRole("presentation")).toHaveAttribute(
    "viewBox",
    "0 0 64 64",
  );
  expect(screen.getByTestId("inner-arc")).toHaveAttribute("pathLength", "1");
  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke-dasharray",
    "1 1",
  );
  expect(screen.getByTestId("ring-rotator")).toHaveStyleRule(
    "transform",
    "rotate(-90deg)",
  );
});

test("renders correctly when `loaderType` is `ring` and variant is `stacked`", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" variant="stacked" />);

  expect(screen.getByTestId("ring-loader-container")).toHaveStyleRule(
    "flex-direction",
    "column",
  );
});

test("renders correctly when `loaderType` is `ring` and variant is `inline`", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" variant="inline" />);

  expect(screen.getByTestId("ring-loader-container")).toHaveStyleRule(
    "flex-direction",
    "row",
  );
});

test("renders correctly when `loaderType` is `ring` and variant is `ai-stacked`", () => {
  render(
    <Loader loaderLabel="Loading" loaderType="ring" variant="ai-stacked" />,
  );

  expect(screen.getByTestId("ring-loader-container")).toHaveStyleRule(
    "flex-direction",
    "column",
  );

  const gradient = screen.getByTestId("ai-ring-gradient");
  expect(gradient).toHaveAttribute("x1", "18.5");
  expect(gradient).toHaveAttribute("y1", "30.5");
  expect(gradient).toHaveAttribute("x2", "65");
  expect(gradient).toHaveAttribute("y2", "30.5");
  expect(gradient).toHaveAttribute("gradientUnits", "userSpaceOnUse");
  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke",
    `url(#${gradient.id})`,
  );
});

test("renders correctly when `loaderType` is `ring` and variant is `ai-inline`", () => {
  render(
    <Loader loaderLabel="Loading" loaderType="ring" variant="ai-inline" />,
  );

  expect(screen.getByTestId("ring-loader-container")).toHaveStyleRule(
    "flex-direction",
    "row",
  );

  const gradient = screen.getByTestId("ai-ring-gradient");
  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke",
    `url(#${gradient.id})`,
  );
});

test("does not apply ai ring gradient when variant is `ai`", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" variant="ai" />);

  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-fg-default)",
  );
  expect(screen.queryByTestId("ai-ring-gradient")).not.toBeInTheDocument();
});

test("renders correctly when `loaderType` is `ring` and `inverse` prop is set", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" inverse />);
  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-inverse-fg-default)",
  );
  expect(screen.getByTestId("outer-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-inverse-bg-default)",
  );
});

test("renders correctly when `loaderType` is `ring` and `trackedAnimation` prop is set", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" isTracked />);
  const element = screen.getByTestId("inner-arc");
  expect(element).toHaveStyleRule(
    "animation",
    expect.stringContaining("0.783s linear infinite"),
  );
  expect(screen.getByTestId("ring-rotator")).not.toHaveStyleRule("animation");
});

test("renders correctly when `loaderType` is `ring` and `isSuccess` is true", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" isSuccess />);

  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-fg-complete)",
  );
});

test("renders correctly when `loaderType` is `ring` and `isError` is true", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" isError />);

  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-fg-error)",
  );
});

test("renders correctly when `loaderType` is `ring` and `hasMotion` prop is not set", () => {
  render(<Loader loaderLabel="Loading" loaderType="ring" hasMotion={false} />);
  expect(screen.getByTestId("inner-arc")).not.toHaveStyleRule("animation");
  expect(screen.getByTestId("ring-rotator")).not.toHaveStyleRule("animation");
});

test("renders correctly when `loaderType` is `ring` and variant is `ai-stacked` and `hasMotion` prop is not set", () => {
  render(<Loader loaderType="ring" variant="ai-stacked" hasMotion={false} />);
  expect(screen.getByTestId("inner-arc")).not.toHaveStyleRule("animation");
  expect(screen.getByTestId("ring-rotator")).not.toHaveStyleRule("animation");
});

test("renders correctly with the expected background color when `loaderType` is ring and it uses the `inverse` color scheme inside a secondary `Button`", () => {
  render(
    <Button buttonType="secondary" onClick={() => {}}>
      <Loader
        loaderType="ring"
        variant="inline"
        size="extra-small"
        inverse
        showLabel
      />
    </Button>,
  );

  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-inverse-fg-default)",
  );

  expect(screen.getByTestId("outer-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-inverse-bg-default)",
  );
});

test("uses inverse outer arc token when ring loader is rendered inside a primary `Button`", () => {
  render(
    <Button buttonType="primary" onClick={() => {}}>
      <Loader loaderType="ring" variant="inline" size="extra-small" showLabel />
    </Button>,
  );

  expect(screen.getByTestId("outer-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-inverse-bg-default)",
  );
});

test("keeps default outer arc token when ring loader is rendered inside a secondary `Button`", () => {
  render(
    <Button buttonType="secondary" onClick={() => {}}>
      <Loader loaderType="ring" variant="inline" size="extra-small" showLabel />
    </Button>,
  );

  expect(screen.getByTestId("outer-arc")).toHaveStyleRule(
    "stroke",
    "var(--progress-loader-bg-default)",
  );
});

test("renders correctly when `loaderType` is `ring` and `animationTime` prop is set", () => {
  render(<Loader loaderType="ring" animationTime={2} />);

  expect(screen.getByTestId("inner-arc")).toHaveStyleRule(
    "animation",
    expect.stringContaining("2s linear infinite"),
  );
});

test("when the user disallows animations or their preference cannot be determined and the `loaderType` is `star` alternative loading text is rendered", () => {
  render(<Loader loaderType="star" />);

  expect(screen.getByText("Loading...")).toBeVisible();
});

test("renders the six sparkle paths with tokenized gradient stops", () => {
  render(<Loader loaderType="star" />);

  expect(screen.getAllByTestId("sparkle-star")).toHaveLength(6);
  expect(screen.getByTestId("sparkle-svg")).toHaveAttribute(
    "viewBox",
    "0 0 35 35",
  );

  const stops = screen.getAllByTestId("sparkle-gradient-stop");
  expect(stops).toHaveLength(15);
  const gradients = screen.getAllByTestId("star-gradient");
  expect(gradients).toHaveLength(5);
  expect(stops[0]).toHaveAttribute(
    "stop-color",
    "var(--mode-color-ai-alt-stop-1)",
  );
  expect(stops[1]).toHaveAttribute("offset", "40%");
  expect(stops[2]).toHaveAttribute("offset", "90%");
  expect(gradients[0]).toHaveAttribute("x2", "15.375");
  expect(gradients[2]).toHaveAttribute("x1", "-26.25");
  expect(gradients[3]).toHaveAttribute("y2", "23.625");
  expect(gradients[4]).toHaveAttribute("x1", "-13.5");
  const stars = screen.getAllByTestId("sparkle-star");
  expect(stars[3]).toHaveAttribute("fill", expect.stringContaining("-4)"));
  const starGroups = screen.getAllByTestId("sparkle-star-group");
  expect(starGroups[4]).toHaveAttribute(
    "transform",
    "translate(3.375 30.679) rotate(-90) translate(10 10)",
  );
  expect(starGroups[5]).toHaveAttribute(
    "transform",
    "translate(20 13.5) rotate(-90) translate(6 6)",
  );
  expect(stars[0]).toHaveStyleRule(
    "animation",
    expect.stringContaining("3.159s linear infinite"),
  );
});

test("applies custom animation time and paused motion to sparkle paths", () => {
  render(<Loader loaderType="star" animationTime={6} hasMotion={false} />);

  screen.getAllByTestId("sparkle-star").forEach((star) => {
    expect(star).toHaveStyleRule("animation", expect.stringContaining("6s"));
    expect(star).toHaveStyleRule("animation-play-state", "paused");
  });
});

test("freezes each sparkle at its own visible animation point", () => {
  render(<Loader loaderType="star" animationTime={1} hasMotion={false} />);

  const delays = screen
    .getAllByTestId("sparkle-star")
    .map((star) => window.getComputedStyle(star).animationDelay);

  expect(new Set(delays).size).toBeGreaterThan(1);
});

test("uses unique SVG definition IDs for each loader instance", () => {
  render(
    <>
      <Loader loaderType="ring" variant="ai-inline" />
      <Loader loaderType="ring" variant="ai-inline" />
      <Loader loaderType="star" />
      <Loader loaderType="star" />
    </>,
  );

  const definitionIds = [
    ...screen.getAllByTestId("ai-ring-gradient"),
    ...screen.getAllByTestId("star-gradient"),
  ].map(({ id }) => id);

  expect(new Set(definitionIds).size).toBe(definitionIds.length);
  expect(definitionIds).toHaveLength(12);
});

test("uses text colour of a parent Button to style its text and inner ring arc", () => {
  render(
    <Button buttonType="primary" onClick={() => {}}>
      <Loader loaderType="ring" variant="inline" size="extra-small" showLabel />
    </Button>,
  );

  const labelText = screen.getByText("Loading...");
  expect(labelText).toHaveStyleRule("color", "currentColor", {
    modifier: `${StyledNextButton} &`,
  });

  const innerArc = screen.getByTestId("inner-arc");
  expect(innerArc).toHaveStyleRule("stroke", "currentColor", {
    modifier: `${StyledNextButton} &`,
  });
});

it.each([Button, NextButton])(
  "uses correct font size when the loader is inside of a Button",
  (Component) => {
    render(
      <Component onClick={() => {}}>
        <Loader
          loaderType="ring"
          variant="inline"
          size="extra-small"
          showLabel
        />
      </Component>,
    );

    const labelText = screen.getByText("Loading...");
    expect(labelText).toHaveStyleRule(
      "font",
      "var(--global-font-static-comp-medium-s)",
    );
  },
);
