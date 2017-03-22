import React from 'react';
import { DragDropContext } from 'react-dnd';
import DraggableContext from './draggable-context';
import { mount } from 'enzyme';

describe('DraggableContext', () => {

  it('is wrapped in a DragDropContextContainer', () => {
    expect(DraggableContext.name).toBe('DragDropContextContainer');
  });

  it('has a DecoratedComponent pointing to the original component', () => {
    expect(DraggableContext.DecoratedComponent.name).toBe('DraggableContext');
  });

  describe('render', () => {
    it('renders this.props.children', () => {
      let wrapper = mount(
        <DraggableContext>
          <div>
            <p>One</p>
            <p>Two</p>
          </div>
        </DraggableContext>
      );

      expect(wrapper.find('div').length).toEqual(1);
      expect(wrapper.find('p').length).toEqual(2);
    });
  });
});
