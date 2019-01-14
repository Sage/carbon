import React from 'react';
import styled, { css } from 'styled-components';
import { ScrollableListContext } from './scrollable-list.component';

const Item = ({ className, id, children }) => {
  return (
    <ScrollableListContext.Consumer>
      {
        context => (
          <li 
            onMouseOver={ () => context.onMouseOver(id) }
            className={ className }
            onClick={ () => context.onClick(id) }
          >
            {children}
          </li>
        )
      }
    </ScrollableListContext.Consumer>
  );
};

const ScrollableListItem = styled(Item)`
  width: 100%;
  padding: 5px 6px;
  ${({ isSelected }) => isSelected && css`background-color: #E6E9E7;`}
  height: 15px;
`;

export default ScrollableListItem;
