import React, { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { DataGridColumn } from "../../data-grid.types";
import DataGridCellEditor from "./data-grid-cell-editor.component";

interface Row {
  id: number;
  name?: string;
  type?: string;
}

const commonProps = {
  rowIndex: 0,
  editorRef: createRef<HTMLInputElement>(),
  onChange: jest.fn(),
  onSelectionCommit: jest.fn(),
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

test("does not update the cell value while filtering dropdown options", () => {
  const onChange = jest.fn();
  const column: DataGridColumn<Row> = {
    field: "type",
    headerName: "Type",
    type: "dropdown",
    filterable: true,
    options: [
      { label: "Service", value: "service" },
      { label: "Software", value: "software" },
    ],
  };

  render(
    <DataGridCellEditor
      {...commonProps}
      column={column}
      value="service"
      onChange={onChange}
    />,
  );

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "soft" },
  });

  expect(onChange).not.toHaveBeenCalled();
});

test.each([false, true])(
  "describes an invalid dropdown editor (filterable=%s)",
  (filterable) => {
    const column: DataGridColumn<Row> = {
      field: "type",
      headerName: "Type",
      type: "dropdown",
      filterable,
      options: [{ label: "Service", value: "service" }],
    };

    render(
      <>
        <span id="type-error">Choose a type</span>
        <DataGridCellEditor
          {...commonProps}
          column={column}
          value="service"
          errorId="type-error"
          invalid
        />
      </>,
    );

    const editor = screen.getByRole("combobox", { name: "Type, row 1" });
    expect(editor).toHaveAttribute("aria-invalid", "true");
    expect(editor).toHaveAccessibleDescription("Choose a type");
  },
);
