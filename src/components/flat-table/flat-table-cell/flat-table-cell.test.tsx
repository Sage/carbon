import React from "react";
import { render, screen } from "@testing-library/react";

import FlatTableCell from "./flat-table-cell.component";
import { testStyledSystemPaddingRTL } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemPaddingRTL(
  (props) => (
    <table>
      <tbody>
        <tr>
          <FlatTableCell {...props} />
        </tr>
      </tbody>
    </table>
  ),
  () => screen.getByRole("cell"),
  undefined,
  { modifier: "&&&& > div" },
);

test("should render with proper `width` styling on cell and first child when prop is passed", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell width={40} />
        </tr>
      </tbody>
    </table>,
  );
  const cell = screen.getByRole("cell");
  const content = screen.getByTestId("flat-table-cell-content");

  expect(cell).toHaveStyle("width: 40px");
  expect(content).toHaveStyle("width: 40px");
});

test("should render with expected `data-` attributes on root element", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell
            data-element="table-cell-data-element"
            data-role="table-cell-data-role"
          >
            Foo
          </FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );
  const cell = screen.getByRole("cell");

  expect(cell).toHaveAttribute("data-component", "flat-table-cell");
  expect(cell).toHaveAttribute("data-element", "table-cell-data-element");
  expect(cell).toHaveAttribute("data-role", "table-cell-data-role");
});

test("should apply expected styling and set the `title` attribute when `truncate` prop is true and children prop is a string", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell truncate>Foo</FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );
  const content = screen.getByTestId("flat-table-cell-content");

  expect(content).toHaveStyle({
    "text-overflow": "ellipsis",
    overflow: "hidden",
    "white-space": "nowrap",
  });
  expect(content).toHaveAttribute("title", "Foo");
});

test("should override the default behaviour when `title` and `truncate` props are set", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell truncate title="Bar">
            Foo
          </FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByTestId("flat-table-cell-content")).toHaveAttribute(
    "title",
    "Bar",
  );
});

test("should render with the expected border width when `verticalBorder` prop is passed 'small'", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell verticalBorder="small">Foo</FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveStyleRule(
    "border-right",
    "1px solid var(--colorsUtilityMajor300)",
    { modifier: "&&&&" },
  );
});

test("should render with the expected border width when `verticalBorder` prop is passed 'medium'", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell verticalBorder="medium">Foo</FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveStyleRule(
    "border-right",
    "2px solid var(--colorsUtilityMajor300)",
    { modifier: "&&&&" },
  );
});

test("should render with the expected border width when `verticalBorder` prop is passed 'large'", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell verticalBorder="large">Foo</FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveStyleRule(
    "border-right",
    "4px solid var(--colorsUtilityMajor300)",
    { modifier: "&&&&" },
  );
});

test("should render the expected border colour when `verticalBorderColor` is passed a valid palette value", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell
            data-role="flat-table-cell"
            verticalBorderColor="goldTint10"
          >
            Foo
          </FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveStyle("border-right-color: #FFBC1A");
});

test("should render the expected border colour when `verticalBorderColor` is passed a valid hex value", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell
            data-role="flat-table-cell"
            verticalBorderColor="#000000"
          >
            Foo
          </FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveStyle("border-right-color: #000000");
});

test("should render the expected border colour when `verticalBorderColor` is passed a valid rgb value", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell
            data-role="flat-table-cell"
            verticalBorderColor="rgb(1,1,1)"
          >
            Foo
          </FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveStyle(
    "border-right-color: rgb(1,1,1)",
  );
});

test("should set the expected attribute when the `colspan` prop is passed", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell colspan={2}>Foo</FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveAttribute("colspan", "2");
});

test("should set the expected attribute when the `rowspan` prop is passed", () => {
  render(
    <table>
      <tbody>
        <tr>
          <FlatTableCell rowspan={2}>Foo</FlatTableCell>
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("cell")).toHaveAttribute("rowspan", "2");
});
