import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableRow } from './../table';
import TableHeader from './table-header';
import Icon from './../../icon';

fdescribe('TableHeader', () => {
  let instance, instanceSortable, changeSpy;

  beforeEach(() => {
    changeSpy = jasmine.createSpy('changeSpy');

    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableHeader className="foo" align="right" />
        </TableRow>
      </Table>
    );

    instanceSortable = TestUtils.renderIntoDocument(
      <Table onChange={ changeSpy }>
        <TableRow>
          <TableHeader sortable={ true } name='name'/>
        </TableRow>
      </Table>
    );
  });

  describe('emitSortEvent', () => {
    let sortableColumn, sortableTable;

    beforeEach(() => {
      sortableColumn = TestUtils.findRenderedDOMComponentWithTag(instanceSortable, 'th');
      sortableTable = ReactDOM.findDOMNode(instanceSortable);
    });

    describe('if no sortOrder has been specified', () => {
      it('calls the tables onSort function with the default params', () => {
        TestUtils.Simulate.click(sortableColumn);
        expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
          'table', {
            currentPage: '',
            pageSize: '',
            columnToSort: 'name',
            sortOrder: 'asc'
          }
        );
      });

      it('sets clicked property if not already set', () => {
        let t = TestUtils;
        debugger
        TestUtils.Simulate.click(sortableColumn);
        expect(this.clicked).toEqual(true);
      });
    });

    describe('if a sortOrder has been passed', () => {
      it('sends the passed in sortOrder prop to the onSort function', () => {

      });
    });
  });

  describe('sortIconHTML', () => {
    describe('if a column is sortable', () => {
      describe('before a sortable header is clicked', () => {
        it('does not display an icon', () => {

        });
      });

      describe('after a sortable header has been clicked', () => {
        describe('when the sortOrder is descending', () => {
          it('adds the sort-up icon', () => {

          });
        });

        describe('when the sortOrder is ascending or not specified', () => {
          it('adds the sort-down icon', () => {

          });
        })
      });
    });

    describe('if a column is not sortable', () => {
      it('does not return an icon', () => {

      });
    });
  });

  describe('render', () => {
    it('renders a th with correct classes', () => {
      let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
      expect(th).toBeDefined();
      expect(th.className).toEqual('ui-table-header foo ui-table-header--align-right');
    });

    describe('if a column is sortable', () => {
      it('sets an onClick handler', () => {

      });
    });
  });
});
