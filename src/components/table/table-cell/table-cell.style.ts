import styled, { css } from "styled-components";
import { TableContextProps } from "../__internal__/context";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { BorderThickness } from "../table.component";
import borderThicknessStyles from "../__internal__/config";

interface StyledTableCellProps {
  $isExpandable?: boolean;
  $isDragHandle?: boolean;
  $size: TableContextProps["size"];
  $borderThickness?: BorderThickness;
  $borderColor?: string;
}

const StyledTableCell = styled.td<StyledTableCellProps>`
  ${({ $borderThickness }) => $borderThickness && css`
    --table-cell-border-vertical-width: ${borderThicknessStyles[$borderThickness]};
  `}

  ${({ $borderColor }) => $borderColor && css`
    --table-cell-border-color: ${$borderColor};
  `}

  ${({ $isDragHandle }) =>
    $isDragHandle &&
    css`
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    `}

  ${({ $isExpandable }) => $isExpandable && css`
    cursor: pointer;
    &:focus {
      outline: none;
      > div {
        ${addFocusStyling(true)}
      }
    }
  `}

  height: auto;
  padding: 0;

  /* & > div {
    display: flex;
    align-items: center;
    gap: var(--global-space-comp-s);
    width: 100%;
    box-sizing: border-box;

    ${({ $size }) => css`
      ${$size === "extra-small" && `
        padding: var(--global-space-none) var(--global-space-comp-s);
        font: var(--global-font-static-comp-regular-s);
      `}
      ${$size === "small" && `
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-s);
      `}
      ${$size === "medium" && `
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-m);
      `}
      ${$size === "large" && `
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-l);
      `}
      ${$size === "extra-large" && `
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-l);
      `}
    `}
  } */

  [data-element="table-cell-collapse"] {
    display: grid;
    grid-template-rows: 1fr;
    width: 100%;
  }

  [data-element="table-cell-clip"] {
    min-height: 0;
    overflow: hidden;
  }

  [data-element="table-cell-content-container"] {
    display: flex;
    align-items: center;
    gap: var(--global-space-comp-s);
    min-height: var(--table-cell-min-height);
    width: 100%;
    box-sizing: border-box;

    ${({ $size }) => css`
      ${$size === "extra-small" &&
      `
        min-height: var(--global-size-xs);
        padding: var(--global-space-none) var(--global-space-comp-s);
        font: var(--global-font-static-comp-regular-s);
      `}

      ${$size === "small" &&
      `
        min-height: var(--global-size-s);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-s);
      `}

      ${$size === "medium" &&
      `
        min-height: var(--global-size-m);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-m);
      `}

      ${$size === "large" &&
      `
        min-height: var(--global-size-l);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-l);
      `}

      ${$size === "extra-large" &&
      `
        min-height: var(--global-size-xxl);
        padding: var(--global-space-none) var(--global-space-comp-l);
        font: var(--global-font-static-comp-regular-l);
      `}
    `}
  }

  [data-element="table-cell-content"] {
    flex: 1;
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
  }
`;

interface StyledExpandIconProps {
  $isExpanded?: boolean;
}

export const StyledExpandIcon = styled.span<StyledExpandIconProps>`
  display: inline-flex;
  flex: 0 0 auto;
  transform: rotate(${({ $isExpanded }) =>
    $isExpanded ? "-180deg" : "0deg"});
  transform-origin: center;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 200ms ease;
  }
`;

export default StyledTableCell;
