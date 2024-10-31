import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sort from "./sort.component";
import FlatTableContext from "../__internal__/flat-table.context";
import { FlatTableProps } from "../flat-table.component";

test("should not render Icon if `sortType` does not exist", () => {
  render(<Sort>Name</Sort>);

  expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
});

test("should render 'sort_up' Icon if `sortType` is 'ascending'", () => {
  render(<Sort sortType="ascending">Name</Sort>);

  expect(screen.getByTestId("icon")).toHaveAttribute("data-element", "sort_up");
});

test("should render 'sort_down' Icon if `sortType` is 'descending'", () => {
  render(<Sort sortType="descending">Name</Sort>);

  expect(screen.getByTestId("icon")).toHaveAttribute(
    "data-element",
    "sort_down",
  );
});

test("should render the correct accessible name when the `accessibleName` prop is passed", () => {
  const customAccessibleName =
    "Sort all accountants below in an ascending order.";
  render(
    <Sort accessibleName={customAccessibleName} sortType="ascending">
      Name
    </Sort>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName(customAccessibleName);
});

test("should render a default accessible name when a child and the `sortType` prop is passed", () => {
  render(<Sort sortType="ascending">Name</Sort>);

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all Name in an ascending order.",
  );
});

test("should render a default accessible name when just a child is passed", () => {
  render(<Sort>Name</Sort>);

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all Name in an ascending or descending order.",
  );
});

test("should render a default accessible name when just the `sortType` prop is passed", () => {
  render(<Sort sortType="ascending" />);

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all contents in an ascending order.",
  );
});

test("should render a default accessible name when neither a child or the `sortType` prop is passed", () => {
  render(<Sort />);

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all contents in an ascending or descending order.",
  );
});

test("should call `onClick` callback when user clicks on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Sort onClick={onClick}>Name</Sort>);
  await user.click(screen.getByRole("button"));

  expect(onClick).toHaveBeenCalled();
});

test("should call `onClick` callback when user presses enter key on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Sort onClick={onClick}>Name</Sort>);
  screen.getByRole("button").focus();
  await user.keyboard("{Enter}");

  expect(onClick).toHaveBeenCalled();
});

test("should call `onClick` callback when user presses space key on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Sort onClick={onClick}>Name</Sort>);
  screen.getByRole("button").focus();
  await user.keyboard(" ");

  expect(onClick).toHaveBeenCalled();
});

test("should not call `onClick` callback when user presses any key other than enter or space key on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Sort onClick={onClick}>Name</Sort>);
  screen.getByRole("button").focus();
  await user.keyboard("{a}");

  expect(onClick).not.toHaveBeenCalled();
});

test("should render the placeholder element when no `sortType` prop set", () => {
  render(<Sort>Name</Sort>);

  expect(screen.getByTestId("sort-placeholder")).toBeInTheDocument();
});

test("should not render the placeholder element when `sortType` prop set", () => {
  render(<Sort sortType="ascending">Name</Sort>);

  expect(screen.queryByTestId("placeholder")).not.toBeInTheDocument();
});

test("should render the expected Icon styling when `colorTheme` is 'dark'", () => {
  render(
    <FlatTableContext.Provider
      value={{
        colorTheme: "dark",
        getTabStopElementId: () => "",
      }}
    >
      <Sort sortType="ascending">Name</Sort>
    </FlatTableContext.Provider>,
  );

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--colorsActionMinorYang100)",
  );
});

test.each<FlatTableProps["colorTheme"]>([
  "light",
  "transparent-base",
  "transparent-white",
])("should render Icon with correct colour when colorTheme is %s", (color) => {
  render(
    <FlatTableContext.Provider
      value={{ colorTheme: color, getTabStopElementId: () => "" }}
    >
      <Sort sortType="ascending">Name</Sort>
    </FlatTableContext.Provider>,
  );

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--colorActionMinor500)",
  );
});
