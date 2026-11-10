import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import invariant from "invariant";
import {
  DataGridColumn,
  DataGridColumnLayout,
  DataGridPlugin,
  DataGridPluginApi,
  DataGridSnapshot,
  DataGridRowId,
} from "../../data-grid.types";
import {
  clampColumnWidth,
  reconcileColumnLayout,
  resolveColumns,
} from "./column-layout";

const EMPTY_LAYOUT: DataGridColumnLayout = { order: [], widths: {} };
const useCommittedEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function useColumnPlugins<T extends object>({
  definitions,
  plugins,
  columnLayout,
  defaultColumnLayout,
  onColumnLayoutChange,
  viewportRef,
}: {
  definitions: DataGridColumn<T>[];
  plugins: readonly DataGridPlugin<T>[];
  columnLayout?: DataGridColumnLayout;
  defaultColumnLayout?: DataGridColumnLayout;
  onColumnLayoutChange?: (layout: DataGridColumnLayout) => void;
  viewportRef: RefObject<HTMLDivElement>;
}) {
  const [internalLayout, setInternalLayout] = useState(
    defaultColumnLayout ?? EMPTY_LAYOUT,
  );
  const [viewportWidth, setViewportWidth] = useState(0);
  const [announcement, announce] = useState("");
  const headers = useRef(new Map<string, HTMLElement>());
  const cells = useRef(new Map<string, Map<DataGridRowId, HTMLElement>>());
  const listeners = useRef(new Set<() => void>());
  const enabled =
    plugins.length > 0 ||
    columnLayout !== undefined ||
    defaultColumnLayout !== undefined;
  invariant(
    new Set(plugins.map((plugin) => plugin.id)).size === plugins.length,
    "DataGrid plugin IDs must be unique.",
  );
  invariant(
    plugins.every((plugin) => plugin.apiVersion === 1),
    "Unsupported DataGrid plugin API version.",
  );
  invariant(
    plugins.filter((plugin) => plugin.slots?.headerResizeHandle).length <= 1,
    "DataGrid supports one headerResizeHandle plugin at a time.",
  );
  invariant(
    !enabled ||
      new Set(definitions.map((column) => column.field)).size ===
        definitions.length,
    "DataGrid plugins require unique column fields.",
  );

  useCommittedEffect(() => {
    if (!enabled) return undefined;
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const measure = () => setViewportWidth(viewport.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [enabled, viewportRef]);

  const layout = useMemo(
    () => reconcileColumnLayout(definitions, columnLayout ?? internalLayout),
    [definitions, columnLayout, internalLayout],
  );
  const resolvedColumns = useMemo(
    () => resolveColumns(definitions, layout, viewportWidth),
    [definitions, layout, viewportWidth],
  );
  const snapshot: DataGridSnapshot<T> = useMemo(
    () => ({ columns: resolvedColumns, columnLayout: layout }),
    [resolvedColumns, layout],
  );
  const columns = useMemo(
    () =>
      enabled
        ? resolvedColumns.map((column) => ({
            ...column.definition,
            width: column.widthPx,
            flex: undefined,
          }))
        : definitions,
    [definitions, enabled, resolvedColumns],
  );

  const current = useRef({ snapshot, columnLayout, onColumnLayoutChange });
  const pendingLayout = useRef<DataGridColumnLayout | null>(null);
  const [api] = useState<DataGridPluginApi<T>>(() => {
    const getLayout = () =>
      pendingLayout.current ?? current.current.snapshot.columnLayout;
    const update = (next: DataGridColumnLayout) => {
      const previous = getLayout();
      if (JSON.stringify(next) === JSON.stringify(previous)) return;
      if (current.current.columnLayout === undefined) {
        // Make consecutive commands in one event compose before React renders.
        pendingLayout.current = next;
        setInternalLayout(next);
      }
      current.current.onColumnLayoutChange?.(next);
    };
    return {
      getSnapshot: () => current.current.snapshot,
      subscribe: (listener) => {
        listeners.current.add(listener);
        return () => {
          listeners.current.delete(listener);
        };
      },
      columns: {
        setWidth(id, width) {
          const column = current.current.snapshot.columns.find(
            (item) => item.id === id,
          );
          if (!column || !Number.isFinite(width)) return;
          const previous = getLayout();
          update({
            ...previous,
            widths: {
              ...previous.widths,
              [id]: clampColumnWidth(column.definition, width),
            },
          });
        },
        resetWidth(id) {
          const previous = getLayout();
          const widths = { ...previous.widths };
          delete widths[id];
          update({ ...previous, widths });
        },
        move(id, target) {
          const state = current.current.snapshot;
          const sourceColumn = state.columns.find((item) => item.id === id);
          const targetColumn = state.columns.find(
            (item) => item.id === target.columnId,
          );
          if (
            !sourceColumn ||
            !targetColumn ||
            id === target.columnId ||
            sourceColumn.region !== targetColumn.region
          )
            return;
          const layout = getLayout();
          const order = layout.order.filter((item) => item !== id);
          order.splice(
            order.indexOf(target.columnId) +
              (target.placement === "after" ? 1 : 0),
            0,
            id,
          );
          update({ ...layout, order });
        },
      },
      elements: {
        getHeader: (id) => headers.current.get(id) ?? null,
        getColumnCells: (id) =>
          Array.from(cells.current.get(id)?.values() ?? []),
        getViewport: () => viewportRef.current,
      },
      announce,
    };
  });
  useCommittedEffect(() => {
    pendingLayout.current = null;
    const changed = current.current.snapshot !== snapshot;
    current.current = { snapshot, columnLayout, onColumnLayoutChange };
    if (changed) listeners.current.forEach((listener) => listener());
  }, [snapshot, columnLayout, onColumnLayoutChange]);

  return { columns, snapshot, api, headers, cells, announcement };
}
