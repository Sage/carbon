import React from "react";
import { render, screen } from "@testing-library/react";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
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

testStyledSystemMargin(
  (props) => <Loader data-role="loader" {...props} />,
  () => screen.getByTestId("loader"),
);

test.each([
  ["large", "20px", "8px"],
  ["medium", "16px", "8px"],
  ["small", "12px", "6px"],
  [undefined, "16px", "8px"],
] as const)(
  "applies correct styles when size is '%s'",
  (size, expectedWidth, expectedMarginRight) => {
    const props = size ? { size } : {};

    render(<Loader {...props} />);

    const squares = screen.getAllByTestId("loader-square");
    const style = window.getComputedStyle(squares[0]);

    expect(style.width).toBe(expectedWidth);
    expect(style.marginRight).toBe(expectedMarginRight);
  },
);

test("when the user disallows animations, alternative loading text is rendered", () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(<Loader />);

  expect(screen.queryByTestId("hidden-label")).not.toBeInTheDocument();
  expect(screen.getByText("Loading...")).toBeVisible();
});

test("when the user disallows animations or their preference cannot be determined, alternative loading text is rendered", () => {
  render(<Loader />);

  expect(screen.getByText("Loading...")).toBeVisible();
});

test("when the user disallows animations or their preference cannot be determined, the provided `loaderLabel` is rendered", () => {
  render(<Loader loaderLabel="Still loading" />);

  expect(screen.getByText("Still loading")).toBeVisible();
});

describe("when the user allows animations", () => {
  test("renders three square animation", () => {
    render(<Loader />);
    const squares = screen.getAllByTestId("loader-square");
    expect(squares).toHaveLength(3);
  });

  test("visually hidden label is set to 'Loading' when `loaderLabel` is not passed", () => {
    render(<Loader data-role="loader" />);

    expect(screen.getByTestId("loader")).toHaveTextContent("Loading");
  });

  test("should set visually hidden label to provided `loaderLabel`", () => {
    render(<Loader data-role="loader" loaderLabel="Still loading" />);

    expect(screen.getByTestId("loader")).toHaveTextContent("Still loading");
  });
});
