import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Heading from './heading;
import Help from './../help';
import Link from './../link';

describe('Heading', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Heading
        title="foo"
        subheading="foobar"
        help="bar"
        helpLink="/bar"
        backLinkHref="/foobar"
      />
    );
  });

  it('renders a h1 with the title', () => {
    let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-heading__title');
    expect(div.textContent).toEqual('foo');
  });

  it('renders a help component', () => {
    let help = TestUtils.findRenderedComponentWithType(instance, Help);
    expect(help.props.className).toEqual('ui-heading__help');
    expect(help.props.href).toEqual('/bar');
  });

  it('renders a back link', () => {
    let link = TestUtils.findRenderedComponentWithType(instance, Link);
    expect(link.props.className).toEqual('ui-heading__back');
    expect(link.props.href).toEqual('/foobar');
  });

  it('renders a subheading', () => {
    let link = TestUtils.findRenderedDOMComponentWithTag(instance, 'p');
    expect(link.props.className).toEqual('ui-heading__subheading');
    expect(link.props.children).toEqual('foobar');
  });

  describe('no subheading', () => {
    it('returns nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading />
      );
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p').length).toEqual(0);
    });
  });

  describe('no title', () => {
    it('returns nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading />
      );
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div').length).toEqual(0);
    });
  });

  describe('no help', () => {
    it('returns no help component', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" />
      );
      expect(TestUtils.scryRenderedComponentsWithType(instance, Help).length).toEqual(0);
    });
  });

  describe('no back href but a back to link', () => {
    it('returns no back link', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" backLinkTo="/foobar" />
      );
      let link = TestUtils.findRenderedComponentWithType(instance, Link);
      expect(link.props.className).toEqual('ui-heading__back');
      expect(link.props.to).toEqual('/foobar');
    });
  });

  describe('no back href or to', () => {
    it('returns no back link', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" />
      );
      expect(TestUtils.scryRenderedComponentsWithType(instance, Link).length).toEqual(0);
    });
  });
});
