import styled, { css } from "styled-components";

import applyBaseTheme from "../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import visuallyHidden from "../../../style/utils/visually-hidden";
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

const getJustifyContent = (
  align: DataGridAlignment,
  leftAlignment: "flex-start" | "space-between",
) => {
  if (align === "right") return "flex-end";
  if (align === "center") return "center";
  return leftAlignment;
};

const getCellContentPadding = (cellType: DataGridCellType) => {
  switch (cellType) {
    case "checkbox":
      return "var(--global-space-none) var(--global-space-comp-s)";
    case "action":
      return "var(--global-space-none) var(--global-space-comp-xs)";
    default:
      return "var(--global-space-none) var(--global-space-comp-l)";
  }
};

export const StyledDataGridWrapper = styled.div.attrs(applyBaseTheme)`
  isolation: isolate;
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

export const StyledHeader = styled.div<
  CellLayoutProps & { $stickyHeader: boolean }
>`
  ${stickyCell}
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => getJustifyContent($align, "flex-start")};
  box-sizing: border-box;
  height: var(--global-size-m);
  padding: var(--global-space-none) var(--global-space-comp-l);
  position: ${({ $sticky }) => ($sticky ? "sticky" : "relative")};
  z-index: ${({ $sticky }) => ($sticky ? 1 : "auto")};
  background-color: ${({ $sticky, $stickyHeader }) =>
    $sticky || $stickyHeader
      ? "var(--table-row-bg-default)"
      : "var(--table-header-subtle-bg-default)"};
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
    $hideInlineEndBorder: boolean;
  }
>`
  ${stickyCell}
  box-sizing: border-box;
  min-width: 0;
  height: var(--global-size-m);
  padding: 0;
  isolation: isolate;
  position: ${({ $sticky }) => ($sticky ? "sticky" : "relative")};
  background-color: var(--table-row-bg-default);
  background-image: ${({ $readOnly }) =>
    $readOnly
      ? "linear-gradient(var(--input-typical-bg-read-only), var(--input-typical-bg-read-only))"
      : "none"};
  border-block-end: var(--global-borderwidth-xs) solid
    var(--input-typical-border-default);
  border-inline-end: ${({ $hideInlineEndBorder }) =>
    $hideInlineEndBorder
      ? "none"
      : "var(--global-borderwidth-xs) solid var(--input-typical-border-default)"};
  color: ${({ $readOnly }) =>
    $readOnly
      ? "var(--input-typical-txt-read-only)"
      : "var(--input-typical-txt-default)"};
  cursor: ${({ $editing }) => ($editing ? "text" : "default")};
  font: ${({ $weight, $editing, $cellType }) =>
    ($editing && $cellType === "text") || $weight === "regular"
      ? "var(--global-font-static-comp-regular-m)"
      : "var(--global-font-static-comp-medium-m)"};
  outline: none;

  &::before {
    position: absolute;
    inset-block-start: calc(-1 * var(--global-borderwidth-xs));
    inset-block-end: calc(-1 * var(--global-borderwidth-xs));
    inset-inline-start: calc(-1 * var(--global-borderwidth-xs));
    inset-inline-end: ${({ $hideInlineEndBorder }) =>
      $hideInlineEndBorder ? "0" : "calc(-1 * var(--global-borderwidth-xs))"};
    pointer-events: none;
    z-index: 1;
  }

  &:first-child {
    --data-grid-cell-start-border: var(--global-borderwidth-xs);
    border-inline-start: var(--global-borderwidth-xs) solid
      var(--input-typical-border-default);
  }

  &:hover {
    background-color: ${({ $readOnly }) =>
      $readOnly
        ? "var(--table-row-bg-default)"
        : "var(--input-typical-bg-hover)"};
    color: ${({ $readOnly }) =>
      $readOnly
        ? "var(--input-typical-txt-read-only)"
        : "var(--input-typical-txt-hover)"};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      &::before {
        content: "";
        box-shadow: inset 0 0 0 var(--global-borderwidth-s)
          var(--input-validation-border-error);
      }
    `}

  &:focus {
    &::before {
      content: "";
      box-shadow: inset 0 0 0 var(--global-borderwidth-s) var(--focus-borderalt);
    }
    z-index: ${({ $sticky }) => ($sticky ? 3 : 1)};
  }

  ${({ $editing, $sticky }) =>
    $editing &&
    css`
      &:focus-within {
        &::before {
          content: "";
          ${addFocusStyling(true)}
        }
        z-index: ${$sticky ? 3 : 1};
      }
    `}

  ${({ $cellType, $sticky }) =>
    ($cellType === "action" || $cellType === "checkbox") &&
    css`
      &:focus-within {
        &::before {
          content: "";
          box-shadow: inset 0 0 0 var(--global-borderwidth-s)
            var(--focus-borderalt);
        }
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
      [data-element="action-popover-button"] {
        --button-typical-subtle-bg-active: transparent;
        --button-typical-subtle-bg-hover: transparent;
      }

      &:active,
      &:has([data-element="action-popover-button"]:active),
      &:has([data-element="action-popover-button"][aria-expanded="true"]) {
        background-color: var(--table-row-bg-default);
        background-image: linear-gradient(
          var(--button-typical-subtle-bg-active),
          var(--button-typical-subtle-bg-active)
        );

        [data-element="action-popover-button"] {
          --button-typical-subtle-bg-hover: transparent;
        }
      }

      &:has([data-element="action-popover-button"][aria-expanded="true"]) {
        z-index: 5;
      }
    `}
`;

export const StyledValidationBar = styled.span`
  position: absolute;
  inset-block: var(--global-space-comp-xs);
  inset-inline-start: calc(
    var(--global-space-comp-s) + var(--global-borderwidth-s) - var(
        --data-grid-cell-start-border,
        0px
      )
  );
  width: var(--global-borderwidth-s);
  background-color: var(--input-validation-border-error);
  z-index: 2;
  pointer-events: none;
`;

export const StyledVisuallyHidden = styled.span`
  ${visuallyHidden}
  clip: rect(0, 0, 0, 0);
`;

export const StyledCellContent = styled.div<CellLayoutProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    getJustifyContent($align, "space-between")};
  box-sizing: border-box;
  gap: var(--global-space-comp-s);
  height: var(--global-size-m);
  min-width: 0;
  overflow: ${({ $cellType }) =>
    $cellType === "action" ? "visible" : "hidden"};
  padding: ${({ $cellType }) => getCellContentPadding($cellType)};
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

export const StyledSelectEditor = styled.div<{
  $weight: DataGridCellWeight;
}>`
  width: 100%;
  height: 100%;
  font: ${({ $weight }) =>
    $weight === "medium"
      ? "var(--global-font-static-comp-medium-m)"
      : "var(--global-font-static-comp-regular-m)"};

  > [data-component="simple-select"],
  > [data-component="filterable-select"],
  [data-component="text-input"],
  [data-role="input-wrapper"],
  [data-role="input-text-container"] {
    width: 100%;
    height: 100%;
    margin-block-end: 0;
  }

  > [data-component="simple-select"] > div,
  > [data-component="filterable-select"] > div {
    width: 100%;
    height: 100%;
  }

  &&&& [data-role="input-container"] {
    min-height: 0;
    height: 100%;
    padding: var(--global-space-comp-s) var(--global-space-comp-l);
    background: transparent;
    border: 0;
    border-radius: 0;

    &:focus-within:has(:focus:not(button)) {
      box-shadow: none;
      outline: none;
    }
  }

  &&&& [data-role="input-text-container"],
  &&&& [data-role="input-text-container"] input,
  &&&& [data-role="select-text"] .select-text-children-wrapper {
    font: inherit;
  }
`;

export const StyledSpacer = styled.div<{ $height: number }>`
  box-sizing: border-box;
  height: ${({ $height }) => `${$height}px`};
`;
