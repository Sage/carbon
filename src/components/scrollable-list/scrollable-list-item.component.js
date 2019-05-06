import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const ScrollableListItem = styled.li`
  ${({ isSelectable }) => isSelectable && css`cursor: pointer;`}
  ${({ isSelected }) => isSelected && css`background-color: #E6E9E7;`}
  box-sizing: content-box;
  padding: 5px 6px;
  width: 100%;
`;

ScrollableListItem.propTypes = {
  id: propTypes.any,
  isSelected: propTypes.bool
};

ScrollableListItem.defaultProps = {
  isSelectable: true // defaulted to true so it integrates with ScrollableList by default
};

export default ScrollableListItem;
