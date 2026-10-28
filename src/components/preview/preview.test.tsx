import React from "react";
import { render, screen } from "@testing-library/react";
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
  render(<Preview />);

  expect(screen.getByTestId("preview-placeholder")).toBeVisible();
});

test("renders placeholder when `loading` is true and children are provided", () => {
  render(<Preview loading>Some content</Preview>);

  expect(screen.getByTestId("preview-placeholder")).toBeVisible();
  expect(screen.queryByText("Some content")).not.toBeInTheDocument();
});

test("renders children without a placeholder when `loading` is false", () => {
  render(<Preview loading={false}>Loaded content</Preview>);

  expect(screen.queryByTestId("preview-placeholder")).not.toBeInTheDocument();
  expect(screen.getByText("Loaded content")).toBeVisible();
});

test("renders the correct number of placeholders when `lines` prop is set", () => {
  render(<Preview lines={3} />);

  expect(screen.getAllByTestId("preview-placeholder")).toHaveLength(3);
});

test("renders with provided data- attributes", () => {
  render(<Preview data-role="foo" data-element="bar" />);

  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
  expect(screen.getByTestId("foo")).toHaveAttribute(
    "data-component",
    "preview",
  );
});

test("preserves the legacy text layout and shortens the last line", () => {
  render(<Preview lines={3} />);

  const placeholders = screen.getAllByTestId("preview-placeholder");

  expect(placeholders[0]).toHaveStyleRule("height", "var(--sizing175)");
  expect(placeholders[0]).toHaveStyleRule("width", "100%");
  expect(placeholders[0]).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-m)",
  );
  expect(placeholders[1]).toHaveStyleRule("width", "100%");
  expect(placeholders[2]).toHaveStyleRule("width", "calc(100% * 0.8)");
});

test("does not shorten the last line for non-text shapes", () => {
  render(<Preview shape="rectangle" lines={2} />);

  expect(screen.getAllByTestId("preview-placeholder")[1]).toHaveStyleRule(
    "width",
    "var(--sizing1500)",
  );
});

test("preserves legacy rectangle dimensions and radii", () => {
  const { rerender } = render(<Preview shape="rectangle" />);

  let placeholder = screen.getByTestId("preview-placeholder");
  expect(placeholder).toHaveStyleRule("height", "var(--sizing400)");
  expect(placeholder).toHaveStyleRule("width", "var(--sizing1500)");
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-m)",
  );

  rerender(<Preview shape="rectangle-round" />);
  placeholder = screen.getByTestId("preview-placeholder");
  expect(placeholder).toHaveStyleRule("height", "var(--sizing400)");
  expect(placeholder).toHaveStyleRule("width", "var(--sizing1500)");
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-2-xl)",
  );
});

test("preserves legacy circle dimensions", () => {
  render(<Preview shape="circle" width="100px" />);

  const placeholder = screen.getByTestId("preview-placeholder");
  expect(placeholder).toHaveStyleRule("height", "var(--sizing700)");
  expect(placeholder).toHaveStyleRule("width", "var(--sizing700)");
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-circle)",
  );
});

test("supports custom dimensions", () => {
  render(<Preview shape="rectangle" height="200px" width="300px" />);

  const placeholder = screen.getByTestId("preview-placeholder");
  expect(placeholder).toHaveStyleRule("height", "200px");
  expect(placeholder).toHaveStyleRule("width", "300px");
});

test("keeps the legacy pulse animation and diagonal gradient", () => {
  render(<Preview />);

  const placeholder = screen.getByTestId("preview-placeholder");

  expect(placeholder).toHaveStyleRule("background-size", "auto");
  expect(placeholder).toHaveStyleRule(
    "background-image",
    "linear-gradient( 135deg, var(--mode-color-generic-bg-soft), var(--mode-color-generic-bg-delicate) )",
  );
  expect(placeholder).toHaveStyleRule(
    "animation",
    expect.stringContaining("2s ease infinite"),
  );
});

test("keeps the static gradient when `disableAnimation` is true", () => {
  render(<Preview disableAnimation />);

  const placeholder = screen.getByTestId("preview-placeholder");

  expect(placeholder).toHaveStyleRule("animation", "none");
  expect(placeholder).not.toHaveStyleRule("background-image", "none");
});

test("renders with no animation when user prefers reduced motion", () => {
  mockUseMediaQuery.mockReturnValue(false);

  render(<Preview />);

  expect(screen.getByTestId("preview-placeholder")).toHaveStyleRule(
    "animation",
    "none",
  );
});

testStyledSystemMargin(
  (props) => <Preview {...props} />,
  () => screen.getByTestId("preview-wrapper"),
);
