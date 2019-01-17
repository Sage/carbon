import React from 'react';
import ScrollableListContext from './scrollable-list.context';

const ScrollableItemWrapper = (CaptiveComponent, props) => {
  // console.log('captive component: ', CaptiveComponent)
  // const { props } = CaptiveComponent;
  return (
    <ScrollableListContext.Consumer>
      {
        context => (
          <CaptiveComponent
            onMouseOver={ () => context.onMouseOver(props.id) }
            onClick={ () => context.onClick(props.id) }
            isSelected={ context.isSelected(props.id) }          
            { ...props }
          />
        )
      }
    </ScrollableListContext.Consumer>
  );
};

export default ScrollableItemWrapper;
