import React from "react";
import { render, screen } from "@testing-library/react";
import AiIcon from "./ai-icon.component";

test("renders correctly", () => {
  render(<AiIcon data-role="ai-icon" />);
  const svgElement = screen.getByTestId("ai-icon");
  expect(svgElement).toBeInTheDocument();
});

it("SVG element renders with the correct attributes", () => {
  render(<AiIcon data-role="ai-icon" />);
  const svgElement = screen.getByTestId("ai-icon");

  expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
  expect(svgElement).toHaveAttribute("width", "20");
  expect(svgElement).toHaveAttribute("height", "20");
  expect(svgElement).toHaveAttribute("fill", "none");
  expect(svgElement).toHaveAttribute("viewBox", "0 0 20 20");
});

test("white star path element renders with the correct path definition", () => {
  render(<AiIcon data-role="ai-icon" />);
  const pathElement = screen.getByTestId("white-star");

  expect(pathElement).toHaveAttribute(
    "d",
    "m16.378 9.799-3.776-1.49a1.615 1.615 0 0 1-.91-.91l-1.49-3.775c-.537-1.364-2.466-1.364-3.004 0L5.708 7.4a1.615 1.615 0 0 1-.91.91L1.022 9.799c-1.363.537-1.363 2.466 0 3.004l3.776 1.49c.417.163.746.493.91.91l1.49 3.775c.538 1.363 2.467 1.363 3.005 0l1.489-3.776c.164-.416.494-.745.91-.91l3.776-1.489c1.364-.538 1.364-2.467 0-3.004Z",
  );
});

test("green circle path element renders with the correct path definition", () => {
  render(<AiIcon data-role="ai-icon" />);
  const pathElement = screen.getByTestId("green-circle");

  expect(pathElement).toHaveAttribute(
    "d",
    "M17.172 5.655a2.827 2.827 0 1 0 0-5.655 2.827 2.827 0 0 0 0 5.655Z",
  );
});

it("renders with correct data-tag props", () => {
  render(<AiIcon data-role="foo" data-element="bar" />);
  const svgElement = screen.getByTestId("foo");
  expect(svgElement).toHaveAttribute("data-component", "ai-icon");
  expect(svgElement).toHaveAttribute("data-element", "bar");
});
