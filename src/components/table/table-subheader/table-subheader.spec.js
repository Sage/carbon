import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import { Table, TableRow } from '..';
import TableSubheader from '.';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import BaseTheme from '../../../style/themes/base';

describe('TableSubheader', () => {
  describe('render', () => {
    it('renders a th with correct classes', () => {
      const wrapper = mount(
        <Table>
          <TableRow>
            <TableSubheader
              className='foo' align='right'
              style={ { width: '50px' } }
            />
          </TableRow>
        </Table>
      );

      const th = wrapper.find('[data-component="table-sub-header"]').hostNodes();
      expect(th).toBeDefined();
      assertStyleMatch({
        backgroundColor: '#001E2B',
        color: BaseTheme.colors.white,
        fontWeight: 'bold'
      }, th);
    });
  });
  describe('tags on component', () => {
    const wrapper = shallow(<TableSubheader data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'table-sub-header', 'bar', 'baz');
    });
  });
});
