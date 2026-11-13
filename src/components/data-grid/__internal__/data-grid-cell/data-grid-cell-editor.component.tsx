import React from "react";

import {
  CustomSelectChangeEvent,
  FilterableSelect,
  Option,
  Select,
} from "../../../select";
import { DataGridColumn } from "../../data-grid.types";
import { StyledEditor, StyledSelectEditor } from "../data-grid.style";

interface DataGridCellEditorProps<T extends object> {
  column: DataGridColumn<T>;
  rowIndex: number;
  value: unknown;
  errorId?: string;
  invalid?: boolean;
  editorRef: React.RefObject<HTMLInputElement>;
  onChange: (value: unknown) => void;
  onSelectionCommit: (value: unknown) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

/** The edit-mode control selected by a column's discriminated `type`. */
const DataGridCellEditor = <T extends object>({
  column,
  rowIndex,
  value,
  errorId,
  invalid,
  editorRef,
  onChange,
  onSelectionCommit,
  onBlur,
  onKeyDown,
}: DataGridCellEditorProps<T>) => {
  const label = `${column.headerName}, row ${rowIndex + 1}`;

  if (column.type === "dropdown") {
    const selectedIndex = column.options.findIndex((option) =>
      Object.is(option.value, value),
    );
    const selectedValue = selectedIndex < 0 ? "" : String(selectedIndex);
    const handleSelectChange = (
      event: CustomSelectChangeEvent | React.ChangeEvent<HTMLInputElement>,
    ) => {
      // Carbon Select's public type includes native input events for legacy
      // compatibility, but both Select variants emit custom selection events.
      /* istanbul ignore if */
      if (!("selectionConfirmed" in event)) {
        return;
      }

      if (!event.selectionConfirmed) return;

      const option = column.options[Number(event.target.value)];
      onChange(option.value);
      onSelectionCommit(option.value);
    };
    const options = column.options.map((option, index) => {
      const optionId =
        option.id ?? `${typeof option.value}-${String(option.value)}-${index}`;

      return (
        <Option
          {...(option.id && { id: option.id })}
          key={optionId}
          value={String(index)}
          text={option.label}
        >
          {option.label}
        </Option>
      );
    });
    const commonProps = {
      "aria-label": label,
      "aria-describedby": errorId,
      error: invalid || undefined,
      openOnFocus: true,
      onBlur,
      onChange: handleSelectChange,
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Carbon Select owns selection, filtering and option navigation. The
        // grid only owns leaving or cancelling the active cell editor.
        if (event.key === "Tab") onKeyDown(event);
      },
      ref: editorRef as React.RefObject<HTMLInputElement>,
      value: selectedValue,
    };

    return (
      <StyledSelectEditor
        onKeyDownCapture={(event) => {
          // The open list handles Escape before the textbox receives it. Use
          // capture so one press both dismisses the list and exits edit mode.
          if (event.key === "Escape") onKeyDown(event);
        }}
      >
        {column.filterable ? (
          <FilterableSelect {...commonProps}>{options}</FilterableSelect>
        ) : (
          <Select {...commonProps}>{options}</Select>
        )}
      </StyledSelectEditor>
    );
  }

  return (
    <StyledEditor
      ref={editorRef as React.RefObject<HTMLInputElement>}
      value={String(value ?? "")}
      aria-label={label}
      aria-describedby={errorId}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

export default DataGridCellEditor;
