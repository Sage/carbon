import styled, { css } from "styled-components";
import propTypes from "prop-types";

const StyledOption = styled.li`
  cursor: pointer;
  box-sizing: border-box;
  line-height: 16px;
  padding: 12px 16px;
  width: 100%;
  user-select: none;

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: var(--colorsUtilityMajor200);
    `}

  ${({ hidden }) => hidden && "display: none;"}

  :hover {
    background-color: var(--colorsUtilityMajor200);
  }
`;

StyledOption.propTypes = {
  id: propTypes.any,
  isHighlighted: propTypes.bool,
};

export default StyledOption;
