import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Badge from "./badge.component";
import { assertLoggerComponentMessage } from "../../__spec_helper__/__internal__/test-utils";

jest.mock("../../__internal__/utils/logger");

test("should log a deprecation warning for onClick prop", () => {
  assertLoggerComponentMessage({
    component: <Badge onClick={() => {}} />,
    message:
      "The `onClick` prop in `Badge` is deprecated and will soon be removed.",
  });
});

test("should log a deprecation warning for aria-label prop", () => {
  assertLoggerComponentMessage({
    component: <Badge aria-label="Test label" />,
    message:
      "The `aria-label` prop in `Badge` is deprecated and will soon be removed.",
  });
});

test("should log a deprecation warning for color prop", () => {
  assertLoggerComponentMessage({
    component: <Badge color="red" />,
    message:
      "The `color` prop in `Badge` is deprecated and will soon be removed.",
  });
});

test("should render with children", () => {
  render(
    <Badge counter={5}>
      <span>Test Badge</span>
    </Badge>,
  );

  expect(screen.getByText("Test Badge")).toBeVisible();
  expect(screen.getByText("5")).toBeVisible();
});

test("should render counter as a number", () => {
  render(<Badge counter={50} />);

  expect(screen.getByText("50")).toBeVisible();
});

test("should render counter as a string", () => {
  render(<Badge counter="99+" />);

  expect(screen.getByText("99+")).toBeVisible();
});

test("should render '999' when counter is 999", () => {
  render(<Badge counter={999} />);

  expect(screen.getByText("999")).toBeVisible();
});

test("should render `999+` when counter is higher than 999", () => {
  render(<Badge counter={1000} />);

  expect(screen.getByText("999+")).toBeVisible();
});

test("should trim counter when string is longer than 4 characters", () => {
  render(<Badge counter="12345" />);

  expect(screen.getByText("1234")).toBeVisible();
});

test("should not render when counter is not set", () => {
  render(<Badge data-role="badge" />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render when counter is 0", () => {
  render(<Badge data-role="badge" counter={0} />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render when counter is negative", () => {
  render(<Badge data-role="badge" counter={-1} />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render when counter is decimal", () => {
  render(<Badge data-role="badge" counter={3.14} />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render when counter is empty string", () => {
  render(<Badge data-role="badge" counter="" />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render counter when size is small", () => {
  render(<Badge data-role="badge" counter={9} size="small" />);

  expect(screen.queryByText("9")).not.toBeInTheDocument();
  expect(screen.queryByTestId("badge")).toBeVisible();
});

test("should render with provided id", () => {
  render(<Badge data-role="badge" counter={9} id="custom-id" />);

  const badge = screen.getByTestId("badge");
  expect(badge).toHaveAttribute("id", "custom-id");
});

test("should not render as button when onClick is not set", () => {
  render(<Badge counter={9} />);

  expect(screen.getByText("9")).toBeVisible();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("should render as button when onClick is set", () => {
  render(<Badge counter={9} onClick={() => {}} />);

  expect(screen.getByText("9")).toBeVisible();
  expect(screen.getByRole("button")).toBeVisible();
});

test("should not render as button when onClick is set and size is small", () => {
  render(
    <Badge data-role="badge" counter={9} onClick={() => {}} size="small" />,
  );

  expect(screen.getByTestId("badge")).toBeVisible();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("should call onClick when clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();

  render(<Badge counter={9} onClick={onClick} />);

  const badgeButton = screen.getByRole("button");
  await user.click(badgeButton);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should render cross icon when onClick is set and badge is focused", async () => {
  render(<Badge counter={9} onClick={() => {}} />);

  const badgeButton = screen.getByRole("button");
  let badgeCounter = screen.getByText("9");

  expect(badgeCounter).toBeVisible();

  act(() => {
    badgeButton.focus();
  });

  const crossIcon = await screen.findByTestId("badge-cross-icon");
  expect(crossIcon).toBeVisible();
  expect(badgeCounter).not.toBeInTheDocument();

  act(() => {
    badgeButton.blur();
  });

  badgeCounter = await screen.findByText("9");
  expect(crossIcon).not.toBeInTheDocument();
  expect(badgeCounter).toBeVisible();
});

test("should render cross icon when onClick is set and badge is hovered", async () => {
  const user = userEvent.setup();
  render(<Badge counter={9} onClick={() => {}} inverse />);

  const badgeButton = screen.getByRole("button");
  let badgeCounter = screen.getByText("9");

  expect(badgeCounter).toBeVisible();

  await user.hover(badgeButton);

  const crossIcon = await screen.findByTestId("badge-cross-icon");
  expect(crossIcon).toBeVisible();
  expect(badgeCounter).not.toBeInTheDocument();

  await user.unhover(badgeButton);

  badgeCounter = await screen.findByText("9");
  expect(crossIcon).not.toBeInTheDocument();
  expect(badgeCounter).toBeVisible();
});

test("should have the relevant aria-label when aria-label is specified", () => {
  render(<Badge counter={9} onClick={() => {}} aria-label="Remove filters" />);

  const badgeButton = screen.getByRole("button");
  expect(badgeButton).toHaveAccessibleName("Remove filters");
});

test("should render with provided data attributes", () => {
  render(<Badge counter={9} data-element="bar" data-role="baz" />);

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("should apply custom color styling", () => {
  render(
    <Badge data-role="badge" counter={9} color="--colorsSemanticNegative500" />,
  );

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyleRule(
    "border-color",
    "var(--colorsSemanticNegative500)",
  );
  expect(badge).toHaveStyleRule("color", "var(--colorsSemanticNegative500)");
});

test("should apply typical variant styling", () => {
  render(<Badge data-role="badge" counter={9} variant="typical" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyleRule(
    "background-color",
    "var(--badge-bg-default,#DB004E)",
  );
});

test("should apply subtle variant styling", () => {
  render(<Badge data-role="badge" counter={9} variant="subtle" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyleRule(
    "background-color",
    "var(--badge-bg-alt,#0071C3)",
  );
});

test("should apply inverse typical variant styling", () => {
  render(<Badge data-role="badge" counter={9} inverse variant="typical" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyleRule(
    "background-color",
    "var(--badge-inverse-bg-default,#F50059)",
  );
  expect(badge).toHaveStyleRule(
    "border-color",
    "var(--badge-inverse-border-default,#000)",
  );
  expect(badge).toHaveStyleRule(
    "color",
    "var(--badge-inverse-label-default,#000)",
  );
});

test("should apply inverse subtle variant styling", () => {
  render(<Badge data-role="badge" counter={9} inverse variant="subtle" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyleRule(
    "background-color",
    "var(--badge-inverse-bg-alt,#007FD9)",
  );
  expect(badge).toHaveStyleRule(
    "border-color",
    "var(--badge-inverse-border-default,#000)",
  );
  expect(badge).toHaveStyleRule(
    "color",
    "var(--badge-inverse-label-default,#000)",
  );
});

test("should apply small size styling with children", () => {
  render(
    <Badge data-role="badge" counter={9} size="small">
      Test
    </Badge>,
  );

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({
    top: "-3px",
    right: "-2px",
  });
  expect(badge).toHaveStyleRule("width", "var(--global-size-4-xs,8px)");
  expect(badge).toHaveStyleRule("height", "var(--global-size-4-xs,8px)");
});

test("should apply large size styling with children", () => {
  render(
    <Badge data-role="badge" counter={9} size="large">
      Test
    </Badge>,
  );

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({
    top: "-12px",
    right: "-8px",
  });
  expect(badge).toHaveStyleRule("min-width", "var(--global-size-2-xs,20px)");
  expect(badge).toHaveStyleRule("height", "var(--global-size-xs,24px)");
});
