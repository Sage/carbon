import React from 'react';
import ReactDOM from 'react-dom';
import DraggableContext from './draggable-context';
import { mount } from 'enzyme';
import ItemTargetHelper from './../../../utils/helpers/dnd/item-target';
import Browser from './../../../utils/helpers/browser';
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

    describe('handleMouseMove', () => {
      beforeEach(() => {
        instance.checkAutoScrollTrigger = jest.fn();
      });
      it('does nothing with activeIndex not present', () => {
        instance.handleMouseMove();
        expect(instance.checkAutoScrollTrigger).not.toHaveBeenCalled()
      });
    });

    describe('startScrolling', () => {
      let frameMock;
      beforeEach(() => {
        instance.frame = true;
        const windowMock = jest.fn();
        frameMock = jest.fn();
        windowMock.mockReturnValue({requestAnimationFrame: frameMock});
        Browser.getWindow= windowMock;
      });
      it('is immune to startScrolling when there is a frame', () => {
        instance.startScrolling();
        expect(frameMock).not.toHaveBeenCalled();
      });
    });

    describe('checkAutoScrollTrigger', () => {
      it('is immune to triggering when dragging index is null', () => {
        expect(instance.checkAutoScrollTrigger()).toBeUndefined();
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

  describe('passing in autoScroll', () => {
    let scrollingMock;
    beforeEach(() => {
      onDragSpy = jasmine.createSpy('onDragSpy');
      wrapper = mount(
        <DraggableContext onDrag={ onDragSpy } autoScroll>
          <div className='draggable-child'>
            <p>One</p>
            <p>Two</p>
          </div>
        </DraggableContext>
      );
      instance = wrapper.instance().child;
      instance.setState({ activeIndex: 1 });
      const windowMock = jest.fn();
      scrollingMock = jest.fn();
      const domMock = jest.fn((elem) => {elem.speed = 0;});
      ReactDOM.findDOMNode = domMock;

      const windowParams = { 
        innerHeight: 600,
        requestAnimationFrame: (method) => { method(); },
        scrollTo: scrollingMock,
        scrollX: 0
      }
      
      windowMock.mockReturnValue(windowParams);
      Browser.getWindow= windowMock;
    });

    it('does not cause scrolling when dragging in the center of the table', () =>{
      instance.handleMouseMove({clientY: 300});
      expect(instance.state.activeIndex).toEqual(1);
      expect(wrapper.props().autoScroll).toBe(true);
      expect(scrollingMock).not.toHaveBeenCalled();
    });

    it('scrolls the window down when dragging the element toward the bottom of the window', () => {
      instance.handleMouseMove({clientY: 540});
      expect(instance.state.activeIndex).toEqual(1);
      expect(wrapper.props().autoScroll).toBe(true);
      expect(scrollingMock).toHaveBeenCalled();
    });

    it('scrolls the window up when dragging the element toward the top of the window', () => {
      instance.handleMouseMove({clientY: 60});
      expect(instance.state.activeIndex).toEqual(1);
      expect(wrapper.props().autoScroll).toBe(true);
      expect(scrollingMock).toHaveBeenCalled();
    });
  });


  describe('passing in autoScroll in a Dialog', () => {
    let scrollingMock;
    beforeEach(() => {
      onDragSpy = jasmine.createSpy('onDragSpy');
      wrapper = mount(
        <DraggableContext onDrag={ onDragSpy } autoScroll>
          <div className='draggable-child'>
            <p>One</p>
            <p>Two</p>
          </div>
        </DraggableContext>
      );
      instance = wrapper.instance().child;
      instance.setState({ activeIndex: 1 });
      const windowMock = jest.fn();
      scrollingMock = jest.fn();
      const domMock = jest.fn((elem) => {elem.speed = 0; return { scrollTop: 0 }; } );
      ReactDOM.findDOMNode = domMock;

      const windowParams = { 
        getComputedStyle: () => ({position: 'relative', overflow: 'scroll'}),
        innerHeight: 600,
        requestAnimationFrame: (method) => { method(); },
        scrollTo: scrollingMock,
        scrollX: 0
      }
      
      windowMock.mockReturnValue(windowParams);
      Browser.getWindow= windowMock;
    });


    it('scrolls and moves the element that should be scrolled', () => {
      instance.handleMouseMove({clientY: 540});
      expect(instance.state.activeIndex).toEqual(1);
      expect(wrapper.props().autoScroll).toBe(true);
      expect(scrollingMock).toHaveBeenCalled();
    });
  });
});
