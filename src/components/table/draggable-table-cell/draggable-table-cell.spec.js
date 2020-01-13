import React from 'react';
import { shallow } from 'enzyme';
import { css } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import DraggableTableCell from '.';
import WithDrag from '../../drag-and-drop/with-drag';
import StyledDraggableTableCell from './draggable-table-cell.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import Icon from '../../icon';
import StyledIcon from '../../icon/icon.style';
import mintTheme from '../../../style/themes/mint';
import classicTheme from '../../../style/themes/classic';

describe('DraggableTableCell', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DraggableTableCell identifier='foo' theme={ mintTheme } />
    );
  });

  it('renders a table cell', () => {
    const cell = wrapper.find(StyledDraggableTableCell);
    expect(cell.props().className).toEqual('draggable-table-cell');
  });

  it('renders a WithDrag component', () => {
    const wd = wrapper.find(WithDrag);
    expect(wd.props().identifier).toEqual('foo');
    expect(wd.props().canDrag()).toEqual(true);
  });

  it('renders the correct icon for Modern theme', () => {
    const icon = wrapper.find(Icon);
    expect(icon.props().type).toEqual('drag');
  });

  it('renders the correct icon for Classic theme', () => {
    wrapper = shallow(
      <DraggableTableCell identifier='foo' theme={ classicTheme } />
    );
    const icon = wrapper.find(Icon);
    expect(icon.props().type).toEqual('drag_vertical');
  });

  it('styles the icon cursor', () => {
    const component = TestRenderer.create(<StyledDraggableTableCell identifier='foo' />);
    assertStyleMatch({
      cursor: 'grab'
    }, component.toJSON(), { modifier: css`${StyledIcon}` });
  });

  it('does not render on last row', () => {
    wrapper = shallow(
      <DraggableTableCell
        identifier='foo'
        canDrag={ false }
        theme={ mintTheme }
      />
    );
    const icon = wrapper.find(Icon);
    expect(icon.exists()).toEqual(false);
  });
});
