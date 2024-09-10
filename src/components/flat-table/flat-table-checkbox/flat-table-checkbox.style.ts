import styled, { css } from "styled-components";
import StyledCheckbox from "../../checkbox/checkbox.style";
import { FlatTableCheckboxProps } from "./flat-table-checkbox.component";

interface StyledFlatTableCheckboxProps
  extends Pick<FlatTableCheckboxProps, "as"> {
  makeCellSticky: boolean;
  leftPosition: number;
  rightPosition: number;
}

const StyledFlatTableCheckbox = styled.td<StyledFlatTableCheckboxProps>`
  ${({ as, leftPosition, rightPosition, makeCellSticky }) => css`
    ${as === "td" &&
    css`
      background-color: var(--colorsUtilityYang100);
      border-width: 0;
      border-bottom: 1px solid var(--colorsUtilityMajor100);
      overflow: visible;
      padding: 0;
      text-align: left;
      text-overflow: ellipsis;
      vertical-align: middle;
      white-space: nowrap;

      &:first-of-type {
        border-left: 1px solid var(--colorsUtilityMajor100);
      }

      &:last-of-type {
        border-right: 1px solid var(--colorsUtilityMajor100);
      }
    `}

    ${as === "th" &&
    css`
      background-color: transparent;
      border-width: 0;
      border-bottom: 1px solid var(--colorsUtilityMajor100);
      box-sizing: border-box;
      font-weight: 500;
      left: auto;
      padding: 0;
      text-align: left;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;
    `}

    ${makeCellSticky &&
    css`
      top: auto;
      ${leftPosition !== undefined && `left: ${leftPosition}px;`}
      ${rightPosition !== undefined && `right: ${rightPosition}px;`}
      position: sticky;
    `}
  `}

  width: 18px;

  ${StyledCheckbox} {
    padding-top: 0px;
  }
`;

export default StyledFlatTableCheckbox;
