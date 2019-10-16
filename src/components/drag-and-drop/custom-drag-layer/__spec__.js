import React from 'react';
import { mount, shallow } from 'enzyme';
import { UndecoratedCustomDragLayer, collect } from './custom-drag-layer';
import StyledDragContainer from './custom-drag-layer.style';
import CustomDragLayer from './custom-drag-layer';
import DraggableContext from './../draggable-context';
import Browser from './../../../utils/helpers/browser';

describe('CustomDragLayer', () => {
  let wrapper, instance, child;
  let draggableNode = Browser.getDocument().createElement('div');
  let clonedNode = Browser.getDocument().createElement('div');
  beforeEach(() => {
    jest.spyOn(draggableNode, 'getBoundingClientRect').mockImplementation(() => ({ width: 10 }))
    jest.spyOn(draggableNode, 'cloneNode').mockImplementation(() => clonedNode)
  });

  describe('when the component is being dragged and there is a currentOffset and draggable node', () => {
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={false}
        />
      );
      spyOn(wrapper.instance()._container, 'appendChild')
      wrapper.setProps({ isDragging: true })
    });

    it('transforms the component position by the currentOffset and creates the ghost layer', () => {
      expect(wrapper.instance()._container.appendChild).toHaveBeenCalledWith(clonedNode)
      const container = wrapper.find(StyledDragContainer);
      expect(container.length).toEqual(1);
      const style = container.props().style;
      expect(style.WebkitTransform).toEqual('translate(1px, 2px)');
      expect(style.width).toEqual(10);
    })
  });

  describe('when there is no _container ref', () => {
    beforeEach(() => {
      wrapper = shallow(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={false}
        />,
        { lifecycleExperimental: true }
      );
      wrapper.setProps({ isDragging: true })
    });

    it('does not add the ghost layer', () => {
      expect(wrapper.getElement()._container).toBeUndefined();
      const container = wrapper.find(StyledDragContainer);
      expect(container.length).toEqual(1);
    });
  });

  describe('when the draggableNode changes', () => {
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={true}
        />
      );
      const newDraggableNode = {
        getBoundingClientRect: () => ( {width: 20} ),
        cloneNode: () => ( clonedNode )
      }
      wrapper.setProps({ draggableNode: newDraggableNode })
    })
    it('sets the cloned child width', () => {
      const container = wrapper.find(StyledDragContainer);
      expect(container.length).toEqual(1);
      const style = container.props().style
      expect(style.WebkitTransform).toEqual('translate(1px, 2px)');
      expect(wrapper.instance().width).toEqual(20)
    });
  });

  describe('when the draggableNode is removed', () => {
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={false}
        />
      );
      spyOn(wrapper.instance()._container, 'appendChild');
      wrapper.setProps({ isDragging: true });
    });

    it('removes the clonedChild and sets this.clonedChild to null', () => {
      expect(wrapper.instance().clonedChild).toEqual(clonedNode);
      spyOn(wrapper.instance()._container, 'removeChild');
      wrapper.setProps({ draggableNode: null });
      expect(wrapper.instance()._container.removeChild).toHaveBeenCalledWith(clonedNode);
      expect(wrapper.instance().clonedChild).toBeNull();
    });
  });

  describe('when set as dragging but there is no draggableNode', () => {
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          isDragging={false}
        />
      );
      spyOn(wrapper.instance()._container, 'appendChild');
      spyOn(wrapper.instance()._container, 'removeChild');
      wrapper.setProps({ isDragging: true });
    });

    it('does not try to create or remove a clonedChild', () => {
      expect(wrapper.instance()._container.appendChild).not.toHaveBeenCalled();
      expect(wrapper.instance()._container.removeChild).not.toHaveBeenCalled()
      expect(wrapper.instance().clonedChild).toBeUndefined();
    });
  });

  describe('when the component is being dragged but there is no currentOffset', () => {
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          draggableNode={draggableNode}
          isDragging={false}
        />
      );
      spyOn(wrapper.instance()._container, 'appendChild')
      wrapper.setProps({ isDragging: true })
      instance = wrapper.find(UndecoratedCustomDragLayer);
    });

    it('sets container to display: none', () => {
      const container = instance.find(StyledDragContainer);
      expect(container.length).toEqual(1);
      const style = container.props().style;
      expect(style.display).toEqual('none');
    });
  });

  describe('when the component is being dragged but there is no draggableNode', () => {
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          isDragging={true}
        />
      );
    });

    it('does not set the width style', () => {
      const container = wrapper.find(StyledDragContainer);
      expect(container.length).toEqual(1);
      const style = container.props().style;
      expect(style.WebkitTransform).toEqual('translate(1px, 2px)');
      expect(style.width).toBeUndefined();
    });
  });

  describe('when the component is not being dragged', () => {
    let dragLayer;
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          draggableNode={draggableNode}
          isDragging={false}
        />
      );
      instance = wrapper.find(UndecoratedCustomDragLayer);
    });

    it('hides the dragLayer component', () => {
      const container = instance.find(StyledDragContainer);
      expect(container.length).toEqual(1);
      const style = container.props().style;
      expect(style.display).toEqual('none');
    });
  });

  describe('collect', () => {
    let monitor, item;
    const draggableNodeProp = () => { return 'draggableNode' }

    describe('when there is an item', () => {
      beforeEach(() => {
        item = { draggableNode: draggableNodeProp }

        monitor = {
          getItem: () => item,
          getSourceClientOffset: () => 'currentOffset',
          isDragging: () => true
        }
      });

      it('returns draggableNode', () => {
        expect(collect(monitor)).toEqual(
          {
            currentOffset: 'currentOffset',
            item,
            draggableNode: 'draggableNode',
            isDragging: true
          }
        )
      });
    });

    describe('when there is not an item', () => {
      beforeEach(() => {
        monitor = {
          getItem: () => null,
          getSourceClientOffset: () => 'currentOffset',
          isDragging: () => true
        }
      })
      it('returns an object without the draggableNode defined', () => {
        expect(collect(monitor)).toEqual(
          {
            currentOffset: 'currentOffset',
            item: null,
            draggableNode: null,
            isDragging: true
          }
        )
      })
    })
  });
  describe('customDragLayer with custom className', () => {
    beforeEach(() => {
      wrapper = mount(
        <UndecoratedCustomDragLayer
          draggableNode={draggableNode}
          isDragging={false}
          className='Foo'
        />
      );
      wrapper.setProps({ isDragging: true })
      instance = wrapper.find(UndecoratedCustomDragLayer);
    });

    it('sets the default className + one from the props', () => {
      expect(instance.hasClass('Foo')).toBeTruthy;
      expect(instance.hasClass('custom-drag-layer')).toBeTruthy;
    });
  });
});
