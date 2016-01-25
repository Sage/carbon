import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableRow } from './../table';
import TableHeader from './table-header';
import Icon from './../../icon';

describe('TableRow', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableHeader className="foo" align="right" />
        </TableRow>
      </Table>
    );
  });

  it('renders a th with correct classes', () => {
    let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
    expect(th).toBeDefined();
    expect(th.className).toEqual('ui-table-header foo ui-table-header--align-right');
  });
});
