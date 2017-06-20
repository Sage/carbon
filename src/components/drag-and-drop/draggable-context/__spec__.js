import React from 'react';
import DraggableContext from './draggable-context';
import { mount } from 'enzyme';
import ItemTargetHelper from './../../../utils/helpers/dnd/item-target';

describe('DraggableContext', () => {
  let wrapper, instance, onDragSpy;

  beforeEach(() => {
    onDragSpy = jasmine.createSpy('onDragSpy');
    wrapper = mount(
      <DraggableContext onDrag={ onDragSpy }>
        <div>
          <p>One</p>
          <p>Two</p>
        </div>
      </DraggableContext>
    );

    instance = wrapper.instance().child;
  });

  it('is wrapped in a DragDropContextContainer', () => {
    expect(DraggableContext.name).toBe('DragDropContextContainer');
  });

  it('has a DecoratedComponent pointing to the original component', () => {
    expect(DraggableContext.DecoratedComponent.name).toBe('DraggableContext');
  });

  describe('handleHover', () => {
    it('references the onHoverUpDown method', () => {
      expect(instance.handleHover).toEqual(ItemTargetHelper.onHoverUpDown);
    });
  });

  describe('handleDrag', () => {
    it('sets activeIndex to the hoverIndex', () => {
      instance.handleDrag(2, 4);
      expect(instance.state.activeIndex).toEqual(4);
    });

    describe('when there is no originalIndex', () => {
      it('does not call onDrag', () => {
        instance.handleDrag(undefined, 4);
        expect(onDragSpy).not.toHaveBeenCalled();
      });
    });

    describe('when there is an originalIndex', () => {
      it('does not call onDrag', () => {
        instance.handleDrag(2, 4);
        expect(onDragSpy).toHaveBeenCalledWith(2, 4);
      });
    });
  });

  describe('handleBeginDrag', () => {
    it('returns the index of the props passed in', () => {
      expect(instance.handleBeginDrag({ index: 3 })).toEqual({
        index: 3
      });
    });
  });

  describe('handleEndDrag', () => {
    it('resets activeIndex', () => {
      instance.handleDrag(2, 4);
      instance.handleEndDrag();
      expect(instance.state.activeIndex).toBe(null);
    });
  });

  describe('render', () => {
    it('renders this.props.children', () => {
      expect(wrapper.find('div').length).toEqual(1);
      expect(wrapper.find('p').length).toEqual(2);
    });
  });
});
