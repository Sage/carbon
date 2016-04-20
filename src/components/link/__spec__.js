import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Link from './link';
import Icon from './../icon';

describe('Link', () => {
  let basicLink, disabledLink, customLink, actionLink, spy;

  beforeEach(() => {
    basicLink = TestUtils.renderIntoDocument(
      <Link href='http://app.com/home'>My Link</Link>
    )

    disabledLink = TestUtils.renderIntoDocument(
      <Link href='http://app.com/edit' disabled>My Link</Link>
    )

    customLink = TestUtils.renderIntoDocument(
      <Link className='fancy' href='http://app.com/home'>My Link</Link>
    )

    spy = jasmine.createSpy('click');
    actionLink = TestUtils.renderIntoDocument(
      <Link onClick={ spy }>My Link</Link>
    );
  });

  describe('A basic link', () => {
    it('renders a link with defaults', () => {
      expect(basicLink.props.disabled).toBeUndefined();
    });

    it('renders a link with the provided path', () => {
      expect(basicLink.props.href).toEqual('http://app.com/home');
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

  describe('with an icon', () => {
    it('renders an icon', () => {
      let instance = TestUtils.renderIntoDocument(
        <Link icon="foo">My Link</Link>
      );
      let icon = TestUtils.findRenderedComponentWithType(instance, Icon);
      expect(icon.props.className).toEqual('ui-link__icon');
      expect(icon.props.type).toEqual('foo');
    });
  });

  describe('class names', () => {
    let basicDOM, disabledDOM, customDOM;

    beforeEach(() => {
      basicDOM    = ReactDOM.findDOMNode(basicLink);
      disabledDOM = ReactDOM.findDOMNode(disabledLink);
      customDOM   = ReactDOM.findDOMNode(customLink);
    });

    it('adds a className of ui-link to all links', () => {
      expect(basicDOM.classList[0]).toEqual('ui-link__anchor');
      expect(disabledDOM.classList[0]).toEqual('ui-link__anchor');
    });

    it('adds a disabled class name to a disabled link', () => {
      expect(disabledDOM.classList[1]).toEqual('ui-link__anchor--disabled');
    });

    it('adds any additional classes passed', () => {
      expect(customDOM.classList[1]).toEqual('fancy');
    });
  });

  describe('additonal props', () => {
    it('consumes additional props', () => {
      let link = ReactDOM.findDOMNode(actionLink);
      TestUtils.Simulate.click(link);
      expect(spy).toHaveBeenCalled();
    });
  });
});
