import styled, { css } from "styled-components";
import { OptionRowProps } from ".";

interface StyledOptionRowProps extends Pick<OptionRowProps, "hidden"> {
  isHighlighted?: boolean;
}

const StyledOptionRow = styled.tr<StyledOptionRowProps>`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

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
      font-weight: 700;
    }
  }
`;

export default StyledOptionRow;
