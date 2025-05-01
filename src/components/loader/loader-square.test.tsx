import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from ".";
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

it.each([0, 1, 2])("each loader square renders as expected", (index) => {
  render(<Loader />);

  const loaderSquares = screen.getAllByTestId("loader-square");

  expect(loaderSquares[index]).toBeInTheDocument();
});

// These styling tests required for coverage
test("when `size` prop is set to large, the expected width, height, and margin styles are applied", () => {
  render(<Loader size="large" />);

  const loaderSquares = screen.getAllByTestId("loader-square");

  expect(loaderSquares[0]).toHaveStyle({
    height: "20px",
    width: "20px",
    marginRight: "8px",
  });

  expect(loaderSquares[1]).toHaveStyle({
    height: "20px",
    width: "20px",
    marginRight: "8px",
  });

  expect(loaderSquares[2]).toHaveStyle({
    height: "20px",
    width: "20px",
  });
});

// These styling tests required for coverage
test("when `size` prop is set to small, the expected width, height, and margin styles are applied", () => {
  render(<Loader size="small" />);

  const loaderSquares = screen.getAllByTestId("loader-square");

  expect(loaderSquares[0]).toHaveStyle({
    width: "12px",
    marginRight: "6px",
  });

  expect(loaderSquares[1]).toHaveStyle({
    width: "12px",
    marginRight: "6px",
  });

  expect(loaderSquares[2]).toHaveStyle({
    width: "12px",
  });
});

// These styling tests required for coverage
test("when inside button, the expected white background colour is applied", () => {
  render(<Loader isInsideButton />);

  const loaderSquares = screen.getAllByTestId("loader-square");

  expect(loaderSquares[0]).toHaveStyleRule(
    "backgroundColor: var(--colorsUtilityYang100)",
  );

  expect(loaderSquares[1]).toHaveStyleRule(
    "backgroundColor: var(--colorsUtilityYang100)",
  );

  expect(loaderSquares[2]).toHaveStyleRule(
    "backgroundColor: var(--colorsUtilityYang100)",
  );
});

// These styling tests required for coverage
test("when inside button and `isActive` prop is false, the expected background colour is applied", () => {
  render(<Loader isInsideButton isActive={false} />);

  const loaderSquares = screen.getAllByTestId("loader-square");

  loaderSquares.forEach((square) => {
    expect(square).toHaveStyleRule(
      "background-color",
      "var(--colorsSemanticNeutral500)",
    );
  });
});
