import styled, { css } from "styled-components";
import { OptionProps } from ".";

interface StyledOptionProps extends Pick<OptionProps, "id"> {
  isHighlighted?: boolean;
  isDisabled?: boolean;
  isInteractive: boolean;
  isInGroup?: boolean;
}

const StyledOption = styled.li<StyledOptionProps>`
  box-sizing: border-box;
  line-height: 16px;
  padding: 12px 16px;
  width: 100%;
  user-select: none;
  top: 0;
  left: 0;
  width: 100%;

  ${({ isInteractive, isHighlighted }) =>
    isInteractive &&
    css`
      cursor: pointer;
      :hover {
        background-color: var(--colorsUtilityMajor100);
      }
      ${isHighlighted &&
      css`
        background-color: var(--colorsUtilityMajor200);
      `}
    `}

  ${({ hidden }) => hidden && "display: none;"}

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

export default StyledOption;
