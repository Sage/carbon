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
  $align: "left" | "right" | "center";
}

const StyledTableHeaderCell = styled.th<StyledTableHeaderCellProps>`
  ${({ $borderThickness }) =>
    $borderThickness &&
    css`
      --table-cell-border-vertical-width: ${borderThicknessStyles[
        $borderThickness
      ]};
    `}

  font: var(--global-font-static-comp-medium-m);

  ${({ $variant, $alternate }) => css`
    ${$variant === "prominent" &&
    css`
      background-color: ${$alternate
        ? "var(--table-header-harsh-bg-alt)"
        : "var(--table-header-harsh-bg-default)"};
      color: var(--table-header-harsh-label-default);
    `}
    ${$variant === "subtle-white" &&
    css`
      background-color: ${$alternate
        ? "var(--table-header-subtle-bg-alt)"
        : "var(--page-bg-default)"};
      color: var(--table-header-subtle-label-default);
    `}
    ${$variant === "subtle-grey" &&
    css`
      background-color: ${$alternate
        ? "var(--table-header-subtle-bg-alt)"
        : "var(--page-bg-alt)"};
      color: var(--table-header-subtle-label-default);
    `}
  `}

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

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
      min-width: ${$width};
    `}

  padding: var(--global-space-none);

  & > div {
    display: inline-flex;
    align-items: center;
    gap: var(--global-space-comp-s);
    white-space: nowrap;
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    ${({ $align }) => css`
      ${$align === "right" &&
      css`
        &:not([data-is-sortable="true"]) {
          justify-content: flex-end;
        }
      `}
      ${$align === "center" &&
      css`
        &:not([data-is-sortable="true"]) {
          justify-content: center;
        }
      `}
    `}

    > button[data-component="sort"] {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      ${({ $align }) => css`
        ${$align === "right" &&
        css`
          justify-content: flex-end;
        `}
        ${$align === "center" &&
        css`
          justify-content: center;
        `}
      `}

      &:hover {
        background-color: ${({ $variant }) =>
          $variant === "prominent"
            ? "var(--table-header-harsh-bg-hover)"
            : "var(--table-header-subtle-bg-hover)"};
      }
    }

    ${({ $size, $variant }) => css`
      ${$size === "extra-small" &&
      css`
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-s);
          font: var(--global-font-static-comp-medium-s);

          ${$variant !== "prominent" &&
          css`
            padding-left: calc(var(--global-space-comp-s) + 1px);
          `}
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-s);
          font: var(--global-font-static-comp-medium-s);
        }
      `}
      ${$size === "small" &&
      css`
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-s);

          ${$variant !== "prominent" &&
          css`
            padding-left: calc(var(--global-space-comp-l) + 1px);
          `}
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-s);
        }
      `}
      ${$size === "medium" &&
      css`
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-m);

          ${$variant !== "prominent" &&
          css`
            padding-left: calc(var(--global-space-comp-l) + 1px);
          `}
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-m);
        }
      `}
      ${$size === "large" &&
      css`
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-l);

          ${$variant !== "prominent" &&
          css`
            padding-left: calc(var(--global-space-comp-l) + 1px);
          `}
        }

        > button[data-component="sort"] {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-l);
        }
      `}
      ${$size === "extra-large" &&
      css`
        &:not([data-is-sortable="true"]) {
          padding: var(--global-space-none) var(--global-space-comp-l);
          font: var(--global-font-static-comp-medium-l);

          ${$variant !== "prominent" &&
          css`
            padding-left: calc(var(--global-space-comp-l) + 1px);
          `}
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
