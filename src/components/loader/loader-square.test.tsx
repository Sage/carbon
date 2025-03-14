import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../__spec_helper__/__internal__/test-utils";

import Loader from ".";

jest.mock("../../hooks/useMediaQuery", () => {
  return jest.fn(() => true);
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

  expect(loaderSquares[0]).toHaveStyleRule(
    "backgroundColor: var(--colorsSemanticNeutral500)",
  );

  expect(loaderSquares[1]).toHaveStyleRule(
    "backgroundColor: var(--colorsSemanticNeutral500)",
  );

  expect(loaderSquares[2]).toHaveStyleRule(
    "backgroundColor: var(--colorsSemanticNeutral500)",
  );
});
