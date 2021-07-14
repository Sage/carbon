import React, { useState } from "react";
import {
  boolean,
  withKnobs,
  select,
  number,
  text,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  Sort,
} from ".";
import guid from "../../utils/helpers/guid";

export default {
  title: "Design System/Flat Table/Test",
  component: FlatTable,
  decorators: [withKnobs],
  parameters: {
    chromatic: {
      disable: true,
    },
    knobs: {
      escapeHTML: false,
    },
  },
};

export const Default = () => {
  const ariaDescribedby = text("ariaDescribedby", "");
  const hasStickyHead = boolean("hasStickyHead", false);
  const hasHeaderRow = boolean("hasHeaderRow", false);
  const hasClickableRows = boolean("hasClickableRows", false);
  const caption = text("caption", "");
  const colorTheme = select(
    "colorTheme",
    [...OptionsHelper.flatTableThemes],
    "dark"
  );
  const firstColumnWidth = number("first column width", 150);
  const secondColumnWidth = number("second column width", 120);
  const size = select(
    "size",
    OptionsHelper.tableSizes,
    FlatTable.defaultProps.size
  );
  const processed = getTableData();
  // used to show how the table behaves constrained or on lower resolutions
  const tableSizeConstraints = {
    height: "auto",
    width: "auto",
    overflowX: "auto",
  };
  const horizontalBorderSize = select("horizontalBorderSize", [
    "small",
    "medium",
    "large",
  ]);
  const horizontalBorderColor = text("horizontalBorderColor", "");
  const bgColor = text("bgColor", "");
  const verticalBorder = select("verticalBorder", ["small", "medium", "large"]);
  const verticalBorderColor = text("verticalBorderColor", "");
  let onClickFn;
  let rowWithInputs;

  if (hasStickyHead) {
    tableSizeConstraints.height = "300px";
  }

  if (hasHeaderRow) {
    tableSizeConstraints.width = "600px";
  }

  if (hasClickableRows) {
    onClickFn = action("click");
    rowWithInputs = getRowWithInputs(onClickFn, hasHeaderRow);
  }

  return (
    <div style={tableSizeConstraints}>
      <FlatTable
        colorTheme={colorTheme}
        hasStickyHead={hasStickyHead}
        caption={caption}
        size={size}
        ariaDescribedby={ariaDescribedby}
      >
        <FlatTableHead>
          <FlatTableRow
            key={processed.headData.id}
            horizontalBorderSize={horizontalBorderSize && horizontalBorderSize}
          >
            {processed.headData.data.map((cellData, index) => {
              let Component = FlatTableHeader;

              if (index === 0 && hasHeaderRow) {
                Component = FlatTableRowHeader;
              }

              return (
                <Component
                  key={cellData.id}
                  {...(index === 0 && { width: firstColumnWidth })}
                  {...(index === 1 && { width: secondColumnWidth })}
                  verticalBorder={verticalBorder && verticalBorder}
                >
                  {cellData.content}
                </Component>
              );
            })}
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          {rowWithInputs}
          {processed.bodyData.map((rowData) => (
            <FlatTableRow
              key={rowData.id}
              onClick={onClickFn}
              horizontalBorderSize={
                horizontalBorderSize && horizontalBorderSize
              }
              horizontalBorderColor={
                horizontalBorderColor && horizontalBorderColor
              }
              bgColor={bgColor && bgColor}
            >
              {rowData.bodyData.map((cellData, index) => {
                let Component = FlatTableCell;

                if (index === 0 && hasHeaderRow) {
                  Component = FlatTableRowHeader;
                }

                return (
                  <Component
                    key={cellData.id}
                    align={cellData.align}
                    verticalBorder={verticalBorder}
                    verticalBorderColor={verticalBorderColor}
                  >
                    {cellData.content}
                  </Component>
                );
              })}
            </FlatTableRow>
          ))}
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const Sortable = () => {
  const colorTheme = select(
    "colorTheme",
    [...OptionsHelper.flatTableThemes],
    "dark"
  );

  const headDataItems = [
    { name: "client", isActive: false },
    { name: "total", isActive: false },
  ];

  const bodyDataItems = [
    { client: "Jason Atkinson", total: 1349 },
    { client: "Monty Parker", total: 849 },
    { client: "Blake Sutton", total: 3840 },
    { client: "Tyler Webb", total: 280 },
  ];

  const [headData, setHeadData] = useState(headDataItems);
  const [sortType, setSortType] = useState("ascending");
  const [sortValue, setSortValue] = useState();

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
    <FlatTable colorTheme={colorTheme}>
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
  );
};

Sortable.story = {
  name: "sortable",
  parameters: {
    info: { disable: true },
    docs: {
      page: null,
    },
  },
};

Default.story = {
  name: "default",
  parameters: {
    info: { disable: true },
    docs: {
      page: null,
    },
  },
};

const getDay = (i) => {
  if (i > 28) {
    return "05";
  }

  if (i < 10) {
    return `0${i}`;
  }

  return `${i}`;
};

const getMonth = (i) => {
  if (i > 12) {
    return "11";
  }

  if (i < 10) {
    return `0${i}`;
  }

  return `${i}`;
};

const getYear = (i) => 2020 - i;

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
};

const rowData = (i) => ({
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

function getRowWithInputs(onClickFn, hasHeaderRow) {
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

function getTableData() {
  return processJsonData({
    labels: headRowData,
    clients: renderBody(8),
  });
}

function renderBody(rowCount) {
  const rows = [...Array(rowCount)];

  return rows.map((_, i) => {
    return rowData(i);
  });
}

function processJsonData({ labels, clients }) {
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

function processRowData(row, cellType) {
  return Object.keys(row).map((columnKey) => {
    let align = "left";

    if (["performanceReview", "employmentStart"].includes(columnKey)) {
      align = "right";
    }

    return {
      id: guid(),
      content: row[columnKey],
      cellType,
      align,
    };
  });
}
