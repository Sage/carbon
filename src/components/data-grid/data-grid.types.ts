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
  /** Accessible name when the visible heading is intentionally empty. */
  headerAriaLabel?: string;
  /** Fixed width in pixels. Action columns default to 52px. */
  width?: number;
  /** Minimum width for flexible columns and layout width overrides. */
  minWidth?: number;
  /** Maximum width accepted by column layout commands. */
  maxWidth?: number;
  /** Relative width for flexible columns. */
  flex?: number;
  /** Pins the column to an edge of the scrolling grid. */
  sticky?: "left" | "right";
  /** Horizontal alignment for header and cell content. */
  align?: "left" | "center" | "right";
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
  /** Checkbox cells do not support an error treatment. */
  error?: never;
}

export interface DataGridActionColumn<T extends object>
  extends DataGridColumnBase<T> {
  type: "action";
  options?: never;
  /** Action cells do not support an error treatment. */
  error?: never;
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
  /** Optional extensions. Column fields must be unique and stable. */
  plugins?: readonly DataGridPlugin<T>[];
  /** Controlled column layout. Commands request changes via the callback. */
  columnLayout?: DataGridColumnLayout;
  /** Initial layout for an uncontrolled grid. */
  defaultColumnLayout?: DataGridColumnLayout;
  onColumnLayoutChange?: (layout: DataGridColumnLayout) => void;
  /** Accessible name for the grid. */
  "aria-label"?: string;
  /** ID of an element that provides the grid's accessible name. */
  "aria-labelledby"?: string;
  /** ID of an element that provides additional grid guidance. */
  "aria-describedby"?: string;
  /** Reads a stable row id. Defaults to the row's `id` property. */
  getRowId?: (row: T) => DataGridRowId;
  /** Called after a cell edit is committed. */
  onCellChange?: (params: DataGridCellChangeParams<T>) => void;
  /** Enables Tab and Shift+Tab cell navigation. */
  enableTabNavigation?: boolean;
  /** Keeps the header visible while the grid scrolls vertically. */
  stickyHeader?: boolean;
  /** Disables automatic row virtualization in a height-constrained grid. */
  disableVirtualization?: boolean;
  /** Number of additional rows mounted above and below the viewport. */
  rowOverscan?: number;
  /** Maximum viewport height. Enables row virtualization when constrained. */
  maxHeight?: number | string;
  /** Maximum viewport width. Enables horizontal scrolling when constrained. */
  maxWidth?: number | string;
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

/** Experimental plugin contract. Column identity is the column's field. */
export interface DataGridColumnLayout {
  readonly order: readonly string[];
  readonly widths: Readonly<Record<string, number>>;
}

export interface DataGridResolvedColumn<T extends object> {
  readonly id: string;
  readonly definition: Readonly<DataGridColumn<T>>;
  readonly index: number;
  /** Resolved track width in pixels, including flex distribution. */
  readonly widthPx: number;
  readonly minWidthPx: number;
  readonly maxWidthPx?: number;
  readonly region: "left" | "center" | "right";
}

export interface DataGridSnapshot<T extends object> {
  readonly columns: readonly DataGridResolvedColumn<T>[];
  readonly columnLayout: DataGridColumnLayout;
}

export interface DataGridPluginApi<T extends object> {
  getSnapshot: () => DataGridSnapshot<T>;
  /** Observes applied snapshots; returns an unsubscribe function. */
  subscribe: (listener: () => void) => () => void;
  columns: {
    setWidth: (columnId: string, widthPx: number) => void;
    resetWidth: (columnId: string) => void;
    /** Movement is restricted to the column's current pinned region. */
    move: (
      columnId: string,
      target: {
        columnId: string;
        placement: "before" | "after";
      },
    ) => void;
  };
  elements: {
    getHeader: (columnId: string) => HTMLElement | null;
    /** Mounted body cells only; virtualized rows outside the render window are absent. */
    getColumnCells: (columnId: string) => readonly HTMLElement[];
    getViewport: () => HTMLElement | null;
  };
  announce: (message: string) => void;
}

export interface DataGridPluginProps<T extends object> {
  api: DataGridPluginApi<T>;
  snapshot: DataGridSnapshot<T>;
}

export interface DataGridHeaderSlotProps<T extends object>
  extends DataGridPluginProps<T> {
  column: DataGridResolvedColumn<T>;
}

export interface DataGridPlugin<T extends object> {
  id: string;
  apiVersion: 1;
  Controller?: React.ComponentType<DataGridPluginProps<T>>;
  slots?: {
    /** Additive controls rendered next to the header label. */
    headerActions?: React.ComponentType<DataGridHeaderSlotProps<T>>;
    /** Exclusive slot anchored to the right edge of the header. */
    headerResizeHandle?: React.ComponentType<DataGridHeaderSlotProps<T>>;
    overlay?: React.ComponentType<DataGridPluginProps<T>>;
  };
}
