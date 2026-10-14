import React from "react";
import { render, screen } from "@testing-library/react";
import Skeleton from "../skeleton";
import Preview from ".";
import useMediaQuery from "../../hooks/useMediaQuery";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

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

test("renders placeholder by default", () => {
  render(<Skeleton />);

  expect(screen.getByTestId("skeleton-placeholder")).toBeVisible();
});

test("renders placeholder when `loading` is true", () => {
  render(<Skeleton loading />);

  expect(screen.getByTestId("skeleton-placeholder")).toBeVisible();
});

test("renders placeholder when `loading` is true and children are provided", () => {
  render(<Skeleton loading>Some content</Skeleton>);

  expect(screen.getByTestId("skeleton-placeholder")).toBeVisible();
  expect(screen.queryByTestId("Some content")).not.toBeInTheDocument();
});

test("does not render a placeholder when `loading` is false", () => {
  render(<Skeleton loading={false} />);

  expect(screen.queryByTestId("skeleton-placeholder")).not.toBeInTheDocument();
});

test("does not render a placeholder when children are provided", () => {
  render(<Skeleton>Some content</Skeleton>);

  expect(screen.queryByTestId("skeleton-placeholder")).not.toBeInTheDocument();
  expect(screen.getByText("Some content")).toBeVisible();
});

test("renders the correct number of placeholders when `lines` prop is set", () => {
  render(<Skeleton lines={3} />);

  expect(screen.getAllByTestId("skeleton-placeholder")).toHaveLength(3);
});

test("renders with provided data- attributes", () => {
  render(<Skeleton data-role="foo" data-element="bar" />);

  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
});

// coverage
test("renders with the default moderate rectangle shape", () => {
  render(<Skeleton />);

  const placeholder = screen.getByTestId("skeleton-placeholder");

  expect(placeholder).toHaveStyleRule("height", "21px");
  expect(placeholder).toHaveStyle({ width: "100%" });
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius100)",
  );
});

test("renders curved and moderate rectangle shapes", () => {
  const { rerender } = render(<Skeleton shape="rectangle-curved" />);

  expect(screen.getByTestId("skeleton-placeholder")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadiusCircle)",
  );

  rerender(<Skeleton shape="rectangle-moderate" />);
  expect(screen.getByTestId("skeleton-placeholder")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius100)",
  );
});

test("keeps legacy Preview shape values working", () => {
  const { rerender } = render(<Preview shape="rectangle-round" />);

  expect(screen.getByTestId("skeleton-placeholder")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadiusCircle)",
  );

  rerender(<Preview shape="rectangle" />);
  expect(screen.getByTestId("skeleton-placeholder")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius100)",
  );

  rerender(<Preview shape="text" />);
  expect(screen.getByTestId("skeleton-placeholder")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius100)",
  );
});

test("renders a circle with its default height and width", () => {
  render(<Skeleton shape="circle" />);

  const placeholder = screen.getByTestId("skeleton-placeholder");

  expect(placeholder).toHaveStyleRule("height", "40px");
  expect(placeholder).toHaveStyleRule("width", "40px");
});

test("uses a circle's height for its width and ignores a custom width", () => {
  const { rerender } = render(
    <Skeleton shape="circle" height="h1" width="100px" />,
  );

  let placeholder = screen.getByTestId("skeleton-placeholder");

  expect(placeholder).toHaveStyleRule("height", "38px");
  expect(placeholder).toHaveStyleRule("width", "38px");
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--borderRadiusCircle)",
  );

  rerender(<Skeleton shape="circle" height="55px" />);
  placeholder = screen.getByTestId("skeleton-placeholder");
  expect(placeholder).toHaveStyleRule("height", "55px");
  expect(placeholder).toHaveStyleRule("width", "55px");
});

test.each([
  ["h1", "38px"],
  ["h2", "30px"],
  ["h3", "26px"],
  ["h4", "23px"],
  ["paragraph", "21px"],
  ["button", "40px"],
] as const)("maps the %s height preset", (preset, expectedHeight) => {
  render(<Skeleton height={preset} />);
  expect(screen.getByTestId("skeleton-placeholder")).toHaveStyleRule(
    "height",
    expectedHeight,
  );
});

test("accepts custom dimensions", () => {
  render(<Skeleton height="256px" width="320px" />);
  const placeholder = screen.getByTestId("skeleton-placeholder");
  expect(placeholder).toHaveStyleRule("height", "256px");
  expect(placeholder).toHaveStyleRule("width", "320px");
});

// coverage
test("renders with no animation when `disableAnimation` is true", () => {
  render(<Skeleton disableAnimation />);

  const placeholder = screen.getByTestId("skeleton-placeholder");

  expect(placeholder).toHaveStyle({
    animation: "none",
  });
  expect(placeholder).toHaveStyleRule("background-image", "none");
});

test("renders with no animation when user prefers reduced motion", () => {
  mockUseMediaQuery.mockReturnValue(false);

  render(<Skeleton />);

  const placeholder = screen.getByTestId("skeleton-placeholder");

  expect(placeholder).toHaveStyle({
    animation: "none",
  });
});

testStyledSystemMargin(
  (props) => <Skeleton {...props} />,
  () => screen.getByTestId("skeleton-wrapper"),
);
