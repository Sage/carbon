import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Immutable from 'immutable';
import { Table, TableHeader, TableRow, TableCell } from './table';

describe('Table', () => {
  let instance, instancePager, instanceSortable, instanceCustomSort, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('onChange spy');

    let row = (
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
    );

    instance = TestUtils.renderIntoDocument(
      <Table className="foo">
        { row }
      </Table>
    );

    instancePager = TestUtils.renderIntoDocument(
      <Table
        className="foo"
        paginate={ true }
        currentPage='1'
        pageSize='10'
        totalRecords='100'
        onChange={ spy }
      >
        foo
      </Table>
    );

    instanceSortable = TestUtils.renderIntoDocument(
      <Table className='bar' onChange={ spy }>
        <TableRow key='header'>
          <TableHeader sortable={true} name='name'>
            Names
          </TableHeader>
        </TableRow>
      </Table>
    );

    instanceCustomSort = TestUtils.renderIntoDocument(
      <Table className='baz'
             onChange={ spy }
             sortOrder='desc'
             sortedColumn='name'
             currentPage='10'
             pageSize='25'
             totalRecords='2500'
        >
        <TableRow>
          <TableHeader sortable={ true } name='name'/>
        </TableRow>
      </Table>
    );
  });

  describe('componentWillReceiveProps', () => {
    let data;

    beforeEach(() => {
      data = Immutable.fromJS({ foo: "bar" });
      instance = TestUtils.renderIntoDocument(
        <Table filter={ data }></Table>
      );
      spyOn(instance, 'emitOnChangeCallback');
    });

    describe('when data has not changed', () => {
      it('does not emit on change', () => {
        instance.componentWillReceiveProps({ filter: data });
        expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
      });
    });

    describe('when data has changed', () => {
      it('emits on change', () => {
        data = data.set('foo', 'qux');
        instance.componentWillReceiveProps({ filter: data });
        expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('filter', {
          currentPage: '',
          filter: { foo: 'qux' },
          pageSize: '',
          sortOrder: '',
          sortedColumn: ''
        });
      });
    });
  });

  describe('componentDidMount', () => {
    it('calls to resize the table and set initial min height', () => {
      spyOn(instance, 'resizeTable');
      instance.componentDidMount();
      expect(instance.resizeTable).toHaveBeenCalled();
    });
  });

  describe('componentDidUpdate', () => {
    describe('when table height should reset', () => {
      it('calls to reset the table height', () => {
        spyOn(instance, 'shouldResetTableHeight').and.returnValue(true);
        spyOn(instance, 'resetTableHeight')

        instance.componentDidUpdate();
        expect(instance.resetTableHeight).toHaveBeenCalled();
      });
    });

    describe('when table height should not reset', () => {
      it('calls to resize the table', () => {
        spyOn(instance, 'shouldResetTableHeight').and.returnValue(false);
        spyOn(instance, 'resizeTable')

        instance.componentDidUpdate();
        expect(instance.resizeTable).toHaveBeenCalled();
      });
    });
  });

  describe('resetTableHeight', () => {
    beforeEach(() => {
      jasmine.clock().install()
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('Resets the table wrapper height to the tableOffset', () => {
      instance._wrapper = { style: { minHeight: '100px' } };
      instance._table = { offsetHeight: '50' }

      instance.tableHeight = 100;

      instance.resetTableHeight();
      jasmine.clock().tick();

      expect(instance._wrapper.style.minHeight).toEqual('50px');
      expect(instance.tableHeight).toEqual('50');
    });
  });

  describe('resizeTable', () => {
    describe('when offsetHeight is greater than table height', () => {
      it('sets the table minHeight and tableHeight to the offsetHeight', () => {
        instance._wrapper = { style: { minHeight: '10px' } };
        instance._table = { offsetHeight: '50' }
        instance.tableHeight = '10';

        instance.resizeTable();

        expect(instance._wrapper.style.minHeight).toEqual('50px');
        expect(instance.tableHeight).toEqual('50');
      });
    });

    describe('when offsetHeight is less than table height', () => {
      it('maintains the current height', () => {
        instance._wrapper = { style: { minHeight: '50px' } };
        instance._table = { offsetHeight: '10' }
        instance.tableHeight = '50';

        instance.resizeTable();

        expect(instance._wrapper.style.minHeight).toEqual('50px');
        expect(instance.tableHeight).toEqual('50');
      });
    });

    describe('when shrink is enabled', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Table shrink={ true }></Table>
        );
      });

      describe('when new height has not changed', () => {
        it('does nothing', () => {
          instance._wrapper = { style: { minHeight: '50px' } };
          instance._table = { offsetHeight: '50' }
          instance.tableHeight = '50';

          instance.resizeTable();

          expect(instance._wrapper.style.minHeight).toEqual('50px');
          expect(instance.tableHeight).toEqual('50');
        });
      });

      describe('when new height is less than old height', () => {
        it('updates the height', () => {
          instance._wrapper = { style: { minHeight: '50px' } };
          instance._table = { offsetHeight: '10' }
          instance.tableHeight = '50';

          instance.resizeTable();

          expect(instance._wrapper.style.minHeight).toEqual('10px');
          expect(instance.tableHeight).toEqual('10');
        });
      });
    });
  });

  describe('shouldResetTableHeight', () => {
    describe('when new page size is smaller than previous', () => {
      it('returns true', () => {
        let prevProps = { pageSize: '1' }
        expect(instancePager.shouldResetTableHeight(prevProps, {}));
      });
    });

    describe('when new page size is larger or equal to the previous', () => {
      it('returns false', () => {
        let prevProps = { pageSize: '100' }
        expect(instancePager.shouldResetTableHeight(prevProps, {}));
      });
    });
  });

  describe('pageSize', () => {
    it('gets the current pageSize', () => {
      expect(instancePager.pageSize).toEqual('10');
    });
  });

  describe('emitOnChangeCallback', () => {
    it('emits the passed element and options', () => {
      instancePager.emitOnChangeCallback('foo', { foo: 'bar' });
      expect(spy).toHaveBeenCalledWith('foo', { foo: 'bar' });
    });
  });

  describe('onPagination', () => {
    it('formats the pagination changes for emitting', () => {
      let options = instance.emitOptions();
      options.currentPage = '2';
      options.pageSize = '25';

      instancePager.onPagination('2', '25');

      expect(spy).toHaveBeenCalledWith('pager', options);
    });
  });

  describe('onSort', () => {
    it('formats the sort options for emitting', () => {
      let options = instance.emitOptions();
      options.sortedColumn = 'name';
      options.sortOrder = 'desc';

      instanceSortable.onSort('name', 'desc');

      expect(spy).toHaveBeenCalledWith('table', options);
    });
  });

  describe('emitOptions', () => {
    it('gathers all relevent props to emit', () => {
      expect(instancePager.emitOptions()).toEqual({
        currentPage: '1',
        filter: {},
        pageSize: '10',
        sortOrder: '',
        sortedColumn: ''
      });
    });

    describe('when current page is greater than page size', () => {
      it('sets current page to 1', () => {
        let props = {
          currentPage: '11',
          filter: null,
          pageSize: '10',
          sortOrder: 'asc',
          sortedColumn: 'foo'
        };

        expect(instanceCustomSort.emitOptions(props)).toEqual({
          currentPage: '1',
          filter: {},
          pageSize: '10',
          sortOrder: 'asc',
          sortedColumn: 'foo'
        });
      });
    });

    describe('when custom props have been passed', () => {
      it('emits the custom props', () => {
        expect(instanceCustomSort.emitOptions()).toEqual({
          currentPage: '10',
          filter: {},
          pageSize: '25',
          sortOrder: 'desc',
          sortedColumn: 'name'
        });
      });
    });

    it('gathers all relevent props to emit using passed in props', () => {
      let props = {
        currentPage: '9',
        filter: Immutable.fromJS({ foo: 'bar' }),
        pageSize: '100',
        sortOrder: 'asc',
        sortedColumn: 'foo'
      };

      expect(instancePager.emitOptions(props)).toEqual({
        currentPage: '9',
        filter: { foo: 'bar' },
        pageSize: '100',
        sortOrder: 'asc',
        sortedColumn: 'foo'
      });
    });
  });

  describe('pagerProps', () => {
    it('gathers all props that apply to the pager', () => {
      let props = instancePager.pagerProps;
      expect(props.currentPage).toEqual('1')
      expect(props.pageSize).toEqual('10')
      expect(props.totalRecords).toEqual('100')
    });
  });

  describe('defaultPageSize', () => {
    describe('when pageSize is passed', () => {
      it('returns the prop pageSize', () => {
        instance = TestUtils.renderIntoDocument(
          <Table path='/test' pageSize='123' >
          </Table>
        );
        expect(instance.defaultPageSize).toEqual('123')
      });
    });

    describe('when pageSizeSelectionOptions are set', () => {
      it('sets it to the first item in the pageSizeSelectionOptions', () => {
        let options = Immutable.fromJS([
          { id: '1', name: 1 },
          { id: '2', name: 2 },
          { id: '3', name: 3 }
        ]);

        instance = TestUtils.renderIntoDocument(
          <Table pageSizeSelectionOptions={ options } >
          </Table>
        );
        expect(instance.defaultPageSize).toEqual('1')
      });
    });

    describe('when neither pageSize or options are passed', () => {
      it('returns a default of 10', () => {
        expect(instance.defaultPageSize).toEqual('10')
      });
    });
  });

  describe('tableHeader', () => {
    describe('when tableHeader is not provided', () => {
      it('returns the the correct markup', () => {
        instance = TestUtils.renderIntoDocument(
          <Table path='/test'>
          </Table>
        );
        let parent = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'thead')[0];
        expect(parent).toBeUndefined();
      });
    });

    describe('when tableHeader is provided', () => {
      it('returns the the correct markup', () => {
        let header = (
          <TableRow key="header">
            <TableHeader>
              foo
            </TableHeader>
          </TableRow>
        );
        instance = TestUtils.renderIntoDocument(
          <Table path='/test' tableHeader={header}>
          </Table>
        );
        let parent = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'thead')[0];
        expect(parent).toBeDefined();
        expect(instance.tableHeader).toEqual(
          <thead className="ui-table__header">
            {header}
          </thead>
        )
      });
    });
  });

  describe('pager', () => {
    describe('when paginate is true', () => {
      it('returns the pager', () => {
        expect(instancePager.pager).toBeTruthy();
      });
    });

    describe('when paginate is false', () => {
      it('does not return the pager', () => {
        expect(instance.pager).toBeFalsy();
      });
    });
  });

  describe('render', () => {
    it('renders a table with correct classes', () => {
      let parent = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(parent).toBeDefined();
      expect(parent.className).toEqual('ui-table foo');
    });
  });
});
