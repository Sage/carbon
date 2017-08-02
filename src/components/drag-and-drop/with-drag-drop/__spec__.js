import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import WithDragDrop from './with-drag-drop';
import DraggableContext from './../draggable-context';
import Text from './../../../utils/helpers/text';

describe('WithDragDrop', () => {
  let wrapper, wrapper2;

  const DummyComponent = () => <div>Test</div>;

  describe('render', () => {
    let connectDragSource
    beforeEach(() => {
      connectDragSource = (bar) => { foo: bar }
      wrapper = mount(
        <DraggableContext onDrag={ () => {} }>
          <WithDragDrop>
            <DummyComponent />
          </WithDragDrop>
        </DraggableContext>
      )
    })
    it('clones the children with props passed through', () => {
      const child = wrapper.find(DummyComponent)
      expect(child.props().connectDragSource).toEqual(expect.any(Function))
      expect(child.props().connectDragPreview).toEqual(expect.any(Function))
    });
  });

  describe('Drag and drop', () => {
    let backend, handlerId, targetId, beginDragContextSpy, beginDragPropSpy,
    endDragContextSpy, endDragPropSpy, hoverContextSpy, hoverPropSpy,
    component, component2;

    const TestComponent = (props) => {
      return(
        props.connectDragPreview(
          props.connectDragSource(
            <div>foo</div>
          )
        )
      )
    }

    function createWrapper(props = {}) {
      let DnD = wrapInTestContext(WithDragDrop);
      wrapper = mount(
        <DnD { ...props } index={1}>
          <TestComponent index={1} />
        </DnD>
      );

      wrapper2 = mount(
        <DnD { ...props } index={2}>
          <TestComponent index={2} />
        </DnD>
      );

      component = wrapper.find(WithDragDrop).getNode();
      handlerId = component.getDecoratedComponentInstance().getHandlerId();
      component2 = wrapper2.find(WithDragDrop).getNode();
      targetId = component2.getHandlerId();
      backend = wrapper.getNode().getManager().backend;
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
              dragAndDropBeginDrag: beginDragContextSpy,
              dragAndDropEndDrag: endDragContextSpy,
              dragAndDropHover: hoverContextSpy
            };
          }

          render() {
            return <DecoratedComponent {...this.props} />;
          }
        }
      );
    }

    beforeEach(() => {
      jest.spyOn(Text, 'clearSelection').mockImplementation(() => {});
      hoverContextSpy = jest.fn();
      hoverPropSpy = jest.fn();
      beginDragContextSpy = jest.fn(() => ({ index: 1 }))
      beginDragPropSpy = jest.fn(() => ({ index: 1 }))
      endDragContextSpy = jest.fn();
      endDragPropSpy = jest.fn();
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
      });

      describe('endDrag', () => {
        it('calls the endDrag from context', () => {
          backend.simulateBeginDrag([handlerId]);
          backend.simulateEndDrag([handlerId]);
          expect(endDragPropSpy).not.toHaveBeenCalled();
          expect(endDragContextSpy).toHaveBeenCalled();
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
    })

    describe('with custom props', () => {
      beforeEach(() => {
        createWrapper({
          hover: hoverPropSpy,
          beginDrag: beginDragPropSpy,
          endDrag: endDragPropSpy
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
    })

    describe('when the canDrag prop is a function that returns false', () => {
      beforeEach(() => {
        createWrapper({
          canDrag: () => false
        });
      });

      it('it does not trigger begin drag', () => {
        backend.simulateBeginDrag([handlerId]);
        expect(beginDragContextSpy).not.toHaveBeenCalled();
      });
    })
  });
});
