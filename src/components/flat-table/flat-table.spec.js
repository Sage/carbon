import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import FLatTable from './flat-table.component';
import FlatTableHead from './flat-table-head/flat-table-head.component';
import FlatTableBody from './flat-table-body/flat-table-body.component';
import FlatTableRow from './flat-table-row/flat-table-row.component';
import FlatTableHeader from './flat-table-header/flat-table-header.component';
import FlatTableCell from './flat-table-cell/flat-table-cell.component';
import FlatTableRowHeader from './flat-table-row-header/flat-table-row-header.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import StyledFlatTableHeader from './flat-table-header/flat-table-header.style';
import StyledFlatTableHead from './flat-table-head/flat-table-head.style';
import StyledFlatTableRowHeader from './flat-table-row-header/flat-table-row-header.style';

describe('FLatTable', () => {
  describe('when rendered with proper table data', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderFLatTable();
    });

    it('should have expected structure and styles', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('when rendered with proper table data and "hasStickyHead" prop set to true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderFLatTable({ hasStickyHead: true }, mount);
    });

    it('should have the overflow-y css property seto to auto', () => {
      expect(wrapper).toHaveStyleRule('overflow-y', 'auto');
    });

    it('then all Headers should have proper styling', () => {
      assertStyleMatch({
        backgroundColor: '#fff',
        position: 'sticky',
        zIndex: '1'
      },
      wrapper, { modifier: `${StyledFlatTableHeader}` });
    });

    it('then the Row Header in the table Head should have proper z-index', () => {
      assertStyleMatch({
        zIndex: '2'
      }, wrapper, { modifier: `${StyledFlatTableHead} ${StyledFlatTableRowHeader}` });
    });
  });
});

function renderFLatTable(props = {}, renderer = TestRenderer.create) {
  return renderer(
    <FLatTable { ...props }>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableHeader>header1</FlatTableHeader>
          <FlatTableHeader>header2</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableRowHeader>row header</FlatTableRowHeader>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FLatTable>
  );
}
