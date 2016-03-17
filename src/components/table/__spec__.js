import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableHeader, TableRow, TableCell } from './table';

describe('Table', () => {
  let instance, instancePager, spy;

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
      let options = instance.emitOptions;
      options.currentPage = '2';
      options.pageSize = '25';

      instancePager.onPagination('2', '25');

      expect(spy).toHaveBeenCalledWith('pager', options);
    });
  });

  describe('emitOptions', () => {
    it('gathers all relevent props to emit', () => {
      expect(instancePager.emitOptions).toEqual({
        currentPage: '1',
        pageSize: '10'
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
