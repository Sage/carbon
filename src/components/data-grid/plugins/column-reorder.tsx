import React, { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import Icon from "../../icon";
import type {
  DataGridPlugin,
  DataGridResolvedColumn,
  DataGridHeaderSlotProps,
  DataGridPluginProps,
} from "..";
import { DragHandle, DropIndicator } from "./column-tools.style";
import createColumnDragPreview from "./column-drag-preview";

export interface ColumnReorderPluginOptions<T extends object> {
  canMove?: (column: DataGridResolvedColumn<T>) => boolean;
}

/** Experimental example plugin, intentionally separate from the core entry point. */
export function createColumnReorderPlugin<T extends object>({
  canMove = () => true,
}: ColumnReorderPluginOptions<T> = {}): DataGridPlugin<T> {
  const Controller = ({ api }: DataGridPluginProps<T>) => {
    useEffect(
      () =>
        monitorForElements({
          canMonitor: ({ source }) =>
            source.data.kind === "data-grid-column" && source.data.grid === api,
          onDrop: ({ source, location }) => {
            const target = location.current.dropTargets[0];
            const { id } = source.data;
            if (
              !target ||
              target.data.grid !== api ||
              typeof id !== "string" ||
              typeof target.data.id !== "string"
            )
              return;
            const { columns } = api.getSnapshot();
            const dragged = columns.find((column) => column.id === id);
            const destination = columns.find(
              (column) => column.id === target.data.id,
            );
            const edge = extractClosestEdge(target.data);
            if (
              !dragged ||
              !destination ||
              !canMove(dragged) ||
              !canMove(destination) ||
              dragged.region !== destination.region ||
              (edge !== "left" && edge !== "right")
            )
              return;
            api.columns.move(id, {
              columnId: destination.id,
              placement: edge === "left" ? "before" : "after",
            });
          },
        }),
      [api],
    );
    return null;
  };

  const HeaderActions = ({
    api,
    column,
    snapshot,
  }: DataGridHeaderSlotProps<T>) => {
    const handleRef = useRef<HTMLButtonElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [edge, setEdge] = useState<"left" | "right" | null>(null);
    const [indicatorHeight, setIndicatorHeight] = useState<number>();
    const enabled =
      canMove(column) &&
      snapshot.columns.some(
        (target) =>
          target.id !== column.id &&
          target.region === column.region &&
          canMove(target),
      );
    useEffect(() => {
      const element = api.elements.getHeader(column.id);
      const handle = handleRef.current;
      if (!element || !handle || !enabled) return undefined;
      const showIndicator = (
        closest: ReturnType<typeof extractClosestEdge>,
      ) => {
        setEdge(closest === "left" || closest === "right" ? closest : null);
        const viewport = api.elements.getViewport();
        if (viewport) {
          setIndicatorHeight(
            Math.max(
              element.getBoundingClientRect().height,
              viewport.getBoundingClientRect().top +
                viewport.clientHeight -
                element.getBoundingClientRect().top,
            ),
          );
        }
      };
      return combine(
        draggable({
          // As in Table, the handle is the native source and the header is the logical item.
          element: handle,
          getInitialData: () => ({
            kind: "data-grid-column",
            id: column.id,
            grid: api,
          }),
          onGenerateDragPreview: ({ nativeSetDragImage, location }) => {
            if (!nativeSetDragImage) return;
            const bounds = element.getBoundingClientRect();
            const preview = createColumnDragPreview(api, column.id);
            if (!preview) return;
            setCustomNativeDragPreview({
              nativeSetDragImage,
              render: ({ container }) => {
                container.append(preview);
              },
              getOffset: () => ({
                x: location.current.input.clientX - bounds.left,
                y: location.current.input.clientY - bounds.top,
              }),
            });
          },
          onDragStart: () => setIsDragging(true),
          onDrop: () => {
            setIsDragging(false);
            requestAnimationFrame(() => handleRef.current?.focus());
          },
        }),
        dropTargetForElements({
          element,
          getData: ({ input }) =>
            attachClosestEdge(
              { id: column.id, grid: api },
              {
                element,
                input,
                allowedEdges: ["left", "right"],
              },
            ),
          canDrop: ({ source }) => {
            if (
              source.data.kind !== "data-grid-column" ||
              source.data.grid !== api ||
              source.data.id === column.id
            )
              return false;
            const current = api.getSnapshot().columns;
            const dragged = current.find((item) => item.id === source.data.id);
            const target = current.find((item) => item.id === column.id);
            return (
              !!dragged &&
              !!target &&
              canMove(dragged) &&
              canMove(target) &&
              dragged.region === target.region
            );
          },
          onDrag: ({ self }) => {
            showIndicator(extractClosestEdge(self.data));
          },
          onDragEnter: ({ self }) => {
            showIndicator(extractClosestEdge(self.data));
          },
          onDragLeave: () => setEdge(null),
          onDrop: () => setEdge(null),
        }),
      );
    }, [api, column.id, enabled]);

    if (!enabled) return null;
    return (
      <>
        <DragHandle
          ref={handleRef}
          type="button"
          aria-label={`Move ${column.definition.headerName || column.definition.headerAriaLabel || column.id} column. Use Left and Right arrow keys.`}
          data-component="data-grid-column-drag-handle"
          data-is-dragging={isDragging}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const current = api.getSnapshot().columns;
            const index = current.findIndex((item) => item.id === column.id);
            const target =
              current[index + (event.key === "ArrowLeft" ? -1 : 1)];
            if (target && canMove(target) && target.region === column.region) {
              requestAnimationFrame(() => handleRef.current?.focus());
              api.columns.move(column.id, {
                columnId: target.id,
                placement: event.key === "ArrowLeft" ? "before" : "after",
              });
            }
          }}
        >
          <Icon type="drag" aria-hidden />
        </DragHandle>
        {edge && (
          <DropIndicator
            $edge={edge}
            style={{ height: indicatorHeight }}
            data-component="data-grid-column-drop-indicator"
          />
        )}
      </>
    );
  };

  const Announcer = ({ api, snapshot }: DataGridPluginProps<T>) => {
    const previous = useRef(snapshot.columnLayout.order);
    useEffect(() => {
      if (
        previous.current.join("\0") !== snapshot.columnLayout.order.join("\0")
      ) {
        api.announce(
          `Column order: ${snapshot.columns.map((column) => column.definition.headerName).join(", ")}`,
        );
      }
      previous.current = snapshot.columnLayout.order;
    }, [api, snapshot]);
    return <Controller api={api} snapshot={snapshot} />;
  };

  return {
    id: "column-reorder",
    apiVersion: 1,
    Controller: Announcer,
    slots: { headerActions: HeaderActions },
  };
}
