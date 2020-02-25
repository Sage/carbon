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

describe('FLatTable', () => {
  describe('when rendered with proper table data', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderFLatTable();
    });

    it('should contain FlatTableHead and FlatTableBody', () => {
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
