import React from 'react';
import { shallow } from 'enzyme';
import DraggableTableCell from './draggable-table-cell';
import TableCell from './../table-cell';
import Icon from './../../icon';

describe('DraggableTableCell', () => {
  let wrapper, connectDragSource;

  beforeEach(() => {
    connectDragSource = jasmine.createSpy().and.callFake((component) => component);
    wrapper = shallow(
      <DraggableTableCell connectDragSource={connectDragSource} />
    );
  });

  it('calls connectDragSource', () => {
    expect(connectDragSource).toHaveBeenCalled();
  });

  it('renders a table cell', () => {
    let cell = wrapper.find(TableCell);
    expect(cell.props().className).toEqual('draggable-table-cell');
  });

  it('renders an icon', () => {
    let icon = wrapper.find(Icon);
    expect(icon.props().type).toEqual('drag_vertical');
  });
});
