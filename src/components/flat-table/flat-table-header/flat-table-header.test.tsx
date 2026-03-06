import React from "react";
import { render, screen } from "@testing-library/react";
import Logger from "../../../__internal__/utils/logger";

import FlatTableHeader from "./flat-table-header.component";

import getAlternativeBackgroundColor from "./flat-table-header-utils";
import FlatTable from "../flat-table.component";
import FlatTableRow from "../flat-table-row";
import FlatTableHead from "../flat-table-head/flat-table-head.component";
import FlatTableBody from "../flat-table-body";
import Sort from "../sort";

test("logs error when not used within FlatTable", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(
    <table>
      <tbody>
        <tr>
          <FlatTableHeader>Foo</FlatTableHeader>
        </tr>
      </tbody>
    </table>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon FlatTable: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerSpy.mockRestore();
});

test("should render with proper `width` styling on cell and first child when prop is passed", () => {
  render(
    <FlatTable>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableHeader width={40} />
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");
  const content = screen.getByTestId("flat-table-header-content");

  expect(cell).toHaveStyle("width: 40px");
  expect(content).toHaveStyle("width: 40px");
});

test("should render with expected `data-` attributes on root element", () => {
  render(
    <FlatTable>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableHeader
            data-element="table-header-data-element"
            data-role="table-header-data-role"
          >
            Foo
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("data-component", "flat-table-header");
  expect(cell).toHaveAttribute("data-element", "table-header-data-element");
  expect(cell).toHaveAttribute("data-role", "table-header-data-role");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'small'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorder="small" />
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 1px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'medium'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorder="medium" />
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 2px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'large'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorder="large" />
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 4px");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed '#000000'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorderColor="#000000" />
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-color: #000000");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed 'rgb(1,1,1)'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorderColor="rgb(1,1,1)" />
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-color: rgb(1,1,1)");
});

test("should render the element with the `rowspan` attribute when prop is set", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader rowspan={2} />
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("rowspan", "2");
});

test("should render the element with the `colspan` attribute when prop is set", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader colspan={2} />
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("colspan", "2");
});

// test added for coverage
test("should render with the expected background-color when `alternativeBgColor` prop is passed and `colorTheme` is 'dark'", () => {
  render(
    <FlatTable colorTheme="dark">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyleRule(
    "background-color",
    getAlternativeBackgroundColor("dark"),
    { modifier: "&&&" },
  );
});

// test added for coverage
test("should render with the expected background-color when `alternativeBgColor` prop is passed and `colorTheme` is 'light'", () => {
  render(
    <FlatTable colorTheme="light">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyleRule(
    "background-color",
    getAlternativeBackgroundColor("light"),
    { modifier: "&&&" },
  );
});

// test added for coverage
test("should render with the expected background-color when `alternativeBgColor` prop is passed and `colorTheme` is 'transparent-white'", () => {
  render(
    <FlatTable colorTheme="transparent-white">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyleRule(
    "background-color",
    getAlternativeBackgroundColor("transparent-white"),
    { modifier: "&&&" },
  );
});

// test added for coverage
test("should render with the expected background-color when `alternativeBgColor` prop is passed and `colorTheme` is 'transparent-base'", () => {
  render(
    <FlatTable colorTheme="transparent-base">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyleRule(
    "background-color",
    getAlternativeBackgroundColor("transparent-base"),
    { modifier: "&&&" },
  );
});

test("should set the `aria-sort` attribute to 'none' when the `Sort` component is a child and has no `sortType` set", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort>Column header</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  const cell = screen.getByRole("columnheader");
  expect(cell).toHaveAttribute("aria-sort", "none");
});

test("should set the `aria-sort` attribute to 'ascending' when the `Sort` component is a child and has `sortType` set to 'ascending'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="ascending">Column header</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  const cell = screen.getByRole("columnheader");
  expect(cell).toHaveAttribute("aria-sort", "ascending");
});

test("should set the `aria-sort` attribute to 'descending' when the `Sort` component is a child and has `sortType` set to 'descending'", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Sort sortType="descending">Column header</Sort>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
    </FlatTable>,
  );

  const cell = screen.getByRole("columnheader");
  expect(cell).toHaveAttribute("aria-sort", "descending");
});
