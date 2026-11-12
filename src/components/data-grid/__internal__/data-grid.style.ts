import styled, { css } from "styled-components";

import applyBaseTheme from "../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { DataGridCellType, DataGridCellWeight } from "../data-grid.types";

type DataGridAlignment = "left" | "center" | "right";

interface StickyCellProps {
  $sticky?: "left" | "right";
  $stickyOffset?: number;
}

interface CellLayoutProps extends StickyCellProps {
  $align: DataGridAlignment;
  $cellType: DataGridCellType;
}

const stickyCell = ({ $sticky, $stickyOffset }: StickyCellProps) => css`
  ${$sticky &&
  css`
    position: sticky;
    ${$sticky === "left"
      ? css`
          inset-inline-start: ${$stickyOffset}px;
        `
      : css`
          inset-inline-end: ${$stickyOffset}px;
        `}
    z-index: 2;

    &::after {
      content: "";
      position: absolute;
      inset-block: 0;
      ${$sticky === "left"
        ? css`
            inset-inline-end: 0;
            box-shadow: var(--global-depth-sticky-l);
          `
        : css`
            inset-inline-start: 0;
            box-shadow: var(--global-depth-sticky-r);
          `}
      width: 4px;
      pointer-events: none;
    }
  `}
`;

interface ViewportProps {
  $maxHeight?: number | string;
  $maxWidth?: number | string;
}

const toCssSize = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : value;

export const StyledDataGridWrapper = styled.div.attrs(applyBaseTheme)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  max-width: 100%;
`;

export const StyledDataGridViewport = styled.div<ViewportProps>`
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ $maxWidth }) => toCssSize($maxWidth) ?? "100%"};
  max-height: ${({ $maxHeight }) => toCssSize($maxHeight) ?? "none"};
  min-width: 0;
  overflow: auto;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
`;

export const StyledGrid = styled.div<{ $contentWidth: number }>`
  min-width: ${({ $contentWidth }) => `${$contentWidth}px`};
  width: 100%;
  color: var(--table-row-label-default);
  font: var(--global-font-static-comp-regular-m);
`;

export const StyledHeaderRow = styled.div<{
  $gridTemplateColumns: string;
}>`
  display: grid;
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};
`;

export const StyledHeaderGroup = styled.div<{ $sticky: boolean }>`
  position: ${({ $sticky }) => ($sticky ? "sticky" : "relative")};
  inset-block-start: ${({ $sticky }) => ($sticky ? 0 : "auto")};
  z-index: ${({ $sticky }) => ($sticky ? 4 : "auto")};
`;

export const StyledRow = styled.div<{
  $gridTemplateColumns: string;
  $isSelected: boolean;
}>`
  display: grid;
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      && > [data-component="data-grid-cell"] {
        background-color: var(--table-row-bg-selected);
        color: var(--table-row-label-selected);
      }
    `}
`;

export const StyledHeader = styled.div<CellLayoutProps>`
  ${stickyCell}
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === "right"
      ? "flex-end"
      : $align === "center"
        ? "center"
        : "flex-start"};
  box-sizing: border-box;
  height: var(--global-size-m);
  padding: var(--global-space-none) var(--global-space-comp-l);
  position: ${({ $sticky }) => ($sticky ? "sticky" : "relative")};
  z-index: ${({ $sticky }) => ($sticky ? 1 : "auto")};
  background-color: var(--page-bg-default);
  border-block-end: var(--global-borderwidth-xs) solid
    var(--table-header-subtle-border-default);
  color: var(--table-header-subtle-label-default);
  font: var(--global-font-static-comp-medium-m);
  white-space: nowrap;

  [data-element="data-grid-header-label"] {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledCell = styled.div<
  CellLayoutProps & {
    $hasError: boolean;
    $readOnly: boolean;
    $editing: boolean;
    $weight: DataGridCellWeight;
  }
>`
  ${stickyCell}
  box-sizing: border-box;
  min-width: 0;
  height: var(--global-size-m);
  padding: 0;
  position: ${({ $sticky }) => ($sticky ? "sticky" : "relative")};
  background-color: ${({ $readOnly, $sticky }) =>
    $sticky
      ? "var(--data-grid-sticky-cell-bg, var(--table-row-bg-default))"
      : $readOnly
        ? "var(--input-typical-bg-read-only)"
        : "transparent"};
  background-image: ${({ $readOnly, $sticky }) =>
    $readOnly && $sticky
      ? "linear-gradient(var(--input-typical-bg-read-only), var(--input-typical-bg-read-only))"
      : "none"};
  border-block-end: var(--global-borderwidth-xs) solid
    ${({ $readOnly }) =>
      $readOnly
        ? "var(--input-typical-border-default)"
        : "var(--table-row-border-default)"};
  border-inline-end: var(--global-borderwidth-xs) solid
    ${({ $readOnly }) =>
      $readOnly
        ? "var(--input-typical-border-default)"
        : "var(--table-row-border-default)"};
  color: ${({ $readOnly }) =>
    $readOnly
      ? "var(--input-typical-txt-read-only)"
      : "var(--table-row-label-default)"};
  cursor: ${({ $editing }) => ($editing ? "text" : "default")};
  font: ${({ $weight, $editing }) =>
    $editing || $weight === "regular"
      ? "var(--global-font-static-comp-regular-m)"
      : "var(--global-font-static-comp-medium-m)"};
  outline: none;

  &:first-child {
    border-inline-start: var(--global-borderwidth-xs) solid
      ${({ $readOnly }) =>
        $readOnly
          ? "var(--input-typical-border-default)"
          : "var(--table-row-border-default)"};
  }

  &:hover {
    background-color: ${({ $readOnly, $sticky }) =>
      $readOnly
        ? $sticky
          ? "var(--data-grid-sticky-cell-bg, var(--table-row-bg-default))"
          : "var(--input-typical-bg-read-only)"
        : "var(--table-row-bg-alt)"};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      box-shadow: inset 0 0 0 var(--global-borderwidth-s)
        var(--input-validation-border-error);
    `}

  &:focus {
    box-shadow: inset 0 0 0 var(--global-borderwidth-s) var(--focus-borderalt);
    z-index: ${({ $sticky }) => ($sticky ? 3 : 1)};
  }

  ${({ $editing, $sticky }) =>
    $editing &&
    css`
      &:focus-within {
        ${addFocusStyling(true)}
        z-index: ${$sticky ? 3 : 1};
      }
    `}

  ${({ $cellType, $sticky }) =>
    ($cellType === "action" || $cellType === "checkbox") &&
    css`
      &:focus-within {
        box-shadow: inset 0 0 0 var(--global-borderwidth-s)
          var(--focus-borderalt);
        z-index: ${$sticky ? 3 : 1};
      }

      [data-element="action-popover-button"]:focus,
      [data-component="checkbox"]
        input:focus
        + [data-role="checkable-input-svg-wrapper"] {
        box-shadow: none;
        outline: none;
      }
    `}

  ${({ $cellType }) =>
    $cellType === "action" &&
    css`
      &:has([data-element="action-popover-button"][aria-expanded="true"]) {
        z-index: 5;
      }
    `}
`;

export const StyledValidationBar = styled.span`
  position: absolute;
  inset-block: var(--global-space-comp-xs);
  inset-inline-start: var(--global-space-comp-xs);
  width: var(--global-borderwidth-m);
  background-color: var(--input-validation-bar-error);
  pointer-events: none;
`;

export const StyledVisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const StyledCellContent = styled.div<CellLayoutProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === "right"
      ? "flex-end"
      : $align === "center"
        ? "center"
        : "space-between"};
  box-sizing: border-box;
  gap: var(--global-space-comp-s);
  height: var(--global-size-m);
  min-width: 0;
  overflow: ${({ $cellType }) =>
    $cellType === "action" ? "visible" : "hidden"};
  padding: ${({ $cellType }) =>
    $cellType === "checkbox"
      ? "var(--global-space-none) var(--global-space-comp-s)"
      : $cellType === "action"
        ? "var(--global-space-none) var(--global-space-comp-xs)"
        : "var(--global-space-none) var(--global-space-comp-l)"};
  text-align: ${({ $align }) => $align};
  text-overflow: ellipsis;
  white-space: nowrap;

  > span:first-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [data-component="checkbox"] {
    margin: 0;
    pointer-events: none;
  }
`;

const editor = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: var(--global-space-none) var(--global-space-comp-l);
  appearance: none;
  background: transparent;
  border: 0;
  color: inherit;
  font: inherit;
  outline: none;
`;

export const StyledEditor = styled.input`
  ${editor}
`;

export const StyledSelect = styled.select`
  ${editor}
`;

export const StyledSpacer = styled.div<{ $height: number }>`
  box-sizing: border-box;
  height: ${({ $height }) => `${$height}px`};
`;
