// __spec__.js
import React from 'react';
import { shallow } from 'enzyme';

import { WithDragAndDrop, DraggableContext } from './with-drag-and-drop';

describe('WithDragAndDrop', () => {
  it('has a DragDropContainer', () => {
    expect(WithDragAndDrop.name).toBe('DragDropContainer');
  });

  it('calls connectDragSource and connectDropTarget', () => {
    const OriginalComponent = WithDragAndDrop.DecoratedComponent;

    // Stub the React DnD connector functions with an identity function
    //
    // Track calls using count.
    // Return el, otherwise React complains that WithDragAndDrop.render()
    // doesn't return a valid React element.
    let count = 0;
    const identity = (el) => {
      count += 1;
      return el;
    };

    let wrapper = shallow(
      <OriginalComponent
          connectDragSource={ identity }
          connectDropTarget={ identity }>
        <div>
          Draggable
        </div>
      </OriginalComponent>
    );

    expect(count).toEqual(2);
  });
});
