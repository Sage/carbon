// __spec__.js
import React from 'react';
import { shallow } from 'enzyme';

import { WithDragAndDrop, DraggableContext } from './with-drag-and-drop';
import Row from '../row';

describe('WithDragAndDrop', () => {
  it('has a DragDropContainer', () => {
    expect(WithDragAndDrop.name).toBe('DragDropContainer');
  });

  it('calls connectDragSource and connectDropTarget', () => {
    const OriginalComponent = WithDragAndDrop.DecoratedComponent;

    // Stub the React DnD connector functions with an identity function
    // -- https://react-dnd.github.io/react-dnd/docs-testing.html
    const identity = jasmine.createSpy('identity'); // el => el;

    let wrapper = shallow(
      <OriginalComponent
          connectDragSource={ identity }
          connectDropTarget={ identity }>
        <Row />
      </OriginalComponent>
    );

    expect(identity.calls.count()).toEqual(2);
  });
});
