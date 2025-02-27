export { default as FlatTable } from "./flat-table.component";
export { default as FlatTableHead } from "./flat-table-head/flat-table-head.component";
export { default as FlatTableHeader } from "./flat-table-header/flat-table-header.component";
export { default as FlatTableBody } from "./flat-table-body/flat-table-body.component";
export { default as FlatTableRow } from "./flat-table-row/flat-table-row.component";
export { default as FlatTableRowHeader } from "./flat-table-row-header/flat-table-row-header.component";
export { default as FlatTableCell } from "./flat-table-cell/flat-table-cell.component";
export { default as FlatTableCheckbox } from "./flat-table-checkbox/flat-table-checkbox.component";
export { default as FlatTableBodyDraggable } from "./flat-table-body-draggable/flat-table-body-draggable.component";
export { default as Sort } from "./sort/sort.component";

export type TableBorderSize = "small" | "medium" | "large";
export type TableCellAlign = "left" | "center" | "right";
export type { FlatTableProps } from "./flat-table.component";
export type { FlatTableHeadProps } from "./flat-table-head";
export type { FlatTableHeaderProps } from "./flat-table-header";
export type { FlatTableBodyProps } from "./flat-table-body";
export type { FlatTableBodyDraggableProps } from "./flat-table-body-draggable";
export type { UseDraggableHandle as FlatTableBodyDraggableHandle } from "../../hooks/useDraggable/useDraggable"
export type { FlatTableRowProps } from "./flat-table-row";
export type { FlatTableRowHeaderProps } from "./flat-table-row-header";
export type { FlatTableCellProps } from "./flat-table-cell";
export type { FlatTableCheckboxProps } from "./flat-table-checkbox";
export type { SortProps } from "./sort";
