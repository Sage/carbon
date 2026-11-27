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
  /** The column definition that determines the editor type and available options. */
  column: DataGridColumn<T>;
  /** The zero-based row index used to generate the editor's accessible label. */
  rowIndex: number;
  /** The current draft value, which is not written to the row until committed. */
  value: unknown;
  /** The ID of the validation message associated with the editor. */
  errorId?: string;
  /** Whether to display the editor in its validation error state. */
  invalid?: boolean;
  /** Controls whether the editor participates in the grid's roving tab order. */
  tabIndex?: number;
  /** The font weight applied to the editor content. */
  weight: DataGridCellWeight;
  /** The input ref used to restore focus and text selection when editing resumes. */
  editorRef: React.RefObject<HTMLInputElement>;
  /** Updates the draft without committing the change to the row. */
  onChange: (value: unknown) => void;
  /** Commits a confirmed dropdown option using its original, unencoded value. */
  onSelectionCommit: (value: unknown) => void;
  /** Handles leaving the input, including the grid's commit-on-blur behaviour. */
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Handles grid-level editor commands such as committing, cancelling and Tab navigation. */
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
  const tabbing = useRef(false);
  const compositionEscape = useRef(false);
  const compositionProps = {
    onCompositionStart: () => {
      composing.current = true;
    },
    onCompositionEnd: () => {
      composing.current = false;
    },
    onKeyUpCapture: (event: React.KeyboardEvent) => {
      if (event.key === "Escape" && compositionEscape.current) {
        compositionEscape.current = false;
        event.stopPropagation();
      }
    },
  };
  const handleCompositionKeyDown = (event: React.KeyboardEvent) => {
    if (!composing.current && !event.nativeEvent.isComposing) return false;
    if (event.key === "Escape") compositionEscape.current = true;
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
      if (!tabbing.current) onSelectionCommit(option.value);
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
      ref: editorRef as React.RefObject<HTMLInputElement>,
      value: selectedValue,
    };

    return (
      <StyledSelectEditor
        {...compositionProps}
        $weight={weight}
        data-role="data-grid-select-editor"
        onKeyDown={(event) => {
          if (event.key === "Tab") onKeyDown(event);
        }}
        onKeyDownCapture={(event) => {
          if (handleCompositionKeyDown(event)) return;
          tabbing.current = event.key === "Tab";
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
