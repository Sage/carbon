import React from "react";
import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FlatTableRow from "./flat-table-row.component";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";
import DrawerSidebarContext from "../../drawer/__internal__/drawer-sidebar.context";
import FlatTableCheckbox from "../flat-table-checkbox";
import FlatTableRowHeader from "../flat-table-row-header/flat-table-row-header.component";
import FlatTableHeader from "../flat-table-header/flat-table-header.component";
import { FlatTable, FlatTableBody, FlatTableBodyDraggable } from "..";
import { StyledFlatTableCell } from "../flat-table-cell/flat-table-cell.style";
import { StrictFlatTableProvider } from "../__internal__/strict-flat-table.context";

test("logs error if used outside of FlatTable", () => {
  const loggerSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  render(
    <table>
      <tbody>
        <FlatTableRow>
          <td>Cell</td>
        </FlatTableRow>
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

test("should render with the expected `data-` attributes on the root element when props are passed", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow
          data-element="ft-row-data-element"
          data-role="ft-row-data-role"
        >
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row");

  expect(row).toHaveAttribute("data-component", "flat-table-row");
  expect(row).toHaveAttribute("data-element", "ft-row-data-element");
  expect(row).toHaveAttribute("data-role", "ft-row-data-role");
});

describe("when the `onClick` prop is passed", () => {
  it("sets tabIndex to 0, if row is the first one", () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");

    expect(row).toHaveAttribute("tabindex", "0");
  });

  it("sets tabIndex to -1, if row isn't the first one", () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>cell3</FlatTableCell>
            <FlatTableCell>cell4</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const secondRow = screen.getAllByRole("row")[1];

    expect(secondRow).toHaveAttribute("tabindex", "-1");
  });

  it("should set the exected cursor styling", () => {
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");

    expect(row).toHaveStyle("cursor: pointer");
  });

  it("should call the callback when the user clicks on the row", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow onClick={onClick}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");
    await user.click(row);

    expect(onClick).toHaveBeenCalled();
  });

  it("should call the callback when the user presses the enter key and the row is focused", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow onClick={onClick}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");
    row.focus();
    await user.keyboard("{enter}");

    expect(onClick).toHaveBeenCalled();
  });

  it("should call the callback when the user presses the space key and the row is focused", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow onClick={onClick}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");
    row.focus();
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the callback when the user presses a key other than enter or space and the row is focused", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow onClick={onClick}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");
    row.focus();
    await user.keyboard("{ArrowRight}");

    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("when no `onClick` prop is passed", () => {
  it("should not set the `tabIndex`", () => {
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");

    expect(row).not.toHaveAttribute("tabindex");
  });

  it("should not set the cursor styling", () => {
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");

    expect(row).not.toHaveStyle("cursor: pointer");
  });
});

test("should render with `data-selected` attribute set to 'true' when `selected` prop is passed and `expandableArea` is 'wholeRow'", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow selected>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row");

  expect(row).toHaveAttribute("data-selected", "true");
});

test("should render with `data-selected` attribute set to 'false' when `selected` prop is passed and `expandableArea` is not 'wholeRow'", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow selected expandableArea="firstColumn">
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row");

  expect(row).toHaveAttribute("data-selected", "false");
});

test("should render with `data-selected` attribute not set when `selected` prop is not passed", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row");

  expect(row).not.toHaveAttribute("data-selected");
});

test("should render with `data-highlighted` attribute set to 'true' when `highlighted` prop is passed and `expandableArea` is 'wholeRow'", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow highlighted>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row");

  expect(row).toHaveAttribute("data-highlighted", "true");
});

test("should render with `data-highlighted` attribute set to 'false' when `highlighted` prop is passed and `expandableArea` is not 'wholeRow'", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow highlighted expandableArea="firstColumn">
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row");

  expect(row).toHaveAttribute("data-highlighted", "false");
});

test("should render with `data-highlighted` attribute not set when `highlighted` prop is not passed", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row");

  expect(row).not.toHaveAttribute("data-highlighted");
});

test("should render the first and last cells with the expected border styling when a child of Sidebar", () => {
  render(
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <FlatTable>
        <tbody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>
    </DrawerSidebarContext.Provider>,
  );
  const firstCell = screen.getByRole("cell", { name: "cell1" });
  const lastCell = screen.getByRole("cell", { name: "cell2" });

  expect(firstCell).toHaveStyle("border-left: none");
  expect(lastCell).toHaveStyle("border-right: none");
});

describe("when FlatTableRowHeader children are passed", () => {
  it("should render with first cell sticky positioned", () => {
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow>
            <FlatTableRowHeader>cell1</FlatTableRowHeader>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const cell = screen.getByRole("columnheader", { name: "cell1" });

    expect(cell).toHaveStyle("position: sticky");
  });

  it("should render with first cell not sticky positioned when the row header is not conditionally rendered", () => {
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow>
            <FlatTableCell>cell1</FlatTableCell>
            {false && <FlatTableCell>cell2</FlatTableCell>}
            {false && <FlatTableRowHeader>cell3</FlatTableRowHeader>}
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const cell = screen.getByRole("cell", { name: "cell1" });

    expect(cell).not.toHaveStyle("position: sticky");
  });

  it("should render with cells preceding a row header sticky positioned and `stickyAlignment` is not set (defaults to 'left')", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow>
            <FlatTableHeader>cell1</FlatTableHeader>
            <FlatTableCell>cell2</FlatTableCell>
            <FlatTableCheckbox onChange={() => {}} data-role="cell3" />
            <FlatTableRowHeader>cell4</FlatTableRowHeader>
            <FlatTableHeader>cell5</FlatTableHeader>
            <FlatTableCell>cell6</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    const cell1 = screen.getByRole("columnheader", { name: "cell1" });
    const cell2 = screen.getByRole("cell", { name: "cell2" });
    // using test-id here as there are other elements with same role etc
    const cell3 = screen.getByTestId("cell3");
    const cell4 = screen.getByRole("columnheader", { name: "cell4" });
    const cell5 = screen.getByRole("columnheader", { name: "cell5" });
    const cell6 = screen.getByRole("cell", { name: "cell6" });

    expect(cell1).toHaveStyle("position: sticky");
    expect(cell2).toHaveStyle("position: sticky");
    expect(cell3).toHaveStyle("position: sticky");
    expect(cell4).toHaveStyle("position: sticky");
    expect(cell5).not.toHaveStyle("position: sticky");
    expect(cell6).not.toHaveStyle("position: sticky");
  });

  it("should render with cells preceding row header sticky positioned and `stickyAlignment` is 'left'", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow>
            <FlatTableHeader>cell1</FlatTableHeader>
            <FlatTableCell>cell2</FlatTableCell>
            <FlatTableCheckbox onChange={() => {}} data-role="cell3" />
            <FlatTableRowHeader stickyAlignment="left">
              cell4
            </FlatTableRowHeader>
            <FlatTableHeader>cell5</FlatTableHeader>
            <FlatTableCell>cell6</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    const cell1 = screen.getByRole("columnheader", { name: "cell1" });
    const cell2 = screen.getByRole("cell", { name: "cell2" });
    // using test-id here as there are other elements with same role etc
    const cell3 = screen.getByTestId("cell3");
    const cell4 = screen.getByRole("columnheader", { name: "cell4" });
    const cell5 = screen.getByRole("columnheader", { name: "cell5" });
    const cell6 = screen.getByRole("cell", { name: "cell6" });

    expect(cell1).toHaveStyle("position: sticky");
    expect(cell2).toHaveStyle("position: sticky");
    expect(cell3).toHaveStyle("position: sticky");
    expect(cell4).toHaveStyle("position: sticky");
    expect(cell5).not.toHaveStyle("position: sticky");
    expect(cell6).not.toHaveStyle("position: sticky");
  });

  // needed to hit coverage
  it("applies correct sticky styling to specific table cells based on index", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
            <FlatTableCheckbox onChange={() => {}} data-role="cell3" />
            <FlatTableRowHeader>cell4</FlatTableRowHeader>
            <FlatTableHeader>cell5</FlatTableHeader>
            <FlatTableCell>cell6</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    const cell1 = screen.getByRole("cell", { name: "cell1" });
    const cell2 = screen.getByRole("cell", { name: "cell2" });
    // using test-id here as there are other elements with same role etc
    const cell3 = screen.getByTestId("cell3");
    expect(cell1).toHaveStyle("width: calc(100% + 1px)");
    expect(cell2).toHaveStyle("width: calc(100% + 1px)");
    expect(cell3).toHaveStyle("width: calc(100% + 1px)");
  });

  it("should render with cells following a row header sticky positioned and `stickyAlignment` set to 'right'", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow>
            <FlatTableHeader>cell1</FlatTableHeader>
            <FlatTableCell>cell2</FlatTableCell>
            <FlatTableRowHeader stickyAlignment="right">
              cell3
            </FlatTableRowHeader>
            <FlatTableCheckbox onChange={() => {}} data-role="cell4" />
            <FlatTableHeader>cell5</FlatTableHeader>
            <FlatTableCell>cell6</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );

    const cell1 = screen.getByRole("columnheader", { name: "cell1" });
    const cell2 = screen.getByRole("cell", { name: "cell2" });
    const cell3 = screen.getByRole("columnheader", { name: "cell3" });
    // using test-id here as there are other elements with same role etc
    const cell4 = screen.getByTestId("cell4");
    const cell5 = screen.getByRole("columnheader", { name: "cell5" });
    const cell6 = screen.getByRole("cell", { name: "cell6" });

    expect(cell1).not.toHaveStyle("position: sticky");
    expect(cell2).not.toHaveStyle("position: sticky");
    expect(cell3).toHaveStyle("position: sticky");
    expect(cell4).toHaveStyle("position: sticky");
    expect(cell5).toHaveStyle("position: sticky");
    expect(cell6).toHaveStyle("position: sticky");
  });

  test("should throw an error when a left aligned header has a higher index than the right aligned", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const errorMessage = `Do not render a right hand side \`FlatTableRowHeader\` before left hand side \`FlatTableRowHeader\``;

    expect(() => {
      render(
        <FlatTable>
          <thead>
            <FlatTableRow>
              <FlatTableHeader>cell1</FlatTableHeader>
              <FlatTableCell>cell2</FlatTableCell>
              <FlatTableRowHeader stickyAlignment="right">
                cell3
              </FlatTableRowHeader>
              <FlatTableRowHeader stickyAlignment="left">
                cell4
              </FlatTableRowHeader>
              <FlatTableHeader>cell5</FlatTableHeader>
              <FlatTableCell>cell6</FlatTableCell>
            </FlatTableRow>
          </thead>
        </FlatTable>,
      );
    }).toThrow(errorMessage);

    consoleSpy.mockRestore();
  });
});

describe("when the row is `expandable`", () => {
  it("should apply the expected cursor styling to the parent row when `expandableArea` is 'wholeRow'", () => {
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow expandable>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row", { name: "cell1 cell2" });

    expect(row).toHaveStyle("cursor: pointer");
  });

  it("sets tabIndex to 0 if row is the first one and `expandableArea` is 'wholeRow'", () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandable expandableArea="wholeRow">
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");

    expect(row).toHaveAttribute("tabindex", "0");
  });

  it("sets tabIndex to -1 if row isn't the first one and `expandableArea` is 'wholeRow'", () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandable expandableArea="wholeRow">
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable expandableArea="wholeRow">
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const secondRow = screen.getAllByRole("row")[1];

    expect(secondRow).toHaveAttribute("tabindex", "-1");
  });

  it("should not set tabIndex on the row when `expandableArea` is 'firstColumn'", () => {
    render(
      <FlatTable>
        <tbody>
          <FlatTableRow expandable expandableArea="firstColumn">
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </FlatTable>,
    );
    const row = screen.getByRole("row");
    const cell = screen.getByRole("cell", { name: "cell1" });

    expect(row).not.toHaveAttribute("tabindex");
    expect(cell).toHaveAttribute("tabindex", "-1");
  });

  it("should add and apply the expected styling to the chevron icon", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    const cell1 = screen.getByRole("cell", { name: "cell1" });
    const icon = within(cell1).getByTestId("icon");

    expect(icon).toHaveAttribute("data-element", "chevron_down_thick");
    expect(icon).toHaveStyle({
      transition: "transform 0.3s",
      transform: "rotate(-90deg)",
    });
  });

  it("should add icon to the second cell when the first column contains checkbox cells", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCheckbox onChange={() => {}} />
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCheckbox onChange={() => {}} />
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCheckbox onChange={() => {}} />
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    const cell2 = screen.getByRole("cell", { name: "cell2" });
    const icon = within(cell2).getByTestId("icon");

    expect(icon).toHaveAttribute("data-element", "chevron_down_thick");
  });

  it("should update the styling of the icon when the sub rows have been expanded", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    const cell1 = screen.getByRole("cell", { name: "cell1" });
    const icon = within(cell1).getByTestId("icon");

    expect(icon).toHaveAttribute("data-element", "chevron_down_thick");
    expect(icon).not.toHaveStyle("transform: rotate(-90deg)");
  });

  it("should not display the sub rows by default", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    const subRow1 = screen.queryByRole("row", { name: "sub1cell1 sub1cell2" });
    const subRow2 = screen.queryByRole("row", { name: "sub2cell1 sub2cell2" });

    expect(subRow1).not.toBeInTheDocument();
    expect(subRow2).not.toBeInTheDocument();
  });

  it("should expand the sub rows when the user clicks on the parent row and `expandableArea` is 'wholeRow'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    await user.click(screen.getByRole("row", { name: "cell1 cell2" }));
    jest.advanceTimersByTime(300);

    expect(
      await screen.findByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      await screen.findByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
    jest.useRealTimers();
  });

  it("should expand the sub rows when the user presses the Enter key on the focused parent row and `expandableArea` is 'wholeRow'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("row", { name: "cell1 cell2" }).focus();
    await user.keyboard("{Enter}");
    jest.advanceTimersByTime(300);

    expect(
      await screen.findByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      await screen.findByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
    jest.useRealTimers();
  });

  it("should expand the sub rows when the user presses the Space key on the focused parent row and `expandableArea` is 'wholeRow'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("row", { name: "cell1 cell2" }).focus();
    await user.keyboard(" ");
    jest.advanceTimersByTime(300);

    expect(
      await screen.findByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      await screen.findByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
    jest.useRealTimers();
  });

  it("should not expand the sub rows when the user presses a key other than Enter/Space on the focused parent row and `expandableArea` is 'wholeRow'", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("row", { name: "cell1 cell2" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
  });

  it("should display the sub rows when the `expanded` prop is true", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );

    expect(
      screen.getByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      screen.getByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
  });

  it("should collapse the sub rows when the user clicks on the parent row and they are `expanded`", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    await user.click(screen.getByRole("row", { name: "cell1 cell2" }));
    jest.advanceTimersByTime(300);

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should collapse the sub rows when the user pressed Enter key on the focused parent row and they are `expanded`", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("row", { name: "cell1 cell2" }).focus();
    await user.keyboard("{Enter}");
    jest.advanceTimersByTime(300);

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should collapse the sub rows when the user pressed Space key on the focused parent row and they are `expanded`", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("row", { name: "cell1 cell2" }).focus();
    await user.keyboard("{Enter}");
    jest.advanceTimersByTime(300);

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should not collapse the sub rows when the user pressed key other than Enter/Space on the focused parent row and they are `expanded`", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("row", { name: "cell1 cell2" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.getByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      screen.getByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
  });

  it("should apply the expected cursor styling to the first cell of the parent row and `expandableArea` is 'firstColumn'", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );

    expect(screen.getByRole("cell", { name: "cell1" })).toHaveStyle(
      "cursor: pointer",
    );
    expect(screen.getByRole("cell", { name: "cell2" })).not.toHaveStyle(
      "cursor: pointer",
    );
  });

  it("should expand the sub rows when the user clicks on the first cell of the parent row and `expandableArea` is 'firstColumn'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    await user.click(screen.getByRole("cell", { name: "cell1" }));
    jest.advanceTimersByTime(300);

    expect(
      await screen.findByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      await screen.findByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
    jest.useRealTimers();
  });

  it("should expand the sub rows when the user presses the Enter key on the focused first cell of the parent row and `expandableArea` is 'firstColumn'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("cell", { name: "cell1" }).focus();
    await user.keyboard("{Enter}");
    jest.advanceTimersByTime(300);

    expect(
      await screen.findByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      await screen.findByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
    jest.useRealTimers();
  });

  it("should expand the sub rows when the user presses the Space key on the focused first cell of the parent row and `expandableArea` is 'firstColumn'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("cell", { name: "cell1" }).focus();
    await user.keyboard(" ");
    jest.advanceTimersByTime(300);

    expect(
      await screen.findByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      await screen.findByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
    jest.useRealTimers();
  });

  it("should not expand the sub rows when the user clicks on the second cell of the parent row when they are `expanded` and `expandableArea` is 'firstColumn'", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    await user.click(screen.getByRole("cell", { name: "cell2" }));

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
  });

  it("should not expand the sub rows when the user presses key other than Enter/Space on the focused first cell of the parent row when they are `expanded` and `expandableArea` is 'firstColumn'", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("cell", { name: "cell2" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
  });

  it("should collapse the sub rows when the user clicks on the first cell of the parent row when they are `expanded` and `expandableArea` is 'firstColumn'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    await user.click(screen.getByRole("cell", { name: "cell1" }));
    jest.advanceTimersByTime(300);

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should collapse the sub rows when the user presses the Enter key on the focused first cell of the parent row when they are `expanded` and `expandableArea` is 'firstColumn'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("cell", { name: "cell1" }).focus();
    await user.keyboard("{Enter}");
    jest.advanceTimersByTime(300);

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should collapse the sub rows when the user presses the Space key on the focused first cell of the parent row when they are `expanded` and `expandableArea` is 'firstColumn'", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("cell", { name: "cell1" }).focus();
    await user.keyboard(" ");
    jest.advanceTimersByTime(300);

    expect(
      screen.queryByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should not collapse the sub rows when the user clicks on the second cell of the parent row when they are `expanded` and `expandableArea` is 'firstColumn'", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    await user.click(screen.getByRole("cell", { name: "cell2" }));

    expect(
      screen.getByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      screen.getByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
  });

  it("should not collapse the sub rows when the user presses key other than Enter/Space on the focused first cell of the parent row when they are `expanded` and `expandableArea` is 'firstColumn'", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            expanded
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCell>sub1cell1</FlatTableCell>
                <FlatTableCell>sub1cell2</FlatTableCell>
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCell>sub2cell1</FlatTableCell>
                <FlatTableCell>sub2cell2</FlatTableCell>
              </FlatTableRow>,
            ]}
          >
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );
    screen.getByRole("cell", { name: "cell1" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.getByRole("row", { name: "sub1cell1 sub1cell2" }),
    ).toBeVisible();
    expect(
      screen.getByRole("row", { name: "sub2cell1 sub2cell2" }),
    ).toBeVisible();
  });

  it("should support expanding and collapsing sub rows when the user clicks on the parent row and draggable body is used", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <FlatTable>
        <FlatTableBodyDraggable>
          <FlatTableRow
            expandable
            subRows={
              <FlatTableRow>
                <FlatTableCell>sub1cell1</FlatTableCell>
              </FlatTableRow>
            }
            id={0}
          >
            <FlatTableCell>cell1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            expandable
            subRows={
              <FlatTableRow>
                <FlatTableCell>sub2cell1</FlatTableCell>
              </FlatTableRow>
            }
            id={1}
          >
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            expandable
            subRows={
              <FlatTableRow>
                <FlatTableCell>sub3cell1</FlatTableCell>
              </FlatTableRow>
            }
            id={2}
          >
            <FlatTableCell>cell3</FlatTableCell>
          </FlatTableRow>
        </FlatTableBodyDraggable>
      </FlatTable>,
    );
    const row1 = screen.getByRole("row", { name: "cell1" });
    const row2 = screen.getByRole("row", { name: "cell2" });
    await user.click(row1);
    jest.advanceTimersByTime(300);
    await user.click(row2);
    jest.advanceTimersByTime(300);

    expect(await screen.findByRole("row", { name: "sub1cell1" })).toBeVisible();
    expect(await screen.findByRole("row", { name: "sub2cell1" })).toBeVisible();

    await user.click(row1);
    jest.advanceTimersByTime(300);
    await user.click(row2);
    jest.advanceTimersByTime(300);

    expect(
      screen.queryByRole("row", { name: "sub1cell1" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: "sub2cell1" }),
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  // needed for coverage
  test("should set the cursor to pointer when the row is expandable via the firstColumn and all children are checkbox cells", () => {
    render(
      <FlatTable>
        <thead>
          <FlatTableRow
            expandable
            expandableArea="firstColumn"
            subRows={[
              <FlatTableRow key="sub-row-1">
                <FlatTableCheckbox onChange={() => {}} />
                <FlatTableCheckbox onChange={() => {}} />
              </FlatTableRow>,
              <FlatTableRow key="sub-row-2">
                <FlatTableCheckbox onChange={() => {}} />
                <FlatTableCheckbox onChange={() => {}} />
              </FlatTableRow>,
            ]}
          >
            <FlatTableCheckbox onChange={() => {}} data-role="cell1" />
            <FlatTableCheckbox onChange={() => {}} />
          </FlatTableRow>
        </thead>
      </FlatTable>,
    );

    expect(screen.getByTestId("cell1")).toHaveStyle("cursor: pointer");
  });

  it("should apply the expected padding on the sub row's first cell's content when the table `size` is 'compact'", async () => {
    render(
      <table>
        <StrictFlatTableProvider
          value={{ size: "compact", getTabStopElementId: () => "" }}
        >
          <FlatTableBody>
            <FlatTableRow
              expanded
              expandable
              subRows={
                <FlatTableRow>
                  <FlatTableCell>sub1cell1</FlatTableCell>
                  <FlatTableCell>sub1cell2</FlatTableCell>
                </FlatTableRow>
              }
            >
              <FlatTableCell>cell1</FlatTableCell>
              <FlatTableCell>cell2</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </StrictFlatTableProvider>
      </table>,
    );

    const subRowCell1 = await screen.findByRole("cell", { name: "sub1cell1" });
    const content1 = within(subRowCell1).getByTestId("flat-table-cell-content");
    const subRowCell2 = await screen.findByRole("cell", { name: "sub1cell2" });
    const content2 = within(subRowCell2).getByTestId("flat-table-cell-content");

    expect(content1).toHaveStyle("padding-left: 32px");
    expect(content2).not.toHaveStyle("padding-left: 32px");
  });
});

describe("with a ref", () => {
  it("the ref should be forwarded", () => {
    const mockRef = { current: null };

    render(
      <FlatTable>
        <FlatTableBodyDraggable>
          <FlatTableRow id={0} ref={mockRef}>
            <FlatTableHeader>cell1</FlatTableHeader>
            <FlatTableCell>cell2</FlatTableCell>
            <FlatTableRowHeader>cell3</FlatTableRowHeader>
            <FlatTableHeader>cell4</FlatTableHeader>
          </FlatTableRow>
        </FlatTableBodyDraggable>
      </FlatTable>,
    );

    expect(mockRef.current).toBe(
      screen.getByRole("row", { name: "cell1 cell2 cell3 cell4" }),
    );
  });

  it("the input callback ref should be called with the DOM element", () => {
    const mockRef = jest.fn();

    render(
      <FlatTable>
        <FlatTableBodyDraggable>
          <FlatTableRow id={0} ref={mockRef}>
            <FlatTableHeader>cell1</FlatTableHeader>
            <FlatTableCell>cell2</FlatTableCell>
            <FlatTableRowHeader>cell3</FlatTableRowHeader>
            <FlatTableHeader>cell4</FlatTableHeader>
          </FlatTableRow>
        </FlatTableBodyDraggable>
      </FlatTable>,
    );

    expect(mockRef).toHaveBeenCalledWith(
      screen.getByRole("row", { name: "cell1 cell2 cell3 cell4" }),
    );
  });
});

// for coverage
test("should render the expected background color styles when `bgColor` prop is passed", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow bgColor="red">
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCheckbox onChange={() => {}} data-role="cell2" />
          <FlatTableRowHeader>cell3</FlatTableRowHeader>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const cell1 = screen.getByRole("cell", { name: "cell1" });
  const cell2 = screen.getByTestId("cell2");
  const cell3 = screen.getByRole("columnheader", { name: "cell3" });

  expect(cell1).toHaveStyle("background-color: red");
  expect(cell2).toHaveStyle("background-color: red");
  expect(cell3).toHaveStyle("background-color: red");
});

// for coverage
test("should render the expected border bottom color styles when `horizontalBorderColor` prop is passed", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow horizontalBorderColor="red">
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCheckbox onChange={() => {}} data-role="cell2" />
          <FlatTableRowHeader>cell3</FlatTableRowHeader>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const cell1 = screen.getByRole("cell", { name: "cell1" });
  const cell2 = screen.getByTestId("cell2");
  const cell3 = screen.getByRole("columnheader", { name: "cell3" });

  expect(cell1).toHaveStyle("border-bottom-color: red");
  expect(cell2).toHaveStyle("border-bottom-color: red");
  expect(cell3).toHaveStyle("border-bottom-color: red");
});

// for coverage
test("should render the expected border bottom color styles when `horizontalBorderSize` prop is 'medium'", () => {
  render(
    <FlatTable>
      <tbody>
        <FlatTableRow horizontalBorderSize="medium">
          <FlatTableCell>cell1</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </FlatTable>,
  );
  const row = screen.getByRole("row", { name: "cell1" });

  expect(row).toHaveStyleRule(
    "border-bottom",
    "2px solid var(--colorsUtilityMajor100)",
    { modifier: `${StyledFlatTableCell}` },
  );
});

// for coverage
test("should apply the expected border styling when row is dragged and table is in sidebar", async () => {
  render(
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <FlatTable>
        <FlatTableBodyDraggable>
          <FlatTableRow key="1" id={1}>
            <FlatTableCell>Row one</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow key="2" id={2}>
            <FlatTableCell>Row two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow key="3" id={3}>
            <FlatTableCell>Row three</FlatTableCell>
          </FlatTableRow>
        </FlatTableBodyDraggable>
      </FlatTable>
    </DrawerSidebarContext.Provider>,
  );
  const elementToDrag = screen.getByRole("row", { name: "Row one" });

  fireEvent.dragStart(elementToDrag);
  fireEvent.dragEnter(elementToDrag);
  fireEvent.dragOver(elementToDrag);

  await waitFor(() => {
    expect(elementToDrag).toHaveStyleRule(
      "border",
      "var(--colorsUtilityMajor300) 2px solid",
    );
  });
});
