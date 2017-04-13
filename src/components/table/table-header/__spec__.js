import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableRow } from './../table';
import TableHeader from './table-header';
import Icon from './../../icon';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('TableHeader', () => {
  let instance, instanceSortable, instanceCustomSort,
      sortableColumn, sortableHeader, changeSpy, sortableCustomHeader,
      sortableCustomColumn;

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
          <TableHeader sortable={ true } align='right' name='name' />
        </TableRow>
      </Table>
    );

    sortableColumn = TestUtils.findRenderedDOMComponentWithTag(instanceSortable, 'th');
    sortableHeader = TestUtils.scryRenderedComponentsWithType(instanceSortable, TableHeader)[0];
    sortableCustomColumn = TestUtils.findRenderedDOMComponentWithTag(instanceCustomSort, 'th');
    sortableCustomHeader = TestUtils.scryRenderedComponentsWithType(instanceCustomSort, TableHeader)[0];
  });

  describe('prop checking', () => {
    beforeEach(() => {
      spyOn(console, 'error');
    });

    it('throws an error if no name prop is passed', () => {
      TestUtils.renderIntoDocument(
        <Table onChange={ changeSpy } sortOrder='desc'>
          <TableRow>
            <TableHeader sortable={ true }/>
          </TableRow>
        </Table>
      );
      expect(console.error.calls.argsFor(0)[0]).toMatch(`Failed prop type: Sortable columns require a prop of name of type String`);
    });

    it('throws an error if the name is not a string', () => {
      TestUtils.renderIntoDocument(
        <Table onChange={ changeSpy } sortOrder='desc'>
          <TableRow>
            <TableHeader sortable={ true } name={ 123 }/>
          </TableRow>
        </Table>
      );
      expect(console.error.calls.argsFor(0)[0]).toMatch(`Failed prop type: name must be a string`);
    });
  });

  describe('emitSortEvent', () => {
    describe('if no sortOrder has been specified', () => {
      it('calls the tables onSort function with the default params', () => {
        TestUtils.Simulate.click(sortableColumn);
        expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
          'table', {
            currentPage: '',
            pageSize: '',
            filter: {},
            sortedColumn: 'name',
            sortOrder: 'desc'
          }
        );
      });

      describe('if the column has already has been sorted', () => {
        it('flips the sortOrder when clicked', () => {
          sortableHeader.context.sortedColumn = 'name';
          sortableHeader.context.sortOrder = 'asc';
          TestUtils.Simulate.click(sortableColumn);
          expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
            'table', {
              currentPage: '',
              filter: {},
              pageSize: '',
              sortedColumn: 'name',
              sortOrder: 'desc'
            }
          );
        });
      });
    });

    describe('if a sortOrder has been passed', () => {
      it('sends the passed in sortOrder prop to the onSort function', () => {
        sortableHeader.context.sortOrder = 'desc';
        TestUtils.Simulate.click(sortableColumn);
        expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
          'table', {
            currentPage: '',
            filter: {},
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
      describe('before a sortable header is clicked', () => {
        it('does not display an icon', () => {
          expect(sortableHeader.sortIconHTML).not.toBeDefined();
        });
      });

      describe('after a sortable header has been clicked', () => {
        describe('when the sortOrder is descending', () => {
          it('adds the sort-down icon', () => {
            sortableHeader.context.sortedColumn = 'name';
            sortableHeader.context.sortOrder = 'desc';
            TestUtils.Simulate.click(sortableColumn);
            expect(sortableHeader.sortIconHTML.props.type).toEqual('sort-down');
          });
        });

        describe('when the sortOrder is ascending or not specified', () => {
          it('adds the sort-up icon', () => {
            sortableHeader.context.sortedColumn = 'name';
            TestUtils.Simulate.click(sortableColumn);
            expect(sortableHeader.sortIconHTML.props.type).toEqual('sort-up');
          });
        })
      });
    });

    describe('if a column is not sortable', () => {
      it('does not return an icon', () => {
        let nonSortableHeader = TestUtils.scryRenderedComponentsWithType(instance, TableHeader)[0];
        expect(nonSortableHeader.sortIconHTML).not.toBeDefined();
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
      expect(th.className).toEqual('carbon-table-header foo carbon-table-header--align-right');
    });

    it('renders the sort icon with correct classes', () => {
      sortableHeader.context.sortedColumn = 'name';
      sortableHeader.forceUpdate();
      let icon = TestUtils.findRenderedComponentWithType(instanceSortable, Icon);
      expect(icon.props.className).toEqual('carbon-table-header__icon');
    });

    describe('when aligned to the right', () => {
      it('renders the sort icon with correct classes', () => {
        sortableCustomHeader.context.sortedColumn = 'name';
        sortableCustomHeader.forceUpdate();
        let icon = TestUtils.findRenderedComponentWithType(instanceCustomSort, Icon);
        expect(icon.props.className).toEqual('carbon-table-header__icon carbon-table-header__icon--align-right');
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<TableHeader data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'table-header', 'bar', 'baz');
    });
  });
});
