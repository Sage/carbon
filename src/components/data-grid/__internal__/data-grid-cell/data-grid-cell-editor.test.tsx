import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";

import { DataGridColumn } from "../../data-grid.types";
import DataGridCellEditor from "./data-grid-cell-editor.component";

interface Row {
  id: number;
  name?: string;
  type?: string;
}

const commonProps = {
  rowIndex: 0,
  editorRef: createRef<HTMLInputElement | HTMLSelectElement>(),
  onChange: jest.fn(),
  onBlur: jest.fn(),
  onKeyDown: jest.fn(),
};

test.each([
  {
    column: { field: "name", headerName: "Name" } as DataGridColumn<Row>,
    role: "textbox",
  },
  {
    column: {
      field: "type",
      headerName: "Type",
      type: "dropdown",
      options: [{ label: "Choose", value: "" }],
    } as DataGridColumn<Row>,
    role: "combobox",
  },
])("normalizes a null $role editor value", ({ column, role }) => {
  render(<DataGridCellEditor {...commonProps} column={column} value={null} />);

  expect(screen.getByRole(role)).toHaveValue("");
});
