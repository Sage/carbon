import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
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
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-content__title');
      expect(div.textContent).toEqual('foo');
    });

    it('renders the body', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-content__body');
      expect(div.textContent).toEqual('bar');
    });

    it('renders custom classes', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-content');
      expect(div.className).toEqual('carbon-content foobar carbon-content--primary');
    });
  });

  describe('with no children', () => {
    it('renders nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Content title="foo">{ null }</Content>
      );

      let div = ReactDOM.findDOMNode(instance);
      expect(div).toBe(null);
    });
  });
});
