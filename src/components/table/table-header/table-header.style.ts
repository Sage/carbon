import styled, { css } from "styled-components";
import { TableContextProps } from "../__internal__/contexts";
import { BorderThickness } from "../table.component";
import borderThicknessStyles from "../__internal__/config";

interface StyledTableHeaderCellProps {
  $variant: TableContextProps["variant"];
  $size?: TableContextProps["size"];
  $width?: string;
  $borderThickness?: BorderThickness;
  $alternate?: boolean;
}

const StyledTableHeaderCell = styled.th<StyledTableHeaderCellProps>`
  ${({ $borderThickness }) => $borderThickness && css`
    --table-cell-border-vertical-width: ${borderThicknessStyles[$borderThickness]};
  `}

  font: var(--global-font-static-comp-medium-m);

  ${({ $variant, $alternate }) => css`
    ${$variant === "prominent" && `
      background-color: ${$alternate ? "var(--table-header-harsh-bg-alt)" : "var(--table-header-harsh-bg-default)"};
      color: var(--table-header-harsh-label-default);
    `}
    ${$variant === "subtle-white" && `
      background-color: ${$alternate ? "var(--table-header-subtle-bg-alt)" : "var(--page-bg-default)"};
      color: var(--table-header-subtle-label-default);
    `}
    ${$variant === "subtle-grey" && `
      background-color: ${$alternate ? "var(--table-header-subtle-bg-alt)" : "var(--page-bg-alt)"};
      color: var(--table-header-subtle-label-default);
    `}
  `}

  ${({ $size }) => css`
    ${$size === "extra-small" && `
      height: var(--global-size-xs);
    `}
    ${$size === "small" && `
      height: var(--global-size-s);
    `}
    ${$size === "medium" && `
      height: var(--global-size-m);
    `}
    ${$size === "large" && `
      height: var(--global-size-l);
    `}
    ${$size === "extra-large" && `
      height: var(--global-size-xxl);
    `}
  `}

  ${({ $width }) => $width && css`
    width: ${$width};
    min-width: ${$width};
  `}

  padding: 0;
  
  & > div {
    text-align: left;
    display: inline-flex;
    align-items: center;
    gap: var(--global-space-comp-s);
    white-space: nowrap;
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    > button[data-component="sort"] {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }

    ${({ $size }) => css`
      ${$size === "extra-small" && `
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-s);
          font: var(--global-font-static-comp-medium-s);
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-s);
          font: var(--global-font-static-comp-medium-s);
        }
      `}
      ${$size === "small" && `
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-s);
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-s);
        }
      `}
      ${$size === "medium" && `
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-m);
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-m);
        }
      `}
      ${$size === "large" && `
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-l);
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-l);
        }
      `}
      ${$size === "extra-large" && `
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-l);
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-l);
        }
      `}
    `}
  }
`;

export default StyledTableHeaderCell;
