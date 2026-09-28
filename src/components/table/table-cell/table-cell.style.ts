import styled, { css } from "styled-components";
import { TableContextProps } from "../__internal__/contexts";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { BorderThickness } from "../table.component";
import borderThicknessStyles from "../__internal__/config";

interface StyledTableCellProps {
  $isExpandable?: boolean;
  $size: TableContextProps["size"];
  $borderThickness?: BorderThickness;
}

interface CellContentProps {
  $isExpandable?: boolean;
  $align: "left" | "right" | "center";
  $size: TableContextProps["size"];
}

const getSize = (size: TableContextProps["size"]) => {
  switch (size) {
    case "extra-small":
      return {
        height: "var(--global-size-xs)",
        padding: "var(--global-space-none) var(--global-space-comp-s)",
        font: "var(--global-font-static-comp-regular-s)",
      };
    case "small":
      return {
        height: "var(--global-size-s)",
        padding: "var(--global-space-none) var(--global-space-comp-l)",
        font: "var(--global-font-static-comp-regular-s)",
      };
    case "large":
      return {
        height: "var(--global-size-l)",
        padding: "var(--global-space-none) var(--global-space-comp-l)",
        font: "var(--global-font-static-comp-regular-l)",
      };
    case "extra-large":
      return {
        height: "var(--global-size-xxl)",
        padding: "var(--global-space-none) var(--global-space-comp-l)",
        font: "var(--global-font-static-comp-regular-l)",
      };
    // medium is default size
    default:
      return {
        height: "var(--global-size-m)",
        padding: "var(--global-space-none) var(--global-space-comp-l)",
        font: "var(--global-font-static-comp-regular-m)",
      };
  }
};

const StyledTableCell = styled.td<StyledTableCellProps>`
  ${({ $borderThickness }) =>
    $borderThickness &&
    css`
      --table-cell-border-vertical-width: ${borderThicknessStyles[
        $borderThickness
      ]};
    `}

  padding: 0;
  height: ${({ $size }) => getSize($size).height};

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
      min-height: ${getSize($size).height};
      padding: ${getSize($size).padding};
      font: ${getSize($size).font};
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

export const CellContent = styled.div<CellContentProps>`
  border: none;
  background-color: transparent;
  text-align: ${({ $align }) => $align};

  ${({ $isExpandable }) =>
    $isExpandable &&
    css`
      color: inherit;
      font: inherit;
      appearance: none;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;

      &:focus {
        outline: none;
        ${addFocusStyling(true)}
      }
    `}

  [data-element="table-cell-drag-handle"] {
    display: inline-grid;
    place-items: center;
    min-width: 40px;
    min-height: ${({ $size }) => getSize($size).height};
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;

    &:active {
      cursor: grabbing;
    }
  }
`;

export default StyledTableCell;
