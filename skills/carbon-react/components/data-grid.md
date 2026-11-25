---
name: carbon-component-data-grid
description: Carbon DataGrid component props and usage examples.
---

# DataGrid

An accessible, editable grid for navigating and updating structured tabular data.

## When to use

- Users need to edit structured data across multiple related rows and columns.
- Users need spreadsheet-style keyboard navigation between editable cells.
- A large editable data set benefits from row virtualization, pinned columns or a sticky header.

## When not to use

- Users only need to read or compare tabular data without editing it.
- The data-entry workflow is better represented as a short conventional form.

## Choose instead

- **Table:** Users primarily need to read and compare tabular data rather than edit it.

## Pitfalls

- Treat rows as controlled data and pass the collection received by onRowsChange back to DataGrid.
- Provide stable row identifiers through each row's id property or getRowId.
- Give the grid an accessible name with aria-label or aria-labelledby.
- Keep pinned columns in contiguous groups at the corresponding edge and give them predictable widths.
- Give custom controls rendered in action cells accessible names and appropriate keyboard behaviour.
- Keep application-level calculations, error-summary layout and row-operation business rules outside DataGrid.

## Import
`import { DataGrid } from "carbon-react/lib/components/data-grid";`

## Source
- Export: `./components/data-grid`
- Props interface: `DataGridProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| columns | DataGridColumn<T>[] | Yes |  |  |  |
| rows | T[] | Yes |  |  |  |
| disableVirtualization | boolean \| undefined | No |  | Disables automatic row virtualisation in a height-constrained grid. |  |
| enableTabNavigation | boolean \| undefined | No |  | Enables Tab and Shift+Tab cell navigation. |  |
| errors | readonly DataGridCellError[] \| undefined | No |  | Consumer-owned cell errors. These do not prevent editing or navigation. |  |
| getRowId | ((row: T) => DataGridRowId) \| undefined | No |  | Reads a stable row id. Defaults to the row's `id` property. |  |
| maxHeight | string \| number \| undefined | No |  | Maximum viewport height. Enables row virtualisation when constrained. |  |
| maxWidth | string \| number \| undefined | No |  | Maximum viewport width. Enables horizontal scrolling when constrained. |  |
| onRowsChange | ((rows: T[], change: DataGridRowChange<T>) => void) \| undefined | No |  | Called with a new immutable row collection and the change that produced it. |  |
| rowOverscan | number \| undefined | No |  | Number of additional rows mounted above and below the viewport. |  |
| stickyHeader | boolean \| undefined | No |  | Keeps the header visible while the grid scrolls vertically. |  |
| aria-describedby | string \| undefined | No |  | ID of an element that provides additional grid guidance. |  |
| aria-label | string \| undefined | No |  | Accessible name for the grid. |  |
| aria-labelledby | string \| undefined | No |  | ID of an element that provides the grid's accessible name. |  |

## Related API types

```ts
export type DataGridCellWeight = "regular" | "medium";

export type DataGridRowId = string | number;

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

export interface DataGridOption {
  /** Stable option identity. Recommended when options can be reordered. */
  id?: string;
  label: string;
  value: string | number;
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

export type DataGridCellType = "text" | "dropdown" | "checkbox" | "action";

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
```

## Examples
No examples have been curated for agent use.