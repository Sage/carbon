import React, { forwardRef, useRef } from "react";

import DataGridCellContent from "./data-grid-cell-content.component";
import DataGridCellEditor from "./data-grid-cell-editor.component";
import {
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";
import {
  StyledCell,
  StyledValidationBar,
  StyledVisuallyHidden,
} from "../data-grid.style";

interface DataGridCellProps<T extends object> {
  params: DataGridCellParams<T>;
  position: DataGridCellPosition;
  rowIndex: number;
  columnIndex: number;
  active: boolean;
  editing: boolean;
  readOnly: boolean;
  errorValue?: string | boolean;
  draftValue?: unknown;
  pinnedOffset?: number;
  hideInlineEndBorder: boolean;
  editorRef: React.RefObject<HTMLInputElement>;
  onActivate: (position: DataGridCellPosition) => void;
  onFocusPosition: (position: DataGridCellPosition) => void;
  onFocusAction: (position: DataGridCellPosition) => void;
  onBeginEdit: (position: DataGridCellPosition) => void;
  onDraftChange: (value: unknown) => void;
  onCommitEdit: (shouldRestoreFocus?: boolean, value?: unknown) => void;
  onBlurEdit: (shouldRestoreFocus?: boolean) => void;
  onCellKeyDown: (
    event: React.KeyboardEvent,
    position: DataGridCellPosition,
  ) => void;
  onEditorKeyDown: (
    event: React.KeyboardEvent,
    position: DataGridCellPosition,
  ) => void;
}

const DataGridCellInner = <T extends object>(
  {
    params,
    position,
    rowIndex,
    columnIndex,
    active,
    editing,
    readOnly,
    errorValue,
    draftValue,
    pinnedOffset,
    hideInlineEndBorder,
    editorRef,
    onActivate,
    onFocusPosition,
    onFocusAction,
    onBeginEdit,
    onDraftChange,
    onCommitEdit,
    onBlurEdit,
    onCellKeyDown,
    onEditorKeyDown,
  }: DataGridCellProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const touchActivation = useRef(false);
  const { column, rowId } = params;
  const type = column.type ?? "text";
  const errorText = typeof errorValue === "string" ? errorValue : undefined;
  const errorId = errorText
    ? `data-grid-cell-error-${String(rowId)}-${String(column.field)}`
    : undefined;
  const align =
    column.align ??
    (type === "checkbox" || type === "action" ? "center" : "left");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      const target = event.target as HTMLElement;
      const actionTrigger = event.currentTarget.querySelector<HTMLElement>(
        '[data-element="action-popover-button"]',
      );
      const actionTriggerHasFocus = !!actionTrigger?.contains(target);
      const actionPopoverIsOpen =
        actionTrigger?.getAttribute("aria-expanded") === "true";
      const isGridNavigationKey =
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "Tab";

      // Nested controls own their keyboard interaction. Once a closed action
      // trigger has focus, arrow keys and optional Tab navigation may return
      // control to the grid without reopening or detaching its popover. Tab
      // from an open menu is also handed to the grid after the popover's own
      // handler closes it, preserving the grid's row-major navigation order.
      if (
        type !== "action" ||
        !actionTrigger ||
        !isGridNavigationKey ||
        (event.key !== "Tab" && (actionPopoverIsOpen || !actionTriggerHasFocus))
      ) {
        return;
      }
    }

    onCellKeyDown(event, position);
  };

  const handleKeyDownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (type !== "action" || event.target === event.currentTarget) return;

    const actionTrigger = event.currentTarget.querySelector<HTMLElement>(
      '[data-element="action-popover-button"]',
    );
    const target = event.target as HTMLElement;
    const actionPopoverIsOpen =
      actionTrigger?.getAttribute("aria-expanded") === "true";
    const isArrowKey =
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown";

    // A closed action trigger receives focus after its menu closes. Capture
    // arrow keys before the trigger can interpret them as another request to
    // open the menu, and return them to the grid's navigation model.
    if (actionTrigger?.contains(target) && !actionPopoverIsOpen && isArrowKey) {
      event.stopPropagation();
      onCellKeyDown(event, position);
    }
  };

  return (
    <StyledCell
      ref={ref}
      role="gridcell"
      aria-colindex={columnIndex + 1}
      aria-readonly={readOnly || undefined}
      aria-invalid={!!errorValue || undefined}
      aria-describedby={errorId}
      tabIndex={active && !editing ? 0 : -1}
      $cellType={type}
      $align={align}
      $sticky={column.pinned}
      $stickyOffset={pinnedOffset}
      $hasError={!!errorValue}
      $readOnly={readOnly}
      $editing={editing}
      $weight={column.weight ?? "regular"}
      $hideInlineEndBorder={hideInlineEndBorder}
      onFocus={() => onActivate(position)}
      onPointerDown={(event) => {
        touchActivation.current = event.pointerType === "touch";
      }}
      onPointerCancel={() => {
        touchActivation.current = false;
      }}
      onClick={(event) => {
        const isTouchActivation = touchActivation.current;
        touchActivation.current = false;

        if (!editing && type === "checkbox") {
          // Ignore the second mouse click, but allow repeated touch activation.
          if (event.detail > 1 && !isTouchActivation) return;
          onFocusPosition(position);
          if (!readOnly) onBeginEdit(position);
          return;
        }

        if (!editing && type === "dropdown") {
          onFocusPosition(position);
          if (!readOnly) onBeginEdit(position);
          return;
        }

        const target = event.target as HTMLElement;
        const interactiveTarget = target.closest(
          "button,a,input,select,textarea,[tabindex]",
        );
        if (
          !editing &&
          (!interactiveTarget || interactiveTarget === event.currentTarget)
        ) {
          onFocusPosition(position);
          if (type === "text" && !readOnly) {
            onBeginEdit(position);
          }
          if (type === "action") {
            event.stopPropagation();
            onFocusAction(position);
          }
        }
      }}
      onKeyDownCapture={handleKeyDownCapture}
      onKeyDown={handleKeyDown}
      data-component="data-grid-cell"
      data-element={`data-grid-cell-${String(rowId)}-${String(column.field)}`}
    >
      {!!errorValue && <StyledValidationBar aria-hidden="true" />}
      {errorText && (
        <StyledVisuallyHidden id={errorId}>{errorText}</StyledVisuallyHidden>
      )}
      {editing && (type === "text" || type === "dropdown") ? (
        <DataGridCellEditor
          column={column}
          rowIndex={rowIndex}
          value={draftValue}
          errorId={errorId}
          invalid={!!errorValue}
          weight={column.weight ?? "regular"}
          editorRef={editorRef}
          onChange={onDraftChange}
          onSelectionCommit={(value) => onCommitEdit(true, value)}
          onBlur={(event) => {
            const { ownerDocument } = event.currentTarget;
            const nextFocus =
              event.relatedTarget ?? ownerDocument.activeElement;
            const focusReturnedToDocument =
              !nextFocus ||
              nextFocus === ownerDocument.body ||
              nextFocus === ownerDocument.documentElement;

            onBlurEdit(type === "dropdown" && focusReturnedToDocument);
          }}
          onKeyDown={(event) => onEditorKeyDown(event, position)}
        />
      ) : (
        <DataGridCellContent
          params={params}
          rowIndex={rowIndex}
          align={align}
          readOnly={readOnly}
        />
      )}
    </StyledCell>
  );
};

const ForwardedDataGridCell = forwardRef(DataGridCellInner);
ForwardedDataGridCell.displayName = "DataGridCell";

const DataGridCell = ForwardedDataGridCell as <T extends object>(
  props: DataGridCellProps<T> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  },
) => React.ReactElement;

export default DataGridCell;
