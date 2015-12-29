import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Link from './link';

describe('Link', () => {
  let basicLink, disabledLink;

  beforeEach(() => {
    basicLink = TestUtils.renderIntoDocument(
      <Link path='http://app.com/home'>My Link</Link>
    )

    disabledLink = TestUtils.renderIntoDocument(
      <Link path='http://app.com/edit' disabled>My Link</Link>
    )
  });

  describe('A basic link', () => {
    it('renders a link with defaults', () => {
      expect(basicLink.props.disabled).toBeUndefined();
    });

    it('renders a link with the provided path', () => {
      expect(basicLink.props.path).toEqual('http://app.com/home');
    });

    it('renders children passed to it', () => {
      expect(basicLink.props.children).toEqual('My Link');
    });
  });

  describe('A disabled link', () => {
    it('renders a link with the disabled attribute', () => {
      expect(disabledLink.props.disabled).toBeTruthy();
    });
  });

  describe('class names', () => {
    let basicDOM, disabledDOM;

    beforeEach(() => {
      basicDOM    = ReactDOM.findDOMNode(basicLink);
      disabledDOM = ReactDOM.findDOMNode(disabledLink);
    });

    it('adds a className of ui-link to all links', () => {
      expect(basicDOM.classList[0]).toEqual('ui-link');
      expect(disabledDOM.classList[0]).toEqual('ui-link');
    });

    it('adds a disabled class name to a disabled link', () => {
      expect(disabledDOM.classList[1]).toEqual('ui-link--disabled');
    });
  });
});
