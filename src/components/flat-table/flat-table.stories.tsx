import React, { useState, useRef, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";

import BatchSelection from "../batch-selection";
import IconButton from "../icon-button";
import Icon from "../icon";
import Textbox from "../textbox";
import Pager from "../pager";
import {
  ActionPopover,
  ActionPopoverItem,
  ActionPopoverMenu,
} from "../action-popover";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import Box from "../box";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  FlatTableCheckbox,
  Sort,
  FlatTableBodyDraggable,
  FlatTableBodyDraggableHandle,
  FlatTableRowHeaderProps,
  FlatTableProps,
} from ".";

type SortType = "ascending" | "descending";
type SortValue = "client" | "total";
type HeadDataItems = { name: SortValue; isActive: boolean }[];
type BodyDataItems = { client: string; total: number }[];
type SelectedRows = {
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
};
type SelectedRow = keyof SelectedRows;
type HighlightedRow = "one" | "two" | "three" | "four" | "";

const meta: Meta<typeof FlatTable> = {
  title: "Flat Table",
  component: FlatTable,
};

export default meta;
type Story = StoryObj<typeof FlatTable>;

export const DefaultStory: Story = {
  name: "Default",
  render: (args) => (
    <FlatTable {...args} title="Table for Default Story">
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
              Relationship Status <Icon type="person_info" color="white" />
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
  ),
};

export const WithRowHeader: Story = () => {
  return (
    <FlatTable width="380px" overflowX="auto" title="Table for Row Header">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>ID Number</FlatTableHeader>
          <FlatTableRowHeader>Name</FlatTableRowHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>000001</FlatTableCell>
          <FlatTableRowHeader>John Doe</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>000002</FlatTableCell>
          <FlatTableRowHeader>Jane Doe</FlatTableRowHeader>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>000003</FlatTableCell>
          <FlatTableRowHeader>John Smith</FlatTableRowHeader>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>000004</FlatTableCell>
          <FlatTableRowHeader>Jane Smith</FlatTableRowHeader>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithRowHeader.storyName = "With Row Header";
WithRowHeader.parameters = { chromatic: { disableSnapshot: true } };

export const WithMultipleRowHeaders: Story = () => {
  return (
    <FlatTable
      width="680px"
      overflowX="auto"
      title="Table for Multiple Row Headers"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Sticky Column</FlatTableHeader>
          <FlatTableRowHeader>Sticky Column</FlatTableRowHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Column
          </FlatTableRowHeader>
          <FlatTableHeader>Sticky Column</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithMultipleRowHeaders.storyName = "With Multiple Row Headers";

export const HorizontalScrolling: Story = () => {
  return (
    <FlatTable
      width="380px"
      overflowX="auto"
      aria-label="Horizontal scroll table"
      title="Table for Horizontal Scroll Table"
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
  );
};
HorizontalScrolling.storyName = "With Horizontal Scrolling";
HorizontalScrolling.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomCellPaddings: Story = () => {
  return (
    <FlatTable title="Table for Custom Cell Paddings">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader px={1} py={2}>
            Name
          </FlatTableHeader>
          <FlatTableHeader px={2} py={2}>
            Location
          </FlatTableHeader>
          <FlatTableHeader px={3} py={2}>
            Relationship Status
          </FlatTableHeader>
          <FlatTableHeader px={4} py={2}>
            Dependents
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell px={key}>John Doe</FlatTableCell>
            <FlatTableCell pl={key}>London</FlatTableCell>
            <FlatTableCell p={key}>Single</FlatTableCell>
            <FlatTableCell pl={key}>5</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
};
WithCustomCellPaddings.storyName = "With Custom Cell Paddings";

export const WithCustomColumnWidth: Story = () => {
  return (
    <FlatTable title="Table for Custom Column Width">
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
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>
              <Textbox placeholder="Notes for John Doe" size="small" />
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
  );
};
WithCustomColumnWidth.storyName = "With Custom Column Width";

export const WithCustomRowBackgroundColor: Story = () => {
  return (
    <FlatTable title="Table for Custom Row Backgroun Colour">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>No.</FlatTableRowHeader>
          <FlatTableHeader />
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow bgColor="#B1D345">
          <FlatTableRowHeader>1</FlatTableRowHeader>
          <FlatTableCheckbox ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3" />
          <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
          <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
          <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableRowHeader>2</FlatTableRowHeader>
          <FlatTableCheckbox ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3" />
          <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
          <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
          <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow bgColor="#B1D345">
          <FlatTableRowHeader>3</FlatTableRowHeader>
          <FlatTableCheckbox ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3" />
          <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
          <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
          <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableRowHeader>4</FlatTableRowHeader>
          <FlatTableCheckbox ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3" />
          <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
          <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
          <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithCustomRowBackgroundColor.storyName = "With Custom Row Background Color";

export const WithCustomHorizontalBorderSize: Story = () => {
  return (
    <FlatTable title="Table for Custom Horizontal Border Size">
      <FlatTableHead>
        <FlatTableRow horizontalBorderSize="large">
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow horizontalBorderSize="medium">
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderSize="large">
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
  );
};
WithCustomHorizontalBorderSize.storyName = "With Custom Horizontal Border Size";

export const WithCustomHorizontalBorderColor: Story = () => {
  return (
    <FlatTable title="Table for Custom Horizontal Border Colour">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow horizontalBorderColor="goldTint10">
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="blue">
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityYin090">
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
  );
};
WithCustomHorizontalBorderColor.storyName =
  "With Custom Horizontal Border Color";

export const WithCustomBottomBorderRadius: Story = () => {
  return (
    <FlatTable
      bottomBorderRadius="borderRadius000"
      title="Table for Custom Bottom Border Radius"
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
  );
};
WithCustomBottomBorderRadius.storyName = "With Custom Bottom Border Radius";

export const WithCustomVerticalBorders: Story = () => {
  return (
    <FlatTable title="Table for Custom Vertical Borders">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorder="small" verticalBorderColor="#335CDC">
            Name
          </FlatTableHeader>
          <FlatTableHeader
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Location
          </FlatTableHeader>
          <FlatTableHeader verticalBorder="large">
            Relationship Status
          </FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            John Doe
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            London
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            Jane Doe
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            York
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            John Smith
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Edinburgh
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            Jane Smith
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Newcastle
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithCustomVerticalBorders.storyName = "With Custom Vertical Borders";

export const WithAlternativeHeaderBackground: Story = () => {
  return (
    <FlatTable title="Table for Alternative Header Background">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader rowspan="2">Name</FlatTableHeader>
          <FlatTableHeader colspan="2">Location</FlatTableHeader>
          <FlatTableHeader rowspan="2">Relationship Status</FlatTableHeader>
          <FlatTableHeader rowspan="2">Dependents</FlatTableHeader>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableHeader alternativeBgColor>City</FlatTableHeader>
          <FlatTableHeader alternativeBgColor>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Scotland</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithAlternativeHeaderBackground.storyName =
  "With Alternative Header Background";

export const WithTruncatedCellContent: Story = () => {
  return (
    <FlatTable title="Table for Truncated Cell Content">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Notes</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell width={60} pr={0} truncate>
              John Doe
            </FlatTableCell>
            <FlatTableCell width={50} pr={0} truncate title="Alternate Title">
              London
            </FlatTableCell>
            <FlatTableCell>
              <Textbox size="small" aria-label="textbox" />
            </FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
};
WithTruncatedCellContent.storyName = "With Truncated Cell Content";

export const WithStickyHead: Story = () => {
  return (
    <Box height="150px">
      <FlatTable hasStickyHead title="Table for Sticky Header">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
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
  );
};
WithStickyHead.storyName = "With Sticky Head";
WithStickyHead.parameters = { chromatic: { disableSnapshot: true } };

export const WithStickyHeadRowSpanAndColspan: Story = () => {
  return (
    <FlatTable
      hasStickyHead
      height="380px"
      width="310px"
      overflowX="auto"
      title="Table for Sticky Header with Row and Column spans"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader rowspan={2}>Name</FlatTableHeader>
          <FlatTableRowHeader rowspan={2}>Code</FlatTableRowHeader>
          <FlatTableHeader colspan={2}>Jun 21</FlatTableHeader>
          <FlatTableHeader rowspan={2} />
          <FlatTableHeader colspan={2}>YTD</FlatTableHeader>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableHeader>Debit</FlatTableHeader>
          <FlatTableHeader>Credit</FlatTableHeader>
          <FlatTableHeader>Debit</FlatTableHeader>
          <FlatTableHeader>Credit</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithStickyHeadRowSpanAndColspan.storyName =
  "With StickyHead rowspan and colspan";

export const WithStickyFooter: Story = () => {
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

  return (
    <Box height={220} marginBottom={16}>
      <FlatTable
        title="Table for Sticky Footer"
        hasStickyHead
        hasStickyFooter
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
    </Box>
  );
};
WithStickyFooter.storyName = "With Sticky Footer";
WithStickyFooter.parameters = { chromatic: { disableSnapshot: true } };

export const WithStickyFooterInsideOfLargerDiv: Story = () => {
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

  return (
    <Box height="220px" marginBottom="16px">
      <FlatTable
        title="Table for Sticky Footer inside large Div"
        hasStickyHead
        hasStickyFooter
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
    </Box>
  );
};
WithStickyFooterInsideOfLargerDiv.storyName =
  "With Sticky Footer Inside of Larger Div";

export const WithHasMaxHeight: Story = () => {
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

  return (
    <Box height="180px" marginBottom="16px">
      <FlatTable
        title="Table for Max Height"
        hasMaxHeight
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
    </Box>
  );
};
WithHasMaxHeight.storyName = "With hasMaxHeight";
WithHasMaxHeight.parameters = { chromatic: { disableSnapshot: true } };

export const WithoutVerticalBorders: Story = {
  ...DefaultStory,
  args: {
    hasOuterVerticalBorders: false,
    bottomBorderRadius: "borderRadius000",
  },
  name: "Without outer vertical borders",
};

export const WithClickableRows: Story = () => {
  return (
    <FlatTable title="Table for Clickable Rows">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithClickableRows.storyName = "With Clickable Rows";
WithClickableRows.parameters = { chromatic: { disableSnapshot: true } };

export const Zebra: Story = () => {
  return (
    <FlatTable isZebra title="Table for Zebra">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
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
  );
};
Zebra.storyName = "Zebra";

export const WithSortingHeaders: Story = {
  render: (args: FlatTableProps) => {
    const headDataItems: HeadDataItems = [
      { name: "client", isActive: true },
      { name: "total", isActive: false },
    ];
    const bodyDataItems: BodyDataItems = [
      { client: "Jason Atkinson", total: 1349 },
      { client: "Monty Parker", total: 849 },
      { client: "Blake Sutton", total: 3840 },
      { client: "Tyler Webb", total: 280 },
    ];
    /* eslint-disable react-hooks/rules-of-hooks */
    const [headData, setHeadData] = useState(headDataItems);
    const [sortType, setSortType] = useState<SortType>("ascending");
    const [sortValue, setSortValue] = useState<SortValue>("client");
    /* eslint-enable react-hooks/rules-of-hooks */

    const sortByNumber = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        if (type === "ascending") {
          return Number(a[sortByValue]) - Number(b[sortByValue]);
        }
        if (type === "descending") {
          return Number(b[sortByValue]) - Number(a[sortByValue]);
        }
        return 0;
      });
      return sortedData;
    };

    const sortByString = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        const nameA = String(a[sortByValue]).toUpperCase();
        const nameB = String(b[sortByValue]).toUpperCase();

        if (type === "ascending") {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        if (type === "descending") {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }
        return 0;
      });
      return sortedData;
    };

    const handleClick = (value: SortValue) => {
      const tempHeadData = headData;
      tempHeadData.forEach((item) => {
        item.isActive = false;
        if (item.name === value) {
          item.isActive = !item.isActive;
        }
      });
      setSortValue(value);
      setSortType(sortType === "ascending" ? "descending" : "ascending");
      setHeadData([...tempHeadData]);
    };

    const renderSortedData = (sortByValue: SortValue) => {
      let sortedData = bodyDataItems;
      if (typeof bodyDataItems[0][sortByValue] === "string") {
        sortedData = sortByString(sortedData, sortByValue, sortType);
      }
      if (typeof bodyDataItems[0][sortByValue] === "number") {
        sortedData = sortByNumber(sortedData, sortByValue, sortType);
      }

      return sortedData.map(({ client, total }) => {
        return (
          <FlatTableRow key={client}>
            <FlatTableCell>{client}</FlatTableCell>
            <FlatTableCell>{total}</FlatTableCell>
          </FlatTableRow>
        );
      });
    };

    return (
      <FlatTable {...args} title="Table for sorting headers">
        <FlatTableHead>
          <FlatTableRow>
            {headData.map(({ name, isActive }) => {
              return (
                <FlatTableHeader key={name}>
                  <Sort
                    onClick={() => handleClick(name)}
                    {...(isActive && { sortType })}
                  >
                    {name}
                  </Sort>
                </FlatTableHeader>
              );
            })}
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderSortedData(sortValue)}</FlatTableBody>
      </FlatTable>
    );
  },
  name: "With Sorting Headers",
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const WithSortingHeadersAndCustomAccessibleName: Story = {
  render: (args: FlatTableProps) => {
    const headDataItems: HeadDataItems = [
      { name: "client", isActive: true },
      { name: "total", isActive: false },
    ];
    const bodyDataItems: BodyDataItems = [
      { client: "Jason Atkinson", total: 1349 },
      { client: "Monty Parker", total: 849 },
      { client: "Blake Sutton", total: 3840 },
      { client: "Tyler Webb", total: 280 },
    ];
    /* eslint-disable react-hooks/rules-of-hooks */
    const [headData, setHeadData] = useState(headDataItems);
    const [sortType, setSortType] = useState<SortType>("ascending");
    const [sortValue, setSortValue] = useState<SortValue>("client");
    /* eslint-enable react-hooks/rules-of-hooks */

    const sortByNumber = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        if (type === "ascending") {
          return Number(a[sortByValue]) - Number(b[sortByValue]);
        }
        if (type === "descending") {
          return Number(b[sortByValue]) - Number(a[sortByValue]);
        }
        return 0;
      });
      return sortedData;
    };

    const sortByString = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        const nameA = String(a[sortByValue]).toUpperCase();
        const nameB = String(b[sortByValue]).toUpperCase();

        if (type === "ascending") {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        if (type === "descending") {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }
        return 0;
      });
      return sortedData;
    };

    const handleClick = (value: SortValue) => {
      const tempHeadData = headData;
      tempHeadData.forEach((item) => {
        item.isActive = false;
        if (item.name === value) {
          item.isActive = !item.isActive;
        }
      });
      setSortValue(value);
      setSortType(sortType === "ascending" ? "descending" : "ascending");
      setHeadData([...tempHeadData]);
    };

    const renderSortedData = (sortByValue: SortValue) => {
      let sortedData = bodyDataItems;
      if (typeof bodyDataItems[0][sortByValue] === "string") {
        sortedData = sortByString(sortedData, sortByValue, sortType);
      }
      if (typeof bodyDataItems[0][sortByValue] === "number") {
        sortedData = sortByNumber(sortedData, sortByValue, sortType);
      }

      return sortedData.map(({ client, total }) => {
        return (
          <FlatTableRow key={client}>
            <FlatTableCell>{client}</FlatTableCell>
            <FlatTableCell>{total}</FlatTableCell>
          </FlatTableRow>
        );
      });
    };

    return (
      <FlatTable
        {...args}
        title="Table for sorting headers with custom accessible name"
      >
        <FlatTableHead>
          <FlatTableRow>
            {headData.map(({ name, isActive }) => {
              return (
                <FlatTableHeader key={name}>
                  <Sort
                    accessibleName={`Sort ${name}s in an ${sortType} order`}
                    onClick={() => handleClick(name)}
                    {...(isActive && { sortType })}
                  >
                    {name}
                  </Sort>
                </FlatTableHeader>
              );
            })}
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderSortedData(sortValue)}</FlatTableBody>
      </FlatTable>
    );
  },
  name: "With Sorting Headers and custom accessible name",
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const WithColspan: Story = () => {
  return (
    <FlatTable title="Table for Col Span">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell colspan="4" align="center">
            No results
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithColspan.storyName = "With colspan";

export const WithRowspan: Story = () => {
  return (
    <FlatTable title="Table for Row Span">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Parent Name</FlatTableHeader>
          <FlatTableHeader>Child Name</FlatTableHeader>
          <FlatTableHeader>Child Age</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell rowspan="3">Jane Smith</FlatTableCell>
          <FlatTableCell>Tim Smith</FlatTableCell>
          <FlatTableCell>8</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Chris Smith</FlatTableCell>
          <FlatTableCell>8</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Alice Smith</FlatTableCell>
          <FlatTableCell>12</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithRowspan.storyName = "With rowspan";

export const WithSelectableRows: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<SelectedRows>({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRow] = !selectAll;
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: SelectedRow) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable title="Table for Selectable Rows">
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
          <FlatTableRow selected={selectedRows.one}>
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
          <FlatTableRow selected={selectedRows.two}>
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
          <FlatTableRow selected={selectedRows.three}>
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
          <FlatTableRow selected={selectedRows.four}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
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
WithSelectableRows.storyName = "Selectable Rows";
WithSelectableRows.parameters = { chromatic: { disableSnapshot: true } };

export const WithHighlightableRows: Story = () => {
  const [highlightedRow, setHighlightedRow] = useState("");

  const handleHighlightRow = (id: HighlightedRow) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  return (
    <FlatTable title="Table for highlightable rows">
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
          onClick={() => handleHighlightRow("one")}
          highlighted={highlightedRow === "one"}
        >
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow
          onClick={() => handleHighlightRow("two")}
          highlighted={highlightedRow === "two"}
        >
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow
          onClick={() => handleHighlightRow("three")}
          highlighted={highlightedRow === "three"}
        >
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow
          onClick={() => handleHighlightRow("four")}
          highlighted={highlightedRow === "four"}
        >
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WithHighlightableRows.storyName = "Highlightable Rows";
WithHighlightableRows.parameters = { chromatic: { disableSnapshot: true } };

export const WithSelectableAndHighlightableRows: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<SelectedRows>({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [highlightedRow, setHighlightedRow] = useState<HighlightedRow>("");

  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRow] = !selectAll;
    });
    setSelectedRows(newState);
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: SelectedRow) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  const handleHighlightRow = (id: HighlightedRow) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable title="Table for selectable and highlightable rows">
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
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
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
WithSelectableAndHighlightableRows.storyName =
  "Selectable and Highlightable Rows";
WithSelectableAndHighlightableRows.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Paginated: Story = () => {
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

  return (
    <FlatTable
      title="Table for pagination"
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
  );
};
Paginated.storyName = "Paginated";
Paginated.parameters = {
  chromatic: { viewports: [1200, 320] },
};

export const PaginatedWithStickyHeader: Story = () => {
  const [placementUp, setPlacementUp] = useState(true);
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="2">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="3">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="4">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="5">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="6">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="7">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="8">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="9">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="10">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="11">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="12">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="13">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="14">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="15">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="16">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="17">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
  ];
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
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
    setPlacementUp(newPageSize !== 1);
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  return (
    <Box height="200px">
      <FlatTable
        title="Table for pagination with sticky header and footer"
        hasStickyHead
        hasStickyFooter
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
  );
};
PaginatedWithStickyHeader.storyName = "Paginated with Sticky Header";

export const WhenAChildOfSidebar: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<SelectedRows>({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [highlightedRow, setHighlightedRow] = useState("");

  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRow] = !selectAll;
    });
    setSelectedRows(newState);
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: SelectedRow) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };
  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  const handleHighlightRow = (id: HighlightedRow) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
        <FlatTable title="Table for child of sidebar">
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
            >
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
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
      </DrawerSidebarContext.Provider>
    </>
  );
};
WhenAChildOfSidebar.storyName = "When a Child of Sidebar";
WhenAChildOfSidebar.parameters = { chromatic: { disableSnapshot: true } };

export const Sizes: Story = () => {
  const sizes = ["compact", "small", "medium", "large", "extraLarge"] as const;
  return (
    <Box>
      {sizes.map((size) => (
        <Box mb={3} key={size}>
          <FlatTable
            size={size}
            aria-label={`flat-table-${size}`}
            title={`Table for ${size} Size`}
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
      ))}
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const WithDraggableRows: Story = () => {
  const rows = [
    {
      id: "0",
      name: "UK",
    },
    {
      id: "1",
      name: "Germany",
    },
    {
      id: "2",
      name: "China",
    },
    {
      id: "3",
      name: "US",
    },
  ];
  return (
    <FlatTable title="Table for draggable rows">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader />
          <FlatTableHeader>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBodyDraggable>
        {rows.map((row) => (
          <FlatTableRow key={row.id} id={row.id}>
            <FlatTableCell key={row.id}>
              <Icon type="drag" />
            </FlatTableCell>
            <FlatTableCell>{row.name}</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBodyDraggable>
    </FlatTable>
  );
};
WithDraggableRows.storyName = "With Draggable Rows";

export const WithDraggableRowsAndManualReOrdering: Story = () => {
  const draggableHandle = useRef<FlatTableBodyDraggableHandle | null>(null);
  const rows = [
    {
      id: "0",
      name: "UK",
    },
    {
      id: "1",
      name: "Germany",
    },
    {
      id: "2",
      name: "China",
    },
    {
      id: "3",
      name: "US",
    },
  ];

  const [currentOrder, setCurrentOrder] = useState<(string | number)[]>([
    "0",
    "1",
    "2",
    "3",
  ]);
  const previousOrderRef = useRef(currentOrder);

  useEffect(() => {
    previousOrderRef.current = currentOrder;
  }, [currentOrder]);

  const getIndex = (id: string) => previousOrderRef.current.indexOf(id);
  const moveItem = (id: string, targetIndex: number) =>
    draggableHandle.current?.reOrder(id, targetIndex);

  return (
    <FlatTable title="Table for draggable rows">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader />
          <FlatTableHeader>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBodyDraggable
        getOrder={(ids) =>
          setCurrentOrder(
            (ids || []).filter((id): id is string | number => id !== undefined),
          )
        }
        ref={draggableHandle}
      >
        {rows.map((row) => (
          <FlatTableRow key={row.id} id={row.id}>
            <FlatTableCell>
              <Icon type="drag" />
            </FlatTableCell>
            <FlatTableCell>
              <Box display="flex" justifyContent="space-between">
                {row.name}
                <ActionPopover m={0}>
                  <ActionPopoverItem onClick={() => moveItem(row.id, 0)}>
                    Move Top
                  </ActionPopoverItem>
                  <ActionPopoverItem
                    onClick={() => moveItem(row.id, getIndex(row.id) - 1)}
                  >
                    Move Up
                  </ActionPopoverItem>
                  <ActionPopoverItem
                    onClick={() => moveItem(row.id, getIndex(row.id) + 1)}
                  >
                    Move Down
                  </ActionPopoverItem>
                  <ActionPopoverItem
                    onClick={() =>
                      moveItem(row.id, previousOrderRef.current.length - 1)
                    }
                  >
                    Move Bottom
                  </ActionPopoverItem>
                </ActionPopover>
              </Box>
            </FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBodyDraggable>
    </FlatTable>
  );
};
WithDraggableRowsAndManualReOrdering.storyName =
  "With Draggable Rows and Manual Re-Ordering";

export const WrappingRowHeaders: Story = () => {
  const FlatTableRowHeaderWrapper = ({
    children,
    ...rest
  }: FlatTableRowHeaderProps) => (
    <FlatTableRowHeader {...rest}>{children}</FlatTableRowHeader>
  );
  FlatTableRowHeaderWrapper.displayName = FlatTableRowHeader.displayName;

  return (
    <FlatTable
      width="310px"
      overflowX="auto"
      title="Table for wrapping row headers"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableRowHeaderWrapper>Location</FlatTableRowHeaderWrapper>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeaderWrapper>London</FlatTableRowHeaderWrapper>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableRowHeaderWrapper>York</FlatTableRowHeaderWrapper>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableRowHeaderWrapper>Edinburgh</FlatTableRowHeaderWrapper>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableRowHeaderWrapper>Newcastle</FlatTableRowHeaderWrapper>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
WrappingRowHeaders.storyName = "Wrapping Row Headers";
WrappingRowHeaders.parameters = { chromatic: { disableSnapshot: true } };
