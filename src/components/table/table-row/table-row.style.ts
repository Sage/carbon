import styled, {css} from "styled-components";
import { TableContextProps } from "../__internal__/context";
import { BorderThickness } from "../table.component";
import borderThicknessStyles from "../__internal__/config";

interface StyledTableRowProps {
  $isExpanded?: boolean;
  $isSelected?: boolean;
  $isHighlighted?: boolean;
  $size: TableContextProps["size"];
  $borderThickness?: BorderThickness;
  $isDropTarget?: boolean;
  $isDraggable?: boolean;
  $isDragging?: boolean;
  $isSubRowVisible?: boolean;
}

const StyledTableRow = styled.tr<StyledTableRowProps>`
  ${({ $borderThickness }) => $borderThickness && css`
    --table-cell-border-horizontal-width: ${borderThicknessStyles[$borderThickness]};
  `}

  ${({ $isDropTarget }) => $isDropTarget && css`
    &&& {
      > th,
      > td {
        position: relative;
      }

      > th::after,
      > td::after {
        content: "";
        position: absolute;
        z-index: 10;
        right: -1px;
        bottom: 0;
        left: -1px;
        height: 3px;
        background-color: var(--container-action-target-bg-default);
        pointer-events: none;
      }
    }
  `}

  ${({ $isDragging }) => $isDragging && css`
    && {
      position: relative;
      z-index: 2;
      box-shadow: var(--global-depth-lvl3);

      &&& {
        > th:not(:last-child),
        > td:not(:last-child) {
          border-right-color: transparent;
          box-shadow: none;
        }

        > th:last-child,
        > td:last-child {
          border-left-color: transparent;
          box-shadow: none;
        }

        > th,
        > td {
          background-color: var(--container-draggable-ghost);
          background-color: color-mix(
            in srgb,
            var(--container-draggable-ghost) 50%,
            transparent
          );

          * {
            visibility: hidden;
          }
        }

        > th::before,
        > th::after,
        > td::before,
        > td::after {
          display: none;
        }
      }
    }
  `}

  ${({ $isSelected }) => $isSelected && css`
    > td {
      background-color: var(--table-row-bg-selected);
    }
  `}

  ${({ $isSubRowVisible }) => $isSubRowVisible !== undefined && css`
    &[data-component$="sub-row"] {
      &:not([data-component$="sub-row"] + [data-component$="sub-row"]) {
        td {
          position: relative;
        }

        td::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--mode-color-generic-depth-faint) 0%,
            var(--mode-color-generic-depth-faint) 100%,
            transparent 100%
          );
          pointer-events: none;
        }
      }

      && {
        > td {
          height: 0;
          padding: 0;
          overflow: hidden;
          ${!$isSubRowVisible && css`border-bottom-width: 0;`}
        }
      }
      
      > td > [data-element="table-cell-collapse"] {
        grid-template-rows: ${$isSubRowVisible ? "1fr" : "0fr"};
        opacity: ${$isSubRowVisible ? 1 : 0};
        transform: translateY(
          ${$isSubRowVisible ? "0" : "-4px"}
        );
      }

      @media (prefers-reduced-motion: no-preference) {
        > td > [data-element="table-cell-collapse"] {
          transition:
            grid-template-rows 200ms ease,
            opacity 150ms ease,
            transform 200ms ease;
        }
      }
    }
  `}
`;

export default StyledTableRow;
