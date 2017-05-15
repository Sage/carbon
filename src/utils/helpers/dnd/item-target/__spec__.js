import React from 'react';
import ReactDOM from 'react-dom';
import ItemTargetHelper from './';

describe('ItemTargetHelper', () => {

  describe('onHoverUpDown', () => {
    let component;
    let rect;
    let monitor = {};
    let monitorItem;
    let props;
    let clientOffset;

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
        moveItem: () => {}
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

    describe('calls props.moveItem when', () => {
      it('item dragged downwards and below 50% of item height', () => {
        props.index = 1;
        clientOffset.y = 76; // over the halfway point when dragging downwards

        spyOn(props, 'moveItem');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.moveItem).toHaveBeenCalled();
      });

      it('item dragged upwards and above 50% of item height', () => {
        props.index = 0;

        clientOffset.y = 51;
        monitorItem.index = 1;

        spyOn(props, 'moveItem');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.moveItem).toHaveBeenCalled();
      });
    });

    describe('does not call props.moveItem when', () => {
      it('dragIndex is the same as the hoverIndex', () => {
        props.index = 0;
        monitorItem.index = 0;

        spyOn(props, 'moveItem');

        ItemTargetHelper.onHoverUpDown(props, monitor, component);
        expect(props.moveItem).not.toHaveBeenCalled();
      });

      it('dragging down and not above 50% of the item height', () => {
        props.index = 1;
        clientOffset.y = 70;

        spyOn(props, 'moveItem');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.moveItem).not.toHaveBeenCalled();
      });

      it('dragging up and not above 50% of the item height', () => {
        props.index = 0;

        clientOffset.y = 76;
        monitorItem.index = 1;

        spyOn(props, 'moveItem');
        ItemTargetHelper.onHoverUpDown(props, monitor, component);

        expect(props.moveItem).not.toHaveBeenCalled();
      });
    });
  });
  
});
