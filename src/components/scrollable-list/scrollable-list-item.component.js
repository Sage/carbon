import React from 'react';
import styled, { css } from 'styled-components';
import ScrollableListContext from './scrollable-list.context';
import ScrollableItemWrapper from './scrollable-item-wrapper.component';
import propTypes from './scrollable-list-item.proptypes';

const StyledListItem = styled.li`
  width: 100%;
  padding: 5px 6px;
  ${({ isSelected }) => isSelected && css`background-color: #E6E9E7;`}
  height: 15px;
`;

StyledListItem.defaultProps = {
  isSelectable: true
}

// const Item = (props) => {
//   // console.log('ScrollableItemWrapper(StyledListItem, props)', ScrollableItemWrapper(StyledListItem, props));
//   return ScrollableItemWrapper(StyledListItem, props);
// };

// Item.propTypes = propTypes;

export default StyledListItem;
