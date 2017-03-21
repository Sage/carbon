// __spec__.js
import React from 'react';
import { TableRow, TableCell, DraggableRows } from '../table';
import { mount } from 'enzyme';
import { DragDropContext } from 'react-dnd';

describe('DraggableRows', () => {

  let table;

  beforeEach(() => {
    table = document.createElement('table');
  });

  it('is wrapped in a DragDropContextContainer', () => {
    expect(DraggableRows.name).toBe('DragDropContextContainer');
  });

  it('has a DecoratedComponent pointing to the original component', () => {
    expect(DraggableRows.DecoratedComponent.name).toBe('DraggableRows');
  });

  describe('render', () => {
    it('renders a <tbody data-dragdropcontext> tag', () => {
      let wrapper = mount(<DraggableRows />, { attachTo: table });
      expect(wrapper.find('tbody[data-dragdropcontext]').length).toBe(1);
    });
    
    it('renders child props', () => {
      let wrapper = mount(
        <DraggableRows>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Foo</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Bar</TableCell>
          </TableRow>
        </DraggableRows>, 
        { attachTo: table }
      );

      expect(wrapper.find('.carbon-table-row').length).toBe(2);
    });
  });

});
