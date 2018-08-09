import React from 'react';
import TestUtils from 'react-dom/test-utils';
import DropdownFilterAjax from './dropdown-filter-ajax';
import Immutable from 'immutable';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import ImmutableHelper from './../../utils/helpers/immutable';
import { mount, shallow } from 'enzyme';
import Request from 'superagent';

/* global jest */
jest.mock('superagent');

describe('DropdownFilterAjax', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <DropdownFilterAjax name="foo" value="1" path="/foobar" />
    );
  });

  describe('constructor', () => {
    it('sets default class properties', () => {
      expect(instance.listeningToScroll).toBeTruthy();
    });

    it('sets default state', () => {
      expect(instance.state.options).toEqual([]);
      expect(instance.state.page).toEqual(1);
      expect(instance.state.pages).toEqual(0);
    });
  });

  describe('handleVisibleChange', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('dataRequestTimeout has default value', () => {
      expect(instance.props.dataRequestTimeout).toEqual(500);
    });

    it('calls getData', () => {
      spyOn(instance, 'getData');
      instance.handleVisibleChange({ target: { value: 'foo' }});
      jest.runAllTimers();
      expect(instance.getData).toHaveBeenCalledWith('foo', 1);
    });

    it('resets the timer', () => {
      spyOn(instance, 'getData');
      expect(instance.dataFetchTimeoutId).toBeUndefined();
      instance.handleVisibleChange({ target: { value: 'foo' }});
      expect(instance.dataFetchTimeoutId).not.toBeUndefined();
      instance.handleVisibleChange({ target: { value: 'foofoo' }});
      jest.runAllTimers();
      expect(instance.getData).toHaveBeenCalledWith('foofoo', 1);
    });
  });

  describe('handleBlur', () => {
    beforeEach(() => {
      instance.setState({ options: [{
        id: '90',
        name: 'foo'
      }]});
    });

    describe('if blockBlur', () => {
      it('does not call setState', () => {
        spyOn(instance, 'setState');
        instance.blockBlur = true;
        instance.handleBlur();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if not blockBlur', () => {
      beforeEach(() => {
        instance.blockBlur = false;
        spyOn(instance, 'emitOnChangeCallback');
      });

      describe('when not in create mode', () => {
        it('calls setState with null filter value', () => {
          instance.handleBlur();
          expect(instance.state.open).toEqual(false);
          expect(instance.state.filter).toEqual(null);
        });
      });

      describe('when in create mode', () => {
        it('calls setState with filter value from state', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilterAjax name="foo" value="1" path="/foobar" create={ function() {} } />
          );
          instance.setState({ filter: 'foo', options: [{
            id: '90',
            name: 'foo'
          }]});
          instance.handleBlur();
          expect(instance.state.open).toEqual(false);
          expect(instance.state.filter).toEqual('foo');
        });
      });

      describe('if highlighted matches value', () => {
        it('does not emit change', () => {
          instance.handleBlur();
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe('when there is no highlighted option', () => {
        it('does not call emitOnChangeCallback', () => {
          spyOn(instance, 'highlighted').and.returnValue(null);
          instance.handleBlur();
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe('when there was a request made before the blur', () => {
        beforeEach(() => {
          instance.pendingRequest = { abort: jest.fn() };
          spyOn(instance.pendingRequest, 'abort');
        });
        it('cancels the previous request', () => {
          instance.handleBlur();
          expect(instance.pendingRequest.abort).toHaveBeenCalled();
        });
      });

      describe('when there was a dataFetchTimeoutId before the blur', () => {
        beforeEach(() => {
          instance.dataFetchTimeoutId = 'foo';
          spyOn(window, 'clearTimeout');
        });
        it('clears the timeout', () => {
          instance.handleBlur();
          expect(window.clearTimeout).toHaveBeenCalledWith('foo');
        });
      });

      describe('when there is an onBlur prop', () => {
        it('triggers the onBlur function', () => {
          let onBlur = jasmine.createSpy('onBlur');

          instance = TestUtils.renderIntoDocument(<DropdownFilterAjax onBlur={ onBlur } path='/foobar' />);
          TestUtils.Simulate.blur(instance._input);
          expect(onBlur).toHaveBeenCalled();
        });
      });
    });
  });

  describe('handleFocus', () => {
    beforeEach(() => {
      spyOn(instance, 'getData');
    });

    describe('if suggest is enabled', () => {
      it('does not call getData', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilterAjax name="foo" value="1" path="/foobar" suggest={ true } />
        );
        spyOn(instance, 'getData');
        instance.handleFocus();
        expect(instance.getData).not.toHaveBeenCalled();
      });
    });

    describe('if suggest is disabled', () => {
      it('calls getData', () => {
        instance.handleFocus();
        expect(instance.getData).toHaveBeenCalledWith("", 1);
      });

      describe('if suggest is disabled but focus is blocked', () => {
        it('does not call getData', () => {
          instance.blockFocus = true;
          instance.handleFocus();
          expect(instance.getData).not.toHaveBeenCalled();
        });
      });
    });

    it('calls setSelectionRange', () => {
      spyOn(instance._input, 'setSelectionRange');
      instance.handleFocus();
      expect(instance._input.setSelectionRange).toHaveBeenCalledWith(0, instance._input.value.length);
    });
  });

  describe('handleScroll', () => {
    beforeEach(() => {
      spyOn(instance, 'getData');
    });

    describe('if not listeningToScroll', () => {
      it('does not get data', () => {
        instance.listeningToScroll = false;
        instance.setState({ open: true });
        TestUtils.Simulate.scroll(instance.list);
        expect(instance.getData).not.toHaveBeenCalled();
      });
    });

    describe('if listeningToScroll', () => {
      beforeEach(() => {
        instance.listeningToScroll = true;
      });

      describe('if page is greater than pages', () => {
        it('does not get data', () => {
          instance.setState({ page: 2, pages: 1 });
          instance.handleScroll();
          expect(instance.getData).not.toHaveBeenCalled();
        });
      });

      describe('if page is less than pages', () => {
        beforeEach(() => {
          instance.setState({ page: 1, pages: 2 });
        });

        describe('if scroll top is less than scroll trigger position', () => {
          it('does not get data', () => {
            instance.list = {
              scrollHeight: 200,
              offsetHeight: 75,
              scrollTop: 100
            };
            instance.handleScroll();
            expect(instance.getData).not.toHaveBeenCalled();
          });
        });

        describe('if scroll top is more than scroll trigger position', () => {
          it('calls get data', () => {
            instance.list = {
              scrollHeight: 200,
              offsetHeight: 76,
              scrollTop: 100
            };
            instance.handleScroll();
            expect(instance.getData).toHaveBeenCalledWith(instance.state.visibleValue, instance.state.page + 1);
          });
        });
      });
    });
  });

  describe('getData', () => {
    beforeEach(() => {
      Request.__setMockResponse({
        status() {
          return 200;
        },
        ok() {
          return true;
        },
        body: {
          data: ['foo']
        }
      });
    });

    describe('if data is not explicitly passed', () => {
      it('calls the correct query', () => {
        Request.query = jest.fn().mockReturnThis();
        instance.ajaxUpdateList = jest.fn();

        instance.getData();

        expect(instance.ajaxUpdateList).toBeCalled();
        expect(Request.query).toBeCalledWith({
          page: 1,
          rows: 25,
          value: ''
        });
      });
    });

    describe('if data not explicitly passed', () => {
      it('calls the correct query', () => {
        Request.query = jest.fn().mockReturnThis();
        instance.ajaxUpdateList = jest.fn();

        instance.getData("foo", 1);

        expect(Request.query).toBeCalledWith({
          page: 1,
          rows: 25,
          value: 'foo'
        });
      });

      it('calls updateList on success', () => {
        instance.updateList = jest.fn();
        instance.getData("foo", 1);
        expect(instance.updateList).toBeCalledWith('foo');
      });
    });

    describe('if an additional request param is passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilterAjax
            name="foo"
            value="1"
            path="/foobar"
            create={ function() {} }
            additionalRequestParams={ {foo: 'bar'} }
          />
        );
      });

      it('calls the correct query', () => {
        Request.query = jest.fn().mockReturnThis();
        instance.ajaxUpdateList = jest.fn();

        instance.getData("foo", 1);

        expect(Request.query.mock.calls.length).toBe(2);
        expect(Request.query).toBeCalledWith({
          page: 1,
          rows: 25,
          value: 'foo'
        });
        expect(Request.query).lastCalledWith({
          foo: 'bar'
        });
      });
    });
  });

  describe('resetScroll', () => {
    it('sets listeningToScroll to false', () => {
      instance.listeningToScroll = true;
      instance.resetScroll();
      expect(instance.listeningToScroll).toBeFalsy();
    });

    describe('when list is open', () => {
      it('should reset the scroll top', () => {
        instance.list = {
          scrollTop: 100
        };
        instance.setState({ open: true });
        instance.resetScroll();
        expect(instance.list.scrollTop).toEqual(0);
      });
    });
  });

  describe('updateList', () => {
    beforeEach(() => {
      instance.setState({ options: [0] });
      spyOn(instance, 'setState');
      spyOn(instance, 'resetScroll');
    });

    describe('if page is greater than 1', () => {
      it('concats lists', () => {
        instance.updateList({ records: 100, items: [1], page: 2 });
        expect(instance.setState).toHaveBeenCalledWith({
          open: true,
          options: [0,1],
          page: 2,
          pages: 4
        });
      });
    });

    describe('if page is 1 or less', () => {
      it('calls resetScroll', () => {
        instance.updateList({ records: 100, items: [1], page: 1 });
        expect(instance.resetScroll).toHaveBeenCalled();
      });
    });

    it('calls setState', () => {
      instance.updateList({ records: 100, items: [1], page: 1 });
      expect(instance.setState).toHaveBeenCalledWith({
        open: true,
        options: [1],
        page: 1,
        pages: 4
      });
    });

    it('sets listeningToScroll to true', () => {
      instance.listeningToScroll = false;
      instance.updateList([]);
      expect(instance.listeningToScroll).toBeTruthy();
    });
  });

  describe('options', () => {
    it('calls prepareList', () => {
      spyOn(instance, 'prepareList');
      instance.options;
      expect(instance.prepareList).toHaveBeenCalled();
    });
  });

  describe('inputProps', () => {
    describe('when filter is not a string', () => {
      it('uses the visibleValue', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilterAjax name="foo" value="1" path="/foobar" visibleValue="bar" />
        );
        instance.setState({ filter: null });
        expect(instance.inputProps.value).toEqual('bar');
      });
    });

    describe('when filter is a string', () => {
      it('uses the filter value', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilterAjax name="foo" path="/foobar" visibleValue="bar" />
        );
        instance.setState({ filter: 'abc' });
        expect(instance.inputProps.value).toEqual('abc');
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <DropdownFilterAjax
          data-element='bar'
          options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
          path='/foobar'
          data-role='baz'
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'dropdown-filter-ajax', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      describe("when closed", () => {
        let wrapper = shallow(
          <DropdownFilterAjax
            fieldHelp='test'
            label='test'
            open={ true }
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='/foobar'
          />
        );

        elementsTagTest(wrapper, [
          'help',
          'hidden-input',
          'input',
          'label',
        ]);
      });
    });
  });

  describe("requesting list data", () => {
    let responseData,
        wrapper;

    beforeEach(() => {
      Request.__setMockResponse({
        status() {
          return 200;
        },
        ok() {
          return true;
        },
        body: {
          data: [{
            records: 1,
            items: [ 1 ],
            page: 1
          }]
        }
      });
      Request.abort = jest.fn().mockReturnThis();
      wrapper = mount(<DropdownFilterAjax name="foo" value="1" path="/foobar" visibleValue="bar" />);
      wrapper.find('.carbon-dropdown__input').simulate('focus');
    });

    describe('when props contains a formatRequest function', () => {
      it('calls formatRequest', () => {
        const mockFormatData = () => { return { foo: 'bar' } };

        wrapper.setProps({
          formatRequest: mockFormatData
        });

        expect(
          wrapper.instance().getParams('')
        ).toEqual({"foo": "bar"})
      });
    });

    describe('when props contains a formatResponse function', () => {
      it('calls formatResponse', () => {
        let expectedResponse = {
          records: 1,
          items: [1],
          page: 1
        },
        response = {
          body: expectedResponse
        };
        const mockFormatData = jasmine.createSpy('mockFormatData').and.returnValue(expectedResponse);

        wrapper.setProps({
          formatResponse: mockFormatData
        });

        wrapper.instance().ajaxUpdateList(false, response);
        expect(mockFormatData).toHaveBeenCalledWith(expectedResponse);
      });
    });

    it("is set to 'idle' on load", () => {
      expect(wrapper.find('[data-state="idle"]').length).toEqual(1);
    });

    describe("associated ajax request", () => {
      it("renders a list with the right number of items", () => {
        expect(wrapper.find('.carbon-dropdown__list-item').length).toEqual(1);
      });
    });

    describe("setState calls from the two functions", () => {
      beforeEach(() => {
        instance = wrapper.instance();
        spyOn(instance, 'setState');
      });

      it("sets requesting to true in `getData`", () => {
        instance.getData(1, 2);
        expect(instance.setState).toHaveBeenCalledWith({ requesting: true });
      });

      it("sets requesting to false in `ajaxUpdateList` (the end() function in getData)", () => {
        instance.getData(1, 2);
        expect(instance.setState).toHaveBeenCalledWith({ requesting: false });
      });
    });
  });
});
