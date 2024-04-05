import React from "react";
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
import Box from "../../../src/components/box";
import Link from "../../../src/components/link";
import guid from "../../__internal__/utils/helpers/guid";
import { FLAT_TABLE_THEMES } from "./flat-table.config";
import { WithSortingHeaders } from "./flat-table.stories";

export default {
  title: "Flat Table/Test",
  includeStories: [
    "FlatTableStory",
    "ExpandableWithLink",
    "SortableStory",
    "SubRowsAsAComponentStory",
    "FlatTableSizeFocus",
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
  let rowWithInputs: React.ReactElement | null = null;
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

export const SortableStory = {
  ...WithSortingHeaders,
  args: { ...WithSortingHeaders.args, colorTheme: "dark" },
  name: "Sortable",
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

export const FlatTableSizeFocus = () => {
  return (
    <Box p={1}>
      <FlatTable>
        <FlatTableBody>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>
              <Box>
                <Box py="3">Option 1</Box>
              </Box>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>
              <Box my="3">
                <Box>Option 2</Box>
              </Box>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>
              <Box my={3}>
                <Box height="69px">Option 3</Box>
              </Box>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow onClick={() => {}}>
            <FlatTableCell>Option 4</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
};
