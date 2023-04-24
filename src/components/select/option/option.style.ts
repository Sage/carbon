import styled, { css } from "styled-components";
import { OptionProps } from ".";

interface StyledOptionProps extends Pick<OptionProps, "id"> {
  isHighlighted?: boolean;
}

const StyledOption = styled.li<StyledOptionProps>`
  cursor: pointer;
  box-sizing: border-box;
  line-height: 16px;
  padding: 12px 16px;
  width: 100%;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: var(--colorsUtilityMajor200);
    `}

  ${({ hidden }) => hidden && "display: none;"}

  :hover {
    background-color: var(--colorsUtilityMajor100);
  }
`;

export default StyledOption;
