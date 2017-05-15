import React from 'react';
import ItemSource from './item-source';
import Browser from '../../../utils/helpers/browser';

describe('ItemSource', () => {
  let itemSource;
  let props;
  let monitor;
  let component;

  beforeEach(() => {
    itemSource = ItemSource;
    monitor = {};
    component = {};
    props = {
      beginDrag: (props, monitor, component) => {},
      canDrag: (props, monitor) => {}
    };
  });

  describe('beginDrag', () => {
    it('calls props.beginDrag(props, monitor, component)', () => {
      spyOn(props, 'beginDrag');
      itemSource.beginDrag(props, monitor, component);

      expect(props.beginDrag).toHaveBeenCalledWith(props, monitor, component);
    });
  });

  describe('canDrag', () => {
    it('calls props.canDrag(props, monitor)', () => {
      spyOn(props, 'canDrag');
      itemSource.canDrag(props, monitor);

      expect(props.canDrag).toHaveBeenCalledWith(props, monitor);
    });
  });
});
