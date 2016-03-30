import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableRow } from './../table';
import TableHeader from './table-header';
import Icon from './../../icon';

fdescribe('TableHeader', () => {
  let instance, instanceSortable, instanceCustomSort, sortableColumn, changeSpy;

  beforeEach(() => {
    changeSpy = jasmine.createSpy('changeSpy');

    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableHeader className="foo" align="right" style={{ width: "50px" }} />
        </TableRow>
      </Table>
    );

    instanceSortable = TestUtils.renderIntoDocument(
      <Table onChange={ changeSpy }>
        <TableRow>
          <TableHeader sortable={ true } name='name' />
        </TableRow>
      </Table>
    );

    instanceCustomSort = TestUtils.renderIntoDocument(
      <Table onChange={ changeSpy } sortOrder='desc'>
        <TableRow>
          <TableHeader sortable={ true } name='name'/>
        </TableRow>
      </Table>
    );
  });

  describe('emitSortEvent', () => {
    describe('if no sortOrder has been specified', () => {
      beforeEach(() => {
        sortableColumn = TestUtils.findRenderedDOMComponentWithTag(instanceSortable, 'th');
      });

      it('calls the tables onSort function with the default params', () => {
        TestUtils.Simulate.click(sortableColumn);
        expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
          'table', {
            currentPage: '',
            pageSize: '',
            sortedColumn: 'name',
            sortOrder: 'asc'
          }
        );
      });

      xdescribe('if the column has already has been sorted', () => {
        let sortableHeader;

        it('flips the sortOrder when clicked', () => {
          sortableHeader = TestUtils.scryRenderedComponentsWithType(instanceSortable, TableHeader)[0];
          sortableHeader.emitSortEvent()
          TestUtils.Simulate.click(sortableColumn);
          expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
            'table', {
              currentPage: '',
              pageSize: '',
              sortedColumn: 'name',
              sortOrder: 'desc'
            }
          );
        });
      });
    });

    describe('if a sortOrder has been passed', () => {
      beforeEach(() => {
        sortableColumn = TestUtils.findRenderedDOMComponentWithTag(instanceCustomSort, 'th');
      });

      it('sends the passed in sortOrder prop to the onSort function', () => {
        TestUtils.Simulate.click(sortableColumn);
        expect(instanceCustomSort.props.onChange).toHaveBeenCalledWith(
          'table', {
            currentPage: '',
            pageSize: '',
            sortedColumn: 'name',
            sortOrder: 'desc'
          }
        );
      });
    });
  });

  describe('sortIconHTML', () => {
    describe('if a column is sortable', () => {
      beforeEach(() => {
        sortableColumn = TestUtils.findRenderedDOMComponentWithTag(instanceSortable, 'th');
      });

      describe('before a sortable header is clicked', () => {
        it('does not display an icon', () => {
          let icon = TestUtils.scryRenderedDOMComponentsWithTag(instanceSortable, 'icon');
          expect(icon).toEqual([]);
        });
      });

      describe('after a sortable header has been clicked', () => {
        describe('when the sortOrder is descending', () => {
          it('adds the sort-up icon', () => {
            TestUtils.Simulate.click(sortableColumn);
            debugger
            let t = TestUtils;
            let icon = TestUtils.scryRenderedDOMComponentsWithTag(instanceSortable, 'icon');
            expect(icon).toEqual([]);
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
    it('renders additional props to the th element', () => {
      let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
      expect(th.style.width).toEqual("50px");
    });

    it('renders a th with correct classes', () => {
      let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
      expect(th).toBeDefined();
      expect(th.className).toEqual('ui-table-header foo ui-table-header--align-right');
    });
  });
});
