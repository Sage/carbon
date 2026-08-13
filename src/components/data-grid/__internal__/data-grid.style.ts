import styled, { css } from "styled-components";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { DataGridCellType, DataGridCellWeight } from "../data-grid.types";

interface Dimensions {
  cellType: DataGridCellType;
  width?: number;
  minWidth?: number;
  flex?: number;
  sticky?: "left" | "right";
  stickyOffset?: number;
}

const dimensions = ({
  cellType,
  width,
  minWidth,
  flex,
  sticky,
  stickyOffset,
}: Dimensions) => css`
  ${width || cellType === "action" ? `width: ${width ?? 52}px;` : ""}
  min-width: ${width ?? minWidth ?? (cellType === "action" ? 52 : 120)}px;
  ${flex && !width ? `width: ${flex * 160}px;` : ""}
  ${sticky
    ? `${sticky}: ${stickyOffset ?? 0}px; position: sticky; z-index: 2;`
    : ""}
`;

export const StyledTableWrapper = styled.div.attrs(applyBaseTheme)<{
  height?: number | string;
  width?: number | string;
}>`
  box-sizing: border-box;
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : (height ?? "auto")};
  overflow: auto;
  width: ${({ width }) =>
    typeof width === "number" ? `${width}px` : (width ?? "100%")};
`;

export const StyledGrid = styled.div<{ contentWidth?: number }>`
  font-family: var(--fontFamiliesDefault);
  font-size: var(--fontSizes100);
  min-width: ${({ contentWidth }) =>
    contentWidth ? `${contentWidth}px` : "100%"};
  width: 100%;
`;

export const StyledHeaderRow = styled.div<{ gridTemplateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
`;

export const StyledRow = styled.div<{ gridTemplateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
`;

export const StyledHeader = styled.div<Dimensions>`
  ${dimensions}
  background: var(--colorsUtilityMajor025);
  border: 0;
  box-sizing: border-box;
  color: var(--colorsUtilityYin090);
  font-weight: var(--fontWeights500);
  height: var(--sizing500);
  line-height: var(--lineHeights500);
  padding: 0 var(--spacing200);
  position: sticky;
  text-align: ${({ cellType }) =>
    cellType === "checkbox" ? "center" : "left"};
  top: 0;
  z-index: ${({ sticky }) => (sticky ? 4 : 3)};

  &::after {
    background: linear-gradient(90deg, rgb(0 0 0 / 10%), transparent);
    content: ${({ sticky }) => (sticky === "left" ? '""' : "none")};
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: -4px;
    top: 0;
    width: 4px;
  }
`;

export const StyledCell = styled.div<
  Dimensions & {
    hasError: boolean;
    readOnly: boolean;
    editing: boolean;
    weight: DataGridCellWeight;
  }
>`
  ${dimensions}
  background: ${({ readOnly }) =>
    readOnly
      ? "var(--colorsUtilityReadOnly500)"
      : "var(--colorsUtilityYang100)"};
  border: 0;
  border-right: var(--borderWidth100) solid var(--colorsUtilityMajor300);
  border-top: var(--borderWidth100) solid var(--colorsUtilityMajor300);
  box-sizing: border-box;
  cursor: ${({ editing, cellType }) =>
    editing || cellType === "text" ? "text" : "cell"};
  font-weight: ${({ weight, editing }) =>
    editing
      ? "var(--fontWeights400)"
      : `var(--fontWeights${weight === "medium" ? "500" : "400"})`};
  height: var(--sizing500);
  outline: none;
  padding: 0;
  position: ${({ sticky }) => (sticky ? "sticky" : "relative")};

  &:first-child {
    border-left: var(--borderWidth100) solid var(--colorsUtilityMajor300);
  }

  ${({ sticky }) =>
    sticky === "left" &&
    css`
      &::after {
        background: linear-gradient(90deg, rgb(0 0 0 / 10%), transparent);
        content: "";
        height: 100%;
        pointer-events: none;
        position: absolute;
        right: -4px;
        top: 0;
        width: 4px;
      }
    `}
  &:hover {
    background: ${({ readOnly }) =>
      readOnly
        ? "var(--colorsUtilityReadOnly500)"
        : "var(--colorsUtilityMajor025)"};
  }

  ${({ hasError }) =>
    hasError &&
    css`
      box-shadow: inset 0 0 0 var(--borderWidth200)
        var(--colorsSemanticNegative500);
      z-index: 1;
    `}

  &:focus-visible {
    box-shadow: inset 0 0 0 var(--borderWidth200) var(--colorsUtilityYin100);
    z-index: 3;
  }

  ${({ editing }) =>
    editing &&
    css`
      box-shadow:
        inset 0 0 0 var(--borderWidth200) var(--colorsSemanticFocus500),
        inset 0 0 0 var(--borderWidth400) var(--colorsUtilityYin100);
      z-index: 3;
    `}
`;

export const StyledCellContent = styled.div<{ cellType: DataGridCellType }>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  gap: var(--spacing100);
  height: var(--sizing500);
  justify-content: ${({ cellType }) =>
    cellType === "checkbox" ? "center" : "space-between"};
  overflow: hidden;
  padding: ${({ cellType }) =>
    cellType === "checkbox"
      ? "0 var(--spacing100)"
      : cellType === "action"
        ? "0 var(--spacing050)"
        : "0 var(--spacing200)"};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const editor = css`
  background: transparent;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  font: inherit;
  height: 100%;
  outline: none;
  padding: 0 var(--spacing200);
  width: 100%;
`;

export const StyledEditor = styled.input`
  ${editor}
`;
export const StyledSelect = styled.select`
  ${editor}
`;

export const StyledSpacer = styled.div<{ height: number }>`
  box-sizing: border-box;
  height: ${({ height }) => `${height}px`};
`;

export const StyledCheckbox = styled.input`
  accent-color: var(--colorsActionMajor500);
  height: var(--sizing300);
  margin: 0;
  pointer-events: none;
  width: var(--sizing300);
`;
