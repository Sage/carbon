import React from 'react';
import { shallow } from 'enzyme';
import DraggableTableCell from './draggable-table-cell';
import TableCell from '../table-cell';
import WithDrag from '../../drag-and-drop/with-drag';
import Icon from '../../icon';

describe('DraggableTableCell', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DraggableTableCell identifier='foo' />
    );
  });

  it('renders a table cell', () => {
    const cell = wrapper.find(TableCell);
    expect(cell.props().className).toEqual('draggable-table-cell');
  });

  it('renders a WithDrag component', () => {
    const wd = wrapper.find(WithDrag);
    expect(wd.props().identifier).toEqual('foo');
    expect(wd.props().canDrag()).toEqual(true);
  });

  it('renders an icon', () => {
    const icon = wrapper.find(Icon);
    expect(icon.props().type).toEqual('drag_vertical');
  });

  it('does not render on last row', () => {
    wrapper = shallow(
      <DraggableTableCell identifier='foo' canDrag={ false } />
    );
    const icon = wrapper.find(Icon);
    expect(icon.exists()).toEqual(false);
  });
});
