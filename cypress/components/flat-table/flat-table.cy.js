import React from "react";
import FlatTable from "../../../src/components/flat-table/flat-table.component";
import FlatTableHead from "../../../src/components/flat-table/flat-table-head/flat-table-head.component";
import FlatTableBody from "../../../src/components/flat-table/flat-table-body/flat-table-body.component";
import FlatTableRow from "../../../src/components/flat-table/flat-table-row/flat-table-row.component";
import FlatTableHeader from "../../../src/components/flat-table/flat-table-header/flat-table-header.component";
import FlatTableRowHeader from "../../../src/components/flat-table/flat-table-row-header/flat-table-row-header.component";
import FlatTableCell from "../../../src/components/flat-table/flat-table-cell/flat-table-cell.component";
import FlatTableCheckbox from "../../../src/components/flat-table/flat-table-checkbox/flat-table-checkbox.component";
import FlatTableBodyDraggable from "../../../src/components/flat-table/flat-table-body-draggable/flat-table-body-draggable.component";
import Sort from "../../../src/components/flat-table/sort/sort.component";
import Icon from "../../../src/components/icon";
import Box from "../../../src/components/box";
import Pager from "../../../src/components/pager";
import Textbox from "../../../src/components/textbox";
import BatchSelection from "../../../src/components/batch-selection/batch-selection.component";
import IconButton from "../../../src/components/icon-button";
import Button from "../../../src/components/button";
import ActionPopover from "../../../src/components/action-popover/action-popover.component";
import ActionPopoverItem from "../../../src/components/action-popover/action-popover-item/action-popover-item.component";
import ActionPopoverMenu from "../../../src/components/action-popover/action-popover-menu/action-popover-menu.component";
import Link from "../../../src/components/link";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import { getDataElementByValue, cyRoot } from "../../locators";

import {
  batchSelectionCounter,
  batchSelectionButtonsByPosition,
} from "../../locators/batch-selection/index";

import {
  actionPopover,
  actionPopoverButton,
} from "../../locators/action-popover/index";

import { relLink } from "../../locators/link/index";

import {
  flatTable,
  flatTableWrapper,
  flatTableHeader,
  flatTableHeaderCells,
  flatTableHeaderRowByPosition,
  flatTableBody,
  flatTableCell,
  flatTableCheckboxHeader,
  flatTableHeaderCellsIcon,
  flatTableExpandableIcon,
  flatTableBodyRows,
  flatTableRowHeader,
  flatTableBodyRowByPosition,
  flatTableSortable,
  flatTableSubrows,
  flatTableSubrowByPosition,
  flatTableDraggableItem,
  flatTableDraggableItemByPosition,
  flatTableCaption,
  flatTablePager,
  flatTablePageSizeSelect,
  flatTablePageSelectListPosition,
  pageSelectInput,
  flatTablePageSelectNext,
  flatTablePageSelectPrevious,
  flatTableCurrentPageInput,
  flatTableCheckboxCell,
  flatTableCheckboxAsProp,
} from "../../locators/flat-table";

import { CHARACTERS } from "../../support/component-helper/constants";

import {
  checkOutlineCss,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";

import {
  keyCode,
  positionOfElement,
  getRotationAngle,
} from "../../support/helper";

const { _, $ } = Cypress;

const sizes = [
  ["compact", "8px", "13px", 24],
  ["small", "16px", "14px", 32],
  ["medium", "16px", "14px", 40],
  ["large", "16px", "16px", 48],
  ["extraLarge", "16px", "16px", 64],
];

const borderSizeSmall = "1px";
const borderSizeMedium = "2px";
const borderSizeLarge = "4px";

const heightWidth = [150, 250, 600, 1000];

const viewport = [
  ["large", 700, 345],
  ["small", 700, 240],
];

const colorThemes = [
  ["dark", "rgb(51, 91, 112)", "rgb(102, 132, 148)"],
  ["light", "rgb(204, 214, 219)", "rgb(179, 194, 201)"],
  ["transparent-base", "rgb(242, 245, 246)", "rgb(242, 245, 246)"],
  ["transparent-white", "rgb(255, 255, 255)", "rgb(255, 255, 255)"],
];

const gold = "rgb(255, 188, 25)";
const black = "rgba(0, 0, 0, 0.9)";
const lightGold = "rgb(255, 188, 26)";
const greyBlack = "rgba(0, 0, 0, 0.65)";
const darkGrey = "rgb(102, 132, 148)";
const mediumGrey = "rgb(204, 214, 219)";
const lightGrey = "rgb(217, 224, 228)";
const vlightGrey = "rgb(230, 235, 237)";
const green = "rgb(177, 211, 69)";
const blue = "rgb(0, 0, 255)";
const lightBlue = "rgb(51, 92, 220)";

const checkFocus = (elements) => {
  // get Window reference from element
  const win = elements[0].ownerDocument.defaultView;
  // use getComputedStyle to read the pseudo selector
  const after = win.getComputedStyle(elements[0], "after");
  // read the value of the `content` CSS property
  const contentValue = after.getPropertyValue("border");
  expect(contentValue).to.eq(`2px solid ${gold}`);
};

const FlatTableComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable ariaDescribedby={CHARACTERS.STANDARD} {...props}>
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
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>Liz Anya</FlatTableCell>
            <FlatTableCell>Stoke</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>Karl Ickbred</FlatTableCell>
            <FlatTableCell>Newcastle</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

const FlatTableFooterComponent = ({ ...props }) => {
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
  ];

  const [recordsRange, setRecordsRange] = React.useState({
    start: 0,
    end: 5,
  });

  const [currentPage, setCurrentPage] = React.useState(1);

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage, newPageSize) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({
      start,
      end,
    });
    setCurrentPage(newPage);
  };

  return (
    <div
      style={{
        height: "200px",
        marginBottom: "16px",
      }}
    >
      <FlatTable
        footer={
          <Pager
            totalRecords={rows.length}
            showPageSizeSelection
            pageSize={5}
            currentPage={currentPage}
            onPagination={(next, size) => handlePagination(next, size)}
            pageSizeSelectionOptions={[
              {
                id: "1",
                name: 1,
              },
              {
                id: "5",
                name: 5,
              },
            ]}
          />
        }
        {...props}
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader width={180}>Location</FlatTableHeader>
            <FlatTableHeader width={150}>Relationship Status</FlatTableHeader>
            <FlatTableHeader width={100}>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderRows()}</FlatTableBody>
      </FlatTable>
    </div>
  );
};

const FlatTableSpanComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable
        hasStickyHead
        height="380px"
        width="310px"
        overflowX="auto"
        {...props}
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader rowSpan={2}>Name - Sticky</FlatTableHeader>
            <FlatTableRowHeader
              rowSpan={2}
              verticalBorder="small"
              verticalBorderColor="#335CDC"
            >
              Code - Sticky <Icon type="business" color="white" />
            </FlatTableRowHeader>
            <FlatTableHeader colspan={2}>Jun 21</FlatTableHeader>
            <FlatTableHeader rowSpan={2} />
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
            <FlatTableRowHeader
              verticalBorder="small"
              verticalBorderColor="--colorsUtilityYin090"
            >
              000001
            </FlatTableRowHeader>
            <FlatTableCell>10</FlatTableCell>
            <FlatTableCell>20</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>101</FlatTableCell>
            <FlatTableCell>201</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Doe</FlatTableCell>
            <FlatTableRowHeader
              verticalBorder="small"
              verticalBorderColor="--colorsUtilityYin090"
            >
              000002
            </FlatTableRowHeader>
            <FlatTableCell>30</FlatTableCell>
            <FlatTableCell>40</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>301</FlatTableCell>
            <FlatTableCell>401</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>John Smith</FlatTableCell>
            <FlatTableRowHeader
              verticalBorder="small"
              verticalBorderColor="--colorsUtilityYin090"
            >
              000003
            </FlatTableRowHeader>
            <FlatTableCell>50</FlatTableCell>
            <FlatTableCell>60</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>505</FlatTableCell>
            <FlatTableCell>606</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableRowHeader
              verticalBorder="medium"
              verticalBorderColor="goldTint10"
            >
              000004
            </FlatTableRowHeader>
            <FlatTableCell>70</FlatTableCell>
            <FlatTableCell>80</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>702</FlatTableCell>
            <FlatTableCell>808</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Liz Anya</FlatTableCell>
            <FlatTableRowHeader
              verticalBorder="medium"
              verticalBorderColor="goldTint10"
            >
              000005
            </FlatTableRowHeader>
            <FlatTableCell>90</FlatTableCell>
            <FlatTableCell>100</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>901</FlatTableCell>
            <FlatTableCell>1007</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Karl Ickbred</FlatTableCell>
            <FlatTableRowHeader
              verticalBorder="medium"
              verticalBorderColor="goldTint10"
            >
              000006
            </FlatTableRowHeader>
            <FlatTableCell>110</FlatTableCell>
            <FlatTableCell>120</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>1105</FlatTableCell>
            <FlatTableCell>1209</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jasper Freeman</FlatTableCell>
            <FlatTableRowHeader verticalBorder="large">
              000007
            </FlatTableRowHeader>
            <FlatTableCell>130</FlatTableCell>
            <FlatTableCell>140</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>1302</FlatTableCell>
            <FlatTableCell>1410</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jennifer Trueman</FlatTableCell>
            <FlatTableRowHeader verticalBorder="large">
              000008
            </FlatTableRowHeader>
            <FlatTableCell>150</FlatTableCell>
            <FlatTableCell>160</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>1515</FlatTableCell>
            <FlatTableCell>1620</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jordan Goodman</FlatTableCell>
            <FlatTableRowHeader verticalBorder="large">
              000009
            </FlatTableRowHeader>
            <FlatTableCell>202</FlatTableCell>
            <FlatTableCell>385</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
            <FlatTableCell>2200</FlatTableCell>
            <FlatTableCell>3800</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

const FlatTableCellColSpanComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
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
    </div>
  );
};

const FlatTableCellRowSpanComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
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
    </div>
  );
};

const FlatTableMutipleStickyComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "600px",
      }}
    >
      <FlatTable hasStickyHead width="680px" overflowX="auto" {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Sticky Column</FlatTableHeader>
            <FlatTableRowHeader>Sticky Column</FlatTableRowHeader>
            <FlatTableHeader>Scrollable Column</FlatTableHeader>
            <FlatTableHeader>Scrollable Column</FlatTableHeader>
            <FlatTableHeader>Scrollable Column</FlatTableHeader>
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
    </div>
  );
};

const FlatTableCustomPaddingComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable hasStickyHead height="450px" width="450px" {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader px={1} py={2}>
              Name
            </FlatTableHeader>
            <FlatTableHeader px={2} py={2} align="left">
              Location
            </FlatTableHeader>
            <FlatTableHeader px={3} py={2} align="middle">
              Relationship Status
            </FlatTableHeader>
            <FlatTableHeader px={4} py={2} align="right">
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
    </div>
  );
};

const FlatTableTruncateBgComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader alternativeBgColor>Notes</FlatTableHeader>
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
    </div>
  );
};

const FlatTableTruncateHeaderComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableRowHeader width={50} pr={0} truncate>
              Location
            </FlatTableRowHeader>
            <FlatTableHeader>Notes</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          {[1, 2, 3, 4].map((key) => (
            <FlatTableRow key={key}>
              <FlatTableCell width={60} pr={0} truncate>
                John Doe
              </FlatTableCell>
              <FlatTableRowHeader width={50} pr={0} truncate>
                London
              </FlatTableRowHeader>
              <FlatTableCell>
                <Textbox size="small" aria-label="textbox" />
              </FlatTableCell>
            </FlatTableRow>
          ))}
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

const FlatTableVerticalBordersComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader
              verticalBorder="small"
              verticalBorderColor="#335CDC"
            >
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
    </div>
  );
};

const FlatTableColorRowSelectableComponent = ({ ...props }) => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const handleSelectAllRows = () => {
    const newState = {};
    // eslint-disable-next-line no-return-assign
    Object.keys(selectedRows).forEach((key) => (newState[key] = !selectAll));
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }

    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key])
  ).length;

  return (
    <div
      style={{
        height: "150px",
      }}
    >
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
      <FlatTable {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy={CHARACTERS.STANDARD}
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
          <FlatTableRow selected={selectedRows.one} bgColor="#B1D345">
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
          <FlatTableRow selected={selectedRows.three} bgColor="#B1D345">
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
    </div>
  );
};

const FlatTableCheckboxComponent = ({ ...props }) => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const handleSelectAllRows = () => {
    const newState = {};
    // eslint-disable-next-line no-return-assign
    Object.keys(selectedRows).forEach((key) => (newState[key] = !selectAll));
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }

    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key])
  ).length;

  return (
    <div
      style={{
        height: "150px",
      }}
    >
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
              ariaLabelledBy={CHARACTERS.STANDARD}
              onClick={(e) => e.stopPropagation()}
              as="th"
              checked={selectAll}
              onChange={() => handleSelectAllRows()}
              {...props}
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
          <FlatTableRow selected={selectedRows.one} bgColor="#B1D345">
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one}
              onChange={() => handleSelectRow("one")}
              {...props}
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
              {...props}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.three} bgColor="#B1D345">
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three}
              onChange={() => handleSelectRow("three")}
              {...props}
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
              {...props}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

const FlatTableHighlightableComponent = ({ ...props }) => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const [highlightedRow, setHighlightedRow] = React.useState("");

  const handleSelectAllRows = () => {
    const newState = {};
    // eslint-disable-next-line no-return-assign
    Object.keys(selectedRows).forEach((key) => (newState[key] = !selectAll));
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }

    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key])
  ).length;

  const handleHighlightRow = (id) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  return (
    <div
      style={{
        height: "150px",
      }}
    >
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
      <FlatTable {...props}>
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
    </div>
  );
};

const FlatTableHorizontalBordersComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
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
            horizontalBorderSize="medium"
            horizontalBorderColor="goldTint10"
          >
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
          <FlatTableRow
            horizontalBorderSize="large"
            horizontalBorderColor="--colorsUtilityYin090"
          >
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
    </div>
  );
};

const FlatTableTitleAlignComponent = ({ ...props }) => {
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableRowHeader>Location</FlatTableRowHeader>
            <FlatTableHeader>Notes</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell
              width={60}
              pr={0}
              truncate
              title={CHARACTERS.DIACRITICS}
              align="left"
            >
              John Doe
            </FlatTableCell>
            <FlatTableRowHeader
              width={50}
              pr={0}
              truncate
              title={CHARACTERS.DIACRITICS}
              align="left"
            >
              London
            </FlatTableRowHeader>
            <FlatTableCell>
              <Textbox size="small" aria-label="textbox" />
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell
              width={60}
              pr={0}
              truncate
              title={CHARACTERS.DIACRITICS}
              align="center"
            >
              John Doe
            </FlatTableCell>
            <FlatTableRowHeader
              width={50}
              pr={0}
              truncate
              title={CHARACTERS.DIACRITICS}
              align="center"
            >
              London
            </FlatTableRowHeader>
            <FlatTableCell>
              <Textbox size="small" aria-label="textbox" />
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell
              width={60}
              pr={0}
              truncate
              title={CHARACTERS.STANDARD}
              align="right"
            >
              John Doe
            </FlatTableCell>
            <FlatTableRowHeader
              width={50}
              pr={0}
              truncate
              title={CHARACTERS.STANDARD}
              align="right"
            >
              London
            </FlatTableRowHeader>
            <FlatTableCell>
              <Textbox size="small" aria-label="textbox" />
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell
              width={60}
              pr={0}
              truncate
              title={CHARACTERS.STANDARD}
            >
              John Doe
            </FlatTableCell>
            <FlatTableRowHeader
              width={50}
              pr={0}
              truncate
              title={CHARACTERS.STANDARD}
            >
              London
            </FlatTableRowHeader>
            <FlatTableCell>
              <Textbox size="small" aria-label="textbox" />
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

const FlatTableSortingComponent = ({ ...props }) => {
  const headDataItems = [
    {
      name: "client",
      isActive: true,
    },
    {
      name: "total",
      isActive: false,
    },
  ];
  const bodyDataItems = [
    {
      client: "Jason Atkinson",
      total: 1349,
    },
    {
      client: "Monty Parker",
      total: 849,
    },
    {
      client: "Blake Sutton",
      total: 3840,
    },
    {
      client: "Tyler Webb",
      total: 280,
    },
  ];
  const [headData, setHeadData] = React.useState(headDataItems);
  const [sortType, setSortType] = React.useState("ascending");
  const [sortValue, setSortValue] = React.useState("client");

  const sortByNumber = (dataToSort, sortByValue, type) => {
    const sortedData = dataToSort.sort((a, b) => {
      if (type === "ascending") {
        return a[sortByValue] - b[sortByValue];
      }

      if (type === "descending") {
        return b[sortByValue] - a[sortByValue];
      }

      return 0;
    });
    return sortedData;
  };

  const sortByString = (dataToSort, sortByValue, type) => {
    const sortedData = dataToSort.sort((a, b) => {
      const nameA = a[sortByValue].toUpperCase();
      const nameB = b[sortByValue].toUpperCase();

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

  const handleClick = (value) => {
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

  const renderSortedData = (sortByValue) => {
    let sortedData = bodyDataItems;

    if (typeof bodyDataItems[0][sortByValue] === "string") {
      sortedData = sortByString(sortedData, sortByValue, sortType);
    }

    if (typeof bodyDataItems[0][sortByValue] === "number") {
      sortedData = sortByNumber(sortedData, sortByValue, sortType);
    }

    return sortedData.map((dataItem) => {
      return (
        <FlatTableRow key={dataItem.client}>
          <FlatTableCell>{dataItem.client}</FlatTableCell>
          <FlatTableCell>{dataItem.total}</FlatTableCell>
        </FlatTableRow>
      );
    });
  };

  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <FlatTable {...props}>
        <FlatTableHead>
          <FlatTableRow>
            {headData.map((dataItem) => {
              return (
                <FlatTableHeader key={dataItem.name}>
                  <Sort
                    onClick={() => handleClick(dataItem.name)}
                    sortType={dataItem.isActive && sortType}
                  >
                    {dataItem.name}
                  </Sort>
                </FlatTableHeader>
              );
            })}
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderSortedData(sortValue)}</FlatTableBody>
      </FlatTable>
    </div>
  );
};

const FlatTableNoAccSubRowComponent = ({ ...props }) => {
  const SubRows = [
    <FlatTableRow>
      <FlatTableCell {...props}>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow>
      <FlatTableCell {...props}>Child two</FlatTableCell>
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
        <FlatTableRow expandable subRows={SubRows} expandableArea="wholeRow">
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>
            <Link
              href="https://carbon.sage.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              This is a link
            </Link>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expandableArea="wholeRow">
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expandableArea="wholeRow">
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows} expandableArea="wholeRow">
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};

const FlatTableAccSubRowComponent = () => {
  const SubRows = [
    <FlatTableRow onClick={() => {}}>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow onClick={() => {}}>
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

const FlatTableFirstColExpandableComponent = () => {
  const SubRows = [
    <FlatTableRow onClick={() => {}}>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow onClick={() => {}}>
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

const FlatTableAlreadyExpandedComponent = () => {
  const SubRows = [
    <FlatTableRow onClick={() => {}}>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow onClick={() => {}}>
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

const FlatTableExpandAllComponent = () => {
  const [expanded, setExpanded] = React.useState(true);
  const SubRows = [
    <FlatTableRow>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow>
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

const FlatTableAllSubrowSelectableComponent = () => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({
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
    const newState = {};
    Object.keys(selectedRows).forEach((key) => {
      newState[key] = {
        parent: !selectAll,
        subOne: !selectAll,
        subTwo: !selectAll,
      };
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (row, subRow) => {
    if (selectedRows[row][subRow]) {
      setSelectAll(false);
    }

    setSelectedRows({
      ...selectedRows,
      [row]: { ...selectedRows[row], [subRow]: !selectedRows[row][subRow] },
    });
  };

  const selectedCount = Object.values(selectedRows).reduce((acc, values) => {
    const count = Object.keys(values).filter((key) => Boolean(values[key]))
      .length;
    return acc + count;
  }, 0);

  const subRows = (row) => {
    return [
      <FlatTableRow selected={selectedRows[row].subOne}>
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
      <FlatTableRow selected={selectedRows[row].subTwo}>
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

const FlatTableParentSubrowSelectableComponent = () => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [highlightedRow, setHighlightedRow] = React.useState("");

  const handleSelectAllRows = () => {
    const newState = {};
    // eslint-disable-next-line no-return-assign
    Object.keys(selectedRows).forEach((key) => (newState[key] = !selectAll));
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }

    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key])
  ).length;

  const handleHighlightRow = (id) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  const SubRows = [
    <FlatTableRow>
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
    <FlatTableRow>
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

const FlatTableChildSubrowSelectableComponent = () => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({
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
  const [highlightedRow, setHighlightedRow] = React.useState("");

  const handleSelectAllRows = () => {
    const newState = {};
    Object.keys(selectedRows).forEach((key) => {
      newState[key] = {
        subOne: !selectAll,
        subTwo: !selectAll,
      };
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (row, subRow) => {
    if (selectedRows[row][subRow]) {
      setSelectAll(false);
    }

    setSelectedRows({
      ...selectedRows,
      [row]: { ...selectedRows[row], [subRow]: !selectedRows[row][subRow] },
    });
  };

  const handleHighlightRow = (id) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  const selectedCount = Object.values(selectedRows).reduce((acc, values) => {
    const count = Object.keys(values).filter((key) => Boolean(values[key]))
      .length;
    return acc + count;
  }, 0);

  const subRows = (row) => {
    return [
      <FlatTableRow
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

const FlatTableDraggableComponent = ({ ...props }) => {
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
      <FlatTableBodyDraggable {...props}>
        {rows.map((row) => (
          <FlatTableRow key={row.id} id={row.id}>
            <FlatTableCell>{row.name}</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBodyDraggable>
    </FlatTable>
  );
};

const FlatTablePagerStickyHeaderComponent = () => {
  const [placementUp, setPlacementUp] = React.useState(true);
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
  ];
  const [recordsRange, setRecordsRange] = React.useState({
    start: 0,
    end: 5,
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage, newPageSize) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setPlacementUp(newPageSize !== 1);
    setRecordsRange({
      start,
      end,
    });
    setCurrentPage(newPage);
  };

  return (
    <div
      style={{
        height: "200px",
      }}
    >
      <FlatTable
        hasStickyHead
        hasStickyFooter
        footer={
          <Pager
            totalRecords={rows.length}
            showPageSizeSelection
            pageSize={5}
            currentPage={currentPage}
            onPagination={(next, size) => handlePagination(next, size)}
            pageSizeSelectionOptions={[
              {
                id: "1",
                name: 1,
              },
              {
                id: "5",
                name: 5,
              },
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

const FlatTablePartiallySelectedOrHighlightedRows = ({
  highlighted,
  selected,
}) => {
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Status</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>Not selected or highlighted</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow
          onClick={() => {}}
          selected={selected}
          highlighted={highlighted}
        >
          <FlatTableCell>
            {selected && "Selected"}
            {highlighted && "Highlighted"}
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>Not selected or highlighted</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};

context("Tests for Flat Table component", () => {
  describe("check props for Flat Table component", () => {
    it("should render Flat Table with ariaDescribedBy", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      flatTable().should("have.attr", "aria-describedby", CHARACTERS.STANDARD);
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Flat Table with caption prop set as %s",
      (captionValue) => {
        CypressMountWithProviders(
          <FlatTableComponent caption={captionValue} />
        );

        flatTableCaption().should("have.text", captionValue);
      }
    );

    it("should render Flat Table with head and body nodes as children", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      flatTable().find("thead").should("exist");
      flatTableBody().should("exist");
    });

    it("should render Flat Table Head with row node as children", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      flatTable().find("thead").find("tr").should("exist");
    });

    it("should render Flat Table Header with icon nodes as children", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      for (let i = 0; i < 4; i++) {
        flatTableHeaderCellsIcon()
          .eq(i)
          .should("have.attr", "data-component", "icon");
      }
    });

    it("should render Flat Table with icon node as children", () => {
      CypressMountWithProviders(
        <FlatTableComponent>
          <Icon type="business" color="white" />
        </FlatTableComponent>
      );
      flatTable().find("span").should("have.attr", "data-component", "icon");
    });

    it("should render Flat Table Header with strings as children", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      flatTableHeaderCells().eq(0).should("have.text", "Name ");
      flatTableHeaderCells().eq(1).should("have.text", "Location ");
      flatTableHeaderCells().eq(2).should("have.text", "Relationship Status ");
      flatTableHeaderCells().eq(3).should("have.text", "Dependents ");
    });

    it("should render Flat Table Body with an array of row nodes as children", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      for (let i = 0; i < 6; i++) {
        flatTableBodyRows().eq(i).should("exist");
      }
    });

    it("should render Flat Table Row with cell nodes as children", () => {
      CypressMountWithProviders(<FlatTableSpanComponent />);

      for (let i = 0; i < 4; i++) {
        flatTableBodyRowByPosition(0).find("td").eq(i).should("exist");
      }
    });

    it("should render Flat Table Row with header nodes as children", () => {
      CypressMountWithProviders(<FlatTableSpanComponent />);

      for (let i = 0; i < 5; i++) {
        if (i !== 1) {
          flatTableHeader()
            .eq(0)
            .find("th")
            .eq(i)
            .should("have.attr", "data-element", "flat-table-header");
        }
      }
    });

    it("should render Flat Table Row with row header nodes as children", () => {
      CypressMountWithProviders(<FlatTableSpanComponent />);

      flatTableHeader()
        .eq(0)
        .find("th")
        .eq(1)
        .should("have.attr", "data-element", "flat-table-row-header");
    });

    it("should render Flat Table Row Header with icon node as children", () => {
      CypressMountWithProviders(<FlatTableSpanComponent />);

      flatTableRowHeader()
        .eq(0)
        .find("span")
        .should("have.attr", "data-component", "icon");
    });

    it("should render Flat Table Row Header with string as children", () => {
      CypressMountWithProviders(<FlatTableSpanComponent />);

      flatTableRowHeader().eq(0).should("have.text", "Code - Sticky ");
    });

    it("should render Flat Table Cell with string as children", () => {
      CypressMountWithProviders(<FlatTableTruncateBgComponent />);

      flatTableCell(0).should("have.text", "John Doe");
      flatTableCell(1).should("have.text", "London");
    });

    it("should render Flat Table Cell with div node as children", () => {
      CypressMountWithProviders(<FlatTableTruncateBgComponent />);

      flatTableCell(2).find("input").should("exist");
    });

    it("should render Flat Table Checkbox with ariaLabelledBy", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableHeaderCells()
        .eq(0)
        .find("input")
        .should("have.attr", "aria-labelledby", CHARACTERS.STANDARD);
    });

    it("should render Flat Table with sticky header", () => {
      CypressMountWithProviders(
        <div style={{ height: "150px" }}>
          <FlatTableComponent hasStickyHead />
        </div>
      );

      cy.wait(300); // required because element needs to be loaded

      flatTable().find("thead").should("have.css", "position", "sticky");

      for (let i = 0; i < 5; i++) {
        if (i === 3 || i === 4) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }

      flatTableWrapper().scrollTo("bottom");
      flatTableHeaderCells().should("be.visible");

      for (let i = 0; i < 5; i++) {
        if (i === 0 || i === 1) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }
    });

    it("should render Flat Table with sticky footer", () => {
      CypressMountWithProviders(<FlatTableFooterComponent hasStickyFooter />);

      flatTablePager("div").then(($div) => {
        _.each($div.get(), (el) => {
          expect($(el).parent()).to.have.css("position", "sticky");
        });
      });

      for (let i = 0; i < 5; i++) {
        if (i === 4) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }

      flatTableWrapper().scrollTo("bottomRight");
      flatTablePager().parent().scrollIntoView();
      flatTableHeaderCells().should("not.be.visible");
      flatTablePager().parent().should("be.visible");

      for (let i = 0; i < 5; i++) {
        if (i === 0) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }
    });

    it.each(colorThemes)(
      "should render Flat Table in the %s theme",
      (colorTheme, bgColor, brColor) => {
        CypressMountWithProviders(
          <FlatTableComponent colorTheme={colorTheme} />
        );

        for (let i = 0; i < 4; i++) {
          flatTableHeaderCells(i).then(($el) => {
            checkOutlineCss($el, 1, "border-right", "solid", brColor);
            expect($el).to.have.css("background-color").to.equal(bgColor);
          });
        }
      }
    );

    it("should render Flat Table with zebra stripes", () => {
      CypressMountWithProviders(<FlatTableComponent isZebra />);

      for (let i = 0; i < 4; i++) {
        if (i === 0 || i === 2) {
          flatTableBodyRowByPosition(i)
            .find("td")
            .eq(0)
            .should("have.css", "background-color", "rgb(255, 255, 255)");
        } else {
          flatTableBodyRowByPosition(i)
            .find("td")
            .eq(0)
            .should("have.css", "background-color", "rgb(250, 251, 251)");
        }
      }
    });

    it.each(sizes)(
      "should check Flat Table size is %s",
      (sizeName, padding, fontSize, rowHeight) => {
        CypressMountWithProviders(<FlatTableComponent size={sizeName} />);

        flatTableHeader().then(($el) => {
          assertCssValueIsApproximately($el, "height", rowHeight);
        });

        for (let i = 0; i < 4; i++) {
          flatTableHeaderCells(i)
            .find("div")
            .eq(0)
            .should("have.css", "padding-left", padding)
            .and("have.css", "padding-right", padding)
            .and("have.css", "font-size", fontSize);
        }
      }
    );

    it.each(heightWidth)(
      "should render Flat Table with %spx as a height parameter",
      (height) => {
        CypressMountWithProviders(
          <FlatTableComponent height={`${height}px`} />
        );

        flatTableWrapper().then(($el) => {
          expect(parseInt($el.css("height"))).to.be.within(
            height - 1,
            height + 1
          );
        });
      }
    );

    it.each([150, 249, 250, 251, 300])(
      "should render Flat Table with %spx as a height parameter and minHeight set to 250px",
      (height) => {
        CypressMountWithProviders(
          <FlatTableComponent height={`${height}px`} minHeight="250px" />
        );

        if (height < 250) {
          flatTableWrapper().then(($el) => {
            expect(parseInt($el.css("height"))).to.equal(250);
          });
        } else {
          flatTableWrapper().then(($el) => {
            expect(parseInt($el.css("height"))).to.be.within(
              height - 1,
              height + 1
            );
          });
        }
      }
    );

    it("should render Flat Table with hasMaxHeight parameter", () => {
      CypressMountWithProviders(
        <FlatTableComponent height="400px" hasMaxHeight />
      );

      flatTableWrapper().should("have.css", "max-height", "100%");
    });

    it.each(heightWidth)(
      "should render Flat Table with %spx as a width parameter",
      (width) => {
        CypressMountWithProviders(<FlatTableComponent width={`${width}px`} />);

        flatTableWrapper().then(($el) => {
          expect(parseInt($el.css("width"))).to.be.within(width - 1, width + 1);
        });
      }
    );

    it.each([["visible"], ["hidden"], ["clip"], ["scroll"], ["auto"]])(
      "should render Flat Table with %s as a overflowX parameter and width set to 500px",
      (overflow) => {
        CypressMountWithProviders(
          <FlatTableComponent width="500px" overflowX={overflow} />
        );

        flatTable().parent().should("have.css", "overflow-x", overflow);
      }
    );

    it("should render Flat Table with rowSpan set to make header cells span 2 rows", () => {
      CypressMountWithProviders(<FlatTableSpanComponent width="500px" />);

      for (let i = 0; i < 4; i++) {
        if (i === 0 || i === 1 || i === 3) {
          flatTableHeaderRowByPosition(0)
            .find("th")
            .eq(i)
            .should("have.attr", "rowspan", 2);
        }
      }
    });

    it("should render Flat Table with colSpan set to make header cells span 2 columns", () => {
      CypressMountWithProviders(<FlatTableSpanComponent width="500px" />);

      for (let i = 2; i < 5; i++) {
        if (i === 2 || i === 4) {
          flatTableHeaderRowByPosition(0)
            .find("th")
            .eq(i)
            .should("have.attr", "colspan", 2);
        }
      }
    });

    it("should render Flat Table with stickyHead and rowSpan set, stickyAlignment left by default", () => {
      cy.viewport(310, 380);

      CypressMountWithProviders(<FlatTableSpanComponent />);

      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(0)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("th")
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1).find("td").eq(4).should("not.be.visible");
      flatTableBodyRowByPosition(1).find("td").eq(4).scrollIntoView();
      flatTableBodyRowByPosition(1).find("td").eq(4).should("be.visible");
      flatTableBodyRowByPosition(1).find("th").should("be.visible");
    });

    // Skipped test as it fails in the build only. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table with multiple sticky row headers, stickyAlignment set to right", () => {
      cy.viewport(700, 700);

      CypressMountWithProviders(<FlatTableMutipleStickyComponent />);

      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(0)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("th")
        .eq(0)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("th")
        .eq(1)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(7)
        .should("have.css", "position", "sticky");

      for (let i = 1; i < 7; i++) {
        if (i < 5) {
          flatTableBodyRowByPosition(1).find("td").eq(i).should("be.visible");
        }
        if (i === 5 || i === 6) {
          flatTableBodyRowByPosition(1)
            .find("td")
            .eq(i)
            .should("not.be.visible");
        }
      }

      flatTableBodyRowByPosition(1).find("td").eq(6).scrollIntoView();

      for (let i = 1; i < 7; i++) {
        if (i > 2) {
          flatTableBodyRowByPosition(1).find("td").eq(i).should("be.visible");
        }
        if (i === 1 || i === 2) {
          flatTableBodyRowByPosition(1)
            .find("td")
            .eq(i)
            .should("not.be.visible");
        }
      }

      flatTableBodyRowByPosition(1).find("th").eq(0).should("be.visible");
    });

    it("should render Flat Table with colSpan set to make cells span 4 columns", () => {
      CypressMountWithProviders(
        <FlatTableCellColSpanComponent width="500px" />
      );

      flatTableCell(0).should("have.attr", "colspan", 4);
    });

    it("should render Flat Table with rowSpan set to make cells span 3 rows", () => {
      CypressMountWithProviders(
        <FlatTableCellRowSpanComponent width="500px" />
      );

      flatTableCell(0).should("have.attr", "rowspan", 3);
    });

    it.each([
      [1, 180],
      [2, 150],
      [3, 100],
    ])(
      "should render Flat Table column index %s with column width %s",
      (column, width) => {
        CypressMountWithProviders(<FlatTableFooterComponent />);

        flatTableHeaderCells()
          .eq(column)
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", width);
          });
      }
    );

    it.each([
      [0, "left"],
      [1, "left"],
      [2, "center"],
      [3, "right"],
    ])(
      "should render Flat Table with column index %s with %s alignment",
      (column, alignment) => {
        CypressMountWithProviders(<FlatTableCustomPaddingComponent />);

        flatTableHeaderCells()
          .eq(column)
          .should("have.css", "text-align", alignment);
      }
    );

    it("should render Flat Table with alternative background header color", () => {
      CypressMountWithProviders(<FlatTableTruncateBgComponent />);

      flatTableHeader()
        .find("th")
        .eq(2)
        .should("have.css", "background-color", "rgb(25, 71, 94)");
    });

    it("should render Flat Table Header and Cells with custom vertical header and body borders", () => {
      CypressMountWithProviders(<FlatTableVerticalBordersComponent />);

      flatTableHeader()
        .find("th")
        .eq(0)
        .should("have.css", "border-right-width", borderSizeSmall);
      flatTableHeader()
        .find("th")
        .eq(1)
        .should("have.css", "border-right-width", borderSizeMedium);
      flatTableHeader()
        .find("th")
        .eq(2)
        .should("have.css", "border-right-width", borderSizeLarge);

      for (let i = 0; i < 3; i++) {
        flatTableBodyRowByPosition(i)
          .find("td")
          .eq(0)
          .should("have.css", "border-right-width", borderSizeSmall)
          .and("have.css", "border-right-color", black);
        flatTableBodyRowByPosition(i)
          .find("td")
          .eq(1)
          .should("have.css", "border-right-width", borderSizeMedium)
          .and("have.css", "border-right-color", lightGold);
        flatTableBodyRowByPosition(i)
          .find("td")
          .eq(2)
          .should(
            "have.css",
            "border-right",
            `${borderSizeLarge} solid ${darkGrey}`
          );
      }
    });

    it("should render Flat Table Row Header with custom vertical header and body borders", () => {
      CypressMountWithProviders(<FlatTableSpanComponent />);

      flatTableHeaderRowByPosition(0)
        .find("th")
        .eq(1)
        .should("have.css", "border-right-width", borderSizeSmall)
        .and("have.css", "border-right-color", lightBlue);

      for (let i = 0; i < 3; i++) {
        flatTableBodyRowByPosition(i)
          .find("th")
          .should("have.css", "border-right-width", borderSizeSmall)
          .and("have.css", "border-right-color", black);
      }
      for (let i = 3; i < 6; i++) {
        flatTableBodyRowByPosition(i)
          .find("th")
          .should("have.css", "border-right-width", borderSizeMedium)
          .and("have.css", "border-right-color", lightGold);
      }
      for (let i = 6; i < 9; i++) {
        flatTableBodyRowByPosition(i)
          .find("th")
          .should(
            "have.css",
            "border-right",
            `${borderSizeLarge} solid ${mediumGrey}`
          );
      }
    });

    it("should render Flat Table with custom horizontal borders", () => {
      CypressMountWithProviders(<FlatTableHorizontalBordersComponent />);

      for (let i = 0; i < 4; i++) {
        flatTableBodyRowByPosition(0)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeMedium} solid ${lightGold}`
          );
        flatTableBodyRowByPosition(1)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeSmall} solid ${blue}`
          );
        flatTableBodyRowByPosition(2)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeLarge} solid ${black}`
          );
        flatTableBodyRowByPosition(3)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeSmall} solid ${mediumGrey}`
          );
      }
    });

    it("should render Flat Table with custom color row", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableBodyRowByPosition(0)
        .children()
        .should("have.css", "background-color", green);
      flatTableBodyRowByPosition(2)
        .children()
        .should("have.css", "background-color", green);
    });

    it("can select individual Flat Table rows with the mouse", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableCheckboxCell(1).find("input").click().should("be.checked");
      flatTableCheckboxCell(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);

      flatTableBodyRowByPosition(1)
        .children()
        .should("have.css", "background-color", lightGrey);

      batchSelectionCounter().should("have.text", "1 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    // Skipped test as can't select a checkbox with spacebar - ticket FE-5601
    it.skip("can select individual Flat Table rows with the spacebar", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableCheckboxCell(1)
        .find("input")
        .focus()
        .trigger("keydown", keyCode("Space"), { force: true })
        .should("be.checked");
      flatTableCheckboxCell(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);

      flatTableBodyRowByPosition(1)
        .children()
        .should("have.css", "background-color", lightGrey);

      batchSelectionCounter().should("have.text", "1 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    it("can not select individual Flat Table rows with the Enter key", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableCheckboxCell(1)
        .find("input")
        .focus()
        .trigger("keydown", keyCode("EnterForce"))
        .should("not.be.checked");
    });

    it("can select all Flat Table rows with the mouse", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableCheckboxHeader().find("input").click().should("be.checked");
      flatTableCheckboxHeader()
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      for (let i = 0; i < 4; i++) {
        flatTableCheckboxCell(i).find("input").should("be.checked");
      }

      for (let i = 1; i < 5; i++) {
        flatTableBodyRowByPosition(0)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(1)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
        flatTableBodyRowByPosition(2)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(3)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
      }
      batchSelectionCounter().should("have.text", "4 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    // Skipped test as can't select a checkbox with spacebar - ticket FE-5601
    it.skip("can select all Flat Table rows with the spacebar", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableCheckboxHeader()
        .find("input")
        .focus()
        .trigger("keydown", keyCode("Space"), { force: true })
        .should("be.checked");
      flatTableCheckboxHeader()
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      for (let i = 0; i < 4; i++) {
        flatTableCheckboxCell(i).find("input").should("be.checked");
      }

      for (let i = 1; i < 5; i++) {
        flatTableBodyRowByPosition(0)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(1)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
        flatTableBodyRowByPosition(2)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(3)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
      }
      batchSelectionCounter().should("have.text", "4 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    it("can not select all Flat Table rows with the Enter key", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      flatTableCheckboxHeader()
        .find("input")
        .focus()
        .trigger("keydown", keyCode("Enter"))
        .should("not.be.checked");
    });

    it("can highlight Flat Table rows with the mouse", () => {
      CypressMountWithProviders(<FlatTableHighlightableComponent />);

      flatTableBodyRows().first().click();
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("can highlight Flat Table rows with the spacebar", () => {
      CypressMountWithProviders(<FlatTableHighlightableComponent />);

      flatTableBodyRows().first().trigger("keydown", keyCode("Space"));
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("can highlight Flat Table rows with the Enter key", () => {
      CypressMountWithProviders(<FlatTableHighlightableComponent />);

      flatTableBodyRows().first().trigger("keydown", keyCode("Enter"));
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("can highlight and select Flat Table rows", () => {
      CypressMountWithProviders(<FlatTableHighlightableComponent />);

      flatTableBodyRows().first().click();
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
      flatTableBodyRowByPosition(0)
        .find("td")
        .eq(0)
        .find("input")
        .click()
        .should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", lightGrey);
      flatTableBodyRowByPosition(1).click();
      flatTableBodyRowByPosition(1)
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("should render Flat Table Row Header with truncated string in header", () => {
      CypressMountWithProviders(<FlatTableTruncateHeaderComponent />);

      const truncHead = "Location";
      const truncRow = "London";

      flatTableRowHeader()
        .eq(0)
        .children()
        .should("have.text", truncHead)
        .and("have.css", "text-overflow", "ellipsis");
      for (let i = 1; i < 4; i++) {
        flatTableRowHeader()
          .eq(i)
          .children()
          .should("have.text", truncRow)
          .and("have.css", "text-overflow", "ellipsis");
      }
    });

    it("should render Flat Table Cell with truncated string in cell", () => {
      CypressMountWithProviders(<FlatTableTruncateBgComponent />);

      const truncCellText1 = "John Doe";
      const truncCellText2 = "London";

      flatTableCell(0)
        .children()
        .should("have.text", truncCellText1)
        .and("have.css", "text-overflow", "ellipsis");
      flatTableCell(1)
        .children()
        .should("have.text", truncCellText2)
        .and("have.css", "text-overflow", "ellipsis");
    });

    it("should render Flat Table Row Header with title", () => {
      CypressMountWithProviders(<FlatTableTitleAlignComponent />);

      flatTableRowHeader()
        .eq(1)
        .children()
        .should("have.attr", "title", CHARACTERS.DIACRITICS);
    });

    it("should render Flat Table Cell with title", () => {
      CypressMountWithProviders(<FlatTableTitleAlignComponent />);

      flatTableCell(0)
        .children()
        .should("have.attr", "title", CHARACTERS.DIACRITICS);
    });

    it("should render Flat Table Row Header with set width", () => {
      CypressMountWithProviders(<FlatTableTitleAlignComponent />);

      flatTableRowHeader().eq(1).children().should("have.css", "width", "50px");
    });

    it("should render Flat Table Cell with set width", () => {
      CypressMountWithProviders(<FlatTableTitleAlignComponent />);

      flatTableCell(0).children().should("have.css", "width", "60px");
    });

    it("should render Flat Table Row Header with set align", () => {
      CypressMountWithProviders(<FlatTableTitleAlignComponent />);

      flatTableRowHeader()
        .eq(1)
        .children()
        .should("have.css", "text-align", "left");
      flatTableRowHeader()
        .eq(2)
        .children()
        .should("have.css", "text-align", "center");
      flatTableRowHeader()
        .eq(3)
        .children()
        .should("have.css", "text-align", "right");
      flatTableRowHeader()
        .eq(4)
        .children()
        .should("have.css", "text-align", "left");
    });

    it("should render Flat Table Cell with set align", () => {
      CypressMountWithProviders(<FlatTableTitleAlignComponent />);

      flatTableBodyRowByPosition(0)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "left");
      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "center");
      flatTableBodyRowByPosition(2)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "right");
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "left");
    });

    it.each([
      [0, "8px"],
      [1, "16px"],
      [2, "24px"],
      [3, "32px"],
    ])(
      "should render Flat Table with row %s with %s custom padding",
      (row, customPad) => {
        CypressMountWithProviders(<FlatTableCustomPaddingComponent />);

        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(0)
          .children()
          .should("have.css", "padding-left", customPad)
          .and("have.css", "padding-right", customPad);
        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(1)
          .children()
          .should("have.css", "padding-left", customPad)
          .and("have.css", "padding-right", "16px");
        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(2)
          .children()
          .should("have.css", "padding", customPad);
        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(3)
          .children()
          .should("have.css", "padding-left", customPad)
          .and("have.css", "padding-right", "16px");
      }
    );

    it.each([
      ["first", "desc", 1],
      ["first", "asc", 2],
      ["second", "desc", 1],
      ["second", "asc", 2],
    ])(
      "should sort Flat Table %s column in %s order with mouse click",
      (colPosition, sortOrder, times) => {
        CypressMountWithProviders(<FlatTableSortingComponent />);

        for (let i = 0; i < times; i++) {
          flatTableSortable().eq(positionOfElement(colPosition)).click();
        }

        const valueOne = "Tyler Webb";
        const valueTwo = "Monty Parker";
        const valueThree = "Jason Atkinson";
        const valueFour = "Blake Sutton";
        const totalOne = "280";
        const totalTwo = "1349";
        const totalThree = "849";
        const totalFour = "3840";

        if (colPosition === "first" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueOne)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueFour)
            .and("be.visible");
        } else if (colPosition === "first" && sortOrder === "asc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueFour)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueOne)
            .and("be.visible");
        } else if (colPosition === "second" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalFour)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalOne)
            .and("be.visible");
        } else {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalOne)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalFour)
            .and("be.visible");
        }
      }
    );

    it.each([
      ["first", "desc", 1],
      ["first", "asc", 2],
      ["second", "desc", 1],
      ["second", "asc", 2],
    ])(
      "should sort Flat Table %s column in %s order with Spacebar",
      (colPosition, sortOrder, times) => {
        CypressMountWithProviders(<FlatTableSortingComponent />);

        for (let i = 0; i < times; i++) {
          flatTableSortable()
            .eq(positionOfElement(colPosition))
            .trigger("keydown", keyCode("Space"));
        }

        const valueOne = "Tyler Webb";
        const valueTwo = "Monty Parker";
        const valueThree = "Jason Atkinson";
        const valueFour = "Blake Sutton";
        const totalOne = "280";
        const totalTwo = "1349";
        const totalThree = "849";
        const totalFour = "3840";

        if (colPosition === "first" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueOne)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueFour)
            .and("be.visible");
        } else if (colPosition === "first" && sortOrder === "asc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueFour)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueOne)
            .and("be.visible");
        } else if (colPosition === "second" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalFour)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalOne)
            .and("be.visible");
        } else {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalOne)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalFour)
            .and("be.visible");
        }
      }
    );

    it.each([
      ["first", "desc", 1],
      ["first", "asc", 2],
      ["second", "desc", 1],
      ["second", "asc", 2],
    ])(
      "should sort Flat Table %s column in %s order with Enter key",
      (colPosition, sortOrder, times) => {
        CypressMountWithProviders(<FlatTableSortingComponent />);

        for (let i = 0; i < times; i++) {
          flatTableSortable()
            .eq(positionOfElement(colPosition))
            .trigger("keydown", keyCode("Enter"));
        }

        const valueOne = "Tyler Webb";
        const valueTwo = "Monty Parker";
        const valueThree = "Jason Atkinson";
        const valueFour = "Blake Sutton";
        const totalOne = "280";
        const totalTwo = "1349";
        const totalThree = "849";
        const totalFour = "3840";

        if (colPosition === "first" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueOne)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueFour)
            .and("be.visible");
        } else if (colPosition === "first" && sortOrder === "asc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueFour)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueOne)
            .and("be.visible");
        } else if (colPosition === "second" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalFour)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalOne)
            .and("be.visible");
        } else {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalOne)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalFour)
            .and("be.visible");
        }
      }
    );

    it("should render Flat Table with expandable rows expanded by mouse, subrows not accessible", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should render Flat Table with expandable rows expanded by Spacebar, subrows not accessible", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"))
        .wait(250);
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should render Flat Table with expandable rows expanded by Enter key, subrows not accessible", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"))
        .wait(250);
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should allow a Link to be clicked in a Flat Table with expandable row", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      relLink().click();
    });

    it("should render Flat Table with expandable rows expanded by mouse, can focus subrows with down arrow keypress", () => {
      CypressMountWithProviders(<FlatTableAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should render Flat Table with expandable rows, can be closed with Spacebar", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableSubrows().should("not.exist");
    });

    it("should render Flat Table with expandable rows, can be closed with Enter key", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableSubrows().should("not.exist");
    });

    it("should render Flat Table expandable by any column in the row", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));

      for (let i = 0; i < 4; i++) {
        flatTableSubrows().should("not.exist");
        flatTableCell(i).click();
        flatTableSubrows().should("exist");
        flatTableCell(i).click();
      }
    });

    it("should render Flat Table expandable by first column only by mouse", () => {
      CypressMountWithProviders(<FlatTableFirstColExpandableComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));
      flatTableSubrows().should("not.exist");

      for (let i = 1; i < 4; i++) {
        flatTableCell(i).click();
        flatTableSubrows().should("not.exist");
      }

      flatTableCell(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
    });

    it("should render Flat Table expandable by first column only by Spacebar", () => {
      CypressMountWithProviders(<FlatTableFirstColExpandableComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));
      flatTableSubrows().should("not.exist");
      flatTableCell(0).focus().trigger("keydown", keyCode("Space"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
    });

    it("should render Flat Table expandable by first column only by Enter key", () => {
      CypressMountWithProviders(<FlatTableFirstColExpandableComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then((cssString) => expect(getRotationAngle(cssString)).to.equal(-90));
      flatTableSubrows().should("not.exist");
      flatTableCell(0).focus().trigger("keydown", keyCode("Enter"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
    });

    it("should render Flat Table with all expandable rows expanded", () => {
      CypressMountWithProviders(<FlatTableAlreadyExpandedComponent />);

      flatTableExpandableIcon(0).should("have.css", "transform", "none");
      flatTableExpandableIcon(12).should("have.css", "transform", "none");
      flatTableExpandableIcon(24).should("have.css", "transform", "none");
      flatTableExpandableIcon(36).should("have.css", "transform", "none");
      flatTableSubrows().should("exist");
    });

    it("can expand all rows in Flat Table with controlled button activated by mouse", () => {
      CypressMountWithProviders(<FlatTableExpandAllComponent />);

      const buttonCollapse = "Collapse All";
      const buttonExpand = "Expand All";

      getDataElementByValue("main-text").contains(buttonCollapse).click();
      flatTableSubrows().should("not.exist");
      getDataElementByValue("main-text").contains(buttonExpand).click();
      flatTableSubrows().should("exist");
    });

    it("should render Flat Table with parent expandable and child subrows selectable", () => {
      CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      flatTableBodyRowByPosition(1).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
    });

    it("should render Flat Table with parent expandable row only selectable", () => {
      CypressMountWithProviders(<FlatTableParentSubrowSelectableComponent />);

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      flatTableBodyRowByPosition(1).find("input").should("not.exist");
    });

    it("should render Flat Table with child subrow only selectable", () => {
      CypressMountWithProviders(<FlatTableChildSubrowSelectableComponent />);

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").should("not.exist");
      flatTableBodyRowByPosition(1).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
    });

    it("can focus the first row by tabbing but no further rows are focused on tab press", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).then(checkFocus);
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).should("not.be.focused");
      flatTableBodyRowByPosition(3).should("not.be.focused");
    });

    it("sets the last selected row as the tab stop and removes it from any other ones", () => {
      CypressMountWithProviders(
        <FlatTablePartiallySelectedOrHighlightedRows selected />
      );

      cy.get("body").tab();

      cy.focused().tab();

      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).then(checkFocus);
    });

    it("sets the last highlighted row as the tab stop and removes it from any other ones", () => {
      CypressMountWithProviders(
        <FlatTablePartiallySelectedOrHighlightedRows highlighted />
      );

      cy.get("body").tab();

      cy.focused().tab();

      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).then(checkFocus);
    });

    it("can use tab and down arrow key to navigate the clickable rows and tabbable elements", () => {
      CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

      cy.get("body").tab();

      // tab through batch selection
      for (let i = 0; i < 5; i++) {
        cy.focused().tab();
      }

      flatTableBodyRowByPosition(0).then(checkFocus);

      cy.focused().tab();
      flatTableBodyRowByPosition(0).find("input").eq(0).should("be.focused");
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).then(checkFocus);
    });

    it("can use up arrow to navigate the clickable rows and tabbable elements", () => {
      CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

      cyRoot();
      cy.get("body").tab();

      flatTableBodyRowByPosition(3).find("input").eq(0).focus();
      flatTableBodyRowByPosition(3).find("input").eq(0).should("be.focused");
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(2).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(1).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(0).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(0).then(checkFocus);
    });

    it.each([["leftarrow"], ["rightarrow"]])(
      "can not navigate through Flat Table rows using %s keys",
      (arrow) => {
        CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

        cy.get("body").tab();

        // tab through batch selection
        for (let i = 0; i < 5; i++) {
          cy.focused().tab();
        }

        flatTableBodyRowByPosition(0).then(checkFocus);
        flatTableBodyRowByPosition(0).trigger("keydown", keyCode(arrow));
        flatTableBodyRowByPosition(0).then(checkFocus);
      }
    );

    it("should navigate the first column of cells with down arrow key press when expandableArea is set to 'firstColumn'", () => {
      CypressMountWithProviders(<FlatTableFirstColExpandableComponent />);

      cy.get("body").tab();
      cy.focused().tab();
      flatTableCell(0).should("be.focused");
      flatTableCell(0).trigger("keydown", keyCode("downarrow"));
      flatTableCell(4).should("be.focused");
      flatTableCell(4).trigger("keydown", keyCode("downarrow"));
      flatTableCell(8).should("be.focused");
      flatTableCell(8).trigger("keydown", keyCode("downarrow"));
      flatTableCell(12).should("be.focused");
      flatTableCell(12).trigger("keydown", keyCode("downarrow"));
      flatTableCell(12).should("be.focused");
    });

    it("should navigate the first column of cells with up arrow key press when expandableArea is set to 'firstColumn'", () => {
      CypressMountWithProviders(<FlatTableFirstColExpandableComponent />);

      flatTableCell(12).focus();
      flatTableCell(12).should("be.focused");
      flatTableCell(12).trigger("keydown", keyCode("uparrow"));
      flatTableCell(8).should("be.focused");
      flatTableCell(8).trigger("keydown", keyCode("uparrow"));
      flatTableCell(4).should("be.focused");
      flatTableCell(4).trigger("keydown", keyCode("uparrow"));
      flatTableCell(0).should("be.focused");
      flatTableCell(0).trigger("keydown", keyCode("uparrow"));
      flatTableCell(0).should("be.focused");
    });

    it("should navigate any focusable rows, including expanded sub rows, with down arrow key", () => {
      CypressMountWithProviders(<FlatTableAccSubRowComponent />);

      cy.get("body").tab();
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("be.focused");
      flatTableBodyRowByPosition(0).click();
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).should("be.focused");
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).should("be.focused");
      flatTableBodyRowByPosition(2).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).should("be.focused");
      flatTableBodyRowByPosition(3).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(4).should("be.focused");
      flatTableBodyRowByPosition(4).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(5).should("be.focused");
    });

    it("should navigate any focusable rows, including expanded sub rows, with up arrow key", () => {
      CypressMountWithProviders(<FlatTableAccSubRowComponent />);

      cy.get("body").tab();
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("be.focused");
      flatTableBodyRowByPosition(0).click();
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).should("be.focused");
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).should("be.focused");
      flatTableBodyRowByPosition(2).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).should("be.focused");
      flatTableBodyRowByPosition(3).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(4).should("be.focused");
      flatTableBodyRowByPosition(4).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(5).should("be.focused");
    });

    it("should render Flat Table with action popover in a cell opened by mouse", () => {
      CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

      actionPopoverButton().eq(0).click();
      actionPopover().should("exist");
    });

    it("should render Flat Table with action popover in a cell opened by Spaceber", () => {
      CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

      actionPopoverButton().eq(0).focus().trigger("keydown", keyCode("Space"));
      actionPopover().should("exist");
    });

    it("should render Flat Table with action popover in a cell opened by Enter key", () => {
      CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

      actionPopoverButton().eq(0).focus().trigger("keydown", keyCode("Enter"));
      actionPopover().should("exist");
    });

    it.each([
      ["UK", 1],
      ["UK", 2],
      ["UK", 3],
      ["Germany", 2],
      ["Germany", 3],
      ["Germany", 0],
      ["China", 3],
      ["China", 0],
      ["China", 1],
      ["US", 0],
      ["US", 1],
      ["US", 2],
    ])(
      "should drag FlatTable draggable row %s and re-order to position %s",
      (record, destinationId) => {
        CypressMountWithProviders(<FlatTableDraggableComponent />);

        flatTableDraggableItem(record).trigger("dragstart");
        flatTableDraggableItemByPosition(destinationId).trigger("drop");
        flatTableDraggableItemByPosition(destinationId) // required else it is detached from the DOM
          .trigger("dragend");
        flatTableDraggableItemByPosition(destinationId).should(
          "contain",
          record
        );
      }
    );

    it.each(viewport)(
      "should render Flat Table with pager and sticky header in %s viewport",
      (size, width, height) => {
        cy.viewport(width, height);

        CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

        flatTablePageSizeSelect().click();

        if (size === "large") {
          flatTablePageSelectListPosition()
            .should("have.attr", "data-floating-placement", "bottom")
            .and("be.visible");
        } else {
          flatTablePageSelectListPosition()
            .should("have.attr", "data-floating-placement", "top")
            .and("be.visible");
        }
      }
    );

    it.each([
      [1, 1],
      [5, 2],
    ])(
      "should show %s items in Flat Table when selected with the mouse",
      (numberOfItems, option) => {
        CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

        flatTableBodyRows().should("have.length", 5).and("be.visible");
        pageSelectInput().click();
        flatTablePageSelectListPosition()
          .children()
          .find(`li:nth-child(${option})`)
          .click();
        flatTableBodyRows()
          .should("have.length", numberOfItems)
          .and("be.visible");
        pageSelectInput().should("have.value", numberOfItems);
      }
    );

    it.each([
      [1, 1],
      [5, 2],
    ])(
      "should open Show Items selector in Flat Table with the Spacebar and select %s items per page",
      (numberOfItems) => {
        CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

        flatTableBodyRows().should("have.length", 5).and("be.visible");
        pageSelectInput().trigger("keydown", keyCode("Space"));
        flatTablePageSelectListPosition()
          .children()
          .contains(numberOfItems)
          .click();
        flatTableBodyRows()
          .should("have.length", numberOfItems)
          .and("be.visible");
        pageSelectInput().should("have.value", numberOfItems);
      }
    );

    it.each([
      [1, 1],
      [5, 2],
    ])(
      "should open Show Items selector in Flat Table with the Enter key and select %s items per page",
      (numberOfItems) => {
        CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

        flatTableBodyRows().should("have.length", 5).and("be.visible");
        pageSelectInput().trigger("keydown", keyCode("Enter"), { force: true });
        flatTablePageSelectListPosition()
          .children()
          .contains(numberOfItems)
          .click({ force: true });
        flatTableBodyRows()
          .should("have.length", numberOfItems)
          .and("be.visible");
        pageSelectInput().should("have.value", numberOfItems);
      }
    );

    it("should navigate to next page in Flat Table with by clicking Next link with the mouse", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTablePageSelectNext().click();
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to next page in Flat Table with by selecting Next link with the Spacebar", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTablePageSelectNext()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to next page in Flat Table with by selecting Next link with the Enter key", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTablePageSelectNext()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to previous page in Flat Table by clicking Previous link with the mouse", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTablePageSelectPrevious().click();
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should navigate to previous page in Flat Table by clicking Previous link with the Spacebar", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTablePageSelectPrevious()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should navigate to previous page in Flat Table by clicking Previous link with the Enter key", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTablePageSelectPrevious()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should navigate to next page in Flat Table by page number", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTableCurrentPageInput().focus().type("{backspace}").type("2").tab();
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to previous page in Flat Table by page number", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableCurrentPageInput().focus().type("{backspace}").type("1").tab();
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should render Flat Table with clickable rows", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      for (let i = 0; i < 6; i++) {
        flatTableBodyRowByPosition(i).click().then(checkFocus);
      }
    });

    it.each(["tr", "th"])(
      "should render Flat Table Checkbox as prop to %s",
      (asPropVal) => {
        CypressMountWithProviders(
          <FlatTableCheckboxComponent as={asPropVal} />
        );

        for (let i = 0; i < 4; i++) {
          flatTableCheckboxAsProp(i, asPropVal).should(
            "have.attr",
            "data-element",
            "flat-table-checkbox-header"
          );
        }
      }
    );
  });

  describe("check events for Flat Table component", () => {
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call getOrder when a Flat Table draggable row order is changed", () => {
      CypressMountWithProviders(
        <FlatTableDraggableComponent getOrder={callback} />
      );

      flatTableDraggableItem("UK").trigger("dragstart");
      flatTableDraggableItemByPosition(3).trigger("drop");
      flatTableDraggableItemByPosition(3)
        .trigger("dragend")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick when a clickable Flat Table row is clicked", () => {
      CypressMountWithProviders(<FlatTableComponent onClick={callback} />);

      flatTableBodyRowByPosition(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange when a Flat Table selectable row is clicked", () => {
      CypressMountWithProviders(
        <FlatTableColorRowSelectableComponent onChange={callback} />
      );

      flatTableCheckboxCell(1)
        .find("input")
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick when a Flat Table selectable row is clicked", () => {
      CypressMountWithProviders(
        <FlatTableCheckboxComponent onClick={callback} />
      );

      flatTableCheckboxCell(1)
        .find("input")
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick when first Flat Table column is sorted", () => {
      CypressMountWithProviders(
        <FlatTableSortingComponent onClick={callback} />
      );

      const colPosition = "first";

      flatTableSortable()
        .eq(positionOfElement(colPosition))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("check accessibility tests for Flat Table component", () => {
    it("should render Flat Table with ariaDescribedBy for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableComponent />);
      cy.checkAccessibility();
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Flat Table with caption prop set as %s for accessibility tests",
      (captionValue) => {
        CypressMountWithProviders(
          <FlatTableComponent caption={captionValue} />
        );
        cy.checkAccessibility();
      }
    );

    // a11y error!scrollable-region-focusable on 1 Node. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table Row with cell nodes as children for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableSpanComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table with truncated cells for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableTruncateBgComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table Checkbox with ariaLabelledBy for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table with sticky header for accessibility tests", () => {
      CypressMountWithProviders(
        <div style={{ height: "150px" }}>
          <FlatTableComponent hasStickyHead />
        </div>
      );
      cy.wait(300);
      cy.checkAccessibility();
    });

    it("should render Flat Table with sticky footer for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableFooterComponent hasStickyFooter />);
      cy.checkAccessibility();
    });

    it.each(colorThemes)(
      "should render Flat Table in the %s theme for accessibility tests",
      (colorTheme) => {
        CypressMountWithProviders(
          <FlatTableComponent colorTheme={colorTheme} />
        );
        cy.checkAccessibility();
      }
    );

    it("should render Flat Table with zebra stripes for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableComponent isZebra />);

      cy.checkAccessibility();
    });

    it.each(sizes)(
      "should check Flat Table size is %s for accessibility tests",
      (sizeName) => {
        CypressMountWithProviders(<FlatTableComponent size={sizeName} />);

        cy.checkAccessibility();
      }
    );

    it.each(heightWidth)(
      "should render Flat Table with %spx as a height parameter for accessibility tests",
      (height) => {
        CypressMountWithProviders(
          <FlatTableComponent height={`${height}px`} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([150, 249, 250, 251, 300])(
      "should render Flat Table with %spx as a height parameter and minHeight set to 250px for accessibility tests",
      (height) => {
        CypressMountWithProviders(
          <FlatTableComponent height={`${height}px`} minHeight="250px" />
        );
        cy.checkAccessibility();
      }
    );

    it("should render Flat Table with hasMaxHeight parameter for accessibility tests", () => {
      CypressMountWithProviders(
        <FlatTableComponent height="400px" hasMaxHeight />
      );
      cy.checkAccessibility();
    });

    it.each(heightWidth)(
      "should render Flat Table with %spx as a width parameter for accessibility tests",
      (width) => {
        CypressMountWithProviders(<FlatTableComponent width={`${width}px`} />);
        cy.checkAccessibility();
      }
    );

    it.each(["visible", "hidden", "clip", "scroll", "auto"])(
      "should render Flat Table with %s as a overflowX parameter and width set to 500px for accessibility tests",
      (overflow) => {
        CypressMountWithProviders(
          <FlatTableComponent width="500px" overflowX={overflow} />
        );
        cy.checkAccessibility();
      }
    );

    // a11y error!scrollable-region-focusable on 1 Node. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table with rowSpan set to make header cells span 2 rows for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableSpanComponent width="500px" />);
      cy.checkAccessibility();
    });

    // a11y error!scrollable-region-focusable on 1 Node. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table with multiple sticky row headers for accessibility tests", () => {
      cy.viewport(700, 700);

      CypressMountWithProviders(<FlatTableMutipleStickyComponent />);
      cy.checkAccessibility();
    });

    it("should render Flat Table with colSpan set to make cells span 4 columns for accessibility tests", () => {
      CypressMountWithProviders(
        <FlatTableCellColSpanComponent width="500px" />
      );
      cy.checkAccessibility();
    });

    it("should render Flat Table with rowSpan set to make cells span 3 rows for accessibility tests", () => {
      CypressMountWithProviders(
        <FlatTableCellRowSpanComponent width="500px" />
      );
      cy.checkAccessibility();
    });

    it("should render Flat Table with FlatTableFooterComponent for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableFooterComponent />);
      cy.checkAccessibility();
    });

    it("should render Flat Table with FlatTableCustomPaddingComponent for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableCustomPaddingComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table Header and Cells with FlatTableVerticalBordersComponent for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableVerticalBordersComponent />);
      cy.checkAccessibility();
    });

    it("should render Flat Table with custom horizontal borders for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableHorizontalBordersComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with custom color row for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableColorRowSelectableComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table rows with the mouse for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableHighlightableComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table Row Header with truncated string in header for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableTruncateHeaderComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table Row Header with title for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableTitleAlignComponent />);

      cy.checkAccessibility();
    });

    it("should render sorted Flat Table for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableSortingComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table with all expandable rows closed for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableNoAccSubRowComponent />);

      cy.checkAccessibility();
    });

    it("when first column of expandable row is opened, rendered Flat Table passes accessibility checks", () => {
      CypressMountWithProviders(<FlatTableFirstColExpandableComponent />);
      flatTableCell(0).focus().trigger("keydown", keyCode("Space"));
      cy.checkAccessibility();
    });

    it("should render Flat Table with all expandable rows expanded for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableAlreadyExpandedComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with parent expandable and child subrows selectable for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableAllSubrowSelectableComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with parent expandable row only selectable for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableParentSubrowSelectableComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with child subrow only selectable for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableChildSubrowSelectableComponent />);

      cy.checkAccessibility();
    });

    // a11y error! empty-table-header on 1 Node. Ticket FE-5767 logged to investigate
    it.skip("should render Flat Table with FlatTableDraggableComponent for accessibility tests", () => {
      CypressMountWithProviders(<FlatTableDraggableComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table with pager and sticky header for accessibility tests", () => {
      CypressMountWithProviders(<FlatTablePagerStickyHeaderComponent />);

      cy.checkAccessibility();
    });
  });

  describe("rounded corners", () => {
    it("has the expected border radius styling when no footer is rendered", () => {
      CypressMountWithProviders(<FlatTableComponent />);

      flatTableWrapper().should("have.css", "border-radius", "8px");
      flatTableHeaderCells()
        .first()
        .should("have.css", "border-radius", "8px 0px 0px");
      flatTableHeaderCells()
        .last()
        .should("have.css", "border-radius", "0px 8px 0px 0px");
      flatTableCell(20).should("have.css", "border-radius", "0px 0px 0px 8px");
      flatTableCell(23).should("have.css", "border-radius", "0px 0px 8px");
    });

    it("has the expected border radius styling when sticky footer is rendered", () => {
      CypressMountWithProviders(<FlatTableFooterComponent hasStickyFooter />);

      flatTableWrapper().should("have.css", "border-radius", "8px 8px 0px 0px");
      flatTableHeaderCells()
        .first()
        .should("have.css", "border-radius", "8px 0px 0px");
      flatTableHeaderCells().last().should("have.css", "border-radius", "0px");
      flatTableCell(16).should("have.css", "border-radius", "0px");
      flatTableCell(19).should("have.css", "border-radius", "0px");
      flatTablePager().should("have.css", "border-radius", "0px");
    });

    it("has the expected border radius styling when horizontal scrollbar exists", () => {
      CypressMountWithProviders(
        <FlatTable
          width="200px"
          overflowX="auto"
          aria-label="Horizontal scroll table"
        >
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Foo</FlatTableHeader>
              <FlatTableHeader>Bar</FlatTableHeader>
              <FlatTableHeader>Wiz</FlatTableHeader>
              <FlatTableHeader>Foo</FlatTableHeader>
              <FlatTableHeader>Bar</FlatTableHeader>
              <FlatTableHeader>Wiz</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
              <FlatTableCell>Wiz</FlatTableCell>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
              <FlatTableCell>Wiz</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
              <FlatTableCell>Wiz</FlatTableCell>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
              <FlatTableCell>Wiz</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      flatTableCell(6).should("have.css", "border-radius", "0px");
      flatTableCell(11).should("have.css", "border-radius", "0px");
    });

    it("has the expected border radius styling when first column has rowspan", () => {
      CypressMountWithProviders(
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Foo</FlatTableHeader>
              <FlatTableHeader>Bar</FlatTableHeader>
              <FlatTableHeader>Wiz</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell rowspan="2">Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
              <FlatTableCell>Wiz</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      flatTableCell(0).should("have.css", "border-radius", "0px 0px 0px 8px");
      flatTableCell(3).should("have.css", "border-radius", "0px");
      flatTableCell(4).should("have.css", "border-radius", "0px 0px 8px");
    });

    it("has the expected border radius styling when last column has rowspan", () => {
      CypressMountWithProviders(
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Foo</FlatTableHeader>
              <FlatTableHeader>Bar</FlatTableHeader>
              <FlatTableHeader>Wiz</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
              <FlatTableCell rowspan="2">Wiz</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Bar</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      flatTableCell(2).should("have.css", "border-radius", "0px 0px 8px");
      flatTableCell(3).should("have.css", "border-radius", "0px 0px 0px 8px");
      flatTableCell(4).should("have.css", "border-radius", "0px");
    });
  });
});
