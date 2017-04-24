import React from 'react';
import TestUtils from 'react-dom/test-utils';
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
      expect(div.className).toEqual('carbon-content foobar carbon-content--primary carbon-content--align-left');
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

  describe('inline', () => {
    it('renders with an inline class', () => {
      instance = TestUtils.renderIntoDocument(
        <Content inline={ true }>{ null }</Content>
      );
      expect(instance.classes()).toContain('carbon-content--inline');
    });
  });

  describe('center', () => {
    it('renders with an inline and center class', () => {
      instance = TestUtils.renderIntoDocument(
        <Content align="center">{ null }</Content>
      );
      expect(instance.classes()).toContain('carbon-content--align-center');
    });
  });

  describe('titleWidth', () => {
    it('renders custom styling for the title', () => {
      instance = TestUtils.renderIntoDocument(
        <Content titleWidth="40">{ null }</Content>
      );
      expect(instance.titleStyle()).toEqual({ width: "calc(40% - 30px)" });
      expect(instance.bodyStyle()).toEqual({ width: "60%" });
    });
  });

  describe("over-ride body width", () => {
    it("will set body width to 100% if over-ride set", () => {
      instance = TestUtils.renderIntoDocument(
        <Content titleWidth="40" bodyFullWidth={ true }>{ null }</Content>
      );
      expect(instance.bodyStyle()).toEqual({ width: "100%" });
    });
  });
});
