import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table } from './table';

describe('Table', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table className="foo">
        foo
      </Table>
    );
  });

  it('renders a table with correct classes', () => {
    let table = TestUtils.findRenderedDOMComponentWithTag(instance, 'table');
    expect(table).toBeDefined();
    expect(table.className).toEqual('ui-table foo');
  });
});
