import React from "react";
import { boolean, text, select, number } from "@storybook/addon-knobs";
import TableWrapper from "./table-story-helpers/table-story-wrapper.component";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import { Table } from ".";

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
      [
        OptionsHelper.tableThemes[0],
        OptionsHelper.tableThemes[1],
        OptionsHelper.tableThemes[2],
      ],
      Table.defaultProps.theme
    ),
    size: select("size", OptionsHelper.tableSizes, Table.defaultProps.size),
    isZebra: boolean("zebra striping", false),
  };
};

const inputKnobs = () => {
  return {
    inputType: select(
      "input type",
      [
        OptionsHelper.inputTypes[0],
        OptionsHelper.inputTypes[1],
        OptionsHelper.inputTypes[2],
      ],
      OptionsHelper.inputTypes[0]
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
