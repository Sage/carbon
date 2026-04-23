import React, { useMemo, useState } from "react";
import { action } from "@storybook/addon-actions";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  FlatTableCheckbox,
  FlatTableProps,
  FlatTableRowProps,
  FlatTableHeaderProps,
  FlatTableRowHeaderProps,
  FlatTableCellProps,
  FlatTableBodyDraggable,
  Sort,
} from ".";
import Button from "../../../src/components/button";
import Box from "../../../src/components/box";
import Link from "../../../src/components/link";
import Icon from "../../../src/components/icon";
import guid from "../../__internal__/utils/helpers/guid";
import { FLAT_TABLE_THEMES } from "./flat-table.config";
import Heading from "../../../src/components/heading";
import Pager from "../../../src/components/pager";
import Drawer from "../../../src/components/drawer";
import Textbox from "../textbox/textbox.component";
import DateInput from "../date/date.component";
import {
  ActionPopover,
  ActionPopoverItem,
  ActionPopoverDivider,
  ActionPopoverMenuButton,
  ActionPopoverMenuButtonProps,
} from "../../components/action-popover";
import SplitButton from "../../components/split-button";
import MultiActionButton from "../../components/multi-action-button";
import DateRange, { DateRangeChangeEvent } from "../date-range";
import PopoverContainer from "../popover-container";
import Typography from "../typography";

export default {
  title: "Flat Table/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
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
        <input title="input 1" />
      </FlatTableCell>
      <FlatTableCell>
        <input title="input 2" />
      </FlatTableCell>
      <FlatTableCell>
        <input title="input 3" />
      </FlatTableCell>
      <FlatTableCell>
        <input title="input 4" />
      </FlatTableCell>
      <FlatTableCell>
        <input title="input 5" />
      </FlatTableCell>
      <FlatTableCell>
        <input title="input 6" />
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

FlatTableStory.storyName = "Default";
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
FlatTableStory.parameters = { chromatic: { disableSnapshot: true } };

export const ExpandableWithLinkAndActionPopover = () => {
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

  const renderMenuButton = (props: ActionPopoverMenuButtonProps) => (
    <ActionPopoverMenuButton
      buttonType="tertiary"
      iconType="ellipsis_vertical"
      iconPosition="after"
      size="small"
      {...props}
    >
      Action
    </ActionPopoverMenuButton>
  );

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
          <FlatTableCell>
            <ActionPopover renderButton={renderMenuButton} mx="-8px">
              <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
ExpandableWithLinkAndActionPopover.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SubRowsAsAComponent = () => {
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
SubRowsAsAComponent.parameters = { chromatic: { disableSnapshot: true } };

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
FlatTableInsideDrawer.storyName = "Inside Drawer";

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
        <Textbox
          label=""
          labelInline
          labelAlign="right"
          value=""
          onChange={() => {}}
        />
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
        <Textbox
          label=""
          labelInline
          labelAlign="right"
          value=""
          onChange={() => {}}
        />
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
            <Textbox
              label=""
              labelInline
              labelAlign="right"
              value=""
              onChange={() => {}}
            />
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
            <Textbox
              label=""
              labelInline
              labelAlign="right"
              value=""
              onChange={() => {}}
            />
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
            <Textbox
              label=""
              labelInline
              labelAlign="right"
              value=""
              onChange={() => {}}
            />
          </FlatTableCell>
          <FlatTableCell>text content</FlatTableCell>
          <FlatTableCell>
            <Textbox
              label=""
              labelInline
              labelAlign="right"
              value=""
              onChange={() => {}}
            />
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
FlatRowHeaderWithNoPaddingAndButtons.storyName =
  "Row Header With No Padding and Buttons";
FlatRowHeaderWithNoPaddingAndButtons.parameters = {
  chromatic: { disableSnapshot: true },
};

const themes: Array<FlatTableProps["colorTheme"]> = [
  "dark",
  "light",
  "transparent-base",
  "transparent-white",
];

export const FlatTableThemes = () => (
  <main>
    <Box mb={2}>
      <h2> With alternate header background</h2>
      <Box mb={4}>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> With sticky head</h2>
      <Box mb={4}>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Minimal design</h2>
      <Box mb={2}>
        <FlatTable
          colorTheme="transparent-white"
          hasOuterVerticalBorders={false}
          bottomBorderRadius="borderRadius000"
        >
          <FlatTableHead>
            <FlatTableRow horizontalBorderSize="medium">
              <FlatTableHeader px="0">Header a</FlatTableHeader>
              <FlatTableHeader px="0">Header b</FlatTableHeader>
              <FlatTableHeader px="0">Header c</FlatTableHeader>
              <FlatTableHeader px="0">Header d</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
              <FlatTableCell px="0">Cell a</FlatTableCell>
              <FlatTableCell px="0">Cell b</FlatTableCell>
              <FlatTableCell px="0">Cell c</FlatTableCell>
              <FlatTableCell px="0">Cell d</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
              <FlatTableCell px="0">Cell a</FlatTableCell>
              <FlatTableCell px="0">Cell b</FlatTableCell>
              <FlatTableCell px="0">Cell c</FlatTableCell>
              <FlatTableCell px="0">Cell d</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
              <FlatTableCell px="0">Cell a</FlatTableCell>
              <FlatTableCell px="0">Cell b</FlatTableCell>
              <FlatTableCell px="0">Cell c</FlatTableCell>
              <FlatTableCell px="0">Cell d</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
              <FlatTableCell px="0">Cell a</FlatTableCell>
              <FlatTableCell px="0">Cell b</FlatTableCell>
              <FlatTableCell px="0">Cell c</FlatTableCell>
              <FlatTableCell px="0">Cell d</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      </Box>
    </Box>
  </main>
);
FlatTableThemes.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};
FlatTableThemes.storyName = "Themes";

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

  const rowsLargerDiv = [
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

  const renderRowsLargerDiv = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rowsLargerDiv;
    if (end > rowsLargerDiv.length)
      return rowsLargerDiv.slice(start, rowsLargerDiv.length);
    return rowsLargerDiv.slice(start, end);
  };

  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  return (
    <Box>
      <Box mb={2}>
        <h2> Sticky head</h2>
        <Box height="150px">
          <FlatTable hasStickyHead title="Table for Sticky Header">
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
      </Box>
      <Box mb={2}>
        <h2> Sticky footer</h2>
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
      </Box>
      <Box mb={2}>
        <h2> Sticky footer inside larger div</h2>
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
            <FlatTableBody>{renderRowsLargerDiv()}</FlatTableBody>
          </FlatTable>
        </Box>
      </Box>
      <Box mb={2}>
        <h2> Sticky head and footer</h2>
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
                              <ActionPopoverItem
                                icon="email"
                                onClick={() => {}}
                              >
                                Email Invoice
                              </ActionPopoverItem>
                              <ActionPopoverDivider />
                              <ActionPopoverItem
                                icon="delete"
                                onClick={() => {}}
                              >
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
                              <ActionPopoverItem
                                icon="email"
                                onClick={() => {}}
                              >
                                Email Invoice
                              </ActionPopoverItem>
                              <ActionPopoverDivider />
                              <ActionPopoverItem
                                icon="delete"
                                onClick={() => {}}
                              >
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
      </Box>
    </Box>
  );
};
FlatTableWithStickyHeadAndFooter.storyName = "With Sticky Head And Footer";

export const FlatTableRowSpanColSpan = () => (
  <main>
    <Box mb={2}>
      <h2> rowSpan</h2>
      <Box>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> colSpan</h2>
      <Box mb={4}>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Header with rowSpan and colSpan</h2>
      <Box mb={4}>
        <FlatTable title="Table for Header with Row and Column spans">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader rowspan={2}>Name</FlatTableHeader>
              <FlatTableRowHeader rowspan={2}>Code</FlatTableRowHeader>
              <FlatTableHeader colspan={2}>Jun 21</FlatTableHeader>
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
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableRowHeader>000001</FlatTableRowHeader>
              <FlatTableCell>London</FlatTableCell>
              <FlatTableCell>Single</FlatTableCell>
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
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableRowHeader>000001</FlatTableRowHeader>
              <FlatTableCell>London</FlatTableCell>
              <FlatTableCell>Single</FlatTableCell>
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
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableRowHeader>000001</FlatTableRowHeader>
              <FlatTableCell>London</FlatTableCell>
              <FlatTableCell>Single</FlatTableCell>
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
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>John Doe</FlatTableCell>
              <FlatTableRowHeader>000001</FlatTableRowHeader>
              <FlatTableCell>London</FlatTableCell>
              <FlatTableCell>Single</FlatTableCell>
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
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      </Box>
    </Box>
  </main>
);
FlatTableRowSpanColSpan.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};
FlatTableRowSpanColSpan.storyName = "With rowSpan and colSpan";

type SortType = "ascending" | "descending";
type TableRowData = Record<string, string | number>;

export const ExtendedColumnSorting = (args: FlatTableProps) => {
  const initialHeaders = [
    { name: "client", label: "Client", isActive: true },
    { name: "region", label: "Region", isActive: false },
    { name: "total", label: "Total (£)", isActive: false },
    { name: "orders", label: "Orders", isActive: false },
    { name: "lastPurchase", label: "Last Purchase", isActive: false },
  ];

  const data: TableRowData[] = useMemo(() => {
    return [
      {
        id: 1,
        client: "Jason Atkinson",
        region: "London",
        total: 1349,
        orders: 12,
        lastPurchase: "2025-09-18",
      },
      {
        id: 2,
        client: "Monty Parker",
        region: "Manchester",
        total: 849,
        orders: 8,
        lastPurchase: "2025-10-04",
      },
      {
        id: 3,
        client: "Blake Sutton",
        region: "Bristol",
        total: 3840,
        orders: 25,
        lastPurchase: "2025-09-22",
      },
      {
        id: 4,
        client: "Tyler Webb",
        region: "Leeds",
        total: 280,
        orders: 3,
        lastPurchase: "2025-10-10",
      },
      {
        id: 5,
        client: "Sophie Evans",
        region: "Cardiff",
        total: 1620,
        orders: 15,
        lastPurchase: "2025-10-02",
      },
      {
        id: 6,
        client: "Amelia Wright",
        region: "Liverpool",
        total: 2195,
        orders: 17,
        lastPurchase: "2025-09-30",
      },
    ];
  }, []);

  const [headers, setHeaders] = useState(initialHeaders);
  const [sortBy, setSortBy] = useState(initialHeaders[0].name);
  const [sortType, setSortType] = useState<SortType>("ascending");

  const handleSortClick = (columnName: string) => {
    setHeaders((prev) =>
      prev.map((h) => ({
        ...h,
        isActive: h.name === columnName,
      })),
    );
    setSortBy(columnName);
    setSortType((prev) => (prev === "ascending" ? "descending" : "ascending"));
  };

  const sortedData = useMemo(() => {
    const sortFn = (a: TableRowData, b: TableRowData) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      const isAscending = sortType === "ascending";

      if (typeof valA === "number" && typeof valB === "number") {
        return isAscending ? valA - valB : valB - valA;
      }

      const isDate =
        typeof valA === "string" &&
        typeof valB === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(valA) &&
        /^\d{4}-\d{2}-\d{2}$/.test(valB);

      if (isDate) {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();
        return isAscending ? dateA - dateB : dateB - dateA;
      }

      const strA = String(valA).toUpperCase();
      const strB = String(valB).toUpperCase();

      if (strA < strB) return isAscending ? -1 : 1;
      if (strA > strB) return isAscending ? 1 : -1;
      return 0;
    };

    return [...data].sort(sortFn);
  }, [data, sortBy, sortType]);

  return (
    <>
      <Typography as="div" role="status" aria-live="polite" screenReaderOnly>
        {`Sort by ${sortBy} (${sortType})`}
      </Typography>
      <FlatTable {...args} title="Sales Overview Table">
        <FlatTableHead>
          <FlatTableRow>
            {headers.map(({ name, label, isActive }) => (
              <FlatTableHeader key={name}>
                <Sort
                  onClick={() => handleSortClick(name)}
                  {...(isActive && { sortType })}
                >
                  {label}
                </Sort>
              </FlatTableHeader>
            ))}
          </FlatTableRow>
        </FlatTableHead>

        <FlatTableBody>
          {sortedData.map((row) => (
            <FlatTableRow key={row.id}>
              {headers.map(({ name }) => (
                <FlatTableCell key={name}>{row[name]}</FlatTableCell>
              ))}
            </FlatTableRow>
          ))}
        </FlatTableBody>
      </FlatTable>
    </>
  );
};

export const FlatTableWrappingAndTruncation = () => (
  <main>
    <Box mb={2}>
      <h2> With long table header and cell content</h2>
      <Box p={4} width="300px" backgroundColor="red">
        <FlatTable title="Table with Long Table Header and Cell">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>
                Really long table header that should wrap
              </FlatTableHeader>
              <FlatTableRowHeader>Name</FlatTableRowHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>000001</FlatTableCell>
              <FlatTableRowHeader>John Wrap</FlatTableRowHeader>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>000002</FlatTableCell>
              <FlatTableRowHeader>Jane Wrap</FlatTableRowHeader>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Truncated header</h2>
      <Box mb={4}>
        <FlatTable title="Table for Truncated Header Content">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableRowHeader width={100}>Name</FlatTableRowHeader>
              <FlatTableRowHeader
                width={120}
                pr={0}
                truncate
                title="Alternate Title"
              >
                Location of the main dwelling of the resident
              </FlatTableRowHeader>
              <FlatTableRowHeader>Notes</FlatTableRowHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {[1, 2, 3, 4].map((key) => (
              <FlatTableRow key={key}>
                <FlatTableCell>John Doe</FlatTableCell>
                <FlatTableCell>London</FlatTableCell>
                <FlatTableCell>
                  <Textbox
                    size="small"
                    aria-label="textbox"
                    value=""
                    onChange={() => {}}
                  />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Truncated cell</h2>
      <Box mb={4}>
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
                <FlatTableCell
                  width={50}
                  pr={0}
                  truncate
                  title="Alternate Title"
                >
                  London
                </FlatTableCell>
                <FlatTableCell>
                  <Textbox
                    size="small"
                    aria-label="textbox"
                    value=""
                    onChange={() => {}}
                  />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </Box>
    </Box>
  </main>
);
FlatTableWrappingAndTruncation.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};
FlatTableWrappingAndTruncation.storyName = "Wrapping and Truncation";

export const FlatTableCustomStyling = () => (
  <main>
    <Box mb={2}>
      <h2> Custom cell padding</h2>
      <Box mb={4}>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Custom column width</h2>
      <Box mb={4}>
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
                  <Textbox
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
      <h2> Custom row background color</h2>
      <Box mb={4}>
        <FlatTable title="Table for Custom Row Background Color">
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
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
                checked={false}
                onChange={() => {}}
              />
              <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
              <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
              <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
              <FlatTableCell>0</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableRowHeader>2</FlatTableRowHeader>
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
                checked={false}
                onChange={() => {}}
              />
              <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
              <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
              <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
              <FlatTableCell>2</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow bgColor="#B1D345">
              <FlatTableRowHeader>3</FlatTableRowHeader>
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
                checked={false}
                onChange={() => {}}
              />
              <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
              <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
              <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
              <FlatTableCell>1</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableRowHeader>4</FlatTableRowHeader>
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Custom horizontal border size</h2>
      <Box mb={4}>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Custom horizontal border color</h2>
      <Box mb={4}>
        <FlatTable title="Table for Custom Horizontal Border Color">
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Custom bottom border radius</h2>
      <Box mb={4}>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Custom vertical borders</h2>
      <Box mb={4}>
        <FlatTable title="Table for Custom Vertical Borders">
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
      </Box>
    </Box>
  </main>
);
FlatTableCustomStyling.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};
FlatTableCustomStyling.storyName = "Custom Styling";

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

export const FlatTableZebraAndDraggable = () => (
  <main>
    <Box mb={2}>
      <h2> Zebra rows</h2>
      <Box mb={4}>
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
      </Box>
    </Box>
    <Box mb={2}>
      <h2> Draggable rows</h2>
      <Box mb={4}>
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
                <FlatTableCell>{row.name}</FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBodyDraggable>
        </FlatTable>
      </Box>
    </Box>
  </main>
);

FlatTableZebraAndDraggable.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};
FlatTableZebraAndDraggable.storyName = "Zebra and Draggable";
