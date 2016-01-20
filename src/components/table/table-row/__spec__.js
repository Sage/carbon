import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableCell } from './../table';
import TableRow from './table-row';
import Icon from './../../icon';

describe('TableRow', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className="foo">
          <TableCell />
        </TableRow>
      </Table>
    );
  });

  it('renders a tr with correct classes', () => {
    let tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
    expect(tr).toBeDefined();
    expect(tr.className).toEqual('ui-table-row foo');
  });

  describe('with delete action', () => {
    let func, spy;

    beforeEach(() => {
      spy = jasmine.createSpy();

      func = function() {
        spy();
      };

      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow className="foo" onDelete={ func }>
            <TableCell />
          </TableRow>
        </Table>
      );
    });

    it('renders a actions cell', () => {
      let tr = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-table-cell--actions');
      expect(tr).toBeDefined();
    });

    it('sets up click event on icon', () => {
      let icon = TestUtils.findRenderedComponentWithType(instance, Icon);
      icon.props.onClick();
      expect(spy).toHaveBeenCalled();
    });
  });
});
