import React, { useState } from "react";
import { StoryObj, composeStory } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from ".";
import meta, {
  WithSortingHeaders,
  WithSelectableRows,
  WithHighlightableRows,
} from "./flat-table.stories";
import {
  default as expandableMeta,
  ParentOnlySelectable,
  ChildrenOnlySelectable,
  BothParentAndChildrenSelectable,
} from "./flat-table-expandable.stories";
import { Box } from "../..";
import Icon from "../icon";
import Textbox from "../textbox";
import Pager from "../pager";
import { ActionPopover, ActionPopoverItem } from "../action-popover";

type Story = StoryObj<typeof FlatTable>;

export default {
  title: "Flat Table/Interactions",
  component: FlatTable,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

const FlatTableFocusStatesComponent = () => {
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="2">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="3">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="4">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="5">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="6">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="7">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="8">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="9">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="10">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="11">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="12">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="13">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="14">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="15">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="16">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="17">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
  ];

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  const composedHighlightableStory = composeStory(WithHighlightableRows, meta);

  return (
    <main>
      <Box mb={2}>
        <h2> Default</h2>
        <Box mb={4}>
          <FlatTable data-role="default-table" title="Default Flat Table">
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                  >
                    Name <Icon type="individual" color="white" />
                  </Box>
                </FlatTableHeader>
                <FlatTableHeader>
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                  >
                    Location <Icon type="location" color="white" />
                  </Box>
                </FlatTableHeader>
                <FlatTableHeader>
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                  >
                    Relationship Status{" "}
                    <Icon type="person_info" color="white" />
                  </Box>
                </FlatTableHeader>
                <FlatTableHeader>
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                  >
                    Dependents <Icon type="people" color="white" />
                  </Box>
                </FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow>
                <FlatTableCell>John Doe</FlatTableCell>
                <FlatTableCell>London</FlatTableCell>
                <FlatTableCell>Single</FlatTableCell>
                <FlatTableCell>0</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Doe</FlatTableCell>
                <FlatTableCell>York</FlatTableCell>
                <FlatTableCell>Married</FlatTableCell>
                <FlatTableCell>2</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>John Smith</FlatTableCell>
                <FlatTableCell>Edinburgh</FlatTableCell>
                <FlatTableCell>Single</FlatTableCell>
                <FlatTableCell>1</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Newcastle</FlatTableCell>
                <FlatTableCell>Married</FlatTableCell>
                <FlatTableCell>5</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        </Box>
      </Box>
      <Box mb={2}>
        <h2> With pagination</h2>
        <Box mb={4}>
          <FlatTable
            title="Table for pagination"
            data-role="pagination-table"
            overflowX="auto"
            width="100%"
            footer={
              <Pager
                smallScreenBreakpoint="550px"
                totalRecords={rows.length}
                showPageSizeSelection
                pageSize={10}
                currentPage={currentPage}
                onPagination={(next, size) => handlePagination(next, size)}
                pageSizeSelectionOptions={[
                  { id: "10", name: 10 },
                  { id: "15", name: 15 },
                ]}
              />
            }
          >
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>Name</FlatTableHeader>
                <FlatTableHeader>Location</FlatTableHeader>
                <FlatTableHeader>Relationship Status</FlatTableHeader>
                <FlatTableHeader>Dependents</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>{renderRows()}</FlatTableBody>
          </FlatTable>
        </Box>
      </Box>
      <Box mb={2}>
        <h2> Focusable nodes</h2>
        <Box mb={4}>
          <FlatTable
            data-role="focusable-nodes-table"
            title="Table with Focusable Nodes"
          >
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader width={80}>Name</FlatTableHeader>
                <FlatTableHeader>Location</FlatTableHeader>
                <FlatTableHeader width={200}>Notes</FlatTableHeader>
                <FlatTableHeader width={40} px={1}>
                  <Icon color="white" type="settings" />
                </FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              {[1, 2].map((key) => (
                <FlatTableRow
                  key={key}
                  data-role={`focusable-nodes-table-row-${key}`}
                >
                  <FlatTableCell>John Doe</FlatTableCell>
                  <FlatTableCell>London</FlatTableCell>
                  <FlatTableCell>
                    <Textbox
                      data-role={`focusable-nodes-table-textbox-${key}`}
                      placeholder="Notes for John Doe"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </FlatTableCell>
                  <FlatTableCell px={1}>
                    <ActionPopover>
                      <ActionPopoverItem onClick={() => {}} icon="graph">
                        Business
                      </ActionPopoverItem>
                      <ActionPopoverItem onClick={() => {}} icon="email">
                        Email Invoice
                      </ActionPopoverItem>
                    </ActionPopover>
                  </FlatTableCell>
                </FlatTableRow>
              ))}
            </FlatTableBody>
          </FlatTable>
        </Box>
      </Box>
      <Box mb={2}>
        <h2> Clickable rows</h2>
        <Box mb={4}>
          <FlatTable
            data-role="clickable-rows-table"
            title="Table with Clickable Rows"
          >
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>Name</FlatTableHeader>
                <FlatTableHeader>Location</FlatTableHeader>
                <FlatTableHeader>Relationship Status</FlatTableHeader>
                <FlatTableHeader>Dependents</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow
                data-role="clickable-rows-table-row-1"
                onClick={() => {}}
              >
                <FlatTableCell>John Smith</FlatTableCell>
                <FlatTableCell>Edinburgh</FlatTableCell>
                <FlatTableCell>Single</FlatTableCell>
                <FlatTableCell>1</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow
                data-role="clickable-rows-table-row-2"
                onClick={() => {}}
              >
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Newcastle</FlatTableCell>
                <FlatTableCell>Married</FlatTableCell>
                <FlatTableCell>5</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        </Box>
      </Box>
      <Box mb={2}>
        <h2> Highlightable rows</h2>
        <Box mb={4}>
          <Box data-role="highlightable-rows-example">
            {composedHighlightableStory({ colorTheme: "dark" })}
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export const FlatTableFocusStates: Story = {
  name: "Focus States",
  render: () => <FlatTableFocusStatesComponent />,
  parameters: {
    chromatic: { disableSnapshot: false },
    themeProvider: { chromatic: { theme: "sage" } },
  },

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    // Test default example
    const defaultExample = canvas.getByTestId("default-table");
    const defaultCanvas = within(defaultExample);
    const focusableDefaultTable = defaultCanvas.getByTestId(
      "flat-table-container",
    );

    await userEvent.tab();
    await expect(focusableDefaultTable).toHaveFocus();

    // Test pagination example
    const paginationExample = canvas.getByTestId("pagination-table");
    const paginationCanvas = within(paginationExample);
    const paginationTable = paginationCanvas.getByTestId(
      "flat-table-container",
    );

    await userEvent.tab();
    await expect(paginationTable).toHaveFocus();

    // Test with focusable nodes example
    const focusableNodesExample = canvas.getByTestId("focusable-nodes-table");
    const focusableNodesCanvas = within(focusableNodesExample);
    const focusableNodesFirstRow = focusableNodesCanvas.getByTestId(
      "focusable-nodes-table-row-1",
    );
    const focusableTextboxNode = within(focusableNodesFirstRow).getByTestId(
      "focusable-nodes-table-textbox-1",
    );
    const focusableTextInput =
      within(focusableTextboxNode).getByRole("textbox");

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await expect(focusableTextInput).toHaveFocus();

    // Test with clickable rows example
    const clickableRowsExample = canvas.getByTestId("clickable-rows-table");
    const clickableRowsCanvas = within(clickableRowsExample);
    const clickableRowsFirstRow = clickableRowsCanvas.getByTestId(
      "clickable-rows-table-row-1",
    );

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await expect(clickableRowsFirstRow).toHaveFocus();

    // Test highlightable rows example
    const highlightableExample = canvas.getByTestId(
      "highlightable-rows-example",
    );
    const highlightableCanvas = within(highlightableExample);
    const secondRow = highlightableCanvas.getAllByRole("row")[2];

    await userEvent.click(secondRow);
    await expect(secondRow).toHaveAttribute("data-highlighted", "true");
  },

  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

const composedSortableStory = composeStory(WithSortingHeaders, meta);

export const Sortable: Story = {
  name: "Sortable",
  render: () => (
    <>
      <Box mb={2}>
        <h3>Ascending sort</h3>
        <Box data-role="ascending-example">
          {composedSortableStory({ colorTheme: "dark" })}
        </Box>
      </Box>
      <Box mb={2}>
        <h3>Descending sort</h3>
        <Box data-role="descending-example">
          {composedSortableStory({ colorTheme: "dark" })}
        </Box>
      </Box>
    </>
  ),

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    // Test ascending sort example
    const ascendingExample = canvas.getByTestId("ascending-example");
    const ascendingCanvas = within(ascendingExample);
    const totalHeader = ascendingCanvas.getByRole("columnheader", {
      name: "total",
    });
    const totalSort = ascendingCanvas.getByText("total");
    const totalOne = "280";
    const totalTwo = "849";
    const totalThree = "1349";
    const totalFour = "3840";

    await userEvent.click(totalSort);
    await userEvent.click(totalSort);
    await expect(totalHeader).toHaveAttribute("aria-sort", "ascending");

    const ascendingCells = ascendingCanvas.getAllByRole("cell");
    await expect(ascendingCells[1]).toHaveTextContent(totalOne);
    await expect(ascendingCells[3]).toHaveTextContent(totalTwo);
    await expect(ascendingCells[5]).toHaveTextContent(totalThree);
    await expect(ascendingCells[7]).toHaveTextContent(totalFour);

    // Test descending sort example
    const descendingExample = canvas.getByTestId("descending-example");
    const descendingCanvas = within(descendingExample);
    const clientHeader = descendingCanvas.getByRole("columnheader", {
      name: "client",
    });
    const clientSort = descendingCanvas.getByText("client");
    const valueOne = "Tyler Webb";
    const valueTwo = "Monty Parker";
    const valueThree = "Jason Atkinson";
    const valueFour = "Blake Sutton";

    await userEvent.click(clientSort);
    await expect(clientHeader).toHaveAttribute("aria-sort", "descending");

    const descendingCells = descendingCanvas.getAllByRole("cell");
    await expect(descendingCells[0]).toHaveTextContent(valueOne);
    await expect(descendingCells[2]).toHaveTextContent(valueTwo);
    await expect(descendingCells[4]).toHaveTextContent(valueThree);
    await expect(descendingCells[6]).toHaveTextContent(valueFour);
  },

  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

const composedSelectableStory = composeStory(WithSelectableRows, meta);
const composedParentOnlySelectableStory = composeStory(
  ParentOnlySelectable,
  expandableMeta,
);
const composedChildrenOnlySelectableStory = composeStory(
  ChildrenOnlySelectable,
  expandableMeta,
);
const composedBothParentAndChildrenSelectableStory = composeStory(
  BothParentAndChildrenSelectable,
  expandableMeta,
);

export const SelectableAndExpandableRows: Story = {
  name: "Selectable and Expandable Rows",
  render: () => (
    <>
      <Box mb={2}>
        <h3>Select single row</h3>
        <Box data-role="selectable-single-row-example">
          {composedSelectableStory({ colorTheme: "dark" })}
        </Box>
      </Box>
      <Box mb={4}>
        <h3>Select all rows</h3>
        <Box data-role="selectable-all-rows-example">
          {composedSelectableStory({ colorTheme: "dark" })}
        </Box>
      </Box>
      <Box mb={4}>
        <h3>Expandable - Only parent rows selectable</h3>
        <Box data-role="parent-only-selectable-example">
          {composedParentOnlySelectableStory({ colorTheme: "dark" })}
        </Box>
      </Box>
      <Box mb={4}>
        <h3>Expandable - Only child rows selectable</h3>
        <Box data-role="children-only-selectable-example">
          {composedChildrenOnlySelectableStory({ colorTheme: "dark" })}
        </Box>
      </Box>
      <Box mb={4}>
        <h3>Expandable - Both parent and child rows selectable</h3>
        <Box data-role="both-parent-and-children-selectable-example">
          {composedBothParentAndChildrenSelectableStory({ colorTheme: "dark" })}
        </Box>
      </Box>
    </>
  ),

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    // Test selectable single row example
    const selectableRowExample = canvas.getByTestId(
      "selectable-single-row-example",
    );
    const selectableRowCanvas = within(selectableRowExample);
    const firstRowCheckbox = selectableRowCanvas.getAllByRole("checkbox")[1];

    await userEvent.click(firstRowCheckbox);
    await expect(firstRowCheckbox).toHaveFocus();
    await expect(firstRowCheckbox).toBeChecked();

    // Test select all rows example
    const selectAllRowsExample = canvas.getByTestId(
      "selectable-all-rows-example",
    );
    const selectAllRowsCanvas = within(selectAllRowsExample);
    const headerRowCheckbox = selectAllRowsCanvas.getAllByRole("checkbox")[0];

    await userEvent.click(headerRowCheckbox);
    await expect(headerRowCheckbox).toHaveFocus();
    for (const checkbox of selectAllRowsCanvas.getAllByRole("checkbox")) {
      await expect(checkbox).toBeChecked();
    }

    // Test expandable - only parent rows selectable example
    const ParentOnlySelectableRowExample = canvas.getByTestId(
      "parent-only-selectable-example",
    );
    const ParentOnlySelectableRowCanvas = within(
      ParentOnlySelectableRowExample,
    );
    const firstParentRow = ParentOnlySelectableRowCanvas.getAllByRole("row")[1];
    const firstParentRowCheckbox =
      ParentOnlySelectableRowCanvas.getAllByRole("checkbox")[1];

    await userEvent.click(firstParentRow);
    await userEvent.click(firstParentRowCheckbox);
    await expect(firstParentRowCheckbox).toHaveFocus();
    await expect(firstParentRowCheckbox).toBeChecked();

    // Test expandable - only child rows selectable example
    const ChildrenOnlySelectableRowExample = canvas.getByTestId(
      "children-only-selectable-example",
    );
    const ChildrenOnlySelectableRowCanvas = within(
      ChildrenOnlySelectableRowExample,
    );
    const firstParentChildOnlyRow =
      ChildrenOnlySelectableRowCanvas.getAllByRole("row")[1];

    await userEvent.click(firstParentChildOnlyRow);
    await expect(firstParentChildOnlyRow).toHaveAttribute(
      "data-highlighted",
      "true",
    );

    const firstChildRowCheckbox =
      ChildrenOnlySelectableRowCanvas.getAllByRole("checkbox")[1];

    await userEvent.click(firstChildRowCheckbox);
    await expect(firstChildRowCheckbox).toHaveFocus();
    await expect(firstChildRowCheckbox).toBeChecked();

    // Test expandable - both parent and children selectable row example
    const BothParentAndChildrenSelectableExample = canvas.getByTestId(
      "both-parent-and-children-selectable-example",
    );
    const BothParentAndChildrenSelectableCanvas = within(
      BothParentAndChildrenSelectableExample,
    );
    const secondParentAndChildRow =
      BothParentAndChildrenSelectableCanvas.getAllByRole("row")[2];
    const secondParentRowCheckbox =
      BothParentAndChildrenSelectableCanvas.getAllByRole("checkbox")[2];

    await userEvent.click(secondParentRowCheckbox);
    await expect(secondParentRowCheckbox).toHaveFocus();
    await expect(secondParentRowCheckbox).toBeChecked();

    await userEvent.click(secondParentAndChildRow);
    const secondChildRowCheckbox =
      BothParentAndChildrenSelectableCanvas.getAllByRole("checkbox")[4];

    await userEvent.click(secondChildRowCheckbox);
    await expect(secondChildRowCheckbox).toHaveFocus();
    await expect(secondChildRowCheckbox).toBeChecked();
  },

  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
