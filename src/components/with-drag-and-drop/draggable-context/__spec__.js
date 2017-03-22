import React from 'react';
import { DragDropContext } from 'react-dnd';
import DraggableContext from './draggable-context';

fdescribe('DraggableContext', () => {

  it('is wrapped in a DragDropContextContainer', () => {
    expect(DraggableContext.name).toBe('DragDropContextContainer');
  });

  it('has a DecoratedComponent pointing to the original component', () => {
    expect(DraggableContext.DecoratedComponent.name).toBe('DraggableContext');
  });
});
