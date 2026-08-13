import React from "react";

export type DataGridRowId = string | number;
export type DataGridCellType = "text" | "dropdown" | "checkbox" | "action";
export type DataGridCellWeight = "regular" | "medium";

export interface DataGridOption {
  label: string;
  value: string | number;
}

export interface DataGridCellParams<T extends object> {
  column: DataGridColumn<T>;
  field: string;
  row: T;
  rowId: DataGridRowId;
  value: unknown;
}

interface DataGridColumnBase<T extends object> {
  /** Property on each row used as the cell value. */
  field: Extract<keyof T, string> | (string & {});
  /** Visible column heading. */
  headerName: string;
  /** Fixed width in pixels. Action columns default to 52px. */
  width?: number;
  /** Minimum width when the column is flexible. */
  minWidth?: number;
  /** Relative width for flexible columns. */
  flex?: number;
  /** Pins the column to an edge of the scrolling grid. */
  sticky?: "left" | "right";
  /** Font weight used while the cell is not being edited. */
  weight?: DataGridCellWeight;
  /** Makes every cell in the column read-only, or derives it per row. */
  readOnly?: boolean | ((params: DataGridCellParams<T>) => boolean);
  /** Error text/state for a cell. */
  error?:
    | string
    | boolean
    | ((params: DataGridCellParams<T>) => string | boolean);
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
}

export interface DataGridCheckboxColumn<T extends object>
  extends DataGridColumnBase<T> {
  type: "checkbox";
  options?: never;
}

export interface DataGridActionColumn<T extends object>
  extends DataGridColumnBase<T> {
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

export interface DataGridProps<T extends object> {
  rows: T[];
  columns: DataGridColumn<T>[];
  /** Accessible name for the grid. */
  "aria-label": string;
  /** Reads a stable row id. Defaults to the row's `id` property. */
  getRowId?: (row: T) => DataGridRowId;
  /** Called after a cell edit is committed. */
  onCellChange?: (params: DataGridCellChangeParams<T>) => void;
  /** Enables Tab and Shift+Tab cell navigation. */
  enableTabNavigation?: boolean;
  /** Disables automatic row virtualization in a height-constrained grid. */
  disableVirtualization?: boolean;
  /** Number of additional rows mounted above and below the viewport. */
  rowOverscan?: number;
  height?: number | string;
  width?: number | string;
}

export interface DataGridCellChangeParams<T extends object>
  extends DataGridCellParams<T> {
  value: unknown;
}

export interface DataGridHandle {
  focusCell: (rowId: DataGridRowId, field: string) => void;
  editCell: (rowId: DataGridRowId, field: string) => void;
}

export interface DataGridCellPosition {
  row: number;
  column: number;
}
