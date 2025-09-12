import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  FlatTableCheckbox,
  FlatTableCellProps,
} from ".";
import BatchSelection from "../batch-selection";
import IconButton from "../icon-button";
import Button from "../button";
import Icon from "../icon";
import Pager from "../pager";
import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";

type SubRowAllRowsInteractive = {
  parent: boolean;
  subOne: boolean;
  subTwo: boolean;
};
type SelectedRowsAllRowsInteractive = {
  one: SubRowAllRowsInteractive;
  two: SubRowAllRowsInteractive;
  three: SubRowAllRowsInteractive;
  four: SubRowAllRowsInteractive;
};
type SelectedRowsKeyAllRowsInteractive = keyof SelectedRowsAllRowsInteractive;
type SubRowKeyAllRowsInteractive = keyof SubRowAllRowsInteractive;
type SelectedRowsParentOnlySelectableStory = {
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
};
type SelectedRowsParentOnlySelectableStoryKey =
  keyof SelectedRowsParentOnlySelectableStory;
type SubRowsShapeChildrenOnlySelectableStory = {
  subOne: boolean;
  subTwo: boolean;
};
type SelectedRowsChildrenOnlySelectableStory = {
  one: SubRowsShapeChildrenOnlySelectableStory;
  two: SubRowsShapeChildrenOnlySelectableStory;
  three: SubRowsShapeChildrenOnlySelectableStory;
  four: SubRowsShapeChildrenOnlySelectableStory;
};
type SelectedRowsChildrenOnlySelectableStoryKey =
  keyof SelectedRowsChildrenOnlySelectableStory;
type SubRowsShapeChildrenOnlySelectableStoryKey =
  keyof SubRowsShapeChildrenOnlySelectableStory;

const meta: Meta<typeof FlatTable> = {
  title: "Flat Table/Expandable",
  component: FlatTable,
};

export default meta;
type Story = StoryObj<typeof FlatTable>;

export const DefaultStory: Story = (args: FlatTableCellProps) => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCell {...args}>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCell {...args}>Child two</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
DefaultStory.storyName = "Default";

export const KeyboardAccessibleSubRows: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1" onClick={() => {}}>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2" onClick={() => {}}>
      <FlatTableCell>Child two</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
KeyboardAccessibleSubRows.storyName = "Keyboard Accessible SubRows";
KeyboardAccessibleSubRows.parameters = { chromatic: { disableSnapshot: true } };

export const ExpandableByFirstColumnOnly: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCell>Child two</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows} expandableArea="firstColumn">
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expandableArea="firstColumn">
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expandableArea="firstColumn">
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expandableArea="firstColumn">
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
ExpandableByFirstColumnOnly.storyName = "Expandable by First Column Only";
ExpandableByFirstColumnOnly.parameters = {
  chromatic: { disableSnapshot: true },
};

export const InitiallyExpanded: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCell>Child two</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows} expanded>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expanded>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expanded>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expanded>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
InitiallyExpanded.storyName = "Initially Expanded";

export const RowHeaders: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableRowHeader>Child one</FlatTableRowHeader>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableRowHeader stickyAlignment="right">2</FlatTableRowHeader>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableRowHeader>Child two</FlatTableRowHeader>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableRowHeader stickyAlignment="right">1</FlatTableRowHeader>
    </FlatTableRow>,
  ];
  return (
    <FlatTable width="380px" overflowX="auto">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>Name</FlatTableRowHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableRowHeader stickyAlignment="right">
            Dependents
          </FlatTableRowHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>John Doe</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">0</FlatTableRowHeader>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>Jane Doe</FlatTableRowHeader>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">2</FlatTableRowHeader>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>John Smith</FlatTableRowHeader>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">1</FlatTableRowHeader>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>Jane Smith</FlatTableRowHeader>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">5</FlatTableRowHeader>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
RowHeaders.storyName = "Row Headers";

export const RowHeadersWithCustomPaddings: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableRowHeader px={8}>Child one</FlatTableRowHeader>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableRowHeader pl={5}>
        <Icon type="individual" /> Child two
      </FlatTableRowHeader>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <Box>
      <FlatTable width="380px" overflowX="auto">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableRowHeader px={8}>Name</FlatTableRowHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow expandable subRows={SubRows} expanded>
            <FlatTableRowHeader>John Doe</FlatTableRowHeader>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable subRows={SubRows} expanded>
            <FlatTableRowHeader>Jane Doe</FlatTableRowHeader>
            <FlatTableCell>York</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable subRows={SubRows}>
            <FlatTableRowHeader>John Smith</FlatTableRowHeader>
            <FlatTableCell>Edinburgh</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable subRows={SubRows}>
            <FlatTableRowHeader>Jane Smith</FlatTableRowHeader>
            <FlatTableCell>Newcastle</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
};
RowHeadersWithCustomPaddings.storyName = "Row Headers with Custom Paddings";

export const Paginated: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCell>Child two</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  const rows = [
    <FlatTableRow key="0" expandable subRows={SubRows}>
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1" expandable subRows={SubRows}>
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="2" expandable subRows={SubRows}>
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="3" expandable subRows={SubRows}>
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="4" expandable subRows={SubRows}>
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="5" expandable subRows={SubRows}>
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="6" expandable subRows={SubRows}>
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="7" expandable subRows={SubRows}>
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="8" expandable subRows={SubRows}>
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="9" expandable subRows={SubRows}>
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="10" expandable subRows={SubRows}>
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="11" expandable subRows={SubRows}>
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="12" expandable subRows={SubRows}>
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="13" expandable subRows={SubRows}>
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="14" expandable subRows={SubRows}>
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="15" expandable subRows={SubRows}>
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="16" expandable subRows={SubRows}>
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="17" expandable subRows={SubRows}>
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="18" expandable subRows={SubRows}>
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="19" expandable subRows={SubRows}>
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="20" expandable subRows={SubRows}>
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="21" expandable subRows={SubRows}>
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="22" expandable subRows={SubRows}>
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="23" expandable subRows={SubRows}>
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
  ];
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 5 });
  const [currentPage, setCurrentPage] = useState(1);
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
  return (
    <FlatTable
      footer={
        <Pager
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
  );
};
Paginated.storyName = "Paginated";

export const BothParentAndChildrenSelectable: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({
    one: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
    two: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
    three: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
    four: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
  });
  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRowsKeyAllRowsInteractive] = {
        parent: !selectAll,
        subOne: !selectAll,
        subTwo: !selectAll,
      };
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (
    row: SelectedRowsKeyAllRowsInteractive,
    subRow: SubRowKeyAllRowsInteractive,
  ) => {
    if (selectedRows[row][subRow]) {
      setSelectAll(false);
    }
    setSelectedRows({
      ...selectedRows,
      [row]: {
        ...selectedRows[row],
        [subRow]: !selectedRows[row][subRow],
      },
    });
  };
  const selectedCount = Object.values(selectedRows).reduce((acc, values) => {
    const count = Object.keys(values).filter((key) =>
      Boolean(values[key as SubRowKeyAllRowsInteractive]),
    ).length;
    return acc + count;
  }, 0);
  const subRows = (row: SelectedRowsKeyAllRowsInteractive) => {
    return [
      <FlatTableRow key="sub-row-1" selected={selectedRows[row].subOne}>
        <FlatTableCheckbox
          ariaLabelledBy={`ft-row-${row}-sub-row-1-cell-1 ft-row-${row}-sub-row-1-cell-2 ft-row-${row}-sub-row-1-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subOne}
          onChange={() => handleSelectRow(row, "subOne")}
        />
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-1`}>
          Child one
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-2`}>
          York
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-3`}>
          Married
        </FlatTableCell>
        <FlatTableCell>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
          </ActionPopover>
        </FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow key="sub-row-2" selected={selectedRows[row].subTwo}>
        <FlatTableCheckbox
          ariaLabelledBy={`ft-row-${row}-sub-row-2-cell-1 ft-row-${row}-sub-row-2-cell-2 ft-row-${row}-sub-row-2-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subTwo}
          onChange={() => handleSelectRow(row, "subTwo")}
        />
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-1`}>
          Child two
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-2`}>
          Edinburgh
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-3`}>
          Single
        </FlatTableCell>
        <FlatTableCell>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
          </ActionPopover>
        </FlatTableCell>
      </FlatTableRow>,
    ];
  };
  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="download as csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="bin" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="download as pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-header-1 ft-header-2 ft-header-3 ft-header-4"
              onClick={(e) => e.stopPropagation()}
              as="th"
              checked={selectAll}
              onChange={() => handleSelectAllRows()}
            />
            <FlatTableHeader id="ft-header-1">Name</FlatTableHeader>
            <FlatTableHeader id="ft-header-2">Location</FlatTableHeader>
            <FlatTableHeader id="ft-header-3">
              Relationship Status
            </FlatTableHeader>
            <FlatTableHeader id="ft-header-4">Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow
            selected={selectedRows.one.parent}
            expandable
            subRows={subRows("one")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one.parent}
              onChange={() => handleSelectRow("one", "parent")}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            selected={selectedRows.two.parent}
            expandable
            subRows={subRows("two")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two.parent}
              onChange={() => handleSelectRow("two", "parent")}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            selected={selectedRows.three.parent}
            expandable
            subRows={subRows("three")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three.parent}
              onChange={() => handleSelectRow("three", "parent")}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            selected={selectedRows.four.parent}
            expandable
            subRows={subRows("four")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four.parent}
              onChange={() => handleSelectRow("four", "parent")}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
};
BothParentAndChildrenSelectable.storyName =
  "Both Parent and Children Selectable";

export const ParentOnlySelectable: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [highlightedRow, setHighlightedRow] = useState("");
  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRowsParentOnlySelectableStoryKey] = !selectAll;
    });
    setSelectedRows(newState);
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (id: SelectedRowsParentOnlySelectableStoryKey) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };
  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRowsParentOnlySelectableStoryKey]),
  ).length;
  const handleHighlightRow = (id: string) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCheckbox
        ariaLabelledBy="ft-row--sub-row-1-cell-1 ft-row--sub-row-1-cell-2 ft-row--sub-row-1-cell-3"
        onClick={(e) => e.stopPropagation()}
        selectable={false}
        checked={selectedRows.one}
        onChange={() => handleSelectRow("one")}
      />
      <FlatTableCell id="ft-row--sub-row-1-cell-1">Child one</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-1-cell-2">York</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-1-cell-3">Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCheckbox
        ariaLabelledBy="ft-row--sub-row-2-cell-1 ft-row--sub-row-2-cell-2 ft-row--sub-row-2-cell-3"
        onClick={(e) => e.stopPropagation()}
        selectable={false}
        checked={selectedRows.one}
        onChange={() => handleSelectRow("one")}
      />
      <FlatTableCell id="ft-row--sub-row-2-cell-1">Child two</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-2-cell-2">Edinburgh</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-2-cell-3">Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="download as csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="bin" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="download as pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-header-1 ft-header-2 ft-header-3 ft-header-4"
              onClick={(e) => e.stopPropagation()}
              as="th"
              checked={selectAll}
              onChange={() => handleSelectAllRows()}
            />
            <FlatTableHeader id="ft-header-1">Name</FlatTableHeader>
            <FlatTableHeader id="ft-header-2">Location</FlatTableHeader>
            <FlatTableHeader id="ft-header-3">
              Relationship Status
            </FlatTableHeader>
            <FlatTableHeader id="ft-header-4">Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow
            onClick={() => handleHighlightRow("one")}
            selected={selectedRows.one}
            highlighted={highlightedRow === "one"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one}
              onChange={() => handleSelectRow("one")}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("two")}
            selected={selectedRows.two}
            highlighted={highlightedRow === "two"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two}
              onChange={() => handleSelectRow("two")}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("three")}
            selected={selectedRows.three}
            highlighted={highlightedRow === "three"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three}
              onChange={() => handleSelectRow("three")}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("four")}
            selected={selectedRows.four}
            highlighted={highlightedRow === "four"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four}
              onChange={() => handleSelectRow("four")}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
};
ParentOnlySelectable.storyName = "Parent Only Selectable";
ParentOnlySelectable.parameters = { chromatic: { disableSnapshot: true } };

export const ChildrenOnlySelectable: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] =
    useState<SelectedRowsChildrenOnlySelectableStory>({
      one: {
        subOne: false,
        subTwo: false,
      },
      two: {
        subOne: false,
        subTwo: false,
      },
      three: {
        subOne: false,
        subTwo: false,
      },
      four: {
        subOne: false,
        subTwo: false,
      },
    });
  const [highlightedRow, setHighlightedRow] = useState("");
  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRowsChildrenOnlySelectableStoryKey] = {
        subOne: !selectAll,
        subTwo: !selectAll,
      };
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (
    row: SelectedRowsChildrenOnlySelectableStoryKey,
    subRow: SubRowsShapeChildrenOnlySelectableStoryKey,
  ) => {
    if (selectedRows[row][subRow]) {
      setSelectAll(false);
    }
    setSelectedRows({
      ...selectedRows,
      [row]: {
        ...selectedRows[row],
        [subRow]: !selectedRows[row][subRow],
      },
    });
  };
  const handleHighlightRow = (id: string) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };
  const selectedCount = Object.values(selectedRows).reduce((acc, values) => {
    const count = Object.keys(values).filter((key) =>
      Boolean(values[key as SubRowsShapeChildrenOnlySelectableStoryKey]),
    ).length;
    return acc + count;
  }, 0);
  const subRows = (row: SelectedRowsChildrenOnlySelectableStoryKey) => {
    return [
      <FlatTableRow
        key="sub-row-1"
        selected={selectedRows[row].subOne}
        onClick={() => handleHighlightRow(`${row}.subOne`)}
        highlighted={highlightedRow === `${row}.subOne`}
      >
        <FlatTableCheckbox
          ariaLabelledBy={`ft-row-${row}-sub-row-1-cell-1 ft-row-${row}-sub-row-1-cell-2 ft-row-${row}-sub-row-1-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subOne}
          onChange={() => handleSelectRow(row, "subOne")}
        />
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-1`}>
          Child one
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-2`}>
          York
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-3`}>
          Married
        </FlatTableCell>
        <FlatTableCell>2</FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow
        key="sub-row-2"
        selected={selectedRows[row].subTwo}
        onClick={() => handleHighlightRow(`${row}.subTwo`)}
        highlighted={highlightedRow === `${row}.subTwo`}
      >
        <FlatTableCheckbox
          ariaLabelledBy={`ft-row-${row}-sub-row-2-cell-1 ft-row-${row}-sub-row-2-cell-2 ft-row-${row}-sub-row-2-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subTwo}
          onChange={() => handleSelectRow(row, "subTwo")}
        />
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-1`}>
          Child two
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-2`}>
          Edinburgh
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-3`}>
          Single
        </FlatTableCell>
        <FlatTableCell>1</FlatTableCell>
      </FlatTableRow>,
    ];
  };
  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="download as csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="bin" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="download as pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-header-1 ft-header-2 ft-header-3 ft-header-4"
              onClick={(e) => e.stopPropagation()}
              as="th"
              checked={selectAll}
              onChange={() => handleSelectAllRows()}
            />
            <FlatTableHeader id="ft-header-1">Name</FlatTableHeader>
            <FlatTableHeader id="ft-header-2">Location</FlatTableHeader>
            <FlatTableHeader id="ft-header-3">
              Relationship Status
            </FlatTableHeader>
            <FlatTableHeader id="ft-header-4">Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow
            onClick={() => handleHighlightRow("one")}
            highlighted={highlightedRow === "one"}
            expandable
            subRows={subRows("one")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
              checked={false}
              onChange={() => {}}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("two")}
            highlighted={highlightedRow === "two"}
            expandable
            subRows={subRows("two")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
              checked={false}
              onChange={() => {}}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("three")}
            highlighted={highlightedRow === "three"}
            expandable
            subRows={subRows("three")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
              checked={false}
              onChange={() => {}}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("four")}
            highlighted={highlightedRow === "four"}
            expandable
            subRows={subRows("four")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
              checked={false}
              onChange={() => {}}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
};
ChildrenOnlySelectable.storyName = "Children Only Selectable";

export const TruncatedCellContent: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCell width={60} pr={0} truncate>
        Child one
      </FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCell width={60} pr={0} truncate>
        Child two
      </FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  const Truncate = styled.span`
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 48px;
  `;
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader width={60}>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>
            <Truncate title="John Doe">John Doe</Truncate>
          </FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>
            <Truncate title="Jane Doe">Jane Doe</Truncate>
          </FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>
            <Truncate title="John Smith">John Smith</Truncate>
          </FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>
            <Truncate title="Jane Smith">Jane Smith</Truncate>
          </FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
TruncatedCellContent.storyName = "Truncated Cell Content";

export const Controlled: Story = () => {
  const [expanded, setExpanded] = useState(true);
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCell>Child two</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <>
      <Button onClick={() => setExpanded((prev) => !prev)}>
        {expanded ? "Collapse All" : "Expand All"}
      </Button>
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow expanded={expanded} expandable subRows={SubRows}>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expanded={expanded} expandable subRows={SubRows}>
            <FlatTableCell>Jane Doe</FlatTableCell>
            <FlatTableCell>York</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expanded={expanded} expandable subRows={SubRows}>
            <FlatTableCell>John Smith</FlatTableCell>
            <FlatTableCell>Edinburgh</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expanded={expanded} expandable subRows={SubRows}>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Newcastle</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
};
Controlled.storyName = "Controlled";
Controlled.parameters = { chromatic: { disableSnapshot: true } };

export const Sizes: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] =
    useState<SelectedRowsAllRowsInteractive>({
      one: {
        parent: false,
        subOne: false,
        subTwo: false,
      },
      two: {
        parent: false,
        subOne: false,
        subTwo: false,
      },
      three: {
        parent: false,
        subOne: false,
        subTwo: false,
      },
      four: {
        parent: false,
        subOne: false,
        subTwo: false,
      },
    });
  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRowsKeyAllRowsInteractive] = {
        parent: !selectAll,
        subOne: !selectAll,
        subTwo: !selectAll,
      };
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (
    row: SelectedRowsKeyAllRowsInteractive,
    subRow: SubRowKeyAllRowsInteractive,
  ) => {
    if (selectedRows[row][subRow]) {
      setSelectAll(false);
    }
    setSelectedRows({
      ...selectedRows,
      [row]: {
        ...selectedRows[row],
        [subRow]: !selectedRows[row][subRow],
      },
    });
  };
  const subRows = (row: SelectedRowsKeyAllRowsInteractive, size: string) => {
    return [
      <FlatTableRow key="sub-row-1" selected={selectedRows[row].subOne}>
        <FlatTableCheckbox
          ariaLabelledBy={`${size}-row-${row}-sub-row-1-cell-1 ${size}-row-${row}-sub-row-1-cell-2 ${size}-row-${row}-sub-row-1-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subOne}
          onChange={() => handleSelectRow(row, "subOne")}
        />
        <FlatTableCell id={`${size}-row-${row}-sub-row-1-cell-1`}>
          Child one
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-1-cell-2`}>
          York
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-1-cell-3`}>
          Married
        </FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow key="sub-row-2" selected={selectedRows[row].subTwo}>
        <FlatTableCheckbox
          ariaLabelledBy={`${size}-row-${row}-sub-row-2-cell-1 ${size}-row-${row}-sub-row-2-cell-2 ${size}-row-${row}-sub-row-2-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subTwo}
          onChange={() => handleSelectRow(row, "subTwo")}
        />
        <FlatTableCell id={`${size}-row-${row}-sub-row-2-cell-1`}>
          Child two
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-2-cell-2`}>
          Edinburgh
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-2-cell-3`}>
          Single
        </FlatTableCell>
      </FlatTableRow>,
    ];
  };
  const sizes = ["compact", "small", "medium", "large", "extraLarge"] as const;
  return (
    <Box>
      {sizes.map((size, index) => (
        <Box mb={3} key={String(`${index}-${size}`)}>
          <FlatTable size={size} aria-label={`flat-table-${size}`}>
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-1-cell-1 ${size}-row-1-cell-2 ${size}-row-1-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  as="th"
                  checked={selectAll}
                  onChange={() => handleSelectAllRows()}
                />
                <FlatTableHeader id={`${size}-row-1-cell-1`}>
                  Name
                </FlatTableHeader>
                <FlatTableHeader id={`${size}-row-1-cell-2`}>
                  Location
                </FlatTableHeader>
                <FlatTableHeader id={`${size}-row-1-cell-3`}>
                  Relationship Status
                </FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow
                selected={selectedRows.one.parent}
                expandable
                subRows={subRows("one", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-2-cell-1 ${size}-row-2-cell-2 ${size}-row-2-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.one.parent}
                  onChange={() => handleSelectRow("one", "parent")}
                />
                <FlatTableCell id={`${size}-row-2-cell-1`}>
                  John Doe
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-2-cell-2`}>
                  London
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-2-cell-3`}>
                  Single
                </FlatTableCell>
              </FlatTableRow>
              <FlatTableRow
                selected={selectedRows.two.parent}
                expandable
                subRows={subRows("two", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-3-cell-1 ${size}-row-3-cell-2 ${size}-row-3-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.two.parent}
                  onChange={() => handleSelectRow("two", "parent")}
                />
                <FlatTableCell id={`${size}-row-3-cell-1`}>
                  Jane Doe
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-3-cell-2`}>York</FlatTableCell>
                <FlatTableCell id={`${size}-row-3-cell-3`}>
                  Married
                </FlatTableCell>
              </FlatTableRow>
              <FlatTableRow
                selected={selectedRows.three.parent}
                expandable
                subRows={subRows("three", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-4-cell-1 ${size}-row-4-cell-2 ${size}-row-4-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.three.parent}
                  onChange={() => handleSelectRow("three", "parent")}
                />
                <FlatTableCell id={`${size}-row-4-cell-1`}>
                  John Smith
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-4-cell-2`}>
                  Edinburgh
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-4-cell-3`}>
                  Single
                </FlatTableCell>
              </FlatTableRow>
              <FlatTableRow
                selected={selectedRows.four.parent}
                expandable
                subRows={subRows("four", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-5-cell-1 ${size}-row-5-cell-2 ${size}-row-5-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.four.parent}
                  onChange={() => handleSelectRow("four", "parent")}
                />
                <FlatTableCell id={`${size}-row-5-cell-1`}>
                  Jane Smith
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-5-cell-2`}>
                  Newcastle
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-5-cell-3`}>
                  Married
                </FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        </Box>
      ))}
    </Box>
  );
};
Sizes.storyName = "Sizes";
