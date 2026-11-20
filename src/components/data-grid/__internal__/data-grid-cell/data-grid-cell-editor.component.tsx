import React, { useRef } from "react";

import {
  CustomSelectChangeEvent,
  FilterableSelect,
  Option,
  Select,
} from "../../../select";
import { DataGridCellWeight, DataGridColumn } from "../../data-grid.types";
import { StyledEditor, StyledSelectEditor } from "../data-grid.style";
import useDataGridCellLabel from "../hooks/use-data-grid-cell-label";

interface DataGridCellEditorProps<T extends object> {
  column: DataGridColumn<T>;
  rowIndex: number;
  value: unknown;
  errorId?: string;
  invalid?: boolean;
  tabIndex?: number;
  weight: DataGridCellWeight;
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
  tabIndex = 0,
  weight,
  editorRef,
  onChange,
  onSelectionCommit,
  onBlur,
  onKeyDown,
}: DataGridCellEditorProps<T>) => {
  const label = useDataGridCellLabel(
    column.headerAriaLabel ?? column.headerName,
    rowIndex,
  );
  const composing = useRef(false);
  const compositionProps = {
    onCompositionStart: () => {
      composing.current = true;
    },
    onCompositionEnd: () => {
      composing.current = false;
    },
  };
  const handleCompositionKeyDown = (event: React.KeyboardEvent) => {
    if (!composing.current && !event.nativeEvent.isComposing) return false;
    event.stopPropagation();
    return true;
  };

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
      tabIndex,
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
        {...compositionProps}
        $weight={weight}
        data-role="data-grid-select-editor"
        onKeyDownCapture={(event) => {
          if (handleCompositionKeyDown(event)) return;
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
      {...compositionProps}
      tabIndex={tabIndex}
      ref={editorRef as React.RefObject<HTMLInputElement>}
      value={String(value ?? "")}
      aria-label={label}
      aria-describedby={errorId}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyDownCapture={handleCompositionKeyDown}
    />
  );
};

export default DataGridCellEditor;
