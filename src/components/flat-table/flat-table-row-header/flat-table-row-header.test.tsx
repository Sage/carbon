import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { testStyledSystemPadding } from "../../../__spec_helper__/__internal__/test-utils";
import FlatTableRowHeader from "./flat-table-row-header.component";
import FlatTableRowContext from "../flat-table-row/__internal__/flat-table-row.context";
import FlatTable from "../flat-table.component";
import FlatTableBody from "../flat-table-body/flat-table-body.component";
import FlatTableRow from "../flat-table-row/flat-table-row.component";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";
import Button from "../../button/button.component";

test("logs error if used outside of FlatTable", () => {
  const loggerSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  render(
    <table>
      <thead>
        <tr>
          <FlatTableRowHeader>Foo</FlatTableRowHeader>
        </tr>
      </thead>
    </table>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon FlatTable: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerSpy.mockRestore();
});

testStyledSystemPadding(
  (props) => (
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader {...props} />
        </tr>
      </thead>
    </FlatTable>
  ),
  () => screen.getByRole("columnheader"),
  { modifier: "&&&& > div" },
);

test("should render with the default padding if no padding props are passed", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyleRule("padding-top", "10px", {
    modifier: "&&&& > div",
  });
  expect(cell).toHaveStyleRule("padding-bottom", "10px", {
    modifier: "&&&& > div",
  });
  expect(cell).toHaveStyleRule("padding-left", "var(--spacing300)", {
    modifier: "&&&& > div",
  });
  expect(cell).toHaveStyleRule("padding-right", "var(--spacing300)", {
    modifier: "&&&& > div",
  });
});

test("should render with the expected `data-` attributes when props are passed", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader
            data-element="flat-table-row-header-data-element"
            data-role="flat-table-row-header-data-role"
          />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("data-component", "flat-table-row-header");
  expect(cell).toHaveAttribute(
    "data-element",
    "flat-table-row-header-data-element",
  );
  expect(cell).toHaveAttribute("data-role", "flat-table-row-header-data-role");
});

test("should render with proper 'width' styling on cell and first child when prop is passed", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader width={40} />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");
  const content = screen.getByTestId("flat-table-row-header-content");

  expect(cell).toHaveStyle("width: 40px");
  expect(content).toHaveStyle("width: 40px");
});

test("should render with expected 'colspan' attribute when prop is passed", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader colspan={2} />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("colspan", "2");
});

test("should render with expected 'rowspan' attribute when prop is passed", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader rowspan={2} />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveAttribute("rowspan", "2");
});

describe("when the `expandable` context prop is set", () => {
  it("should render the expected icon when cell is in the first column", () => {
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowContext.Provider
              value={{
                expandable: true,
                firstColumnExpandable: true,
                firstCellId: "foo",
                leftPositions: {},
                rightPositions: {},
              }}
            >
              <FlatTableRowHeader id="foo" />
            </FlatTableRowContext.Provider>
          </tr>
        </thead>
      </FlatTable>,
    );
    const icon = screen.getByTestId("icon");

    expect(icon).toHaveAttribute("data-element", "chevron_down_thick");
  });

  it("should call the `onClick` function when the cell is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowContext.Provider
              value={{
                expandable: true,
                firstColumnExpandable: true,
                onClick,
                firstCellId: "foo",
                leftPositions: {},
                rightPositions: {},
              }}
            >
              <FlatTableRowHeader id="foo" />
            </FlatTableRowContext.Provider>
          </tr>
        </thead>
      </FlatTable>,
    );
    const cell = screen.getByRole("columnheader");
    await user.click(cell);

    expect(onClick).toHaveBeenCalled();
  });

  it("should call the `onKeyDown` function when a key is pressed", async () => {
    const onKeyDown = jest.fn();
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowContext.Provider
              value={{
                expandable: true,
                firstColumnExpandable: true,
                onKeyDown,
                firstCellId: "foo",
                leftPositions: {},
                rightPositions: {},
              }}
            >
              <FlatTableRowHeader id="foo" />
            </FlatTableRowContext.Provider>
          </tr>
        </thead>
      </FlatTable>,
    );
    const cell = screen.getByRole("columnheader");
    await user.type(cell, "{enter}");

    expect(onKeyDown).toHaveBeenCalled();
  });
});

describe("when the `expandable` context prop is not set", () => {
  it("does not render the icon in the cell in the first column", () => {
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowContext.Provider
              value={{
                firstCellId: "foo",
                leftPositions: {},
                rightPositions: {},
              }}
            >
              <FlatTableRowHeader id="foo" />
            </FlatTableRowContext.Provider>
          </tr>
        </thead>
      </FlatTable>,
    );
    const icon = screen.queryByTestId("icon");

    expect(icon).not.toBeInTheDocument();
  });

  it("should not call the `onClick` function when the cell is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowContext.Provider
              value={{
                onClick,
                firstCellId: "foo",
                leftPositions: {},
                rightPositions: {},
              }}
            >
              <FlatTableRowHeader id="foo" />
            </FlatTableRowContext.Provider>
          </tr>
        </thead>
      </FlatTable>,
    );
    const cell = screen.getByRole("columnheader");
    await user.click(cell);

    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("when the `truncate` prop is set", () => {
  it("should apply expected styling", () => {
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowHeader truncate>Foo</FlatTableRowHeader>
          </tr>
        </thead>
      </FlatTable>,
    );
    const content = screen.getByTestId("flat-table-row-header-content");

    expect(content).toHaveStyle("text-overflow: ellipsis");
    expect(content).toHaveStyle("overflow: hidden");
    expect(content).toHaveStyle("white-space: nowrap");
  });

  it("should set the title if children is string", () => {
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowHeader truncate>Foo</FlatTableRowHeader>
          </tr>
        </thead>
      </FlatTable>,
    );

    expect(screen.getByTestId("flat-table-row-header-content")).toHaveAttribute(
      "title",
      "Foo",
    );
  });

  it("should override the default behaviour when `title` prop is set", () => {
    render(
      <FlatTable>
        <thead>
          <tr>
            <FlatTableRowHeader truncate title="Bar">
              Foo
            </FlatTableRowHeader>
          </tr>
        </thead>
      </FlatTable>,
    );

    expect(screen.getByTestId("flat-table-row-header-content")).toHaveAttribute(
      "title",
      "Bar",
    );
  });
});

test("sets the data-sticky-align attribute to 'left' to match the `stickyAlignment` prop value", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader stickyAlignment="left">Foo</FlatTableRowHeader>
        </tr>
      </thead>
    </FlatTable>,
  );

  expect(screen.getByRole("columnheader")).toHaveAttribute(
    "data-sticky-align",
    "left",
  );
});

test("sets the data-sticky-align attribute to 'right' to match the `stickyAlignment` prop value", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader stickyAlignment="right">Foo</FlatTableRowHeader>
        </tr>
      </thead>
    </FlatTable>,
  );

  expect(screen.getByRole("columnheader")).toHaveAttribute(
    "data-sticky-align",
    "right",
  );
});

test("should increase the z-index of the sticky TH or TD if `stickyAlignment` prop is set, content is focused and they are part of a FlatTableBody", () => {
  render(
    <FlatTable>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell data-role="cell">
            <Button>cell button</Button>
          </FlatTableCell>
          <FlatTableRowHeader
            data-role="header-one"
            stickyAlignment="left"
            p={0}
          >
            <Button>header one button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader
            data-role="header-two"
            stickyAlignment="left"
            p={0}
          >
            <Button>header two button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  const headerOne = screen.getByTestId("header-one");
  const headerOneButton = screen.getByRole("button", {
    name: "header one button",
  });

  const headerTwo = screen.getByTestId("header-two");
  const headerTwoButton = screen.getByRole("button", {
    name: "header two button",
  });

  const cell = screen.getByTestId("cell");
  const cellButton = screen.getByRole("button", { name: "cell button" });

  headerOneButton.focus();

  expect(cell).not.toHaveClass("bringToFront");
  expect(headerOne).toHaveClass("bringToFront");
  expect(headerTwo).not.toHaveClass("bringToFront");

  headerTwoButton.focus();

  expect(cell).not.toHaveClass("bringToFront");
  expect(headerOne).not.toHaveClass("bringToFront");
  expect(headerTwo).toHaveClass("bringToFront");

  cellButton.focus();

  expect(cell).toHaveClass("bringToFront");
  expect(headerOne).not.toHaveClass("bringToFront");
  expect(headerTwo).not.toHaveClass("bringToFront");
});

test("should not increase the z-index of the sticky TH or TD if the `stickyAlignment` prop is set but they are not part of a FlatTableBody", () => {
  render(
    <FlatTable>
      <thead>
        <FlatTableRow>
          <FlatTableCell data-role="cell">
            <Button>cell button</Button>
          </FlatTableCell>
          <FlatTableRowHeader
            data-role="header-one"
            stickyAlignment="left"
            p={0}
          >
            <Button>header one button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
      </thead>
    </FlatTable>,
  );

  const headerOne = screen.getByTestId("header-one");
  const headerOneButton = screen.getByRole("button", {
    name: "header one button",
  });

  headerOneButton.focus();

  expect(headerOne).not.toHaveClass("bringToFront");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'small' and the `stickyAlignment` prop is 'left`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader verticalBorder="small" stickyAlignment="left" />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 1px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'small' and the `stickyAlignment` prop is 'right`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader verticalBorder="small" stickyAlignment="right" />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-left-width: 1px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'medium' and the `stickyAlignment` prop is 'left`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader verticalBorder="medium" stickyAlignment="left" />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 2px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'medium' and the `stickyAlignment` prop is 'right`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader verticalBorder="medium" stickyAlignment="right" />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-left-width: 2px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'large' and the `stickyAlignment` prop is 'left`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader verticalBorder="large" stickyAlignment="left" />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-width: 4px");
});

test("should render with the expected border width when `verticalBorder` prop is passed 'large' and the `stickyAlignment` prop is 'right`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader verticalBorder="large" stickyAlignment="right" />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-left-width: 4px");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed '#FF113344' and the `stickyAlignment` prop is 'left`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader
            verticalBorderColor="#FF113344"
            stickyAlignment="left"
          />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-color: #FF113344");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed '#FF113344' and the `stickyAlignment` prop is 'right`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader
            verticalBorderColor="#FF113344"
            stickyAlignment="right"
          />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-left-color: #FF113344");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed 'rgb(1,1,1)' and the `stickyAlignment` prop is 'left`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader
            verticalBorderColor="rgb(1,1,1)"
            stickyAlignment="left"
          />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-right-color: rgb(1,1,1)");
});

test("should render with the expected border color when `verticalBorderColor` prop is passed 'rgb(1,1,1)' and the `stickyAlignment` prop is 'right`", () => {
  render(
    <FlatTable>
      <thead>
        <tr>
          <FlatTableRowHeader
            verticalBorderColor="rgb(1,1,1)"
            stickyAlignment="right"
          />
        </tr>
      </thead>
    </FlatTable>,
  );
  const cell = screen.getByRole("columnheader");

  expect(cell).toHaveStyle("border-left-color: rgb(1,1,1)");
});
