import React from 'react';
import ScrollableListContext from './scrollable-list.context';

const asScrollableListItem = (CaptiveComponent, index, isSelected) => (
  <ScrollableListContext.Consumer>
    {
      context => (
        React.cloneElement(CaptiveComponent, {
          ...CaptiveComponent.props,
          onMouseOver: () => context.onMouseOver(index),
          onClick: () => context.onClick(index),
          isSelected
        })
      )
    }
  </ScrollableListContext.Consumer>
);

export default asScrollableListItem;
