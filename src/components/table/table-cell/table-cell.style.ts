import styled, { css } from "styled-components";
import { TableContextProps } from "../__internal__/contexts";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { BorderThickness } from "../table.component";
import borderThicknessStyles from "../__internal__/config";

interface StyledTableCellProps {
  $isExpandable?: boolean;
  $isDragHandle?: boolean;
  $size: TableContextProps["size"];
  $borderThickness?: BorderThickness;
}

const StyledTableCell = styled.td<StyledTableCellProps>`
  ${({ $borderThickness }) =>
    $borderThickness &&
    css`
      --table-cell-border-vertical-width: ${borderThicknessStyles[
        $borderThickness
      ]};
    `}

  ${({ $isDragHandle }) =>
    $isDragHandle &&
    css`
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    `}

  padding: 0;

  ${({ $size }) => css`
    ${$size === "extra-small" &&
    css`
      height: var(--global-size-xs);
    `}
    ${$size === "small" &&
    css`
      height: var(--global-size-s);
    `}
    ${$size === "medium" &&
    css`
      height: var(--global-size-m);
    `}
    ${$size === "large" &&
    css`
      height: var(--global-size-l);
    `}
    ${$size === "extra-large" &&
    css`
      height: var(--global-size-xxl);
    `}
  `}

  [data-element="table-cell-collapse"] {
    display: grid;
    grid-template-rows: 1fr;
    width: 100%;
  }

  [data-element="table-cell-clip"] {
    min-height: 0;
  }

  [data-element="table-cell-content-container"] {
    display: flex;
    align-items: center;
    gap: var(--global-space-comp-s);
    width: 100%;
    box-sizing: border-box;

    ${({ $size }) => css`
      ${$size === "extra-small" &&
      css`
        min-height: var(--global-size-xs);
        padding: var(--global-space-none) var(--global-space-comp-s);
        font: var(--global-font-static-comp-regular-s);
      `}

      ${$size === "small" &&
      css`
        min-height: var(--global-size-s);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-s);
      `}

      ${$size === "medium" &&
      css`
        min-height: var(--global-size-m);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-m);
      `}

      ${$size === "large" &&
      css`
        min-height: var(--global-size-l);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-l);
      `}

      ${$size === "extra-large" &&
      css`
        min-height: var(--global-size-xxl);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-l);
      `}
    `}
  }

  ${({ $isExpandable }) =>
    $isExpandable &&
    css`
      position: relative;

      > [data-element="table-cell-collapse"] {
        position: absolute;
        inset: 0;

        > [data-element="table-cell-clip"],
        > [data-element="table-cell-clip"]
          > [data-element="table-cell-content-container"] {
          height: 100%;
        }
      }
    `}

  [data-element="table-cell-content"] {
    flex: 1;
    min-width: 0;
    white-space: normal;
  }
`;

interface StyledExpandIconProps {
  $isExpanded?: boolean;
}

export const StyledExpandIcon = styled.span<StyledExpandIconProps>`
  display: inline-flex;
  flex: 0 0 auto;
  transform: rotate(${({ $isExpanded }) => ($isExpanded ? "-180deg" : "0deg")});
  transform-origin: center;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 200ms ease;
  }
`;

export const CellContent = styled.div<{
  $isExpandable?: boolean;
  $align: "left" | "right" | "center";
}>`
  border: none;
  background-color: transparent;
  text-align: ${({ $align }) => $align};

  ${({ $isExpandable }) =>
    $isExpandable &&
    css`
      cursor: pointer;
      &:focus {
        outline: none;
        ${addFocusStyling(true)}
      }
    `}
`;

export default StyledTableCell;
