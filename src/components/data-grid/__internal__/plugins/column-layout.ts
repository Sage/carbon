import invariant from "invariant";
import {
  DataGridColumn,
  DataGridColumnLayout,
  DataGridResolvedColumn,
} from "../../data-grid.types";
import { getDataGridColumnWidth } from "../layout/data-grid-column-model";

export const columnRegion = <T extends object>(column: DataGridColumn<T>) =>
  column.sticky ?? ("center" as const);

export const columnMinimum = <T extends object>(column: DataGridColumn<T>) =>
  Math.max(1, column.minWidth ?? 40);

export const clampColumnWidth = <T extends object>(
  column: DataGridColumn<T>,
  width: number,
) =>
  Math.max(columnMinimum(column), Math.min(column.maxWidth ?? Infinity, width));

/** Reconcile stale IDs and widths without mutating consumer definitions. */
export function reconcileColumnLayout<T extends object>(
  columns: readonly DataGridColumn<T>[],
  layout: DataGridColumnLayout,
): DataGridColumnLayout {
  const byId = new Map(columns.map((column) => [String(column.field), column]));
  const getColumn = (id: string) => {
    const column = byId.get(id);
    invariant(column, `Unknown DataGrid column: ${id}`);
    return column;
  };
  const requested = [...new Set([...layout.order, ...byId.keys()])].filter(
    (id) => byId.has(id),
  );
  // Preserve region boundaries, even for externally supplied layouts.
  const queues = {
    left: requested.filter((id) => columnRegion(getColumn(id)) === "left"),
    center: requested.filter((id) => columnRegion(getColumn(id)) === "center"),
    right: requested.filter((id) => columnRegion(getColumn(id)) === "right"),
  };
  const widths = Object.fromEntries(
    Object.entries(layout.widths)
      .filter(([id, width]) => byId.has(id) && Number.isFinite(width))
      .map(([id, width]) => [id, clampColumnWidth(getColumn(id), width)]),
  );
  return {
    order: columns.map(
      (column) => queues[columnRegion(column)].shift() ?? String(column.field),
    ),
    widths,
  };
}

/** Resolve flex tracks once so rows, sticky offsets and scrolling agree. */
export function resolveColumns<T extends object>(
  definitions: readonly DataGridColumn<T>[],
  layout: DataGridColumnLayout,
  viewportWidth: number,
): DataGridResolvedColumn<T>[] {
  const byId = new Map(
    definitions.map((column) => [String(column.field), column]),
  );
  const columns = layout.order.map((id, index) => {
    const definition = byId.get(id);
    invariant(definition, `Unknown DataGrid column: ${id}`);
    return {
      id,
      definition,
      index,
      widthPx: clampColumnWidth(
        definition,
        layout.widths[id] ?? getDataGridColumnWidth(definition),
      ),
      minWidthPx: columnMinimum(definition),
      maxWidthPx: definition.maxWidth,
      region: columnRegion(definition),
    };
  });
  let flexible = columns.filter(
    (column) =>
      (column.definition.flex ?? 0) > 0 &&
      layout.widths[column.id] === undefined &&
      column.definition.width === undefined,
  );
  let remaining =
    viewportWidth -
    columns
      .filter((column) => !flexible.includes(column))
      .reduce((sum, column) => sum + column.widthPx, 0);
  // Freeze constraints with the net violation's sign. Freezing every bound at
  // once can leave unused space when minimums and maximums compete.
  while (flexible.length) {
    const totalFlex = flexible.reduce(
      (sum, column) => sum + (column.definition.flex ?? 0),
      0,
    );
    const candidates = flexible.map((column) => {
      const share = (remaining * (column.definition.flex ?? 0)) / totalFlex;
      const minimum = Math.max(
        column.minWidthPx,
        column.definition.minWidth ?? 120,
      );
      const width = Math.max(
        minimum,
        Math.min(column.maxWidthPx ?? Infinity, share),
      );
      return { column, width, violation: width - share };
    });
    const violation = candidates.reduce((sum, item) => sum + item.violation, 0);
    if (Math.abs(violation) < 0.001) {
      candidates.forEach(({ column, width }) => {
        column.widthPx = width;
      });
      break;
    }
    const frozen = candidates.filter((item) =>
      violation > 0 ? item.violation > 0 : item.violation < 0,
    );
    frozen.forEach(({ column, width }) => {
      column.widthPx = width;
      remaining -= width;
    });
    flexible = flexible.filter(
      (column) => !frozen.some((item) => item.column === column),
    );
  }
  return columns;
}
