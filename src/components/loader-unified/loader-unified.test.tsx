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

// test.each([
//   ["large", "20px", "8px"],
//   ["medium", "16px", "8px"],
//   ["small", "12px", "6px"],
//   [undefined, "16px", "8px"],
// ] as const)(
//   "applies correct styles when size is '%s'",
//   (size, expectedWidth, expectedMarginRight) => {
//     const props = size ? { size } : {};

//     render(<UnifiedLoader {...props} />);

//     const squares = screen.getAllByTestId("loader-square");
//     const style = window.getComputedStyle(squares[0]);

//     expect(style.width).toBe(expectedWidth);
//     expect(style.marginRight).toBe(expectedMarginRight);
//   },
// );

test("when the user disallows animations, alternative loading text is rendered", () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(<UnifiedLoader />);

  expect(screen.queryByTestId("hidden-label")).not.toBeInTheDocument();
  expect(screen.getByText("Loading")).toBeVisible();
});

test("when the user disallows animations or their preference cannot be determined, alternative loading text is rendered", () => {
  mockUseMediaQuery.mockReturnValueOnce(undefined);
  render(<UnifiedLoader />);

  expect(screen.queryByTestId("hidden-label")).not.toBeInTheDocument();
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

test("renders correctly when `loaderType` is `standalone` and size is `large`", () => {
  render(
    <UnifiedLoader
      loaderLabel="Loading"
      loaderType="standalone"
      size="large"
    />,
  );

  expect(screen.getByTestId("outer-bar")).toHaveStyleRule("height", "16px");
  expect(screen.getByTestId("loader-label")).toHaveStyleRule(
    "font-size",
    "16px",
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

test("renders correctly when `loaderType` is `ring` and size is `large`", () => {
  render(
    <UnifiedLoader loaderLabel="Loading" loaderType="ring" size="large" />,
  );
  expect(screen.getByRole("presentation")).toHaveStyleRule("height", "96px");
  expect(screen.getByTestId("ring-loader-label")).toHaveStyleRule(
    "font-size",
    "16px",
  );
});

test("renders correctly when `loaderType` is `ring` and size is `extra-small`", () => {
  render(
    <UnifiedLoader
      loaderLabel="Loading"
      loaderType="ring"
      size="extra-small"
    />,
  );
  expect(screen.getByRole("presentation")).toHaveStyleRule("height", "20px");
  expect(screen.getByTestId("ring-loader-label")).toHaveStyleRule(
    "font-size",
    "13px",
  );
});

test("renders correctly when `loaderType` is `ring` and `inverse` prop is set", () => {
  render(<UnifiedLoader loaderLabel="Loading" loaderType="ring" inverse />);
  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "#FFFFFF",
    { modifier: "circle[data-role='inner-arc']" },
  );
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

test("renders correctly when `loaderType` is `ring` and `hasMotion` prop is not set", () => {
  render(
    <UnifiedLoader loaderLabel="Loading" loaderType="ring" hasMotion={false} />,
  );
  expect(screen.getByRole("presentation")).not.toHaveStyleRule(
    "animation-iteration-count",
    "infinite",
    { modifier: "circle[data-role='inner-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideButton` prop is set", () => {
  render(<UnifiedLoader loaderType="ring" isInsideButton />);

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "var(--colorsUtilityYang100)",
    { modifier: "circle[data-role='inner-arc']" },
  );
});

test("renders correctly with the expected background colour when `loaderType` is `ring` and `isInsideButton` prop is set and `isActive` prop is false", () => {
  render(<UnifiedLoader loaderType="ring" isInsideButton isActive={false} />);

  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "stroke",
    "var(--colorsSemanticNeutral500)",
    { modifier: "circle[data-role='inner-arc']" },
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

  expect(screen.queryByTestId("hidden-label")).not.toBeInTheDocument();
  expect(screen.getByText("Loading")).toBeVisible();
});

// describe("when the user allows animations", () => {
//   test("renders three square animation", () => {
//     render(<Loader />);
//     const squares = screen.getAllByTestId("loader-square");
//     expect(squares).toHaveLength(3);
//   });

//   test("visually hidden label is set to 'Loading' when `loaderLabel` is not passed", () => {
//     render(<Loader data-role="loader" />);

//     expect(screen.getByTestId("loader")).toHaveTextContent("Loading");
//   });

//   test("should set visually hidden label to provided `loaderLabel`", () => {
//     render(<Loader data-role="loader" loaderLabel="Still loading" />);

//     expect(screen.getByTestId("loader")).toHaveTextContent("Still loading");
//   });
// });
