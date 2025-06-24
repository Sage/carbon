import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Badge from "./badge.component";

const renderComponent = (props = {}) =>
  render(
    <Badge data-role="badge" {...props}>
      Foo
    </Badge>,
  );

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

    expect(screen.getByText("9")).toBeVisible();
    expect(screen.getByRole("button")).toBeVisible();
  });

  it("should hide the counter text when the badge is focused and displays it when blurred", () => {
    renderComponent({ counter: 9, onClick: () => {} });

    const badgeButton = screen.getByRole("button");
    const badgeText = screen.getByText("9");

    act(() => {
      badgeButton.focus();
    });

    expect(badgeText).not.toBeVisible();

    act(() => {
      badgeButton.blur();
    });

    expect(badgeText).toBeVisible();
  });

  it("should hide the counter text when the badge is hovered and displays it when unhovered", async () => {
    const user = userEvent.setup();

    renderComponent({ counter: 9, onClick: () => {} });

    const badgeButton = screen.getByRole("button");
    const badgeText = screen.getByText("9");

    await user.hover(badgeButton);

    expect(badgeText).not.toBeVisible();

    await user.unhover(badgeButton);

    expect(badgeText).toBeVisible();
  });

  it("should not render as a button if onClick is not set", () => {
    renderComponent({ counter: 9 });

    expect(screen.getByText("9")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should have the relevant aria-label when aria-label is specified", () => {
    renderComponent({
      counter: 9,
      onClick: () => {},
      "aria-label": "Generic aria message",
    });

    const badgeButton = screen.getByRole("button");
    expect(badgeButton).toHaveAccessibleName("Generic aria message");
  });

  it("should render with provided data- attributes", () => {
    renderComponent({ counter: 9, "data-element": "bar", "data-role": "baz" });

    expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
  });

  it("calls onClick callback when badge is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    renderComponent({ counter: 5, onClick });

    const badgeButton = screen.getByRole("button");
    await user.click(badgeButton);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render with provided id", () => {
    renderComponent({ counter: 9, id: "custom-id" });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("id", "custom-id");
  });

  it("should apply the correct cursor style when onClick is not specified", () => {
    renderComponent({ counter: 9 });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveStyle({ cursor: "default" });
  });

  it("should apply correct border radius for counter", () => {
    renderComponent({ counter: 9 });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveStyleRule("border-radius", "var(--borderRadiusCircle)");
  });

  it("should render badge with default style when color prop is not specified", () => {
    renderComponent({ counter: 9 });

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveStyleRule(
      "border-color",
      "var(--colorsActionMajor500)",
    );
    expect(badge).toHaveStyleRule("color", "var(--colorsActionMajor500)");
  });

  it("should render badge with correct style when color prop is specified", () => {
    renderComponent({ counter: 9, color: "--colorsSemanticNegative500" });

    const badge = screen.getByTestId("badge");

    expect(badge).toHaveStyleRule(
      "border-color",
      "var(--colorsSemanticNegative500)",
    );
    expect(badge).toHaveStyleRule("color", "var(--colorsSemanticNegative500)");
  });
});
