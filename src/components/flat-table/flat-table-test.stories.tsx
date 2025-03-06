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
import Button from "../../../src/components/button";
import Box from "../../../src/components/box";
import Link from "../../../src/components/link";
import guid from "../../__internal__/utils/helpers/guid";
import { FLAT_TABLE_THEMES } from "./flat-table.config";
import { WithSortingHeaders } from "./flat-table.stories";
import Heading from "../../../src/components/heading";
import Pager from "../../../src/components/pager";
import Drawer from "../../../src/components/drawer";
import Textbox from "../textbox/textbox.component";
import DateInput from "../date/date.component";
import {
  ActionPopover,
  ActionPopoverItem,
  ActionPopoverDivider,
} from "../../components/action-popover";
import SplitButton from "../../components/split-button";
import MultiActionButton from "../../components/multi-action-button";
import DateRange, { DateRangeChangeEvent } from "../date-range";
import PopoverContainer from "../popover-container";

export default {
  title: "Flat Table/Test",
  includeStories: [
    "FlatTableStory",
    "ExpandableWithLink",
    "SortableStory",
    "SubRowsAsAComponentStory",
    "FlatTableSizeFocus",
    "FlatTableInsideDrawer",
    "FlatRowHeaderWithNoPaddingAndButtons",
    "FlatTableThemesWithAlternateHeaderBackground",
    "FlatTableThemesWithStickyHead",
    "FlatTableWithStickyHeadAndFooter",
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
  cellType: "header" | "cell",
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

export const FlatTableInsideDrawer = () => {
  return (
    <Drawer
      height="calc(100vh - 122px)"
      expandedWidth="640px"
      animationDuration="0s"
      expanded
      sidebar={
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Box mx={5} mb={3} mt={3}>
            <Heading divider={false} title="Title title" mb={2} />
          </Box>
          <Box flex={1} overflowY="auto" padding={4}>
            <FlatTable
              hasStickyHead
              hasStickyFooter
              colorTheme="transparent-base"
              height="100%"
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
                  <FlatTableHeader pl={5}>Name</FlatTableHeader>
                  <FlatTableHeader>Location</FlatTableHeader>
                  <FlatTableHeader>Relationship Status</FlatTableHeader>
                  <FlatTableHeader>Dependents</FlatTableHeader>
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
                        ]}
                      >
                        <FlatTableCell>John Doe</FlatTableCell>
                        <FlatTableCell>London</FlatTableCell>
                        <FlatTableCell>Single</FlatTableCell>
                        <FlatTableCell>0</FlatTableCell>
                      </FlatTableRow>
                    );
                  })}
              </FlatTableBody>
            </FlatTable>
          </Box>
        </Box>
      }
    >
      <div />
    </Drawer>
  );
};
export const FlatRowHeaderWithNoPaddingAndButtons = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableRowHeader p={0} stickyAlignment="left">
        <Button>Button</Button>
      </FlatTableRowHeader>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableCell>
        <Textbox label="" labelInline labelAlign="right" />
      </FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableRowHeader p={0} stickyAlignment="right">
        subrow content
      </FlatTableRowHeader>
      <FlatTableCell>subrow content</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableRowHeader p={0} stickyAlignment="left">
        subrow content
      </FlatTableRowHeader>
      <FlatTableCell>
        <Button>Button</Button>
      </FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableCell>
        <Textbox label="" labelInline labelAlign="right" />
      </FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableCell>subrow content</FlatTableCell>
      <FlatTableRowHeader p={0} stickyAlignment="right">
        subrow content
      </FlatTableRowHeader>
      <FlatTableCell>subrow content</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <FlatTable width="800px" overflowX="auto">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Sticky TD</FlatTableHeader>
          <FlatTableRowHeader p={0} stickyAlignment="left">
            Sticky TH
          </FlatTableRowHeader>
          <FlatTableHeader>Column</FlatTableHeader>
          <FlatTableHeader>Column</FlatTableHeader>
          <FlatTableHeader>Column</FlatTableHeader>
          <FlatTableHeader>Column</FlatTableHeader>
          <FlatTableHeader>Column</FlatTableHeader>
          <FlatTableHeader>Column</FlatTableHeader>
          <FlatTableRowHeader p={0} stickyAlignment="right">
            Sticky TH
          </FlatTableRowHeader>
          <FlatTableHeader>Sticky TD</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>
            <Textbox label="" labelInline labelAlign="right" />
          </FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="left">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content </FlatTableCell>
          <FlatTableCell>text content </FlatTableCell>
          <FlatTableCell>text content </FlatTableCell>
          <FlatTableCell>text content </FlatTableCell>
          <FlatTableCell>text content </FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="right">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
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
            />
          </FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="left">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>
            <Textbox label="" labelInline labelAlign="right" />
          </FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="right">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>
            <Button>Button</Button>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="left">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>
            <Textbox label="" labelInline labelAlign="right" />
          </FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>
            <Textbox label="" labelInline labelAlign="right" />
          </FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="right">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="left">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="right">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="left">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableRowHeader p={0} stickyAlignment="right">
            <Button>Button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};

const themes: Array<FlatTableProps["colorTheme"]> = [
  "dark",
  "light",
  "transparent-base",
  "transparent-white",
];

export const FlatTableThemesWithAlternateHeaderBackground = () => (
  <>
    {themes.map((ftTheme, index) => (
      <React.Fragment key={`${ftTheme}-with-alt-background-${index + 1}`}>
        <FlatTable
          aria-label={`${ftTheme}-with-alt-background`}
          mt={1}
          colorTheme={ftTheme}
        >
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader alternativeBgColor>Name</FlatTableHeader>
              <FlatTableHeader>Location</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableCell>London</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      </React.Fragment>
    ))}
  </>
);
FlatTableThemesWithAlternateHeaderBackground.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FlatTableThemesWithStickyHead = () => (
  <>
    {themes.map((ftTheme, index) => (
      <React.Fragment key={`${ftTheme}-with-sticky-head-${index + 1}`}>
        <FlatTable
          aria-label={`${ftTheme}-with-sticky-head`}
          height="100px"
          mt={1}
          colorTheme={ftTheme}
          hasStickyHead
        >
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Name</FlatTableHeader>
              <FlatTableHeader>Location</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableCell>London</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableCell>London</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableCell>London</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      </React.Fragment>
    ))}
  </>
);
FlatTableThemesWithStickyHead.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FlatTableWithStickyHeadAndFooter = () => {
  const [state, setState] = useState(["2016-10-01", "2016-10-30"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  const [open, setOpen] = useState(new Array(25).fill(false));
  const togglePopover = (index: number) => {
    setOpen((prev) =>
      prev.map((popoverstate, i) =>
        i === index ? !popoverstate : popoverstate,
      ),
    );
  };

  return (
    <Box>
      <FlatTable
        hasStickyHead
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
            <FlatTableHeader pl={5}>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Date Range</FlatTableHeader>
            <FlatTableHeader>Multi Actions Button</FlatTableHeader>
            <FlatTableHeader>Action</FlatTableHeader>
            <FlatTableHeader>Date</FlatTableHeader>
            <FlatTableHeader>Split Button</FlatTableHeader>
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
                      <FlatTableCell>Child one</FlatTableCell>
                      <FlatTableCell>York</FlatTableCell>
                      <FlatTableCell>Single</FlatTableCell>
                      <FlatTableCell>2</FlatTableCell>
                      <FlatTableCell>
                        <ActionPopover>
                          <ActionPopoverItem icon="email" onClick={() => {}}>
                            Email Invoice
                          </ActionPopoverItem>
                          <ActionPopoverDivider />
                          <ActionPopoverItem icon="delete" onClick={() => {}}>
                            Delete
                          </ActionPopoverItem>
                        </ActionPopover>
                      </FlatTableCell>
                      <FlatTableCell>date</FlatTableCell>
                      <FlatTableCell>split button</FlatTableCell>
                    </FlatTableRow>,
                    <FlatTableRow key="sub-row-2">
                      <FlatTableCell>Child two</FlatTableCell>
                      <FlatTableCell>Edinburgh</FlatTableCell>
                      <FlatTableCell>Single</FlatTableCell>
                      <FlatTableCell>1</FlatTableCell>
                      <FlatTableCell>
                        <ActionPopover>
                          <ActionPopoverItem icon="email" onClick={() => {}}>
                            Email Invoice
                          </ActionPopoverItem>
                          <ActionPopoverDivider />
                          <ActionPopoverItem icon="delete" onClick={() => {}}>
                            Delete
                          </ActionPopoverItem>
                        </ActionPopover>
                      </FlatTableCell>
                      <FlatTableCell>date</FlatTableCell>
                      <FlatTableCell>split button</FlatTableCell>
                    </FlatTableRow>,
                  ]}
                >
                  <FlatTableCell>John Doe</FlatTableCell>
                  <FlatTableCell>
                    <PopoverContainer
                      title="Cover Button"
                      shouldCoverButton
                      open={open[key]}
                      onClose={() => {
                        togglePopover(key);
                      }}
                      onOpen={() => {
                        togglePopover(key);
                      }}
                    >
                      Content
                    </PopoverContainer>
                  </FlatTableCell>
                  <FlatTableCell>
                    <DateRange
                      startLabel="Start"
                      endLabel="End"
                      value={state}
                      onChange={handleChange}
                    />
                  </FlatTableCell>
                  <FlatTableCell>
                    <MultiActionButton text="Multi Action Button">
                      <Button>Button 1</Button>
                      <Button>Button 2</Button>
                      <Button>Button 3</Button>
                    </MultiActionButton>
                  </FlatTableCell>
                  <FlatTableCell>
                    <ActionPopover>
                      <ActionPopoverItem icon="email" onClick={() => {}}>
                        Email Invoice
                      </ActionPopoverItem>
                      <ActionPopoverDivider />
                      <ActionPopoverItem icon="delete" onClick={() => {}}>
                        Delete
                      </ActionPopoverItem>
                    </ActionPopover>
                  </FlatTableCell>
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
                  <FlatTableCell>
                    <SplitButton text="Split button">
                      <Button href="#">Button 1</Button>
                      <Button>Button 2</Button>
                      <Button>Button 3</Button>
                    </SplitButton>
                  </FlatTableCell>
                </FlatTableRow>
              );
            })}
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
};

FlatTableWithStickyHeadAndFooter.parameters = {
  chromatic: { disableSnapshot: true },
};
