import React from 'react';
import ScrollableListContext from './scrollable-list.context';

const ScrollableItemWrapper = (CaptiveComponent, index, isSelected) => (
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

export default ScrollableItemWrapper;
