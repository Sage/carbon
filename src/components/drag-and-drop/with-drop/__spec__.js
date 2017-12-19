import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import Browser from '../../../utils/helpers/browser';
import WithDrag from './../with-drag';
import WithDrop from './with-drop';

describe('WithDrop', () => {
  let wrapper,
      backend,
      handlerId,
      targetId,
      hoverContextSpy,
      hoverPropSpy,
      mockSelection,
      mockWindow;

  function createWrapper(props = {}) {
    let DnD = wrapInTestContext(WithDrop);

    wrapper = mount(
      <DnD { ...props }>
        <div>
          <WithDrag><div>foo</div></WithDrag>
        </div>
      </DnD>
    );

    let component = wrapper.find(WithDrag).instance();
    handlerId = component.getHandlerId();
    component = wrapper.find(WithDrop).instance();
    targetId = component.getHandlerId();
    backend = wrapper.instance().getManager().backend;
  }

  function wrapInTestContext(DecoratedComponent) {
    return DragDropContext(TestBackend)(
      class TestContextContainer extends React.Component {
        static childContextTypes = {
          dragAndDropBeginDrag: PropTypes.func,
          dragAndDropEndDrag: PropTypes.func,
          dragAndDropHover: PropTypes.func
        }

        getChildContext() {
          return {
            dragAndDropBeginDrag: () => { return { index: 1 }; },
            dragAndDropEndDrag: () => {},
            dragAndDropHover: hoverContextSpy,
          };
        }

        render() {
          return <DecoratedComponent {...this.props} />;
        }
      }
    );
  }


  beforeEach(() => {
    hoverContextSpy = jasmine.createSpy().and.callThrough();
    hoverPropSpy = jasmine.createSpy().and.callThrough();

    mockSelection = {
      removeAllRanges() {}
    };

    mockWindow = {
      getSelection() {
        return mockSelection;
      },
      addEventListener() {},
      removeEventListener() {}
    };

    spyOn(mockSelection, 'removeAllRanges');

    spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
  });

  describe('without custom props', () => {
    beforeEach(() => {
      createWrapper({
        index: 1
      });
    });

    describe('hover', () => {
      it('calls the hover from context', () => {
        backend.simulateBeginDrag([handlerId]);
        backend.simulateHover([targetId]);
        expect(hoverPropSpy).not.toHaveBeenCalled();
        expect(hoverContextSpy).toHaveBeenCalled();
      });
    });
  });

  describe('with custom props', () => {
    beforeEach(() => {
      createWrapper({
        index: 1,
        hover: hoverPropSpy
      });
    });

    describe('hover', () => {
      it('calls the hover from props', () => {
        backend.simulateBeginDrag([handlerId]);
        backend.simulateHover([targetId]);
        expect(hoverPropSpy).toHaveBeenCalled();
        expect(hoverContextSpy).not.toHaveBeenCalled();
      });
    });
  });
});
