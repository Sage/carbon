import React, { useEffect, useRef, useState } from "react";
import type {
  DataGridPlugin,
  DataGridResolvedColumn,
  DataGridHeaderSlotProps,
  DataGridPluginProps,
} from "..";
import { ResizeHandle, ResizeGuide } from "./column-tools.style";

export interface ColumnResizePluginOptions<T extends object> {
  keyboardStep?: number;
  canResize?: (column: DataGridResolvedColumn<T>) => boolean;
}

/** Resize on release: pointer drafts remain local to this plugin. */
export function createColumnResizePlugin<T extends object>({
  keyboardStep = 10,
  canResize = () => true,
}: ColumnResizePluginOptions<T> = {}): DataGridPlugin<T> {
  const step =
    Number.isFinite(keyboardStep) && keyboardStep > 0 ? keyboardStep : 10;

  const Handle = ({ api, column }: DataGridHeaderSlotProps<T>) => {
    const drag = useRef<{
      pointerId: number;
      startX: number;
      startWidth: number;
      width: number;
      left: number;
      top: number;
      height: number;
    } | null>(null);
    const [guide, setGuide] = useState<{
      left: number;
      top: number;
      height: number;
    } | null>(null);
    const enabled = canResize(column);
    const clamp = (width: number) =>
      Math.max(
        column.minWidthPx,
        Math.min(column.maxWidthPx ?? Infinity, width),
      );
    const cancel = () => {
      drag.current = null;
      setGuide(null);
    };
    useEffect(() => {
      cancel();
      // Definition/width changes during a gesture invalidate its starting geometry.
    }, [column.definition, column.widthPx, enabled]);

    if (!enabled) return null;
    return (
      <>
        <ResizeHandle
          type="button"
          role="separator"
          aria-label={`Resize ${column.definition.headerName || column.definition.headerAriaLabel || column.id} column`}
          aria-orientation="vertical"
          aria-valuemin={column.minWidthPx}
          aria-valuemax={column.maxWidthPx}
          aria-valuenow={Math.round(column.widthPx)}
          data-component="data-grid-column-resize-handle"
          onDoubleClick={() => api.columns.resetWidth(column.id)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              cancel();
              return;
            }
            if (drag.current) return;
            let width: number;
            if (event.key === "ArrowRight") width = column.widthPx + step;
            else if (event.key === "ArrowLeft") width = column.widthPx - step;
            else if (event.key === "Home") width = column.minWidthPx;
            else if (event.key === "End" && column.maxWidthPx !== undefined)
              width = column.maxWidthPx;
            else return;
            event.preventDefault();
            api.columns.setWidth(column.id, width);
          }}
          onPointerDown={(event) => {
            if (event.button !== 0 || event.isPrimary === false) return;
            const header = api.elements.getHeader(column.id);
            if (!header) return;
            event.preventDefault();
            event.currentTarget.focus();
            const bounds = header.getBoundingClientRect();
            const height =
              api.elements.getViewport()?.getBoundingClientRect().height ??
              bounds.height;
            drag.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              startWidth: bounds.width || column.widthPx,
              width: bounds.width || column.widthPx,
              left: bounds.right,
              top: bounds.top,
              height,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const { current } = drag;
            if (!current || current.pointerId !== event.pointerId) return;
            current.width = clamp(
              current.startWidth + event.clientX - current.startX,
            );
            setGuide({
              left: current.left + current.width - current.startWidth,
              top: current.top,
              height: current.height,
            });
          }}
          onPointerUp={(event) => {
            const { current } = drag;
            if (!current || current.pointerId !== event.pointerId) return;
            const width = clamp(
              current.startWidth + event.clientX - current.startX,
            );
            cancel();
            event.currentTarget.releasePointerCapture(event.pointerId);
            api.columns.setWidth(column.id, width);
          }}
          onPointerCancel={cancel}
          onLostPointerCapture={cancel}
        />
        {guide && (
          <ResizeGuide
            style={guide}
            data-component="data-grid-column-resize-guide"
          />
        )}
      </>
    );
  };

  const Controller = ({ api, snapshot }: DataGridPluginProps<T>) => {
    const previous = useRef(snapshot.columnLayout.widths);
    useEffect(() => {
      const changed = snapshot.columns.find(
        (column) =>
          previous.current[column.id] !==
          snapshot.columnLayout.widths[column.id],
      );
      if (changed)
        api.announce(
          `${changed.definition.headerName || changed.definition.headerAriaLabel || changed.id} column width ${Math.round(changed.widthPx)} pixels`,
        );
      previous.current = snapshot.columnLayout.widths;
    }, [api, snapshot]);
    return null;
  };

  return {
    id: "column-resize",
    apiVersion: 1,
    Controller,
    slots: { headerResizeHandle: Handle },
  };
}
