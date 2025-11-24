import React from "react";
import { render, screen } from "@testing-library/react";
import LoaderBar from "./loader-bar.component";
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

test("renders", () => {
  render(<LoaderBar />);
  const loaderBar = screen.getByRole("progressbar", { name: "Loading..." });
  expect(loaderBar).toBeVisible();
});

test("uses default size when size is undefined", async () => {
  render(<LoaderBar />);

  const outerBar = await screen.findByTestId("outer-bar");
  const innerBar = await screen.findByTestId("inner-bar");

  expect(outerBar).toHaveStyle("height: 8px");
  expect(innerBar).toHaveStyle("height: 8px");
});

test("renders with custom data role and element", () => {
  render(<LoaderBar data-role="foo" data-component="bar" data-element="baz" />);
  const loaderBar = screen.getByTestId("foo");
  expect(loaderBar).toHaveAttribute("data-role", "foo");
  expect(loaderBar).toHaveAttribute("data-element", "baz");
});

test("renders alternative loading text if user prefers reduced motion", () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(<LoaderBar />);
  const loaderBar = screen.getByRole("progressbar", { name: "Loading..." });
  expect(loaderBar).toHaveTextContent("Loading...");
});

/* Styling test for coverage */
test.each([
  [undefined, "8px"],
  ["small", "4px"],
  ["medium", "8px"],
  ["large", "16px"],
] as const)(
  "when size is %s, both the inner and outer bars have the correct height",
  (size, height) => {
    render(<LoaderBar size={size} />);

    const outerBar = screen.getByTestId("outer-bar");
    const innerBar = screen.getByTestId("inner-bar");

    expect(outerBar).toHaveStyle(`height: ${height}`);
    expect(innerBar).toHaveStyle(`height: ${height}`);
  },
);
