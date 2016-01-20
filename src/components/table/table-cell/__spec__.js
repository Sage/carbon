import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableRow } from './../table';
import TableCell from './table-cell';
import Icon from './../../icon';

describe('TableRow', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableCell className="foo" align="right" />
        </TableRow>
      </Table>
    );
  });

  it('renders a td with correct classes', () => {
    let td = TestUtils.findRenderedDOMComponentWithTag(instance, 'td');
    expect(td).toBeDefined();
    expect(td.className).toEqual('ui-table-cell foo ui-table-cell--align-right');
  });
});
