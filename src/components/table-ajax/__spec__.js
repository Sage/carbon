import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { TableAjax } from './table-ajax';

describe('TableAjax', () => {
  let instance, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('onChange spy');

    instance = TestUtils.renderIntoDocument(
      <TableAjax
        className="foo"
        path='/test'
        onChange={ spy }
      >
       foo
      </TableAjax>
    );
  });

  describe('componentDidMount', () => {
    it('calls emitOnChange to get initial table data', () => {
      spyOn(instance, 'emitOnChangeCallback');
      instance.componentDidMount();
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('data', {
        currentPage: '1',
        pageSize: '10',
        sortOrder: undefined,
        sortedColumn: undefined
      });
    });
  });

  describe('componentDidUpdate', () => {
    it('calls to resize the table', () => {
      spyOn(instance, 'resizeTable');
      instance.componentDidUpdate();
      expect(instance.resizeTable).toHaveBeenCalled();
    });
  });

  describe('pageSize', () => {
    it('gets the current pageSize', () => {
      instance.setState({ pageSize: '10' });
      expect(instance.pageSize).toEqual('10');
    });
  });

  describe('emitOnChangeCallback', () => {
    let options;
    beforeEach(() => {
      jasmine.Ajax.install();
      jasmine.clock().install();

      options = { currentPage: '1',
                  pageSize: '10',
                  sortOrder: undefined,
                  sortedColumn: undefined
                }
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
      jasmine.clock().uninstall();
    });

    it('Sets the new pageSize and currentPage in state', () => {
      spyOn(instance, 'setState');
      instance.emitOnChangeCallback('data', options);
      expect(instance.setState).toHaveBeenCalledWith(options);
    });

    it('queries for the data', () => {
      instance.emitOnChangeCallback('data', options);
      jasmine.clock().tick(251);
      let request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toEqual('/test?page=1&value=&rows=10');
    });

    it('on success emits the returned data', () => {
        instance.emitOnChangeCallback('data', options);
        jasmine.clock().tick(251);
        let request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"data\": [\"foo\"]}"
        });
        expect(spy).toHaveBeenCalledWith({ data: ['foo'] });
    });

    it('on success sets the totalRecords', () => {
      spyOn(instance, 'setState');
      instance.emitOnChangeCallback('data', options);
      jasmine.clock().tick(251);

      let request = jasmine.Ajax.requests.mostRecent();
      request.respondWith({
        "status": 200,
        "contentType": 'application/json',
        "responseText": "{\"records\": 1}"
      });
      expect(instance.setState).toHaveBeenCalledWith({ totalRecords: '1' });
    });

    describe('when page size is less than previous page size', () => {
      it('calls resetTableHeight on successful response', () => {
        spyOn(instance, 'resetTableHeight');
        options = { currentPage: '1', pageSize: '5' }

        instance.emitOnChangeCallback('data', options);
        jasmine.clock().tick(251);

        let request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"data\": [\"foo\"]}"
        });

        expect(instance.resetTableHeight).toHaveBeenCalled();
      });
    });
  });

  describe('stopTimeout', () => {
    describe('when timeout is present', () => {
      it('clears the timeout', () => {
        spyOn(window, 'clearTimeout');
        instance.timeout = 'foo'
        instance.stopTimeout();
        expect(window.clearTimeout).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('query params', () => {
    it('returns formatted params for server request', () => {
      let options = { currentPage: 10, pageSize: 20, sortOrder: 'asc', sortedColumn: 'name' }
      let expected = { page: 10, value: '', rows: 20, sord: 'asc', sidx: 'name' }
      expect(instance.queryParams('', options)).toEqual(expected);
    });
  });

  describe('emitOptions', () => {
    it('gathers all relevent state variables for endpoint', () => {
      expect(instance.emitOptions).toEqual({
        currentPage: '1',
        pageSize: '10',
        sortedColumn: undefined,
        sortOrder: undefined
      });
    });
  });

  describe('pagerProps', () => {
    it('gathers all variables that apply to the pager', () => {
      let props = instance.pagerProps;
      expect(props.currentPage).toEqual('1')
      expect(props.pageSize).toEqual('10')
      expect(props.totalRecords).toEqual('0')
    });
  });
});
