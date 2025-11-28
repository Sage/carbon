import React from "react";

import { act, render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import FlatTable from "./flat-table.component";
import FlatTableHead from "./flat-table-head/flat-table-head.component";
import FlatTableBody from "./flat-table-body/flat-table-body.component";
import FlatTableRow from "./flat-table-row/flat-table-row.component";
import FlatTableHeader from "./flat-table-header/flat-table-header.component";
import FlatTableCell from "./flat-table-cell/flat-table-cell.component";
import FlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.component";
import FlatTableRowHeader from "./flat-table-row-header/flat-table-row-header.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import StyledFlatTableHeader from "./flat-table-header/flat-table-header.style";
import StyledFlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.style";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import { StyledFlatTableCell } from "./flat-table-cell/flat-table-cell.style";
import StyledFlatTableRow from "./flat-table-row/flat-table-row.style";
import Pager from "../pager/pager.component";
import DateInput from "../date/date.component";

import {
  ActionPopover,
  ActionPopoverItem,
  ActionPopoverDivider,
} from "../../components/action-popover";

testStyledSystemMargin(
  (props) => (
    <FlatTable {...props}>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableHeader>header1</FlatTableHeader>
          <FlatTableHeader>header2</FlatTableHeader>
          <FlatTableHeader>header3</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow id="row-1">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
          <FlatTableCell rowspan="2">cell3</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  ),
  () => screen.getByTestId("flat-table-wrapper"),
);

describe("when rows are interactive", () => {
  it("should apply the expected focus styling to the wrapper element when it is focused", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const focusableTableContainer = screen.getByTestId("flat-table-container");

    await user.keyboard("{Tab}");

    expect(focusableTableContainer).toHaveFocus();
  });

  it("should not move focus to first row with `onClick` when down arrow pressed and table wrapper focused", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const focusableTableContainer = screen.getByTestId("flat-table-container");
    act(() => {
      focusableTableContainer.focus();
    });

    expect(focusableTableContainer).toHaveFocus();

    await user.keyboard("ArrowDown");

    expect(focusableTableContainer).toHaveFocus();
    expect(screen.getByRole("row", { name: "one two" })).not.toHaveFocus();
  });

  it("should set the first row's tabindex to 0 if no other rows are `selected` or `highlighted` but has `onClick`", async () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    await waitFor(() => {
      expect(screen.getByRole("row", { name: "one two" })).toHaveAttribute(
        "tabindex",
        "0",
      );
    });

    await waitFor(() => {
      expect(screen.getByRole("row", { name: "three four" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });
  });

  it("should move focus to the next row with `onClick` when the down arrow key is pressed but not loop to the first when last reached", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const focusableTableContainer = screen.getByTestId("flat-table-container");
    const firstRow = screen.getByRole("row", { name: "one two" });
    const secondRow = screen.getByRole("row", { name: "three four" });
    const thirdRow = screen.getByRole("row", { name: "five six" });
    const fourthRow = screen.getByRole("row", { name: "seven eight" });
    act(() => {
      focusableTableContainer?.focus();
    });

    await user.keyboard("{Tab}");
    expect(firstRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(secondRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(thirdRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(fourthRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(fourthRow).toHaveFocus();
  });

  it("should move focus to the previous row with `onClick` when the up arrow key is pressed but not loop to the last when first reached", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const firstRow = screen.getByRole("row", { name: "one two" });
    const secondRow = screen.getByRole("row", { name: "three four" });
    const thirdRow = screen.getByRole("row", { name: "five six" });
    const fourthRow = screen.getByRole("row", { name: "seven eight" });
    fourthRow?.focus();

    expect(fourthRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(thirdRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(secondRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(firstRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(firstRow).toHaveFocus();
  });

  it("should not move focus from currently focused row with `onClick` when left arrow key pressed", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const fourthRow = screen.getByRole("row", { name: "seven eight" });
    fourthRow?.focus();

    expect(fourthRow).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(fourthRow).toHaveFocus();
  });

  it("should move focus to the next `expandable` row when the down arrow key is pressed but not loop to the first when last reached", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandable>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const firstRow = screen.getByRole("row", { name: "one two" });
    const secondRow = screen.getByRole("row", { name: "three four" });
    const thirdRow = screen.getByRole("row", { name: "five six" });
    const fourthRow = screen.getByRole("row", { name: "seven eight" });
    firstRow?.focus();

    expect(firstRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(secondRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(thirdRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(fourthRow).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(fourthRow).toHaveFocus();
  });

  it("should move focus to the previous `expandable` row when the up arrow key is pressed but not loop to the last when first reached", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandable>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const firstRow = screen.getByRole("row", { name: "one two" });
    const secondRow = screen.getByRole("row", { name: "three four" });
    const thirdRow = screen.getByRole("row", { name: "five six" });
    const fourthRow = screen.getByRole("row", { name: "seven eight" });
    fourthRow?.focus();

    expect(fourthRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(thirdRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(secondRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(firstRow).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(firstRow).toHaveFocus();
  });

  it("should move focus to the next row with `onClick` when the down arrow key is pressed whilst a checkbox input child is focused", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCheckbox onChange={() => {}} checked={false} />
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const secondRow = screen.getByRole("row", { name: "three four" });
    const checkbox = screen.getByRole("checkbox");
    act(() => {
      checkbox.focus();
    });

    expect(checkbox).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(secondRow).toHaveFocus();
  });

  it("should move focus to the previous row with `onClick` when the up arrow key is pressed whilst a checkbox input child is focused", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCheckbox onChange={() => {}} checked={false} />
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const firstRow = screen.getByRole("row", { name: "one two" });
    const checkbox = screen.getByRole("checkbox");
    act(() => {
      checkbox.focus();
    });

    expect(checkbox).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(firstRow).toHaveFocus();
  });
});

describe("when the first column is expandable", () => {
  it("should set the first cell's tabindex to 0", async () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell data-role="one">one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell data-role="two">three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    await waitFor(() => {
      expect(screen.getByTestId("one")).toHaveAttribute("tabindex", "0");
    });

    await waitFor(() => {
      expect(screen.getByTestId("two")).toHaveAttribute("tabindex", "-1");
    });
  });

  it("should set tabindex to 0 on the first cell in a `highlighted` row", async () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow highlighted expandableArea="firstColumn" expandable>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    await waitFor(() => {
      expect(screen.getByRole("cell", { name: "one" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });

    await waitFor(() => {
      expect(screen.getByRole("cell", { name: "three" })).toHaveAttribute(
        "tabindex",
        "0",
      );
    });
  });

  it("should set tabindex to 0 on the first cell in a `selected` row", async () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected expandableArea="firstColumn" expandable>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    await waitFor(() => {
      expect(screen.getByRole("cell", { name: "one" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });

    await waitFor(() => {
      expect(screen.getByRole("cell", { name: "three" })).toHaveAttribute(
        "tabindex",
        "0",
      );
    });
  });

  it("should set the first row header's tabindex to 0", async () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableRowHeader id="one">one</FlatTableRowHeader>
            <FlatTableCell id="two">two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableRowHeader id="three">three</FlatTableRowHeader>
            <FlatTableCell id="four">four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    await waitFor(() => {
      expect(screen.getByRole("columnheader", { name: "one" })).toHaveAttribute(
        "tabindex",
        "0",
      );
    });

    await waitFor(() => {
      expect(
        screen.getByRole("columnheader", { name: "three" }),
      ).toHaveAttribute("tabindex", "-1");
    });
  });

  it("should set tabindex to 0 on the first row header in a `highlighted` row", async () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableRowHeader id="one">one</FlatTableRowHeader>
            <FlatTableCell id="two">two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow highlighted expandableArea="firstColumn" expandable>
            <FlatTableRowHeader id="three">three</FlatTableRowHeader>
            <FlatTableCell id="four">four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    await waitFor(() => {
      expect(screen.getByRole("columnheader", { name: "one" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });

    await waitFor(() => {
      expect(
        screen.getByRole("columnheader", { name: "three" }),
      ).toHaveAttribute("tabindex", "0");
    });
  });

  it("should set tabindex to 0 on the first row header in a `selected` row", async () => {
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableRowHeader id="one">one</FlatTableRowHeader>
            <FlatTableCell id="two">two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected expandableArea="firstColumn" expandable>
            <FlatTableRowHeader id="three">three</FlatTableRowHeader>
            <FlatTableCell id="four">four</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    await waitFor(() => {
      expect(screen.getByRole("columnheader", { name: "one" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });

    await waitFor(() => {
      expect(
        screen.getByRole("columnheader", { name: "three" }),
      ).toHaveAttribute("tabindex", "0");
    });
  });

  it("should move focus to the next focusable cell when the down arrow key is pressed but not loop to the first when last reached", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const firstFocusableCell = screen.getByRole("cell", { name: "one" });
    const secondFocusableCell = screen.getByRole("cell", { name: "three" });
    const thirdFocusableCell = screen.getByRole("cell", { name: "five" });
    const fourthFocusableCell = screen.getByRole("cell", { name: "seven" });
    firstFocusableCell.focus();

    expect(firstFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(secondFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(thirdFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(fourthFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(fourthFocusableCell).toHaveFocus();
  });

  it("should move focus to the previous focusable cell when the up arrow key is pressed but not loop to the last when first reached", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const firstFocusableCell = screen.getByRole("cell", { name: "one" });
    const secondFocusableCell = screen.getByRole("cell", { name: "three" });
    const thirdFocusableCell = screen.getByRole("cell", { name: "five" });
    const fourthFocusableCell = screen.getByRole("cell", { name: "seven" });
    fourthFocusableCell.focus();

    expect(fourthFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(thirdFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(secondFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(firstFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(firstFocusableCell).toHaveFocus();
  });

  it("should not move focus from currently focused cell when left arrow key pressed", async () => {
    const user = userEvent.setup();
    render(
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>one</FlatTableCell>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>three</FlatTableCell>
            <FlatTableCell>four</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>five</FlatTableCell>
            <FlatTableCell>six</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandableArea="firstColumn" expandable>
            <FlatTableCell>seven</FlatTableCell>
            <FlatTableCell>eight</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const fourthFocusableCell = screen.getByRole("cell", { name: "seven" });
    fourthFocusableCell.focus();

    expect(fourthFocusableCell).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(fourthFocusableCell).toHaveFocus();
  });
});

test("should ensure the table has an accessible description when `ariaDescribedby` prop is passed", () => {
  render(
    <>
      <div id="foo">here is some text to describe the table</div>
      <FlatTable ariaDescribedby="foo">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>heading one</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>child one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>,
  );
  expect(screen.getByRole("table")).toHaveAccessibleDescription(
    "here is some text to describe the table",
  );
});

test("should set the `data-` attributes on the root element when the props are passed", () => {
  render(
    <FlatTable data-role="ft-data-role" data-element="ft-data-element">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>heading one</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>child one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );
  const tableWrapper = screen.getByTestId("ft-data-role");

  expect(tableWrapper).toHaveAttribute("data-component", "flat-table-wrapper");
  expect(tableWrapper).toHaveAttribute("data-element", "ft-data-element");
});

describe("when `hasStickyHead` is set", () => {
  it("should set the expected overflow styling on the wrapper element", () => {
    render(
      <FlatTable hasStickyHead data-role="ft-wrapper">
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const tableWrapper = screen.getByTestId("ft-wrapper");

    expect(tableWrapper).toHaveStyle("overflow-y: auto");
  });

  it("should set position sticky on all th inside the table head", () => {
    render(
      <FlatTable hasStickyHead data-role="ft-wrapper">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCell>one</FlatTableCell>
          </FlatTableRow>
        </FlatTableHead>
      </FlatTable>,
    );

    expect(screen.getByRole("rowgroup")).toHaveStyle({
      position: "sticky",
      top: "0",
      left: "0",
      zIndex: "1005",
    });
  });
});

test("should render the `caption` element and set the accessible name of the table when prop is passed", () => {
  render(
    <FlatTable caption="this is a caption">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>heading one</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>child one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByRole("table")).toHaveAccessibleName("this is a caption");
});

test("should apply the expected box sizing styling to the wrapper element when it's height exceeds it's parent", () => {
  render(
    <div style={{ height: "100px" }}>
      <FlatTable data-role="ft-wrapper" footer={<div>foo</div>}>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>one</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>three</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyle(
    "box-sizing: border-box",
  );
});

test("should apply the expected max height on the wrapper element when the `hasMaxHeight` prop is set", () => {
  render(
    <FlatTable hasMaxHeight data-role="ft-wrapper" footer={<div>foo</div>}>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>one</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>two</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>three</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyle("max-height: 100%");
});

test("should not apply max height styling on the wrapper element when the `hasMaxHeight` prop is not set", () => {
  render(
    <FlatTable data-role="ft-wrapper" footer={<div>foo</div>}>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>one</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>two</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>three</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).not.toHaveStyle("max-height: 100%");
});

test("should render the `footer` element when prop is passed", () => {
  render(
    <FlatTable footer={<div>foo</div>}>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByText("foo")).toBeVisible();
});

test("should render the `footer` element with the expected styling when `hasStickyFooter` prop is also set", () => {
  render(
    <FlatTable footer={<div>foo</div>} hasStickyFooter>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("flat-table-footer")).toHaveStyle({
    position: "sticky",
    bottom: "0px",
    zIndex: "1001",
  });
});

test("should set the expected flex styling on the wrapper when `footer` and `hasStickyFooter` props are both passed", () => {
  render(
    <FlatTable footer={<div>foo</div>} hasStickyFooter data-role="ft-wrapper">
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyle(
    "justify-content: space-between",
  );
});

test("should apply the expected `width` styling to the wrapper and container elements when the prop is passed", () => {
  render(
    <FlatTable width="300px" data-role="ft-wrapper">
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyle("width: 300px");
  expect(screen.getByTestId("flat-table-container")).toHaveStyle(
    "width: 300px",
  );
});

test("should apply the expected `overflowX` styling to the wrapper and container elements when the prop is passed along with `width`", () => {
  render(
    <FlatTable overflowX="auto" width="300px" data-role="ft-wrapper">
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyle("overflow-x: hidden");
  expect(screen.getByTestId("flat-table-container")).toHaveStyle(
    "overflow-x: auto",
  );
});

describe("rounded corners are enabled", () => {
  it("should have the expected border radius styling when no footer is rendered", () => {
    render(
      <FlatTable data-role="ft-wrapper">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>heading one</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>child one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const wrapper = screen.getByTestId("ft-wrapper");

    expect(wrapper).toHaveStyleRule(
      "border-top-left-radius",
      "var(--borderRadius100)",
    );
    expect(wrapper).toHaveStyleRule(
      "border-top-right-radius",
      "var(--borderRadius100)",
    );
    expect(wrapper).toHaveStyleRule(
      "border-bottom-left-radius",
      "var(--borderRadius100)",
    );
    expect(wrapper).toHaveStyleRule(
      "border-bottom-right-radius",
      "var(--borderRadius100)",
    );
    expect(wrapper).toHaveStyleRule(
      "border-top-left-radius",
      "var(--borderRadius100)",
      {
        modifier: `thead ${StyledFlatTableRow}:first-of-type th:first-of-type`,
      },
    );
    expect(wrapper).toHaveStyleRule(
      "border-top-right-radius",
      "var(--borderRadius100)",
      {
        modifier: `thead ${StyledFlatTableRow}:first-of-type th:last-of-type`,
      },
    );
    expect(wrapper).toHaveStyleRule(
      "border-bottom-left-radius",
      "var(--borderRadius100)",
      {
        modifier: `tbody ${StyledFlatTableRow}:last-of-type td:first-child`,
      },
    );
    expect(wrapper).toHaveStyleRule(
      "border-bottom-right-radius",
      "var(--borderRadius100)",
      {
        modifier: `tbody ${StyledFlatTableRow}:last-of-type td:last-child`,
      },
    );
  });

  it("should override Pager's top border styling so it connects to the table when passed in `footer`,", () => {
    render(
      <FlatTable footer={<Pager data-role="pager" onPagination={() => {}} />}>
        <FlatTableHead>
          <FlatTableRow>
            <td>heading one</td>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>item one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const pager = screen.getByTestId("pager");

    expect(pager).toHaveStyle({
      borderTop: "none",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    });
  });

  it("should not apply any border-radius on the table wrapper an set to 0 on Pager when passed as `footer` and `hasStickyFooter` set,", () => {
    render(
      <FlatTable
        hasStickyFooter
        footer={<Pager data-role="pager" onPagination={() => {}} />}
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>heading one</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>child one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
    const tableWrapper = screen.getByRole("region");
    const pager = screen.getByTestId("pager");

    expect(tableWrapper).toHaveStyle({
      borderBottomLeftRadius: undefined,
      borderBottomRightRadius: undefined,
    });
    expect(pager).toHaveStyle({
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    });
  });

  it("should apply the expected border radius styling when the first column has rowspan that spans over bottom row", () => {
    render(
      <FlatTable data-role="ft-wrapper">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>heading one</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell rowspan="2">child one</FlatTableCell>
            <FlatTableCell>child two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>child one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    expect(screen.getByTestId("ft-wrapper")).toHaveStyleRule(
      "border-bottom-left-radius",
      "var(--borderRadius100)",
      {
        modifier: `tbody ${StyledFlatTableRow}:nth-of-type(1) td:first-child`,
      },
    );
  });

  it("should apply the expected border radius styling when the last column has rowspan that spans over bottom row", () => {
    render(
      <FlatTable data-role="ft-wrapper">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>heading one</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>child one</FlatTableCell>
            <FlatTableCell rowspan="2">child two</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>child one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );

    expect(screen.getByTestId("ft-wrapper")).toHaveStyleRule(
      "border-bottom-right-radius",
      "var(--borderRadius100)",
      {
        modifier: `tbody ${StyledFlatTableRow}:nth-of-type(1) td:last-child`,
      },
    );
  });
});

test("should apply the expected min-width styling when rendered inside the drawer sidebar", () => {
  render(
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <FlatTable data-role="ft-wrapper">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>heading one</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>child one</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </DrawerSidebarContext.Provider>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyle(
    "min-width: fit-content",
  );
});

test("should set the expected background colour on the rows hover when `isZebra` prop is set", () => {
  render(
    <FlatTable isZebra>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>heading one</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>child one</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>child one</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>child one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByRole("table")).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor025)",
    {
      modifier: `${StyledFlatTableRow}:hover ${StyledFlatTableCheckbox}:not(th)`,
    },
  );
});

test("should set the expected background colour on the header cells when `colorTheme` is 'dark'", () => {
  render(
    <FlatTable data-role="ft-wrapper" colorTheme="dark">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableHeader>header1</FlatTableHeader>
          <FlatTableHeader>header2</FlatTableHeader>
          <FlatTableHeader>header3</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow id="row-1">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
          <FlatTableCell rowspan="2">cell3</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow id="row-2">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell colspan="2">cell1</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor400)",
    {
      modifier: `${StyledFlatTableHeader}`,
    },
  );
});

test("should set the expected background colour on the header cells when `colorTheme` is 'light'", () => {
  render(
    <FlatTable data-role="ft-wrapper" colorTheme="light">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableHeader>header1</FlatTableHeader>
          <FlatTableHeader>header2</FlatTableHeader>
          <FlatTableHeader>header3</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow id="row-1">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
          <FlatTableCell rowspan="2">cell3</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow id="row-2">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell colspan="2">cell1</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor100)",
    {
      modifier: `${StyledFlatTableHeader}`,
    },
  );
});

test("should set the expected background colour on the header cells when `colorTheme` is 'transparent-base'", () => {
  render(
    <FlatTable data-role="ft-wrapper" colorTheme="transparent-base">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableHeader>header1</FlatTableHeader>
          <FlatTableHeader>header2</FlatTableHeader>
          <FlatTableHeader>header3</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow id="row-1">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
          <FlatTableCell rowspan="2">cell3</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow id="row-2">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell colspan="2">cell1</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor025)",
    {
      modifier: `${StyledFlatTableHeader}`,
    },
  );
});

test("should set the expected background colour on the header cells when `colorTheme` is 'transparent-white'", () => {
  render(
    <FlatTable data-role="ft-wrapper" colorTheme="transparent-white">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableHeader>header1</FlatTableHeader>
          <FlatTableHeader>header2</FlatTableHeader>
          <FlatTableHeader>header3</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow id="row-1">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
          <FlatTableCell rowspan="2">cell3</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow id="row-2">
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell colspan="2">cell1</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("ft-wrapper")).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityYang100)",
    {
      modifier: `${StyledFlatTableHeader}`,
    },
  );
});

test("hides the leftmost and rightmost table borders when `hasOuterVerticalBorders` is false", () => {
  render(
    <FlatTable hasOuterVerticalBorders={false}>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Fruit</FlatTableHeader>
          <FlatTableHeader>Colour</FlatTableHeader>
          <FlatTableHeader>Planet</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>Apple</FlatTableCell>
          <FlatTableCell>Purple</FlatTableCell>
          <FlatTableCell>Pluto</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("flat-table-wrapper")).toHaveStyleRule(
    "border-left-color",
    "var(--colorsUtilityMajorTransparent)",
    {
      modifier: `${StyledFlatTableRow} > ${StyledFlatTableCell}:first-child`,
    },
  );

  expect(screen.getByTestId("flat-table-wrapper")).toHaveStyleRule(
    "border-right-color",
    "var(--colorsUtilityMajorTransparent)",
    {
      modifier: `${StyledFlatTableRow} > ${StyledFlatTableCell}:last-child`,
    },
  );
});

test("should apply the expected class name to elements preceding left aligned sticky columns", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>heading one</FlatTableHeader>
          <FlatTableRowHeader>heading two</FlatTableRowHeader>
          <FlatTableHeader>heading three</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>body one</FlatTableCell>
          <FlatTableRowHeader>body two</FlatTableRowHeader>
          <FlatTableCell>body three</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );
  const firstHeaderCell = screen.getByRole("columnheader", {
    name: "heading one",
  });
  const secondHeaderCell = screen.getByRole("columnheader", {
    name: "heading two",
  });

  expect(firstHeaderCell).toHaveClass("isSticky");
  expect(secondHeaderCell).toHaveAttribute("data-sticky-align", "left");
});

test("should apply the expected class name to elements following right aligned sticky columns", () => {
  render(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>heading one</FlatTableHeader>
          <FlatTableRowHeader stickyAlignment="right">
            heading two
          </FlatTableRowHeader>
          <FlatTableHeader>heading three</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>body one</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            body two
          </FlatTableRowHeader>
          <FlatTableCell>body three</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );
  const secondHeaderCell = screen.getByRole("columnheader", {
    name: "heading two",
  });
  const thirdHeaderCell = screen.getByRole("columnheader", {
    name: "heading three",
  });

  expect(secondHeaderCell).toHaveAttribute("data-sticky-align", "right");
  expect(thirdHeaderCell).toHaveClass("isSticky");
});

test("should not throw an error when FlatTableHead rows have only one child", () => {
  expect(() => {
    render(
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableHeader>City</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John Doe</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>John Doe</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>,
    );
  }).not.toThrow();
});

test("should set the title correctly", () => {
  render(
    <FlatTable title="this is a title">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>heading one</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>child one</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  expect(screen.getByTestId("flat-table-wrapper")).toHaveAttribute(
    "title",
    "this is a title",
  );
});

test("when an ActionPopover is opened inside the FlatTable, it will have the background disabled to prevent scrolling in the table", async () => {
  const user = userEvent.setup();

  render(
    <FlatTable
      hasStickyHead
      colorTheme="transparent-base"
      height="400px"
      footer={
        <Pager
          currentPage="1"
          onFirst={() => {}}
          onLast={() => {}}
          onNext={() => {}}
          onPagination={() => {}}
          onPrevious={() => {}}
          pageSizeSelectionOptions={[
            {
              id: "1",
              name: 1,
            },
            {
              id: "10",
              name: 10,
            },
            {
              id: "25",
              name: 25,
            },
            {
              id: "50",
              name: 50,
            },
            {
              id: "100",
              name: 100,
            },
          ]}
          totalRecords="100"
        />
      }
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Header Cell</FlatTableHeader>
          <FlatTableHeader>Header Cell</FlatTableHeader>
          <FlatTableHeader>Header Cell</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {new Array(25)
          .fill("")
          .map((_, index) => index)
          .map((key) => {
            return (
              <FlatTableRow
                key={key}
                expandable
                subRows={[
                  <FlatTableRow key="sub-row-1">
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                  </FlatTableRow>,
                  <FlatTableRow key="sub-row-2">
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                  </FlatTableRow>,
                ]}
              >
                <FlatTableCell>Cell Data</FlatTableCell>
                <FlatTableCell>
                  <ActionPopover id="">
                    <ActionPopoverItem icon="email" onClick={() => {}}>
                      Email Invoice
                    </ActionPopoverItem>
                    <ActionPopoverDivider />
                    <ActionPopoverItem icon="delete" onClick={() => {}}>
                      Delete
                    </ActionPopoverItem>
                  </ActionPopover>
                </FlatTableCell>
                <FlatTableCell>Cell Data</FlatTableCell>
              </FlatTableRow>
            );
          })}
      </FlatTableBody>
    </FlatTable>,
  );
  const button = screen.getAllByRole("button")[5];

  await user.click(button);

  expect(screen.getByRole("list")).toBeVisible();

  const backdrop = screen.getByTestId("popup-backdrop");

  expect(backdrop).toHaveStyle({
    background: "transparent",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const backdropIndex = getComputedStyle(backdrop).getPropertyValue("z-index");

  // non-default value
  expect(backdropIndex).toContain("--adaptiveSidebarModalBackdrop");
  // default value
  expect(backdropIndex).toContain("6000");

  await user.click(document.body);

  expect(backdrop).not.toBeInTheDocument();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("when a DateInput is opened inside the FlatTable that has sticky footer, keyboard scrolling with the arrow keys is prevented in the table", async () => {
  const user = userEvent.setup();

  render(
    <FlatTable
      hasStickyFooter
      colorTheme="transparent-base"
      height="400px"
      footer={
        <Pager
          currentPage="1"
          onFirst={() => {}}
          onLast={() => {}}
          onNext={() => {}}
          onPagination={() => {}}
          onPrevious={() => {}}
          pageSizeSelectionOptions={[
            {
              id: "1",
              name: 1,
            },
            {
              id: "10",
              name: 10,
            },
            {
              id: "25",
              name: 25,
            },
            {
              id: "50",
              name: 50,
            },
            {
              id: "100",
              name: 100,
            },
          ]}
          totalRecords="100"
        />
      }
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Header Cell</FlatTableHeader>
          <FlatTableHeader>Header Cell</FlatTableHeader>
          <FlatTableHeader>Header Cell</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {new Array(25)
          .fill("")
          .map((_, index) => index)
          .map((key) => {
            return (
              <FlatTableRow
                key={key}
                expandable
                subRows={[
                  <FlatTableRow key="sub-row-1">
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                  </FlatTableRow>,
                  <FlatTableRow key="sub-row-2">
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                  </FlatTableRow>,
                ]}
              >
                <FlatTableCell>Cell Data</FlatTableCell>
                <FlatTableCell>
                  <DateInput
                    error=""
                    fieldHelp=""
                    helpAriaLabel=""
                    inputWidth={70}
                    label=""
                    labelHelp=""
                    labelWidth={30}
                    maxDate=""
                    minDate=""
                    mt={0}
                    name="dateinput"
                    onBlur={() => {}}
                    onChange={() => {}}
                    onClick={() => {}}
                    onKeyDown={() => {}}
                    prefix=""
                    size="medium"
                    value="2019-04-04"
                    warning=""
                    disablePortal
                  />
                </FlatTableCell>
                <FlatTableCell>Cell Data</FlatTableCell>
              </FlatTableRow>
            );
          })}
      </FlatTableBody>
    </FlatTable>,
  );
  const input = screen.getAllByRole("textbox")[5];
  const calendarIcon = screen.getAllByTestId("input-icon-toggle")[5];
  await user.click(calendarIcon);

  expect(screen.getByRole("grid")).toBeVisible();

  expect(input).toHaveFocus();

  await user.keyboard("{ArrowDown}");

  expect(input).toHaveFocus();

  await user.keyboard("{ArrowUp}");

  expect(input).toHaveFocus();

  await user.keyboard("{Tab}");

  expect(screen.getByRole("button", { name: "Previous month" })).toHaveFocus();
});

test("when a DateInput is opened inside the FlatTable that has sticky footer, scrolling with the page up and page down keys is prevented in the table", async () => {
  const user = userEvent.setup();
  render(
    <FlatTable
      hasStickyFooter
      colorTheme="transparent-base"
      height="400px"
      footer={
        <Pager
          currentPage="1"
          onFirst={() => {}}
          onLast={() => {}}
          onNext={() => {}}
          onPagination={() => {}}
          onPrevious={() => {}}
          pageSizeSelectionOptions={[
            {
              id: "1",
              name: 1,
            },
            {
              id: "10",
              name: 10,
            },
            {
              id: "25",
              name: 25,
            },
            {
              id: "50",
              name: 50,
            },
            {
              id: "100",
              name: 100,
            },
          ]}
          totalRecords="100"
        />
      }
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Header Cell</FlatTableHeader>
          <FlatTableHeader>Header Cell</FlatTableHeader>
          <FlatTableHeader>Header Cell</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {new Array(25)
          .fill("")
          .map((_, index) => index)
          .map((key) => {
            return (
              <FlatTableRow
                data-role={`flat-table-row-${key}`}
                key={key}
                expandable
                subRows={[
                  <FlatTableRow key="sub-row-1">
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                  </FlatTableRow>,
                  <FlatTableRow key="sub-row-2">
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                    <FlatTableCell>Cell Data</FlatTableCell>
                  </FlatTableRow>,
                ]}
              >
                <FlatTableCell>Cell Data</FlatTableCell>
                <FlatTableCell>
                  <DateInput
                    error=""
                    fieldHelp=""
                    helpAriaLabel=""
                    inputWidth={70}
                    label=""
                    labelHelp=""
                    labelWidth={30}
                    maxDate=""
                    minDate=""
                    mt={0}
                    name="dateinput"
                    onBlur={() => {}}
                    onChange={() => {}}
                    onClick={() => {}}
                    onKeyDown={() => {}}
                    prefix=""
                    size="medium"
                    value="2019-04-04"
                    warning=""
                    disablePortal
                  />
                </FlatTableCell>
                <FlatTableCell>Cell Data</FlatTableCell>
              </FlatTableRow>
            );
          })}
      </FlatTableBody>
    </FlatTable>,
  );
  const preventDefaultSpy = jest.spyOn(
    KeyboardEvent.prototype,
    "preventDefault",
  );

  const flatTableRow = screen.getByTestId("flat-table-row-0");

  await user.click(flatTableRow);

  await user.keyboard("{PageDown}");

  expect(preventDefaultSpy).not.toHaveBeenCalled();

  await user.keyboard("{PageUp}");

  expect(preventDefaultSpy).not.toHaveBeenCalled();

  const input = screen.getAllByRole("textbox")[5];
  const calendarIcon = screen.getAllByTestId("input-icon-toggle")[5];
  await user.click(calendarIcon);

  expect(screen.getByRole("grid")).toBeVisible();

  expect(input).toHaveFocus();

  await user.keyboard("{PageDown}");

  expect(preventDefaultSpy).toHaveBeenCalled();

  await user.keyboard("{PageUp}");

  expect(preventDefaultSpy).toHaveBeenCalled();

  await user.keyboard("{Home}");

  expect(preventDefaultSpy).toHaveBeenCalled();

  await user.keyboard("{End}");

  expect(preventDefaultSpy).toHaveBeenCalled();
});
