import React from "react";
import { boolean, text, select, number } from "@storybook/addon-knobs";
import TableWrapper from "./table-story-helpers/table-story-wrapper.component";
import { Table } from ".";
import { TABLE_INPUT_TYPES, TABLE_SIZES, TABLE_THEMES } from "./table.config";

export default {
  title: "Table/Test",
  component: Table,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

const commonKnobs = ({
  paginate: defaultPaginate = false,
  showPageSizeSelection: defaultShowPageSizeSelection = false,
} = {}) => {
  const paginate = boolean("paginate", defaultPaginate);
  const showPageSizeSelection =
    paginate && boolean("showPageSizeSelection", defaultShowPageSizeSelection);
  const selectable = boolean("selectable", false);
  const highlightable = boolean("highlightable", false);

  return {
    sortOrder: select("sortOrder", ["", "asc", "desc"], ""),
    sortedColumn: select("sortedColumn", ["", "name", "code"], ""),
    highlightable,
    selectable,
    isPassiveData:
      !highlightable && !selectable
        ? boolean("isPassiveData", false)
        : undefined,
    shrink: boolean("shrink", false),
    caption: text("caption", "Country and Country Codes"),
    totalRecords: number("totalRecords", 193),
    pageSize: !showPageSizeSelection ? number("pageSize", 10) : undefined,
    paginate,
    showPageSizeSelection,
  };
};

const dlsKnobs = () => {
  return {
    theme: select(
      "tableTheme",
      [TABLE_THEMES[0], TABLE_THEMES[1], TABLE_THEMES[2]],
      Table.defaultProps.theme
    ),
    size: select("size", TABLE_SIZES, Table.defaultProps.size),
    isZebra: boolean("zebra striping", false),
  };
};

const inputKnobs = () => {
  return {
    inputType: select(
      "input type",
      [TABLE_INPUT_TYPES[0], TABLE_INPUT_TYPES[1], TABLE_INPUT_TYPES[2]],
      TABLE_INPUT_TYPES[0]
    ),
  };
};

export const Default = () => {
  const tableProps = {
    ...commonKnobs(),
    ...dlsKnobs(),
  };

  return <TableWrapper {...tableProps} />;
};

export const DefaultWithInputs = () => {
  const tableProps = {
    ...commonKnobs(),
    ...dlsKnobs(),
    ...inputKnobs(),
  };

  return <TableWrapper {...tableProps} />;
};

Default.story = {
  name: "default",
};
