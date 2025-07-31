import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Badge from "./badge.component";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

test("should log a deprecation warning for onClick prop", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Badge onClick={() => {}} />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `onClick` prop in `Badge` is deprecated and will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
  loggerSpy.mockClear();
});

test("should log a deprecation warning for aria-label prop", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Badge aria-label="Test label" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `aria-label` prop in `Badge` is deprecated and will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
  loggerSpy.mockClear();
});

test("should log a deprecation warning for color prop", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Badge color="red" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `color` prop in `Badge` is deprecated and will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
  loggerSpy.mockClear();
});

test("should render badge with children", () => {
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

test("should render `999+` when counter is a number higher than 999", () => {
  render(<Badge counter={1000} />);

  expect(screen.getByText("999+")).toBeVisible();
});

test("should trim the counter when it is a string longer than 4 characters", () => {
  render(<Badge counter="12345" />);

  expect(screen.getByText("1234")).toBeVisible();
});

test("should not render badge when counter is not set", () => {
  render(<Badge data-role="badge" />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render badge when counter is `0` as a number", () => {
  render(<Badge data-role="badge" counter={0} />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render badge when counter is a decimal number", () => {
  render(<Badge data-role="badge" counter={3.14} />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render badge when counter is an empty string", () => {
  render(<Badge data-role="badge" counter="" />);

  expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
});

test("should not render counter if size is small", () => {
  render(<Badge data-role="badge" counter={9} size="small" />);

  expect(screen.queryByText("9")).not.toBeInTheDocument();
  expect(screen.queryByTestId("badge")).toBeVisible();
});

test("should render with provided id", () => {
  render(<Badge data-role="badge" counter={9} id="custom-id" />);

  const badge = screen.getByTestId("badge");
  expect(badge).toHaveAttribute("id", "custom-id");
});

test("should not render as a button if onClick is not set", () => {
  render(<Badge counter={9} />);

  expect(screen.getByText("9")).toBeVisible();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("should render as a button when onClick is set", () => {
  render(<Badge counter={9} onClick={() => {}} />);

  expect(screen.getByText("9")).toBeVisible();
  expect(screen.getByRole("button")).toBeVisible();
});

test("should not render as a button when onClick is set and size is small", () => {
  render(
    <Badge data-role="badge" counter={9} onClick={() => {}} size="small" />,
  );

  expect(screen.getByTestId("badge")).toBeVisible();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("calls onClick callback when badge is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();

  render(<Badge counter={9} onClick={onClick} />);

  const badgeButton = screen.getByRole("button");
  await user.click(badgeButton);

  expect(onClick).toHaveBeenCalledTimes(1);
});

// coverage
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

// coverage
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

test("should render with provided data- attributes", () => {
  render(<Badge counter={9} data-element="bar" data-role="baz" />);

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

// coverage
test("should render with correct style when color prop is specified", () => {
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

// coverage
test("should render with correct style when variant is typical", () => {
  render(<Badge data-role="badge" counter={9} variant="typical" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({ backgroundColor: "#CD384B" });
});

// coverage
test("should render with correct style when variant is subtle", () => {
  render(<Badge data-role="badge" counter={9} variant="subtle" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({ backgroundColor: "#0060A7" });
});

// coverage
test("should render with correct style when variant is typical and inverse prop is true", () => {
  render(<Badge data-role="badge" counter={9} inverse variant="typical" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({ backgroundColor: "#E13E53" });
  expect(badge).toHaveStyleRule("border-color", "var(--colorsUtilityYin100)");
  expect(badge).toHaveStyleRule("color", "var(--colorsUtilityYin100)");
});

// coverage
test("should render with correct style when variant is subtle and inverse prop is true", () => {
  render(<Badge data-role="badge" counter={9} inverse variant="subtle" />);

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({ backgroundColor: "#007ED9" });
  expect(badge).toHaveStyleRule("border-color", "var(--colorsUtilityYin100)");
  expect(badge).toHaveStyleRule("color", "var(--colorsUtilityYin100)");
});

// coverage
test("should render with correct style size is small and badge has children", () => {
  render(
    <Badge data-role="badge" counter={9} size="small">
      Test
    </Badge>,
  );

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({
    width: "12px",
    height: "12px",
    top: "-3px",
    right: "-2px",
  });
});

// coverage
test("should render with correct style size is large and badge has children", () => {
  render(
    <Badge data-role="badge" counter={9} size="large">
      Test
    </Badge>,
  );

  const badge = screen.getByTestId("badge");

  expect(badge).toHaveStyle({
    minWidth: "28px",
    height: "28px",
    top: "-14px",
    right: "-8px",
  });
});
