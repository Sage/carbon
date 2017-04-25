import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Filter from './filter.js';

describe('Filter', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Filter>foo</Filter>);
  });

  it('prevents default on submit', () => {
    let spy = jasmine.createSpy(),
        ev = { preventDefault: spy };

    instance.handleSubmit(ev);
    expect(spy).toHaveBeenCalled();
  });

  it('renders with the default classes', () => {
    let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
    expect(form.className).toEqual('carbon-filter carbon-filter--align-left');
  });

  describe('when aligned right', () => {
    it('renders with an align right class', () => {
      instance = TestUtils.renderIntoDocument(<Filter align="right">foo</Filter>);
      let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
      expect(form.className).toEqual('carbon-filter carbon-filter--align-right');
    });
  });
});
