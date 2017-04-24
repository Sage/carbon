import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import { Table, TableRow } from './../table';
import TableCell from './table-cell';
import Icon from './../../icon';

describe('TableRow', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableCell className="foo" align="right" style={{ width: "50px" }} />
        </TableRow>
      </Table>
    );
  });

  it('renders additional props to the td element', () => {
    let td = TestUtils.findRenderedDOMComponentWithTag(instance, 'td');

    expect(td.style.width).toEqual("50px");
  });

  it('renders a td with correct classes', () => {
    let td = TestUtils.findRenderedDOMComponentWithTag(instance, 'td');
    expect(td).toBeDefined();
    expect(td.className).toEqual('carbon-table-cell foo carbon-table-cell--align-right');
  });

  describe('with action', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow>
            <TableCell className="foo" action={ true } />
          </TableRow>
        </Table>
      );
    });

    it('renders a td with correct classes', () => {
      let td = TestUtils.findRenderedDOMComponentWithTag(instance, 'td');
      expect(td).toBeDefined();
      expect(td.className).toEqual('carbon-table-cell foo carbon-table-cell--action');
    });
  });
});
