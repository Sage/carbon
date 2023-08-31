import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
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
  FlatTableRowHeaderProps,
} from ".";
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
import { DrawerSidebarContext } from "../drawer";
import Box from "../box";

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

export const DefaultStory: ComponentStory<typeof FlatTable> = () => (
  <FlatTable>
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
);

DefaultStory.storyName = "default";

export const WithRowHeader: ComponentStory<typeof FlatTable> = () => (
  <FlatTable width="380px" overflowX="auto">
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

WithRowHeader.storyName = "with row header";
WithRowHeader.parameters = { chromatic: { disableSnapshot: true } };

export const WithMultipleRowHeaders: ComponentStory<typeof FlatTable> = () => (
  <FlatTable width="680px" overflowX="auto">
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

WithMultipleRowHeaders.storyName = "with multiple row headers";

export const HorizontalScrolling: ComponentStory<typeof FlatTable> = () => (
  <FlatTable
    width="380px"
    overflowX="auto"
    aria-label="Horizontal scroll table"
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

HorizontalScrolling.storyName = "with horizontal scrolling";
HorizontalScrolling.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomCellPaddings: ComponentStory<typeof FlatTable> = () => (
  <FlatTable>
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

WithCustomCellPaddings.storyName = "with custom cell paddings";

export const WithCustomColumnWidth: ComponentStory<typeof FlatTable> = () => (
  <FlatTable>
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

WithCustomColumnWidth.storyName = "with custom column width";

export const WithCustomRowBackgroundColor: ComponentStory<
  typeof FlatTable
> = () => (
  <FlatTable>
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

WithCustomRowBackgroundColor.storyName = "with custom row background color";

export const WithCustomHorizontalBorderSize: ComponentStory<
  typeof FlatTable
> = () => (
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
      <FlatTableRow horizontalBorderSize="medium">
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

WithCustomHorizontalBorderSize.storyName = "with custom horizontal border size";

export const WithCustomHorizontalBorderColor: ComponentStory<
  typeof FlatTable
> = () => (
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

WithCustomHorizontalBorderColor.storyName =
  "with custom horizontal border color";

export const WithCustomVerticalBorders: ComponentStory<
  typeof FlatTable
> = () => (
  <FlatTable>
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
        <FlatTableCell verticalBorder="medium" verticalBorderColor="goldTint10">
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
        <FlatTableCell verticalBorder="medium" verticalBorderColor="goldTint10">
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
        <FlatTableCell verticalBorder="medium" verticalBorderColor="goldTint10">
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
        <FlatTableCell verticalBorder="medium" verticalBorderColor="goldTint10">
          Newcastle
        </FlatTableCell>
        <FlatTableCell verticalBorder="large">Married</FlatTableCell>
        <FlatTableCell>5</FlatTableCell>
      </FlatTableRow>
    </FlatTableBody>
  </FlatTable>
);

WithCustomVerticalBorders.storyName = "with custom vertical borders";

export const WithAlternativeHeaderBackground: ComponentStory<
  typeof FlatTable
> = () => (
  <FlatTable>
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

WithAlternativeHeaderBackground.storyName =
  "with alternative header background";

export const WithTruncatedCellContent: ComponentStory<
  typeof FlatTable
> = () => (
  <FlatTable>
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

WithTruncatedCellContent.storyName = "with truncated cell content";

export const WithStickyHead: ComponentStory<typeof FlatTable> = () => (
  <Box height="150px">
    <FlatTable hasStickyHead>
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

WithStickyHead.storyName = "with sticky head";
WithStickyHead.parameters = { chromatic: { disableSnapshot: true } };

export const WithStickyHeadRowSpanAndColspan: ComponentStory<
  typeof FlatTable
> = () => (
  <FlatTable hasStickyHead height="380px" width="310px" overflowX="auto">
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

WithStickyHeadRowSpanAndColspan.storyName =
  "with stickyHead rowspan and colspan";

export const WithStickyFooter: ComponentStory<typeof FlatTable> = () => {
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
    <div style={{ height: "220px", marginBottom: "16px" }}>
      <FlatTable
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
    </div>
  );
};

WithStickyFooter.storyName = "with sticky footer";
WithStickyFooter.parameters = { chromatic: { disableSnapshot: true } };

export const WithStickyFooterInsideOfLargerDiv: ComponentStory<
  typeof FlatTable
> = () => {
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
  "with sticky footer inside of larger div";

export const WithHasMaxHeight: ComponentStory<typeof FlatTable> = () => {
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

WithHasMaxHeight.storyName = "with hasMaxHeight";
WithHasMaxHeight.parameters = { chromatic: { disableSnapshot: true } };

export const WithClickableRows: ComponentStory<typeof FlatTable> = () => {
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

WithClickableRows.storyName = "with clickable rows";
WithClickableRows.parameters = { chromatic: { disableSnapshot: true } };

export const Zebra: ComponentStory<typeof FlatTable> = () => (
  <FlatTable isZebra>
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

Zebra.storyName = "zebra";

export const WithSortingHeaders: ComponentStory<typeof FlatTable> = (args) => {
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
  const [headData, setHeadData] = useState(headDataItems);
  const [sortType, setSortType] = useState<SortType>("ascending");
  const [sortValue, setSortValue] = useState<SortValue>("client");

  const sortByNumber = (
    dataToSort: BodyDataItems,
    sortByValue: SortValue,
    type: SortType
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
    type: SortType
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
    <FlatTable {...args}>
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
};

WithSortingHeaders.storyName = "with sorting headers";
WithSortingHeaders.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};

export const WithColspan: ComponentStory<typeof FlatTable> = () => {
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
        <FlatTableRow>
          <FlatTableCell colspan="4" align="center">
            No results
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};

WithColspan.storyName = "with colspan";

export const WithRowspan: ComponentStory<typeof FlatTable> = () => (
  <FlatTable>
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

WithRowspan.storyName = "with rowspan";

export const WithSelectableRows: ComponentStory<typeof FlatTable> = () => {
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
    Boolean(selectedRows[key as SelectedRow])
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

WithSelectableRows.storyName = "selectable rows";
WithSelectableRows.parameters = { chromatic: { disableSnapshot: true } };

export const WithHighlightableRows: ComponentStory<typeof FlatTable> = () => {
  const [highlightedRow, setHighlightedRow] = useState("");

  const handleHighlightRow = (id: HighlightedRow) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

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

WithHighlightableRows.storyName = "highlightable rows";
WithHighlightableRows.parameters = { chromatic: { disableSnapshot: true } };

export const WithSelectableAndHighlightableRows: ComponentStory<
  typeof FlatTable
> = () => {
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
    Boolean(selectedRows[key as SelectedRow])
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
  "selectable and highlightable rows";
WithSelectableAndHighlightableRows.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Paginated: ComponentStory<typeof FlatTable> = () => {
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
    <>
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
    </>
  );
};

Paginated.storyName = "paginated";

export const PaginatedWithStickyHeader: ComponentStory<
  typeof FlatTable
> = () => {
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

PaginatedWithStickyHeader.storyName = "paginated with sticky header";

export const WhenAChildOfSidebar: ComponentStory<typeof FlatTable> = () => {
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
    Boolean(selectedRows[key as SelectedRow])
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

WhenAChildOfSidebar.storyName = "when a child of sidebar";
WhenAChildOfSidebar.parameters = { chromatic: { disableSnapshot: true } };

export const Sizes: ComponentStory<typeof FlatTable> = () => {
  const sizes = ["compact", "small", "medium", "large", "extraLarge"] as const;
  return (
    <Box>
      {sizes.map((size) => (
        <Box mb={3} key={size}>
          <FlatTable size={size} aria-label={`flat-table-${size}`}>
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

Sizes.storyName = "sizes";

export const WithDraggableRows: ComponentStory<typeof FlatTable> = () => {
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
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader />
          <FlatTableHeader>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBodyDraggable>
        {rows.map((row) => (
          <FlatTableRow key={row.id} id={row.id}>
            <FlatTableCell>{row.name}</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBodyDraggable>
    </FlatTable>
  );
};

WithDraggableRows.storyName = "with draggable rows";

export const WrappingRowHeaders: ComponentStory<typeof FlatTable> = () => {
  const FlatTableRowHeaderWrapper = ({
    children,
    ...rest
  }: FlatTableRowHeaderProps) => (
    <FlatTableRowHeader {...rest}>{children}</FlatTableRowHeader>
  );
  FlatTableRowHeaderWrapper.displayName = FlatTableRowHeader.displayName;

  return (
    <FlatTable width="310px" overflowX="auto">
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

WrappingRowHeaders.storyName = "wrapping row headers";
WrappingRowHeaders.parameters = { chromatic: { disableSnapshot: true } };
