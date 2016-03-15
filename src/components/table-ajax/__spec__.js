import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import TableAjax from './table-ajax';

describe('TableAjax', () => {
  let instance, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('onChange spy');

    instance = TestUtils.renderIntoDocument(
      <TableAjax
        className="foo"
        paginate={ true }
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
        pageSize: '10'
      });
    });
  });

  describe('shouldResetTableHeight', () => {
    beforeEach(() => {
      instance.setState({ pageSize: '10' });
    });

    describe('when pageSize is less than previous pageSize', () => {
      it('returns true', () => {
        let prevState = { pageSize: '100' }
        expect(instance.shouldResetTableHeight({}, prevState)).toBeTruthy();
      });
    });

    describe('when pageSize is greater than previous pageSize', () => {
      it('returns false', () => {
        let prevState = { pageSize: '1' }
        expect(instance.shouldResetTableHeight({}, prevState)).toBeFalsy();
      });
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

      options = { currentPage: '1', pageSize: '10' }
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    it('queries for the data', () => {
      instance.emitOnChangeCallback('data', options);
      let request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toEqual('/test?page=1&value=&rows=10');
    });

    it('on success emits the returned data', () => {
        instance.emitOnChangeCallback('data', options);
        let request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"data\": [\"foo\"]}"
        });
        expect(spy).toHaveBeenCalledWith('foo');
    });
  });

  describe('emitOptions', () => {
    it('gathers all relevent state variables for endpoint', () => {
      expect(instance.emitOptions).toEqual({
        currentPage: '1',
        pageSize: '10'
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
