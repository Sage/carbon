import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import TableCell from './table-cell.component';
import { Table, TableRow } from '../table.component';
import StyledTableCell from './table-cell.style';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import BaseTheme from '../../../style/themes/base';
import ClassicTheme from '../../../style/themes/classic';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

describe('TableCell', () => {
  let wrapper, td;

  beforeEach(() => {
    wrapper = mount(
      <Table>
        <TableRow>
          <TableCell
            className='foo' align='right'
            style={ { width: '50px' } }
          />
        </TableRow>
      </Table>
    );
    td = wrapper.find('td').hostNodes();
  });

  it('renders additional props to the td element', () => {
    expect(td.exists()).toBeTruthy();
    expect(td.prop('style').width).toEqual('50px');
  });

  it('renders a td to match expected style', () => {
    wrapper = mount(
      <Table>
        <TableRow>
          <TableCell
            align='right'
            action
          />
        </TableRow>
      </Table>
    );
    expect(td.exists()).toBeTruthy();
    assertStyleMatch({
      backgroundColor: BaseTheme.table.primary,
      borderBottom: `1px solid ${BaseTheme.table.secondary}`,
      textAlign: 'right'
    }, td);
  });

  describe('with action', () => {
    beforeEach(() => {
      wrapper = mount(
        <StyledTableCell
          theme={ ClassicTheme }
          action
        />
      );
      td = wrapper.find('td').hostNodes();
    });

    it('renders a td which matches the expected style', () => {
      assertStyleMatch({
        width: '18px',
        textAlign: 'left'
      }, td);

      assertStyleMatch({
        cursor: 'pointer',
        color: BaseTheme.colors.border,
        fontSize: '16px',
        lineHeight: '15px',
        marginLeft: '1px'
      }, td, { modifier: '.icon-delete:before' });
    });
  });

  describe('tags on component', () => {
    const wrapper2 = shallow(<TableCell data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper2, 'table-cell', 'bar', 'baz');
    });
  });
});
