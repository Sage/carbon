import React, { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { DataGridColumn } from "../../data-grid.types";
import DataGridCellEditor from "./data-grid-cell-editor.component";
import I18nContext from "../../../../__internal__/i18n-context";
import enGB from "../../../../locales/en-gb";

interface Row {
  id: number;
  name?: string;
  type?: string;
}

const commonProps = {
  rowIndex: 0,
  weight: "regular" as const,
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

test("falls back to the default cell label when the locale has no dataGrid entry", () => {
  render(
    <I18nContext.Provider value={{ ...enGB, dataGrid: undefined }}>
      <DataGridCellEditor
        {...commonProps}
        column={{ field: "name", headerName: "Name" }}
        value="Alpha"
      />
    </I18nContext.Provider>,
  );
  expect(screen.getByRole("textbox", { name: "Name, row 1" })).toHaveValue(
    "Alpha",
  );
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

test("keeps dropdown selection keys within an IME composition", () => {
  const onKeyDown = jest.fn();
  render(
    <DataGridCellEditor
      {...commonProps}
      column={{
        field: "type",
        headerName: "Type",
        type: "dropdown",
        filterable: true,
        options: [{ label: "Service", value: "service" }],
      }}
      value="service"
      onKeyDown={onKeyDown}
    />,
  );
  const editor = screen.getByRole("combobox");
  fireEvent.compositionStart(editor);
  fireEvent.keyDown(editor, { key: "Escape" });
  expect(onKeyDown).not.toHaveBeenCalled();
  fireEvent.compositionEnd(editor);
  fireEvent.keyDown(editor, { key: "Escape" });
  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test("preserves medium weight while editing a dropdown", () => {
  const column: DataGridColumn<Row> = {
    field: "type",
    headerName: "Type",
    type: "dropdown",
    options: [{ label: "Service", value: "service" }],
  };

  render(
    <DataGridCellEditor
      {...commonProps}
      column={column}
      value="service"
      weight="medium"
    />,
  );

  expect(screen.getByTestId("data-grid-select-editor")).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-m)",
  );
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
