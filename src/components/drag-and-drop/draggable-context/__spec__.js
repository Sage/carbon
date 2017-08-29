import React from 'react';
import DraggableContext from './draggable-context';
import { mount } from 'enzyme';
import ItemTargetHelper from './../../../utils/helpers/dnd/item-target';
import CustomDragLayer from './../custom-drag-layer';

describe('DraggableContext', () => {
  let wrapper, instance, onDragSpy;

  describe('when not passing in a custom drag layer', () => {
    beforeEach(() => {
      onDragSpy = jasmine.createSpy('onDragSpy');
      wrapper = mount(
        <DraggableContext onDrag={ onDragSpy }>
          <div className='draggable-child'>
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
        expect(instance.handleBeginDrag({ index: 3, foo: 'bar' })).toEqual({
          index: 3,
          foo: 'bar'
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
        expect(wrapper.find('.draggable-child').length).toEqual(1);
        expect(wrapper.find('p').length).toEqual(2);
      });

      it('renders CustomDragLayer', () => {
        expect(wrapper.find(CustomDragLayer).length).toEqual(1);
      });
    });
  });

  describe('passing in a custom drag layer', () => {
    let customDragLayer, renderedCustomDragLayer;
    beforeEach(() => {
      onDragSpy = jasmine.createSpy('onDragSpy');
      customDragLayer = <CustomDragLayer className='my-custom-drag-layer' />
      wrapper = mount(
        <DraggableContext onDrag={ onDragSpy } customDragLayer={customDragLayer}>
          <div className='draggable-child'>
            <p>One</p>
            <p>Two</p>
          </div>
        </DraggableContext>
      );
    });

    describe('render', () => {
      it('uses the custom drag layer provided by the prop', () => {
        renderedCustomDragLayer = wrapper.find(CustomDragLayer)
        expect(renderedCustomDragLayer.length).toEqual(1);
        expect(renderedCustomDragLayer.props().className).toEqual('my-custom-drag-layer');
      });
    });
  });
});
