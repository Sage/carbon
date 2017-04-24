import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import { Table, TableRow } from './../table';
import TableSubheader from './../table-subheader';

describe('TableSubheader', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableSubheader className='foo' align='right' style={{ width: '50px' }} />
        </TableRow>
      </Table>
    );
  });

  describe('render', () => {
    it('renders a th with correct classes', () => {
      let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
      expect(th).toBeDefined();
      expect(th.className).toEqual('carbon-table-subheader carbon-table-header foo carbon-table-header--align-right');
    });
  });
});
