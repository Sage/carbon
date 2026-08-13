import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import DataGridHeader from "./__internal__/data-grid-header";
import DataGridRow from "./__internal__/data-grid-row";
import {
  StyledGrid,
  StyledSpacer,
  StyledTableWrapper,
} from "./__internal__/data-grid.style";
import {
  DataGridCellParams,
  DataGridCellPosition,
  DataGridHandle,
  DataGridProps,
  DataGridRowId,
} from "./data-grid.types";
import {
  getColumnWidth,
  getGridTemplateColumns,
  getStickyOffsets,
  scrollColumnIntoView,
  scrollRowIntoView,
} from "./__internal__/data-grid.utils";

export type {
  DataGridActionColumn,
  DataGridCellChangeParams,
  DataGridCellParams,
  DataGridCellType,
  DataGridCellWeight,
  DataGridCheckboxColumn,
  DataGridColumn,
  DataGridDropdownColumn,
  DataGridHandle,
  DataGridOption,
  DataGridProps,
  DataGridRowId,
  DataGridTextColumn,
} from "./data-grid.types";

const isPrintableKey = (event: React.KeyboardEvent) =>
  event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey;

const DataGridInner = <T extends object>(
  {
    rows,
    columns,
    "aria-label": ariaLabel,
    getRowId,
    onCellChange,
    enableTabNavigation = false,
    disableVirtualization = false,
    rowOverscan = 5,
    height,
    width,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<DataGridHandle>,
) => {
  const rowId = useCallback(
    (row: T) =>
      getRowId?.(row) ??
      ((row as T & { id: DataGridRowId }).id as DataGridRowId),
    [getRowId],
  );
  const [active, setActive] = useState<DataGridCellPosition>({
    row: 0,
    column: 0,
  });
  const [editing, setEditing] = useState<DataGridCellPosition | null>(null);
  const [draftValue, setDraftValue] = useState<unknown>("");
  const cellRefs = useRef(new Map<string, HTMLDivElement>());
  const editorRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef(false);

  const keyFor = useCallback(
    (rowIndex: number, columnIndex: number) =>
      `${String(rowId(rows[rowIndex]))}:${String(columns[columnIndex].field)}`,
    [columns, rowId, rows],
  );
  const registerCell = useCallback(
    (rowIndex: number, columnIndex: number, node: HTMLDivElement | null) => {
      const key = keyFor(rowIndex, columnIndex);
      if (node) cellRefs.current.set(key, node);
      else cellRefs.current.delete(key);
    },
    [keyFor],
  );

  const sticky = useMemo(() => getStickyOffsets(columns), [columns]);

  const contentWidth = useMemo(
    () => columns.reduce((total, column) => total + getColumnWidth(column), 0),
    [columns],
  );
  const gridTemplateColumns = useMemo(
    () => getGridTemplateColumns(columns),
    [columns],
  );

  const shouldVirtualize =
    !disableVirtualization && height !== undefined && rows.length > 20;
  const getVirtualRowKey = useCallback(
    (index: number) => rowId(rows[index]),
    [rowId, rows],
  );
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    enabled: shouldVirtualize,
    estimateSize: () => 40,
    getItemKey: getVirtualRowKey,
    getScrollElement: () => wrapperRef.current,
    overscan: rowOverscan,
    paddingStart: 40,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const renderedRowIndexes = shouldVirtualize
    ? virtualRows.map((virtualRow) => virtualRow.index)
    : rows.map((_, index) => index);
  const topPadding = shouldVirtualize
    ? Math.max(0, (virtualRows[0]?.start ?? 40) - 40)
    : 0;
  const bottomPadding = shouldVirtualize
    ? Math.max(
        0,
        rowVirtualizer.getTotalSize() -
          (virtualRows[virtualRows.length - 1]?.end ?? 40),
      )
    : 0;

  const focusPosition = useCallback(
    (position: DataGridCellPosition) => {
      if (!rows.length || !columns.length) return;
      const next = {
        row: Math.max(0, Math.min(rows.length - 1, position.row)),
        column: Math.max(0, Math.min(columns.length - 1, position.column)),
      };
      setEditing(null);
      setActive(next);
      scrollColumnIntoView(
        wrapperRef.current,
        columns,
        next.column,
        sticky.leftWidth,
        sticky.rightWidth,
      );
      scrollRowIntoView(wrapperRef.current, next.row);
      const cell = cellRefs.current.get(keyFor(next.row, next.column));
      if (cell) {
        cell.focus();
        pendingFocus.current = false;
      } else {
        pendingFocus.current = true;
      }
    },
    [columns, keyFor, rows.length, sticky],
  );

  const paramsFor = useCallback(
    (position: DataGridCellPosition): DataGridCellParams<T> => {
      const row = rows[position.row];
      const column = columns[position.column];
      const field = String(column.field);
      return {
        column,
        field,
        row,
        rowId: rowId(row),
        value: (row as Record<string, unknown>)[field],
      };
    },
    [columns, rowId, rows],
  );

  const isReadOnly = useCallback((params: DataGridCellParams<T>) => {
    const value = params.column.readOnly;
    return typeof value === "function" ? value(params) : !!value;
  }, []);

  const beginEdit = useCallback(
    (position: DataGridCellPosition, initialValue?: unknown) => {
      const params = paramsFor(position);
      if (isReadOnly(params) || params.column.type === "action") return;
      if (params.column.type === "checkbox") {
        onCellChange?.({ ...params, value: !Boolean(params.value) });
        return;
      }
      setActive(position);
      setDraftValue(initialValue ?? params.value ?? "");
      scrollColumnIntoView(
        wrapperRef.current,
        columns,
        position.column,
        sticky.leftWidth,
        sticky.rightWidth,
      );
      scrollRowIntoView(wrapperRef.current, position.row);
      setEditing(position);
    },
    [columns, isReadOnly, onCellChange, paramsFor, sticky],
  );

  useEffect(() => {
    if (!editing) return;
    editorRef.current?.focus();
    if (editorRef.current instanceof HTMLInputElement) {
      const end = editorRef.current.value.length;
      editorRef.current.setSelectionRange(end, end);
    }
  }, [editing, virtualRows]);

  useEffect(() => {
    if (!pendingFocus.current || editing) return;
    const cell = cellRefs.current.get(keyFor(active.row, active.column));
    if (cell) {
      cell.focus();
      pendingFocus.current = false;
    }
  }, [active, editing, keyFor, virtualRows]);

  const commitEdit = useCallback(() => {
    if (!editing) return;
    onCellChange?.({ ...paramsFor(editing), value: draftValue });
    setEditing(null);
  }, [draftValue, editing, onCellChange, paramsFor]);

  useImperativeHandle(
    ref,
    () => ({
      focusCell(targetRowId, field) {
        const position = {
          row: rows.findIndex((row) => rowId(row) === targetRowId),
          column: columns.findIndex((column) => column.field === field),
        };
        if (position.row >= 0 && position.column >= 0) focusPosition(position);
      },
      editCell(targetRowId, field) {
        const position = {
          row: rows.findIndex((row) => rowId(row) === targetRowId),
          column: columns.findIndex((column) => column.field === field),
        };
        if (position.row >= 0 && position.column >= 0) beginEdit(position);
      },
    }),
    [beginEdit, columns, focusPosition, rowId, rows],
  );

  const moveLinear = useCallback(
    (position: DataGridCellPosition, delta: number) => {
      const index = position.row * columns.length + position.column + delta;
      const bounded = Math.max(
        0,
        Math.min(rows.length * columns.length - 1, index),
      );
      focusPosition({
        row: Math.floor(bounded / columns.length),
        column: bounded % columns.length,
      });
    },
    [columns.length, focusPosition, rows.length],
  );

  const handleCellKeyDown = useCallback(
    (event: React.KeyboardEvent, position: DataGridCellPosition) => {
      const params = paramsFor(position);
      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        const delta = {
          ArrowLeft: { row: 0, column: -1 },
          ArrowRight: { row: 0, column: 1 },
          ArrowUp: { row: -1, column: 0 },
          ArrowDown: { row: 1, column: 0 },
        }[event.key];
        focusPosition({
          row: position.row + delta.row,
          column: position.column + delta.column,
        });
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (params.column.type === "action") {
          cellRefs.current
            .get(keyFor(position.row, position.column))
            ?.querySelector<HTMLElement>("button,[href],[tabindex]")
            ?.focus();
        } else {
          beginEdit(position);
        }
      } else if (event.key === " " && params.column.type === "checkbox") {
        event.preventDefault();
        beginEdit(position);
      } else if (enableTabNavigation && event.key === "Tab") {
        event.preventDefault();
        moveLinear(position, event.shiftKey ? -1 : 1);
      } else if (
        isPrintableKey(event) &&
        (params.column.type ?? "text") === "text"
      ) {
        event.preventDefault();
        beginEdit(position, event.key);
      }
    },
    [
      beginEdit,
      enableTabNavigation,
      focusPosition,
      keyFor,
      moveLinear,
      paramsFor,
    ],
  );

  const handleEditorKeyDown = useCallback(
    (event: React.KeyboardEvent, position: DataGridCellPosition) => {
      // The editor lives inside the gridcell, so keep editing keystrokes from
      // also triggering the cell's navigation-mode handler as they bubble.
      event.stopPropagation();
      if (event.key === "Escape") {
        event.preventDefault();
        pendingFocus.current = true;
        setEditing(null);
      } else if (event.key === "Enter") {
        event.preventDefault();
        pendingFocus.current = true;
        commitEdit();
      } else if (enableTabNavigation && event.key === "Tab") {
        event.preventDefault();
        commitEdit();
        moveLinear(position, event.shiftKey ? -1 : 1);
      }
    },
    [commitEdit, enableTabNavigation, moveLinear],
  );

  return (
    <StyledTableWrapper
      ref={wrapperRef}
      height={height}
      width={width}
      role="grid"
      aria-label={ariaLabel}
      aria-rowcount={rows.length + 1}
      aria-colcount={columns.length}
      data-component="data-grid-wrapper"
    >
      <StyledGrid contentWidth={contentWidth}>
        <DataGridHeader
          columns={columns}
          stickyOffsets={sticky.offsets}
          gridTemplateColumns={gridTemplateColumns}
        />
        <div role="rowgroup" data-component="data-grid-body">
          {topPadding > 0 && (
            <StyledSpacer role="presentation" height={topPadding} />
          )}
          {renderedRowIndexes.map((rowIndex) => {
            const row = rows[rowIndex];
            return (
              <DataGridRow
                key={rowId(row)}
                rowIndex={rowIndex}
                columns={columns}
                activeColumn={active.row === rowIndex ? active.column : -1}
                editingColumn={editing?.row === rowIndex ? editing.column : -1}
                draftValue={editing?.row === rowIndex ? draftValue : undefined}
                stickyOffsets={sticky.offsets}
                gridTemplateColumns={gridTemplateColumns}
                editorRef={editorRef}
                getParams={paramsFor}
                isReadOnly={isReadOnly}
                registerCell={registerCell}
                onActivate={setActive}
                onFocusPosition={focusPosition}
                onBeginEdit={beginEdit}
                onDraftChange={setDraftValue}
                onCommitEdit={commitEdit}
                onCellKeyDown={handleCellKeyDown}
                onEditorKeyDown={handleEditorKeyDown}
              />
            );
          })}
          {bottomPadding > 0 && (
            <StyledSpacer role="presentation" height={bottomPadding} />
          )}
        </div>
      </StyledGrid>
    </StyledTableWrapper>
  );
};

const ForwardedDataGrid = forwardRef(DataGridInner);
ForwardedDataGrid.displayName = "DataGrid";

export const DataGrid = ForwardedDataGrid as <T extends object>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<DataGridHandle> },
) => React.ReactElement;

export default DataGrid;
