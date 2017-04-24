import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import Detail from './detail';

describe('Detail', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Detail className="foo">
        foo
      </Detail>
    );
  });

  describe('render', () => {
    it('renders the children', () => {
      let content = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-detail__content');
      expect(content.textContent).toEqual('foo');
    });

    it('renders with custom classes', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-detail');
      expect(div.className).toEqual('carbon-detail foo')
    });
  });

  describe('with a footnote', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Detail footnote="extra info">
          foo
        </Detail>
      );
    });

    it('renders the footnote', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-detail__footnote');
      expect(div.textContent).toEqual('extra info')
    });
  });

  describe('with an icon', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Detail icon="settings">
          foo
        </Detail>
      );
    });

    it('renders the icon and additional class', () => {
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-detail__icon');
      expect(div).toBeDefined()
    });
  });
});
