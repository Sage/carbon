import React from "react";
import { render, screen } from "@testing-library/react";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import UnifiedLoader from ".";
import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/useMediaQuery", () => ({
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
  (props) => <UnifiedLoader data-role="loader" {...props} />,
  () => screen.getByTestId("loader"),
);

test.each([
  { size: "small", barHeight: "4px", labelFontSize: "14px" },
  { size: "medium", barHeight: "8px", labelFontSize: "14px" },
  { size: "large", barHeight: "16px", labelFontSize: "16px" },
] as const)(
  "applies corect height for the standalone loader when size is '%s'",
  (params) => {
    const { size, barHeight, labelFontSize } = params;

    render(<UnifiedLoader loaderType="standalone" size={size} />);
    expect(screen.getByTestId("outer-bar")).toHaveStyleRule(
      "height",
      barHeight,
    );
    expect(screen.getByTestId("loader-label")).toHaveStyleRule(
      "font-size",
      labelFontSize,
    );
  },
);

test.each([
  { size: "extra-small", ringHeight: "20px", labelFontSize: "13px" },
  { size: "small", ringHeight: "32px", labelFontSize: "14px" },
  { size: "medium", ringHeight: "64px", labelFontSize: "14px" },
  { size: "large", ringHeight: "80px", labelFontSize: "16px" },
] as const)(
  "applies corect height for the standalone loader when size is '%s'",
  (params) => {
    const { size, ringHeight, labelFontSize } = params;

    render(<UnifiedLoader loaderType="ring" size={size} />);
    expect(screen.getByRole("presentation")).toHaveStyleRule(
      "height",
      ringHeight,
    );
    expect(screen.getByTestId("loader-label")).toHaveStyleRule(
      "font-size",
      labelFontSize,
    );
  },
);

test("when the user disallows animations, alternative loading text is rendered", () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(<UnifiedLoader />);

  expect(screen.getByText("Loading")).toBeVisible();
});

test("when the user disallows animations or their preference cannot be determined, alternative loading text is rendered", () => {
  mockUseMediaQuery.mockReturnValueOnce(undefined);
  render(<UnifiedLoader />);

  expect(screen.getByText("Loading")).toBeVisible();
});

test("when the user disallows animations or their preference cannot be determined, the provided `loaderLabel` is rendered", () => {
  render(<UnifiedLoader loaderLabel="Still loading" />);

  expect(screen.getByText("Still loading")).toBeVisible();
});

test("when `showLabel` prop is not set, the correct aria attributes are applied", () => {
  render(<UnifiedLoader showLabel={false} data-role="loader" />);

  expect(screen.getByTestId("loader")).toHaveAttribute("aria-label", "Loading");
});

test("when no `loaderType` is specified it renders the `standalone` type", () => {
  render(<UnifiedLoader loaderLabel="Loading" />);

  expect(screen.getByTestId("outer-bar")).toBeVisible();
});

test("renders correctly when `loaderType` is `standalone`", () => {
  render(<UnifiedLoader loaderLabel="Loading" loaderType="standalone" />);

  expect(screen.getByTestId("outer-bar")).toBeVisible();
});

test("renders correctly when `loaderType` is `standalone` and `inverse` prop is set", () => {
  render(
    <UnifiedLoader loaderLabel="Loading" loaderType="standalone" inverse />,
  );

  expect(screen.getByTestId("outer-bar")).toBeVisible();
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background",
    "#FFFFFF",
  );
});

test("renders correctly when `loaderType` is `standalone` and variant is `ai`", () => {
  render(
    <UnifiedLoader
      loaderLabel="Loading"
      loaderType="standalone"
      variant="ai"
    />,
  );

  expect(screen.getByTestId("outer-bar")).toBeVisible();
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background",
    "linear-gradient(90deg,var(--mode-color-ai-stop-1,#13A038) 0%,var(--mode-color-ai-stop-2,#149197) 40%,var(--mode-color-ai-stop-3,#A87CFB) 90%)",
  );
});

test("renders correctly when `loaderType` is `standalone` and variant is `ai` and `inverse` prop is set", () => {
  render(
    <UnifiedLoader
      loaderLabel="Loading"
      loaderType="standalone"
      variant="ai"
      inverse
    />,
  );

  expect(screen.getByTestId("outer-bar")).toBeVisible();
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background",
    "linear-gradient(90deg,var(--mode-color-ai-alt-stop-1,#00D639) 0%,var(--mode-color-ai-alt-stop-2,#00D6DE) 40%,var(--mode-color-ai-alt-stop-3,#9D60FF) 90%)",
  );
});

test("renders correctly when `loaderType` is `standalone` and `hasMotion` prop is not set", () => {
  render(<UnifiedLoader loaderLabel="Loading" hasMotion={false} />);
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "animation-iteration-count",
    "none,none",
  );
});

test("renders correctly when `loaderType` is `standalone` and `animationTime` prop is set", () => {
  render(<UnifiedLoader animationTime={3} />);

  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "animation-duration",
    "3s,3s",
  );
});

test("renders correctly when `loaderType` is `ring`", () => {
  render(<UnifiedLoader loaderLabel="Loading" loaderType="ring" />);

  expect(screen.getByTestId("outer-arc")).toBeVisible();
});

test("renders correctly when `loaderType` is `ring` and variant is `stacked`", () => {
  render(
    <UnifiedLoader loaderLabel="Loading" loaderType="ring" variant="stacked" />,
  );

  expect(screen.getByTestId("ring-loader-container")).toHaveStyleRule(
    "flex-direction",
    "column",
  );
});

test("renders correctly when `loaderType` is `ring` and variant is `inline`", () => {
  render(
    <UnifiedLoader loaderLabel="Loading" loaderType="ring" variant="inline" />,
  );

  expect(screen.getByTestId("ring-loader-container")).toHaveStyleRule(
    "flex-direction",
    "row",
  );
});

test("renders correctly when `loaderType` is `ring` and `inverse` prop is set", () => {
  render(<UnifiedLoader loaderLabel="Loading" loaderType="ring" inverse />);
  expect(screen.getByRole("presentation")).toHaveStyleRule("stroke", "#FFF", {
    modifier: "circle[data-role='inner-arc']",
  });
  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "rgba(255,255,255,0.08)",
    { modifier: "circle[data-role='outer-arc']" },
  );
});

test("renders correctly when `loaderType` is `ring` and `trackedAnimation` prop is set", () => {
  render(<UnifiedLoader loaderLabel="Loading" loaderType="ring" isTracked />);
  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "animation-name",
    "trackedAnimation",
    { modifier: "circle[data-role='inner-arc']" },
  );
});

test("renders correctly when `loaderType` is `ring`, `trackedAnimation` prop is set with `isSuccess` state", () => {
  render(
    <UnifiedLoader
      loaderLabel="Loading"
      loaderType="ring"
      isTracked
      isSuccess
    />,
  );

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "#00811F",
    { modifier: "circle[data-role='inner-arc']" },
  );
});

test("renders correctly when `loaderType` is `ring`, `trackedAnimation` prop is set with `isError` state", () => {
  render(
    <UnifiedLoader loaderLabel="Loading" loaderType="ring" isTracked isError />,
  );

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "#DB004E",
    { modifier: "circle[data-role='inner-arc']" },
  );
});

test("renders correctly when `loaderType` is `ring` and `hasMotion` prop is not set", () => {
  render(
    <UnifiedLoader loaderLabel="Loading" loaderType="ring" hasMotion={false} />,
  );
  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "animation-iteration-count",
    "none",
    { modifier: "circle[data-role='inner-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideTypicalButton` and `isInsidePrimaryButton` props are set", () => {
  render(
    <UnifiedLoader
      loaderType="ring"
      isInsideTypicalButton
      isInsidePrimaryButton
    />,
  );

  expect(screen.getByRole("presentation")).toHaveStyleRule("stroke", "#FFF", {
    modifier: "circle[data-role='inner-arc']",
  });

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "rgba(255,255,255,0.08)",
    { modifier: "circle[data-role='outer-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideTypicalButton` and `isInsidePrimaryButton` props are set with `inverse` color scheme", () => {
  render(
    <UnifiedLoader
      loaderType="ring"
      isInsideTypicalButton
      isInsidePrimaryButton
      inverse
    />,
  );

  expect(screen.getByRole("presentation")).toHaveStyleRule("stroke", "#000", {
    modifier: "circle[data-role='inner-arc']",
  });

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "rgba(0,0,0,0.08)",
    { modifier: "circle[data-role='outer-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideTypicalButton` is set and `isInsidePrimaryButton` is not set", () => {
  render(<UnifiedLoader loaderType="ring" isInsideTypicalButton />);

  expect(screen.getByRole("presentation")).toHaveStyleRule("stroke", "#000", {
    modifier: "circle[data-role='inner-arc']",
  });

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "rgba(0,0,0,0.08)",
    { modifier: "circle[data-role='outer-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideTypicalButton` is set and `isInsidePrimaryButton` is not set with `inverse` color scheme", () => {
  render(<UnifiedLoader loaderType="ring" isInsideTypicalButton inverse />);

  expect(screen.getByRole("presentation")).toHaveStyleRule("stroke", "#FFF", {
    modifier: "circle[data-role='inner-arc']",
  });

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "rgba(255,255,255,0.08)",
    { modifier: "circle[data-role='outer-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideDestructiveButton` and `isInsidePrimaryButton` props are set", () => {
  render(
    <UnifiedLoader
      loaderType="ring"
      isInsideDestructiveButton
      isInsidePrimaryButton
    />,
  );

  expect(screen.getByRole("presentation")).toHaveStyleRule("stroke", "#FFF", {
    modifier: "circle[data-role='inner-arc']",
  });

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "rgba(255,255,255,0.08)",
    { modifier: "circle[data-role='outer-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideDestructiveButton` is set and `isInsidePrimaryButton` is not set", () => {
  render(<UnifiedLoader loaderType="ring" isInsideDestructiveButton />);

  expect(screen.getByRole("presentation")).toHaveStyleRule("stroke", "#000", {
    modifier: "circle[data-role='inner-arc']",
  });

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "rgba(0,0,0,0.08)",
    { modifier: "circle[data-role='outer-arc']" },
  );
});

test("renders correctly when `loaderType` is `ring` and `animationTime` prop is set", () => {
  render(<UnifiedLoader loaderType="ring" animationTime={2} />);

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "animation-duration",
    "2s",
    { modifier: "circle[data-role='inner-arc']" },
  );
});

test("when the user disallows animations or their preference cannot be determined and the `loaderType` is `star` alternative loading text is rendered", () => {
  render(<UnifiedLoader loaderType="star" />);

  expect(screen.getByText("Loading")).toBeVisible();
});
