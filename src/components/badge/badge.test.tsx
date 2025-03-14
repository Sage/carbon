import React from "react";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Badge from "./badge.component";
import { render } from "../../__spec_helper__/__internal__/test-utils";

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

  it("should hide the counter text when the badge is focused and it shows it when it is not focused", () => {
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

  it("should hide the counter text when the badge is hovered and it shows it when it is unhovered", async () => {
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
