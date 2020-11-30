import styled, { css } from "styled-components";
import propTypes from "prop-types";
import baseTheme from "../../../style/themes/base";

const StyledOption = styled.li`
  cursor: pointer;
  box-sizing: content-box;
  line-height: 16px;
  padding: 12px 16px;
  width: 100%;
  user-select: none;

  ${({ isHighlighted, theme }) =>
    isHighlighted &&
    css`
      background-color: ${theme.select.selected};
    `}

  ${({ hidden }) => hidden && "display: none;"}

  :hover {
    ${({ theme }) =>
      css`
        background-color: ${theme.select.selected};
      `}
  }
`;

StyledOption.propTypes = {
  id: propTypes.any,
  isHighlighted: propTypes.bool,
  theme: propTypes.object,
};

StyledOption.defaultProps = {
  theme: baseTheme,
};

export default StyledOption;
