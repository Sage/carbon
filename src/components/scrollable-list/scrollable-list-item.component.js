import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const ScrollableListItem = styled.li`
  width: 100%;
  padding: 5px 6px;
  ${({ isSelected }) => isSelected && css`background-color: #E6E9E7;`}
  height: 15px;
`;

ScrollableListItem.propTypes = {
  id: propTypes.number,
  isSelected: propTypes.bool
};

ScrollableListItem.defaultProps = {
  isSelectable: true // defaulted to true so it integrates with ScrollableList by default
};

export default ScrollableListItem;
