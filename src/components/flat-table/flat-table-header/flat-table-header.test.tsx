import React from "react";
import { render, screen } from "@testing-library/react";
import FlatTableHeader from "./flat-table-header.component";
import getAlternativeBackgroundColor from "./flat-table-header-utils";
import FlatTableContext from "../__internal__/flat-table.context";

test("should render with proper `width` styling on cell and first child when prop is passed", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableHeader width={40} />
        </tr>
      </tbody>
    </table>,
  );
  const cell = screen.getByRole("columnheader");
  const content = screen.getByTestId("flat-table-header-content");

  expect(cell).toHaveStyle("width: 40px");
  expect(content).toHaveStyle("width: 40px");
});

test("should render with expected `data-` attributes on root element", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableHeader
            data-element="table-header-data-element"
            data-role="table-header-data-role"
          >
            Foo
          </FlatTableHeader>
        </tr>
      </tbody>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("data-component", "flat-table-header");
  expect(cell).toHaveAttribute("data-element", "table-header-data-element");
  expect(cell).toHaveAttribute("data-role", "table-header-data-role");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'small'", () => {
  render(
    <table>
      <thead>
        <tr>
          <FlatTableHeader verticalBorder="small" />
        </tr>
      </thead>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 1px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'medium'", () => {
  render(
    <table>
      <thead>
        <tr>
          <FlatTableHeader verticalBorder="medium" />
        </tr>
      </thead>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 2px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'large'", () => {
  render(
    <table>
      <thead>
        <tr>
          <FlatTableHeader verticalBorder="large" />
        </tr>
      </thead>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 4px");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed '#000000'", () => {
  render(
    <table>
      <thead>
        <tr>
          <FlatTableHeader verticalBorderColor="#000000" />
        </tr>
      </thead>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-color: #000000");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed 'rgb(1,1,1)'", () => {
  render(
    <table>
      <thead>
        <tr>
          <FlatTableHeader verticalBorderColor="rgb(1,1,1)" />
        </tr>
      </thead>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-color: rgb(1,1,1)");
});

test("should render the element witht the `rowspan` attribute when prop is set", () => {
  render(
    <table>
      <thead>
        <tr>
          <FlatTableHeader rowspan={2} />
        </tr>
      </thead>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("rowspan", "2");
});

test("should render the element with the `colspan` attribute when prop is set", () => {
  render(
    <table>
      <thead>
        <tr>
          <FlatTableHeader colspan={2} />
        </tr>
      </thead>
    </table>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("colspan", "2");
});

// test added for coverage
test("should render with the expected background-color when `alternativeBgColor` prop is passed and `colorTheme` is 'dark'", () => {
  render(
    <FlatTableContext.Provider
      value={{ colorTheme: "dark", getTabStopElementId: () => "" }}
    >
      <table>
        <thead>
          <tr>
            <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
          </tr>
        </thead>
      </table>
    </FlatTableContext.Provider>,
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
    <FlatTableContext.Provider
      value={{ colorTheme: "light", getTabStopElementId: () => "" }}
    >
      <table>
        <thead>
          <tr>
            <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
          </tr>
        </thead>
      </table>
    </FlatTableContext.Provider>,
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
    <FlatTableContext.Provider
      value={{ colorTheme: "transparent-white", getTabStopElementId: () => "" }}
    >
      <table>
        <thead>
          <tr>
            <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
          </tr>
        </thead>
      </table>
    </FlatTableContext.Provider>,
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
    <FlatTableContext.Provider
      value={{ colorTheme: "transparent-base", getTabStopElementId: () => "" }}
    >
      <table>
        <thead>
          <tr>
            <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
          </tr>
        </thead>
      </table>
    </FlatTableContext.Provider>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyleRule(
    "background-color",
    getAlternativeBackgroundColor("transparent-base"),
    { modifier: "&&&" },
  );
});
