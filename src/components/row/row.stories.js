import React from "react";
import { text, boolean, select } from "@storybook/addon-knobs";

import OptionsHelper from "../../utils/helpers/options-helper";
import { Row, Column } from ".";

export default {
  title: "Row/Test",
  component: Row,
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

export const Default = () => {
  const columnDivide = boolean("columnDivide", true);
  const gutter = select(
    "gutter",
    OptionsHelper.sizesFull,
    Row.defaultProps.gutter
  );

  const columnAlign = select(
    "columnAlign",
    ["left", "middle", "center", "right"],
    Column.defaultProps.columnAlign
  );
  const columnOffset = text("columnOffset", Column.defaultProps.columnOffset);
  const columnSpan = text("columnSpan", Column.defaultProps.columnSpan);
  const children = text("children", "content");

  return (
    <Row columnDivide={columnDivide} gutter={gutter}>
      <Column
        columnAlign={columnAlign}
        columnOffset={columnOffset}
        columnSpan={columnSpan}
      >
        {children}
      </Column>
      <Column
        columnAlign={columnAlign}
        columnOffset={columnOffset}
        columnSpan={columnSpan}
      >
        {children}
      </Column>
      <Column
        columnAlign={columnAlign}
        columnOffset={columnOffset}
        columnSpan={columnSpan}
      >
        {children}
      </Column>
      <Column
        columnAlign={columnAlign}
        columnOffset={columnOffset}
        columnSpan={columnSpan}
      >
        {children}
      </Column>
    </Row>
  );
};
