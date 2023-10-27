import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  FlatTableProps,
  FlatTableRowProps,
  FlatTableHeaderProps,
  FlatTableRowHeaderProps,
  FlatTableCellProps,
} from ".";
import FlatTableCheckbox, {
  FlatTableCheckboxProps,
} from "../../../src/components/flat-table/flat-table-checkbox/flat-table-checkbox.component";
import FlatTableBodyDraggable, {
  FlatTableBodyDraggableProps,
} from "../../../src/components/flat-table/flat-table-body-draggable/flat-table-body-draggable.component";
import Sort from "../../../src/components/flat-table/sort/sort.component";
import Box from "../../../src/components/box";
import Pager from "../../../src/components/pager";
import Textbox from "../../../src/components/textbox";
import BatchSelection from "../../../src/components/batch-selection/batch-selection.component";
import IconButton from "../../../src/components/icon-button";
import Icon from "../../../src/components/icon";
import Button from "../../../src/components/button";
import ActionPopover from "../../../src/components/action-popover/action-popover.component";
import ActionPopoverItem from "../../../src/components/action-popover/action-popover-item/action-popover-item.component";
import ActionPopoverMenu from "../../../src/components/action-popover/action-popover-menu/action-popover-menu.component";
import Link from "../../../src/components/link";
import guid from "../../__internal__/utils/helpers/guid";
import { FLAT_TABLE_THEMES } from "./flat-table.config";
import { WithSortingHeaders } from "./flat-table.stories";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { FlatTableRowContextProps } from "./flat-table-row/__internal__/flat-table-row-context";

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
type SelectedRowsParentOnlySelectableStoryKey = keyof SelectedRowsParentOnlySelectableStory;
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
type SelectedRowsChildrenOnlySelectableStoryKey = keyof SelectedRowsChildrenOnlySelectableStory;
type SubRowsShapeChildrenOnlySelectableStoryKey = keyof SubRowsShapeChildrenOnlySelectableStory;

export default {
  title: "Flat Table/Test",
  includeStories: [
    "FlatTableStory",
    "ExpandableWithLink",
    "SortableStory",
    "SubRowsAsAComponentStory",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    colorTheme: {
      options: FLAT_TABLE_THEMES,
      control: {
        type: "select",
      },
    },
  },
};

interface FlatTableStoryProps
  extends Pick<FlatTableProps, "hasStickyHead" | "caption">,
    Pick<
      FlatTableRowProps,
      "horizontalBorderColor" | "horizontalBorderSize" | "bgColor"
    >,
    Pick<FlatTableHeaderProps, "verticalBorder" | "verticalBorderColor"> {
  hasHeaderRow: boolean;
  hasClickableRows: boolean;
  firstColumnWidth: number;
  secondColumnWidth: number;
}
type OnClick = () => void;
interface Client {
  employee: React.JSX.Element;
  location: string;
  role: string;
  department: string;
  companyVehicle: string;
  performanceReview: string;
  employmentStart: string;
}
type HeadRowData = typeof headRowData;

const names = [
  "Chris Thompson",
  "Uri Foster",
  "Daniel Dopper",
  "Patrice Jambon",
  "Ace Walker",
  "Harriet Lewis",
  "Lauren Hughes",
  "Holly Smith",
];

const headRowData = {
  employee: "Employee",
  location: "Location",
  role: "Role",
  department: "Department",
  companyVehicle: "Company vehicle",
  performanceReview: "Performance review date",
  employmentStart: "Employment start date",
} as const;

const getDay = (i: number) => {
  if (i > 28) {
    return "05";
  }
  if (i < 10) {
    return `0${i}`;
  }
  return `${i}`;
};

const getMonth = (i: number) => {
  if (i > 12) {
    return "11";
  }
  if (i < 10) {
    return `0${i}`;
  }
  return `${i}`;
};

const getYear = (i: number) => 2020 - i;

const rowData = (i: number) => ({
  employee: (
    <>
      <h5 style={{ margin: 0 }}>{names[i]}</h5>000000{i + 10}
    </>
  ),
  location: i % 2 === 0 ? "Newcastle" : "Barcelona",
  role: i > 2 && i % 2 !== 0 ? "Advisor" : "Manager",
  department: i > 3 ? "Sales" : "IT",
  companyVehicle: i > 3 && i % 2 === 0 ? "Yes" : "No",
  performanceReview:
    i + 1 <= 12
      ? `${getDay(i + 1)}/${getMonth(i + 1)}/${getYear(i)}`
      : "11/05/20",
  employmentStart:
    i + 1 < 12
      ? `${getDay(27 - i)}/${getMonth(12 - i)}/${getYear(i)}`
      : "11/07/20",
});

function getRowWithInputs(onClickFn: OnClick, hasHeaderRow?: boolean) {
  let firstRow = <FlatTableCell>Row with inputs</FlatTableCell>;
  if (hasHeaderRow) {
    firstRow = <FlatTableRowHeader>Row with inputs</FlatTableRowHeader>;
  }
  return (
    <FlatTableRow key="rowWithInputs" onClick={onClickFn}>
      {firstRow}
      <FlatTableCell>
        <input />
      </FlatTableCell>
      <FlatTableCell>
        <input />
      </FlatTableCell>
      <FlatTableCell>
        <input />
      </FlatTableCell>
      <FlatTableCell>
        <input />
      </FlatTableCell>
      <FlatTableCell>
        <input />
      </FlatTableCell>
      <FlatTableCell>
        <input />
      </FlatTableCell>
    </FlatTableRow>
  );
}

function renderBody(rowCount: number) {
  const rows = [...Array(rowCount)];
  return rows.map((_, i) => {
    return rowData(i);
  });
}

function processRowData(
  row: HeadRowData | Client,
  cellType: "header" | "cell"
) {
  return Object.keys(row).map((columnKey) => {
    let align = "left";
    if (["performanceReview", "employmentStart"].includes(columnKey)) {
      align = "right";
    }
    return {
      id: guid(),
      content: row[columnKey as keyof typeof row],
      cellType,
      align,
    };
  });
}

function processJsonData({
  labels,
  clients,
}: {
  labels: HeadRowData;
  clients: Client[];
}) {
  return {
    headData: {
      id: guid(),
      data: processRowData(labels, "header"),
    },
    bodyData: clients.map((row) => {
      return {
        id: guid(),
        bodyData: processRowData(row, "cell"),
      };
    }),
  };
}

function getTableData() {
  return processJsonData({
    labels: headRowData,
    clients: renderBody(8),
  });
}

export const FlatTableStory = ({
  hasStickyHead,
  hasHeaderRow,
  hasClickableRows,
  firstColumnWidth,
  secondColumnWidth,
  horizontalBorderSize,
  horizontalBorderColor,
  bgColor,
  verticalBorder,
  verticalBorderColor,
  caption,
  ...args
}: FlatTableStoryProps) => {
  const processed = getTableData();
  let onClickFn: OnClick;
  let rowWithInputs = <></>;
  if (hasClickableRows) {
    onClickFn = action("click") as OnClick;
    rowWithInputs = getRowWithInputs(onClickFn, hasHeaderRow);
  }
  return (
    <Box
      height={hasStickyHead ? "300px" : "auto"}
      width={hasHeaderRow ? "600px" : "auto"}
      overflowX="auto"
    >
      <FlatTable hasStickyHead={hasStickyHead} caption={caption} {...args}>
        <FlatTableHead>
          <FlatTableRow
            key={processed.headData.id}
            horizontalBorderSize={horizontalBorderSize && horizontalBorderSize}
          >
            {processed.headData.data.map((cellData, index) => {
              if (index === 0 && hasHeaderRow) {
                return (
                  <FlatTableRowHeader
                    key={cellData.id}
                    width={firstColumnWidth}
                    verticalBorder={verticalBorder && verticalBorder}
                  >
                    {cellData.content}
                  </FlatTableRowHeader>
                );
              }
              return (
                <FlatTableHeader
                  key={cellData.id}
                  width={secondColumnWidth}
                  verticalBorder={verticalBorder && verticalBorder}
                >
                  {cellData.content}
                </FlatTableHeader>
              );
            })}
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          {rowWithInputs}
          {processed.bodyData.map((data) => (
            <FlatTableRow
              key={data.id}
              onClick={onClickFn}
              horizontalBorderSize={
                horizontalBorderSize && horizontalBorderSize
              }
              horizontalBorderColor={
                horizontalBorderColor && horizontalBorderColor
              }
              bgColor={bgColor && bgColor}
            >
              {data.bodyData.map((cellData, index) => {
                if (index === 0 && hasHeaderRow) {
                  return (
                    <FlatTableRowHeader
                      key={cellData.id}
                      align={cellData.align as FlatTableRowHeaderProps["align"]}
                      verticalBorder={verticalBorder}
                      verticalBorderColor={verticalBorderColor}
                    >
                      {cellData.content}
                    </FlatTableRowHeader>
                  );
                }
                return (
                  <FlatTableCell
                    key={cellData.id}
                    align={cellData.align as FlatTableCellProps["align"]}
                    verticalBorder={verticalBorder}
                    verticalBorderColor={verticalBorderColor}
                  >
                    {cellData.content}
                  </FlatTableCell>
                );
              })}
            </FlatTableRow>
          ))}
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
};

FlatTableStory.storyName = "default";
FlatTableStory.args = {
  ariaDescribedby: "",
  hasStickyHead: false,
  hasHeaderRow: false,
  hasClickableRows: false,
  caption: "",
  colorTheme: "dark",
  firstColumnWidth: 150,
  secondColumnWidth: 120,
  size: "medium",
  horizontalBorderSize: undefined,
  horizontalBorderColor: "",
  bgColor: "",
  verticalBorder: undefined,
  verticalBorderColor: "",
};

export const SortableStory = WithSortingHeaders.bind({});

SortableStory.args = {
  colorTheme: "dark",
};

export const ExpandableWithLink = () => {
  const SubRows = [
    <FlatTableRow key="subrow-1">
      <FlatTableRowHeader>Child one</FlatTableRowHeader>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="subrow-2">
      <FlatTableRowHeader>Child two</FlatTableRowHeader>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>Name</FlatTableRowHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>John Doe</FlatTableRowHeader>
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
        <FlatTableRow expandable subRows={SubRows}>
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
  );
};

export const FlatTableComponent = (
  props: Partial<FlatTableProps> & Partial<FlatTableRowProps>
) => {
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

export const FlatTableFooterComponent = (props: Partial<FlatTableProps>) => {
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

  const [recordsRange, setRecordsRange] = useState({
    start: 0,
    end: 5,
  });

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

export const FlatTableSpanComponent = (props: Partial<FlatTableProps>) => {
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
            <FlatTableHeader rowspan={2}>Name - Sticky</FlatTableHeader>
            <FlatTableRowHeader
              rowspan={2}
              verticalBorder="small"
              verticalBorderColor="#335CDC"
            >
              Code - Sticky <Icon type="business" color="white" />
            </FlatTableRowHeader>
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

export const FlatTableCellColSpanComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableCellRowSpanComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableMultipleStickyComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableCustomPaddingComponent = (
  props: Partial<FlatTableProps>
) => {
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
            <FlatTableHeader px={3} py={2} align="center">
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

export const FlatTableTruncateBgComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableTruncateHeaderComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableVerticalBordersComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableColorRowSelectableComponent = (
  props: Partial<FlatTableProps> & Partial<FlatTableCheckboxProps>
) => {
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

export const FlatTableCheckboxComponent = (
  props: Partial<FlatTableCheckboxProps>
) => {
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

export const FlatTableHighlightableComponent = (
  props: Partial<FlatTableProps>
) => {
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

  const handleHighlightRow = (id: SelectedRow) => {
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

export const FlatTableHorizontalBordersComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableTitleAlignComponent = (
  props: Partial<FlatTableProps>
) => {
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

export const FlatTableSortingComponent = (
  props: Partial<FlatTableProps> &
    FlatTableCellProps &
    Partial<FlatTableRowContextProps>
) => {
  const headDataItems: HeadDataItems = [
    {
      name: "client",
      isActive: true,
    },
    {
      name: "total",
      isActive: false,
    },
  ];
  const bodyDataItems: BodyDataItems = [
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
          <FlatTableCell {...props}>{client}</FlatTableCell>
          <FlatTableCell {...props}>{total}</FlatTableCell>
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
            {headData.map(({ name, isActive }) => {
              return (
                <FlatTableHeader key={name}>
                  <Sort
                    onClick={() => handleClick(name)}
                    sortType={isActive && sortType}
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
    </div>
  );
};

export const FlatTableNoAccSubRowComponent = (
  props: Partial<FlatTableCellProps>
) => {
  const SubRows = [
    <FlatTableRow key="subrow-1">
      <FlatTableCell {...props}>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="subrow-2">
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

export const FlatTableAccSubRowComponent = () => {
  const SubRows = [
    <FlatTableRow key="subrow-1" onClick={() => {}}>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="subrow-2" onClick={() => {}}>
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

export const FlatTableFirstColExpandableComponent = () => {
  const SubRows = [
    <FlatTableRow key="subrow-1" onClick={() => {}}>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="subrow-2" onClick={() => {}}>
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

export const FlatTableAlreadyExpandedComponent = () => {
  const SubRows = [
    <FlatTableRow key="subrow-1" onClick={() => {}}>
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="subrow-2" onClick={() => {}}>
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

export const FlatTableExpandAllComponent = () => {
  const [expanded, setExpanded] = useState(true);
  const SubRows = [
    <FlatTableRow key="subrow-1">
      <FlatTableCell>Child one</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="subrow-2">
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

export const FlatTableAllSubrowSelectableComponent = () => {
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
    subRow: SubRowKeyAllRowsInteractive
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
      Boolean(values[key as SubRowKeyAllRowsInteractive])
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

export const FlatTableParentSubrowSelectableComponent = () => {
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
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: SelectedRowsParentOnlySelectableStoryKey) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }

    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRowsParentOnlySelectableStoryKey])
  ).length;

  const handleHighlightRow = (id: string) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  const SubRows = [
    <FlatTableRow key="subrow-1">
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
    <FlatTableRow key="subrow-2">
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

export const FlatTableChildSubrowSelectableComponent = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [
    selectedRows,
    setSelectedRows,
  ] = useState<SelectedRowsChildrenOnlySelectableStory>({
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
    subRow: SubRowsShapeChildrenOnlySelectableStoryKey
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
      Boolean(values[key as SubRowsShapeChildrenOnlySelectableStoryKey])
    ).length;
    return acc + count;
  }, 0);

  const subRows = (row: SelectedRowsChildrenOnlySelectableStoryKey) => {
    return [
      <FlatTableRow
        selected={selectedRows[row].subOne}
        onClick={() => handleHighlightRow(`${row}.subOne`)}
        highlighted={highlightedRow === `${row}.subOne`}
        key="subrow-1"
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
        key="subrow-2"
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

export const FlatTableDraggableComponent = (
  props: Partial<FlatTableBodyDraggableProps>
) => {
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

export const FlatTablePagerStickyHeaderComponent = () => {
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
  ];
  const [recordsRange, setRecordsRange] = useState({
    start: 0,
    end: 5,
  });
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

export const FlatTablePartiallySelectedOrHighlightedRows = ({
  highlighted,
  selected,
}: Partial<FlatTableRowProps>) => {
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

export const FlatTableWithHorizontalScrollbar = () => {
  return (
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
};

export const FlatTableFirstColumnHasRowspan = () => {
  return (
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
};

export const FlatTableLastColumnHasRowspan = () => {
  return (
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
};

export const FlatTableWithMultipleStickyHeaderRows = () => (
  <FlatTable hasStickyHead>
    <FlatTableHead>
      <FlatTableRow>
        <FlatTableHeader>Foo</FlatTableHeader>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableHeader>Foo</FlatTableHeader>
      </FlatTableRow>
    </FlatTableHead>
    <FlatTableBody>
      <FlatTableRow>
        <FlatTableCell>Foo</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableCell>Foo</FlatTableCell>
      </FlatTableRow>
    </FlatTableBody>
  </FlatTable>
);

export const SubRowsAsAComponentStory = () => {
  const SubRowsComponent = () => (
    <>
      <FlatTableRow>
        <FlatTableCell>Child one</FlatTableCell>
        <FlatTableCell>York</FlatTableCell>
        <FlatTableCell>Single</FlatTableCell>
        <FlatTableCell>2</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableCell>Child two</FlatTableCell>
        <FlatTableCell>Edinburgh</FlatTableCell>
        <FlatTableCell>Single</FlatTableCell>
        <FlatTableCell>1</FlatTableCell>
      </FlatTableRow>
    </>
  );
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
        <FlatTableRow expandable subRows={<SubRowsComponent />}>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={<SubRowsComponent />}>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={<SubRowsComponent />}>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={<SubRowsComponent />}>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};

export const KeyboardNavigationWithPagination = (
  props: Partial<FlatTableProps> & { highlighted?: boolean }
) => {
  const { highlighted, ...rest } = props;
  const rows = [
    <FlatTableRow onClick={() => {}} key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow onClick={() => {}} key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow highlighted={highlighted} onClick={() => {}} key="2">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow onClick={() => {}} key="3">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow onClick={() => {}} key="4">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow onClick={() => {}} key="5">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
  ];

  const [recordsRange, setRecordsRange] = useState({
    start: 0,
    end: 5,
  });
  const [update, setUpdate] = React.useState(false);
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
    setRecordsRange({
      start,
      end,
    });
    setCurrentPage(newPage);
  };

  React.useEffect(() => {
    setTimeout(() => setUpdate(true), 300);
  }, [update]);

  React.useEffect(() => {
    setUpdate(false);
  }, [currentPage]);

  const loading = (
    <>
      <FlatTableRow>
        <FlatTableCell colspan={4}>Loading State</FlatTableCell>
      </FlatTableRow>
    </>
  );

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
        {...rest}
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader width={180}>Location</FlatTableHeader>
            <FlatTableHeader width={150}>Relationship Status</FlatTableHeader>
            <FlatTableHeader width={100}>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{update ? renderRows() : loading}</FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const HighlightedRowWithLoadingState = (
  props: Partial<FlatTableProps> & {
    expandableArea: "wholeRow" | "firstColumn";
  }
) => {
  const { expandableArea, ...rest } = props;
  const [highlighted, setHighlighted] = useState(true);
  const rows = (
    <>
      <FlatTableRow
        onClick={() => {}}
        expandable
        expandableArea={expandableArea}
      >
        <FlatTableCell>John Doe</FlatTableCell>
        <FlatTableCell>London</FlatTableCell>
        <FlatTableCell>Single</FlatTableCell>
        <FlatTableCell>0</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow
        onClick={() => {}}
        expandable
        expandableArea={expandableArea}
      >
        <FlatTableCell>Jane Doe</FlatTableCell>
        <FlatTableCell>York</FlatTableCell>
        <FlatTableCell>Married</FlatTableCell>
        <FlatTableCell>2</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow
        highlighted={highlighted}
        onClick={() => setHighlighted((p) => !p)}
        expandable
        expandableArea={expandableArea}
      >
        <FlatTableCell>John Smith</FlatTableCell>
        <FlatTableCell>Edinburgh</FlatTableCell>
        <FlatTableCell>Single</FlatTableCell>
        <FlatTableCell>1</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow
        onClick={() => {}}
        expandable
        expandableArea={expandableArea}
      >
        <FlatTableCell>Jane Smith</FlatTableCell>
        <FlatTableCell>Newcastle</FlatTableCell>
        <FlatTableCell>Married</FlatTableCell>
        <FlatTableCell>5</FlatTableCell>
      </FlatTableRow>
    </>
  );

  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setUpdate(true), 300);
  }, [update]);

  const loading = (
    <>
      <FlatTableRow>
        <FlatTableCell colspan={4}>Loading State</FlatTableCell>
      </FlatTableRow>
    </>
  );

  return (
    <div
      style={{
        height: "200px",
        marginBottom: "16px",
      }}
    >
      <FlatTable {...rest}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader width={180}>Location</FlatTableHeader>
            <FlatTableHeader width={150}>Relationship Status</FlatTableHeader>
            <FlatTableHeader width={100}>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{update ? rows : loading}</FlatTableBody>
      </FlatTable>
    </div>
  );
};
