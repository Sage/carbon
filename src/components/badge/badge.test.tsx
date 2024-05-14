import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "./badge.component";

const renderComponent = (props = {}) => render(<Badge {...props}>Foo</Badge>);

describe("Badge", () => {
  it("should render number when counter is between 1 and 99", () => {
    renderComponent({ counter: 50 });

    expect(screen.getByText("50")).toBeVisible();
  });

  it("should render number `99` when counter is higher than 99", () => {
    renderComponent({ counter: 101 });

    expect(screen.getByText("99")).toBeVisible();
  });

  it("should not render badge when counter is `0`", () => {
    renderComponent({ counter: 0, onClick: () => {} });

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("should not render badge when counter is not set", () => {
    renderComponent({ onClick: () => {} });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render as a button element when onClick is set", () => {
    renderComponent({ counter: 9, onClick: () => {} });

    // FIXME: FE-6575 investigate why toBeVisible() fails to find "9"
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeVisible();
  });

  it("should not render as a button if onClick is not set", () => {
    renderComponent({ counter: 9 });

    expect(screen.getByText("9")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should have the relevant aria-label when aria-label is specified", () => {
    renderComponent({ counter: 9, "aria-label": "Generic aria message" });

    expect(screen.getByLabelText("Generic aria message")).toBeVisible();
  });

  it("should not have an aria-label when onClick is set", () => {
    renderComponent({
      counter: 9,
      onClick: () => {},
      "aria-label": "Generic aria message",
    });

    expect(screen.getByRole("button")).not.toHaveAttribute("aria-label");
  });

  it("should apply the correct cursor style when onClick is not specified", () => {
    renderComponent({ counter: 9 });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveStyle({ cursor: "default" });
  });

  it("should apply correct border radius for counter", () => {
    renderComponent({ counter: 9 });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveStyle({ borderRadius: "var(--borderRadiusCircle)" });
  });

  it("should render badge with default style when color prop is not specified", () => {
    renderComponent({ counter: 9 });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveStyle({
      borderColor: "var(--colorsActionMajor500)",
      color: "var(--colorsActionMajor500)",
    });
  });

  it("should render badge with correct style when color prop is specified", () => {
    renderComponent({ counter: 9, color: "--colorsSemanticNegative500" });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveStyle({
      borderColor: "var(--colorsSemanticNegative500)",
      color: "var(--colorsSemanticNegative500)",
    });
  });
});
