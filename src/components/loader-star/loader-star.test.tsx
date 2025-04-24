import React from "react";
import { render, screen } from "@testing-library/react";
import LoaderStar from ".";
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

test("should render with the expected data- attributes", () => {
  render(<LoaderStar data-element="fish" data-role="chips" />);

  const LoaderStarComponent = screen.getByRole("status");

  expect(LoaderStarComponent).toHaveAttribute("data-element", "fish");
  expect(LoaderStarComponent).toHaveAttribute("data-role", "chips");
});

test("should return null and render nothing when useMediaQuery returns undefined", () => {
  mockUseMediaQuery.mockReturnValueOnce(undefined);

  render(<LoaderStar />);

  const wrapperElement = screen.queryByRole("status");
  expect(wrapperElement).not.toBeInTheDocument();
});

test("component should have a visually hidden label for assistive technologies by default", () => {
  render(<LoaderStar />);

  const hiddenLabelElement = screen.getByTestId("hidden-label");

  expect(hiddenLabelElement).toHaveTextContent("Loading...");
});

test("renders a custom visually hidden label for assistive technologies to use, when loaderStarLabel prop is provided", () => {
  render(<LoaderStar loaderStarLabel="Responding..." />);

  const hiddenLabelElement = screen.getByTestId("hidden-label");

  expect(hiddenLabelElement).toHaveTextContent("Responding...");
});

describe("when the component is rendered and the user prefers reduced motion", () => {
  it("should render the the LoaderStar label", () => {
    mockUseMediaQuery.mockReturnValueOnce(false);

    render(<LoaderStar />);

    const wrapperElement = screen.getByRole("status");
    const visibleLabelElement = screen.getByTestId("visible-label");

    expect(wrapperElement).toHaveTextContent("Loading...");
    expect(visibleLabelElement).toBeVisible();
  });

  it("should not render the svg stars", () => {
    mockUseMediaQuery.mockReturnValueOnce(false);

    render(<LoaderStar />);

    const svgStarElement = screen.queryByRole("presentation");

    expect(svgStarElement).not.toBeInTheDocument();
  });
});
