import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Content from './content';

describe('Content', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Content title="foo" className="foobar">bar</Content>
    );
  });

  describe('render', () => {
    it('renders the title', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-content__title');
      expect(div.textContent).toEqual('foo');
    });

    it('renders the body', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-content__body');
      expect(div.textContent).toEqual('bar');
    });

    it('renders custom classes', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-content');
      expect(div.className).toEqual('ui-content foobar');
    });
  });
});
