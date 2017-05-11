import React from 'react';
import ReactDOM from 'react-dom';
import ItemTargetHelper from './';

describe('ItemTargetHelper', () => {
  describe('onHoverUpDown', () => {
    let component,
        rect,
        monitor = {},
        monitorItem,
        props,
        clientOffset;

    beforeEach(() => {
      component = document.createElement('div');
      rect = {
        bottom: 100,
        height: 50, 
        left: 0,
        right: 200,
        top: 50,
        width: 200
      };

      props = {
        index: 0,
        onDrag: () => {}
      };
      
      clientOffset = {
        x: 50,
        y: 50
      };

      spyOn(ReactDOM, 'findDOMNode').and.returnValue(component);
      spyOn(component, 'getBoundingClientRect').and.returnValue(rect);

      monitorItem = {
        index: 0
      };

      monitor = {
        getItem: () => {
          return monitorItem;
        },
        getClientOffset: () => {
          return clientOffset;
        }
      };
    });

    describe('calls props.onDrag when', () => {
      it('item dragged downwards and below 50% of item height', () => {
        props.index = 1;
        clientOffset.y = 76; // over the halfway point when dragging downwards

        spyOn(props, 'onDrag');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.onDrag).toHaveBeenCalled();
      });

      it('item dragged upwards and above 50% of item height', () => {
        props.index = 0;

        clientOffset.y = 51;
        monitorItem.index = 1;

        spyOn(props, 'onDrag');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.onDrag).toHaveBeenCalled();
      });

      it('calls context.dragAndDropOnDrag when onDrag prop is unavailable is', () => {
        props.index = 0;

        clientOffset.y = 51;
        monitorItem.index = 1;
        let contextSpy = jasmine.createSpy();

        component.context = {
          dragAndDropOnDrag: contextSpy
        };
        delete props.onDrag;

        ItemTargetHelper.onHoverUpDown(props, monitor, component);
        expect(contextSpy).toHaveBeenCalled();
      });
    });

    describe('does not call props.onDrag when', () => {
      it('dragIndex is the same as the hoverIndex', () => {
        props.index = 0;
        monitorItem.index = 0;

        spyOn(props, 'onDrag');

        ItemTargetHelper.onHoverUpDown(props, monitor, component);
        expect(props.onDrag).not.toHaveBeenCalled();
      });

      it('dragging down and not above 50% of the item height', () => {
        props.index = 1;
        clientOffset.y = 70;

        spyOn(props, 'onDrag');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.onDrag).not.toHaveBeenCalled();
      });

      it('dragging up and not above 50% of the item height', () => {
        props.index = 0;

        clientOffset.y = 76;
        monitorItem.index = 1;

        spyOn(props, 'onDrag');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.onDrag).not.toHaveBeenCalled();
      });
    });
  });
});
