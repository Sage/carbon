import styled, { css } from "styled-components";
import { OptionRowProps } from ".";

interface StyledOptionRowProps extends Pick<OptionRowProps, "hidden"> {
  isHighlighted?: boolean;
  isDisabled?: boolean;
  isInGroup?: boolean;
}

const StyledOptionRow = styled.tr<StyledOptionRowProps>`
  cursor: pointer;
  width: 100%;
  top: 0;
  left: 0;

  ${({ hidden }) => hidden && "display: none;"}

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: var(--colorsUtilityMajor200);
    `}

  :hover {
    background-color: var(--colorsUtilityMajor100);
  }

  td {
    line-height: 16px;
    padding: 12px 16px;

    &:first-child {
      font-weight: 500;
    }
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--colorsUtilityYin030);
      cursor: not-allowed;
      :hover {
        background-color: var(--colorsUtilityYang100);
      }
    `}

  ${({ isInGroup }) => !isInGroup && "position: absolute;"}
`;

export default StyledOptionRow;
