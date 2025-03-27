import React from "react";
import { render, screen, within } from "@testing-library/react";
import Switch from "../switch.component";
import useMediaQuery from "../../../hooks/useMediaQuery";

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

test("when `loading` is true, the correct Loader styles are applied", () => {
  render(<Switch onChange={() => {}} loading />);

  const loaderElement = screen.getByTestId("switch-slider-loader");

  expect(loaderElement).toBeVisible();
  expect(loaderElement).toHaveStyle({
    width: "100%",
    height: "100%",
  });
});

test("renders loader squares when loading is true and motion is disabled", () => {
  mockUseMediaQuery.mockReturnValueOnce(true);

  render(<Switch onChange={() => {}} loading />);

  const loader = screen.getByTestId("switch-slider-loader");

  expect(loader).toBeInTheDocument();
  const loaderSquares = within(loader).getAllByRole("presentation");
  expect(loaderSquares.length).toBeGreaterThan(0);
});

test("when `loading` is true and Switch `size` is large, the correct LoaderSquare styles are applied", async () => {
  mockUseMediaQuery.mockReturnValue(false);
  render(<Switch onChange={() => {}} size="large" loading />);

  const loaderSquares = screen.getAllByTestId("loader-square");

  expect(loaderSquares[1]).toBeVisible();
  expect(loaderSquares[1]).toHaveStyleRule("width: var(--sizing200)");
  expect(loaderSquares[1]).toHaveStyleRule("height: var(--sizing200)");
});

describe("when the theme is set to sageTheme", () => {
  it("applies the correct base styles", () => {
    render(<Switch onChange={() => {}} />);

    const switchPanel = screen.getByTestId("slider-panel");

    expect(switchPanel).toHaveStyleRule(
      "color: var(--colorsActionMinorYang100)",
    );
  });

  it("applies the correct off panel styles", () => {
    render(<Switch onChange={() => {}} />);

    const switchPanel = screen.getByTestId("slider-panel");

    expect(switchPanel).toHaveStyleRule(
      "color",
      "var(--colorsActionMinor500)",
      {
        modifier: '[type="off"]',
      },
    );
  });
});

// coverage
test("renders with normal styles when `isDarkBackground` is false", () => {
  render(<Switch onChange={() => {}} isDarkBackground={false} />);

  const switchPanel = screen.getByTestId("slider-panel");

  expect(switchPanel).toHaveStyleRule("color: var(--colorsActionMinorYang100)");
});

// coverage
test("renders with dark background styles when `isDarkBackground` is true", () => {
  render(<Switch onChange={() => {}} isDarkBackground />);

  const switchPanel = screen.getByTestId("slider-panel");

  expect(switchPanel).toHaveStyleRule("color: var(--colorsUtilityYin100)");
});
