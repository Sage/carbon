import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table } from './table';

describe('Table', () => {
  let instance, instancePager, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('onChange spy');

    instance = TestUtils.renderIntoDocument(
      <Table className="foo">
        foo
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
      })
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

    describe('when paginate if false', () => {
      it('does not returns the pager', () => {
        expect(instance.pager).toBeFalsy();
      });
    });
  });

  describe('render', () => {
    it('renders a table with correct classes', () => {
      let table = TestUtils.findRenderedDOMComponentWithTag(instance, 'table');
      expect(table).toBeDefined();
      expect(table.className).toEqual('ui-table foo');
    });
  });
});
