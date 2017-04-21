import ItemTarget from './item-target';
import React from 'react';
import ReactDOM from 'react-dom';

describe('ItemTarget', () => {

  it('calls props.hover(props, monitor, component)', () => {
    let monitor = {};
    let component = {};
    let props = {
      hover: (props, monitor, component) => {}
    };

    spyOn(props, 'hover');

    ItemTarget.hover(props, monitor, component);

    expect(props.hover).toHaveBeenCalledWith(props, monitor, component);
  });
});
