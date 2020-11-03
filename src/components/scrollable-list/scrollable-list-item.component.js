import styled, { css } from "styled-components";
import propTypes from "prop-types";
import baseTheme from "../../style/themes/base";

const ScrollableListItem = styled.li`
  ${({ isSelectable }) =>
    isSelectable &&
    css`
      cursor: pointer;
    `}
  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background-color: ${theme.select.selected};
    `}
  box-sizing: content-box;
  padding: 5px 6px;
  width: 100%;
`;

ScrollableListItem.propTypes = {
  id: propTypes.any,
  isSelected: propTypes.bool,
  theme: propTypes.object,
};

ScrollableListItem.defaultProps = {
  isSelectable: true, // defaulted to true so it integrates with ScrollableList by default,
  theme: baseTheme,
};

export default ScrollableListItem;
