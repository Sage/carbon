import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logger from "../../../__internal__/utils/logger";

import Sort from "./sort.component";

import FlatTable, { FlatTableProps } from "../flat-table.component";
import FlatTableHead from "../flat-table-head";
import FlatTableRow from "../flat-table-row";
import FlatTableHeader from "../flat-table-header";

test("logs error when not within FlatTable", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<Sort sortType="ascending">Name</Sort>);

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon FlatTable: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerSpy.mockRestore();
});

test("should not render Icon if `sortType` does not exist", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort>Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
});

test("should render 'sort_up' Icon if `sortType` is 'ascending'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="ascending">Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByTestId("icon")).toHaveAttribute("data-element", "sort_up");
});

test("should render 'sort_down' Icon if `sortType` is 'descending'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="descending">Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByTestId("icon")).toHaveAttribute(
    "data-element",
    "sort_down",
  );
});

test("should render the correct accessible name when the `accessibleName` prop is passed", () => {
  const customAccessibleName =
    "Sort all accountants below in an ascending order.";
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort accessibleName={customAccessibleName} sortType="ascending">
              Name
            </Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName(customAccessibleName);
});

test("should render a default accessible name when a child and the `sortType` prop is passed", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="ascending">Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all Name in an ascending order.",
  );
});

test("should render a default accessible name when just a child is passed", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort>Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all Name in an ascending or descending order.",
  );
});

test("should render a default accessible name when just the `sortType` prop is passed", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="ascending" />
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all contents in an ascending order.",
  );
});

test("should render a default accessible name when neither a child or the `sortType` prop is passed", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort />
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName(
    "Sort all contents in an ascending or descending order.",
  );
});

test("should call `onClick` callback when user clicks on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort onClick={onClick}>Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  await user.click(screen.getByRole("button"));

  expect(onClick).toHaveBeenCalled();
});

test("should call `onClick` callback when user presses enter key on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort onClick={onClick}>Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  screen.getByRole("button").focus();
  await user.keyboard("{Enter}");

  expect(onClick).toHaveBeenCalled();
});

test("should call `onClick` callback when user presses space key on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort onClick={onClick}>Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  screen.getByRole("button").focus();
  await user.keyboard(" ");

  expect(onClick).toHaveBeenCalled();
});

test("should not call `onClick` callback when user presses any key other than enter or space key on the element and prop is passed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort onClick={onClick}>Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  screen.getByRole("button").focus();
  await user.keyboard("{a}");

  expect(onClick).not.toHaveBeenCalled();
});

test("should render the placeholder element when no `sortType` prop set", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType={undefined}>Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByTestId("sort-placeholder")).toBeInTheDocument();
});

test("should not render the placeholder element when `sortType` prop set", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="ascending">Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.queryByTestId("placeholder")).not.toBeInTheDocument();
});

test("should render the expected Icon styling when `colorTheme` is 'dark'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="ascending">Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
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
    <FlatTable colorTheme={color}>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="ascending">Name</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--colorActionMinor500)",
  );
});
