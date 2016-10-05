import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableRow } from './../table';
import TableSubHeader from './../table-sub-header';

describe('TableSubHeader', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableSubHeader className='foo' align='right' style={{ width: '50px' }} />
        </TableRow>
      </Table>
    );
  });

  describe('render', () => {
    it('renders a th with correct classes', () => {
      let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
      expect(th).toBeDefined();
      expect(th.className).toEqual('carbon-table-sub-header carbon-table-header foo carbon-table-header--align-right');
    });
  });
});
