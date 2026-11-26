import React from "react";

export type DataGridRowId = string | number;
export type DataGridCellType = "text" | "dropdown" | "checkbox" | "action";
export type DataGridCellWeight = "regular" | "medium";

export type DataGridRowInsertion =
  | { index: number }
  | { beforeRowId: DataGridRowId }
  | { afterRowId: DataGridRowId };

export interface DataGridApi<T extends object> {
  /** Appends a consumer-created row. */
  addRow: (row: T) => void;
  /** Inserts a consumer-created row at an index or relative to a stable row id. */
  insertRow: (row: T, insertion: DataGridRowInsertion) => void;
  /** Inserts a consumer-created duplicate before or after its source row. */
  duplicateRow: (
    sourceRowId: DataGridRowId,
    row: T,
    position?: "before" | "after",
  ) => void;
  /** Removes the row with the supplied stable id. */
  deleteRow: (rowId: DataGridRowId) => void;
  /** Moves a row to its final zero-based index. */
  moveRow: (rowId: DataGridRowId, toIndex: number) => void;
}

export interface DataGridOption {
  /** Stable option identity. Recommended when options can be reordered. */
  id?: string;
  label: string;
  value: string | number;
}

export interface DataGridCellParams<T extends object> {
  api: DataGridApi<T>;
  column: DataGridColumn<T>;
  field: string;
  row: T;
  rowId: DataGridRowId;
  value: unknown;
}

interface DataGridColumnBase<
  T extends object,
  TField extends string = Extract<keyof T, string>,
> {
  /** Property on each row used as the cell value. */
  field: TField;
  /** Visible column heading. */
  headerName: string;
  /** Accessible name when the visible heading is intentionally empty. */
  headerAriaLabel?: string;
  /** Fixed width in pixels. Action columns default to 52px. */
  width?: number;
  /** Minimum width when the column is flexible. */
  minWidth?: number;
  /** Relative width for flexible columns. */
  flex?: number;
  /** Pins the column to an edge of the scrolling grid. */
  pinned?: "left" | "right";
  /** Horizontal alignment for header and cell content. */
  align?: "left" | "center" | "right";
  /** Font weight used while the cell is not being edited. */
  weight?: DataGridCellWeight;
  /** Makes every cell in the column read-only, or derives it per row. */
  readOnly?: boolean | ((params: DataGridCellParams<T>) => boolean);
  /** Custom content, primarily intended for action popovers. */
  renderCell?: (params: DataGridCellParams<T>) => React.ReactNode;
}

export interface DataGridTextColumn<T extends object>
  extends DataGridColumnBase<T> {
  /** Text cells are the default variation. */
  type?: "text";
  options?: never;
}

export interface DataGridDropdownColumn<T extends object>
  extends DataGridColumnBase<T> {
  type: "dropdown";
  /** Options displayed by the dropdown editor. */
  options: DataGridOption[];
  /** Uses Carbon FilterableSelect as the cell editor. Experimental. */
  filterable?: boolean;
}

export interface DataGridCheckboxColumn<T extends object>
  extends DataGridColumnBase<T> {
  type: "checkbox";
  selectsRow?: boolean;
  options?: never;
}

export interface DataGridActionColumn<T extends object>
  extends DataGridColumnBase<T, string> {
  type: "action";
  options?: never;
  /** Action content is required because action cells have no built-in UI. */
  renderCell: (params: DataGridCellParams<T>) => React.ReactNode;
}

/** A column definition narrowed by its cell variation. */
export type DataGridColumn<T extends object> =
  | DataGridTextColumn<T>
  | DataGridDropdownColumn<T>
  | DataGridCheckboxColumn<T>
  | DataGridActionColumn<T>;

export interface DataGridCellError {
  /** Stable row identity, resolved using getRowId. */
  rowId: DataGridRowId;
  /** Field of the text or dropdown cell in error. */
  field: string;
  /** Accessible error message. Omit for an error indicator without a message. */
  message?: string;
  /** Optional application-defined identifier for the error. */
  code?: string;
}

export interface DataGridBeforeRowChangeParams<T extends object> {
  /** Latest rows, including earlier changes waiting for controlled rows to update. Treat as immutable. */
  previousRows: T[];
  /** Proposed rows. Treat these rows and their objects as immutable. */
  proposedRows: T[];
  /** Original requested operation, before any consumer transformation. */
  change: DataGridRowChange<T>;
}

export type DataGridBeforeRowChangeResult<T extends object> =
  | void
  | false
  | T[];

export interface DataGridProps<T extends object> {
  /** Rows to display. Data Grid does not change this array; pass a new array when updating rows. */
  rows: T[];
  /** Column definitions controlling display order, headers, cell types, and editing behaviour. */
  columns: DataGridColumn<T>[];
  /** Consumer-owned cell errors. These do not prevent editing or navigation. */
  errors?: readonly DataGridCellError[];
  /** Accessible name for the grid. */
  "aria-label"?: string;
  /** ID of an element that provides the grid's accessible name. */
  "aria-labelledby"?: string;
  /** ID of an element that provides additional grid guidance. */
  "aria-describedby"?: string;
  /** Reads a stable row id. Defaults to the row's `id` property. */
  getRowId?: (row: T) => DataGridRowId;
  /** Synchronously approve with no return, discard with false, or return transformed rows preserving the proposed row IDs and order. */
  onBeforeRowChange?: (
    params: DataGridBeforeRowChangeParams<T>,
  ) => DataGridBeforeRowChangeResult<T>;
  /** Called with updated rows and change details. Pass these rows back through `rows` to keep the changes. */
  onRowsChange?: (rows: T[], change: DataGridRowChange<T>) => void;
  /** Enables Tab and Shift+Tab cell navigation. */
  enableTabNavigation?: boolean;
  /** Keeps the header visible while the grid scrolls vertically. */
  stickyHeader?: boolean;
  /** Disables automatic row virtualisation in a height-constrained grid. */
  disableVirtualization?: boolean;
  /** Number of additional rows mounted above and below the viewport. */
  rowOverscan?: number;
  /** Maximum viewport height. Enables row virtualisation when constrained. */
  maxHeight?: number | string;
  /** Maximum viewport width. Enables horizontal scrolling when constrained. */
  maxWidth?: number | string;
}

export interface DataGridCellCommitParams<T extends object>
  extends DataGridCellParams<T> {
  value: unknown;
}

interface DataGridCellRowChange<T extends object> {
  type: "cell-edit" | "dropdown-select" | "checkbox-toggle";
  rowId: DataGridRowId;
  field: string;
  previousValue: unknown;
  value: unknown;
  previousRow: T;
  row: T;
}

export type DataGridRowChange<T extends object> =
  | DataGridCellRowChange<T>
  | { type: "row-add"; row: T; index: number }
  | { type: "row-insert"; row: T; index: number }
  | {
      type: "row-duplicate";
      sourceRowId: DataGridRowId;
      row: T;
      index: number;
    }
  | { type: "row-delete"; rowId: DataGridRowId; row: T; index: number }
  | {
      type: "row-move";
      rowId: DataGridRowId;
      row: T;
      fromIndex: number;
      toIndex: number;
    };

export interface DataGridHandle<T extends object> extends DataGridApi<T> {
  focusCell: (rowId: DataGridRowId, field: string) => void;
  editCell: (rowId: DataGridRowId, field: string) => void;
}

export interface DataGridCellPosition {
  row: number;
  column: number;
}

export interface DataGridCellIdentity {
  rowId: DataGridRowId;
  field: string;
}
