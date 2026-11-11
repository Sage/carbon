import React from "react";

import { DataGridColumn } from "../../data-grid.types";
import { StyledEditor, StyledSelect } from "../data-grid.style";

interface DataGridCellEditorProps<T extends object> {
  column: DataGridColumn<T>;
  rowIndex: number;
  value: unknown;
  editorRef: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  onChange: (value: unknown) => void;
  onSelectionCommit: (value: unknown) => void;
  onBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

/** The edit-mode control selected by a column's discriminated `type`. */
const DataGridCellEditor = <T extends object>({
  column,
  rowIndex,
  value,
  editorRef,
  onChange,
  onSelectionCommit,
  onBlur,
  onKeyDown,
}: DataGridCellEditorProps<T>) => {
  const label = `${column.headerName}, row ${rowIndex + 1}`;

  if (column.type === "dropdown") {
    return (
      <StyledSelect
        ref={editorRef as React.RefObject<HTMLSelectElement>}
        value={String(value ?? "")}
        aria-label={label}
        onChange={(event) => onSelectionCommit(event.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        {column.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    );
  }

  return (
    <StyledEditor
      ref={editorRef as React.RefObject<HTMLInputElement>}
      value={String(value ?? "")}
      aria-label={label}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

export default DataGridCellEditor;
