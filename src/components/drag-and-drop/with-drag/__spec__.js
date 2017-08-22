import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import WithDrag from './with-drag';
import BrowserHelper from './../../../utils/helpers/browser';

describe('WithDrag', () => {
  let wrapper, backend, handlerId, beginDragContextSpy, beginDragPropSpy,
      endDragContextSpy, endDragPropSpy;

  function createWrapper(props = {}) {
    let DnD = wrapInTestContext(WithDrag);

    wrapper = mount(
      <DnD { ...props }>
        <div>foo</div>
      </DnD>
    );

    let component = wrapper.find(WithDrag).getNode();
    handlerId = component.getHandlerId();
    backend = wrapper.getNode().getManager().backend;
  }

  function wrapInTestContext(DecoratedComponent) {
    return DragDropContext(TestBackend)(
      class TestContextContainer extends React.Component {
        static childContextTypes = {
          dragAndDropBeginDrag: PropTypes.func,
          dragAndDropEndDrag: PropTypes.func
        }

        getChildContext() {
          return {
            dragAndDropBeginDrag: beginDragContextSpy,
            dragAndDropEndDrag: endDragContextSpy,
          };
        }

        render() {
          return <DecoratedComponent {...this.props} />;
        }
      }
    );
  }

  beforeEach(() => {
    beginDragContextSpy = jasmine.createSpy().and.returnValue({
      index: 1
    });
    beginDragPropSpy = jasmine.createSpy().and.returnValue({
      index: 1
    });
    endDragContextSpy = jasmine.createSpy();
    endDragPropSpy = jasmine.createSpy();
  });

  describe('without custom props', () => {
    beforeEach(() => {
      createWrapper();
    });

    describe('beginDrag', () => {
      it('calls the beginDrag from context', () => {
        backend.simulateBeginDrag([handlerId]);
        expect(beginDragPropSpy).not.toHaveBeenCalled();
        expect(beginDragContextSpy).toHaveBeenCalled();
      });

      it('disables text selection', () => {
        spyOn(BrowserHelper, 'getDocument').and.returnValue({});
        backend.simulateBeginDrag([handlerId]);
        expect(BrowserHelper.getDocument().onselectstart()).toBeFalsy();
      });
    });

    describe('endDrag', () => {
      it('calls the endDrag from context', () => {
        backend.simulateBeginDrag([handlerId]);
        backend.simulateEndDrag([handlerId]);
        expect(endDragPropSpy).not.toHaveBeenCalled();
        expect(endDragContextSpy).toHaveBeenCalled();
      });
      it('enables text selection', () => {
        spyOn(BrowserHelper, 'getDocument').and.returnValue({});
        backend.simulateBeginDrag([handlerId]);
        backend.simulateEndDrag([handlerId]);
        expect(BrowserHelper.getDocument().onselectstart).toBeNull();
      });
    });
  });

  describe('with custom props', () => {
    beforeEach(() => {
      createWrapper({
        beginDrag: beginDragPropSpy,
        endDrag: endDragPropSpy
      });
    });

    describe('beginDrag', () => {
      it('calls the beginDrag from context', () => {
        backend.simulateBeginDrag([handlerId]);
        expect(beginDragPropSpy).toHaveBeenCalled();
        expect(beginDragContextSpy).not.toHaveBeenCalled();
      });
    });

    describe('endDrag', () => {
      it('calls the endDrag from context', () => {
        backend.simulateBeginDrag([handlerId]);
        backend.simulateEndDrag([handlerId]);
        expect(endDragPropSpy).toHaveBeenCalled();
        expect(endDragContextSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('custom canDrag', () => {
    beforeEach(() => {
      createWrapper({
        canDrag: () => {
          return false
        }
      });
    });

    describe('when it returns false', () => {
      it('it does not trigger begin drag', () => {
        backend.simulateBeginDrag([handlerId]);
        expect(beginDragContextSpy).not.toHaveBeenCalled();
      });
    });
  });
});
