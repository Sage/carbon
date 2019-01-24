import React from 'react';
import ScrollableListContext from './scrollable-list.context';

const ScrollableItemWrapper = (CaptiveComponent, compProps) => {
  const { id } = compProps;
  return (
    <ScrollableListContext.Consumer>
      {
        context => (
          <CaptiveComponent
            onMouseOver={ () => context.onMouseOver(id) }
            onClick={ () => context.onClick(id) }
            isSelected={ context.isSelected(id) }
            { ...compProps }
          />
        )
      }
    </ScrollableListContext.Consumer>
  );
};

export default ScrollableItemWrapper;
