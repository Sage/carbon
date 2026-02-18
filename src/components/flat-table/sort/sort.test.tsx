import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logger from "../../../__internal__/utils/logger";

import Sort from "./sort.component";

import FlatTable, { FlatTableProps } from "../flat-table.component";
import FlatTableHead from "../flat-table-head";
import FlatTableRow from "../flat-table-row";
import FlatTableHeader from "../flat-table-header";
import I18nProvider from "../../i18n-provider";

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

test("should render with the expected `aria-roledescription` attribute", () => {
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

  expect(screen.getByRole("button")).toHaveAttribute(
    "aria-roledescription",
    "Sortable column header",
  );
});

test("should render with the overridden `aria-roledescription` attribute", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort aria-roledescription="Custom sortable column header">
              Name
            </Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  expect(screen.getByRole("button")).toHaveAttribute(
    "aria-roledescription",
    "Custom sortable column header",
  );
});

test("should render with the overridden `aria-describedby` and `aria-roledescription` attribute via the I18nProvider", () => {
  render(
    <I18nProvider
      locale={{
        sort: {
          accessibleName: () => "foo",
          ariaRoleDescription: () => "Custom sortable column header",
        },
      }}
    >
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>
              <Sort aria-roledescription="Custom sortable column header">
                Name
              </Sort>
            </FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
      </FlatTable>
    </I18nProvider>,
  );

  expect(screen.getByRole("button")).toHaveAttribute(
    "aria-roledescription",
    "Custom sortable column header",
  );
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

  expect(screen.getByTestId("icon")).toHaveAttribute("type", "sort_up");
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

  expect(screen.getByTestId("icon")).toHaveAttribute("type", "sort_down");
});

test("should log a deprecation warning when the `accessibleName` prop is passed", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
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

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `accessibleName` prop has been deprecated in favour of using `aria-live` regions. Please use an `aria-live` region to announce changes in sort order to assistive technologies.",
  );

  loggerSpy.mockRestore();
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

  expect(screen.getByRole("button")).toHaveStyleRule(
    "color",
    "var(--colorsActionMinorYang100)",
    {
      modifier: "span[data-component='icon']",
    },
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

  expect(screen.getByRole("button")).toHaveStyleRule(
    "color",
    "var(--colorActionMinor500)",
    {
      modifier: "span[data-component='icon']",
    },
  );
});
