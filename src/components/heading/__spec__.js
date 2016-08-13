import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Heading from './heading';
import Help from './../help';
import Link from './../link';

describe('Heading', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Heading
        className="custom"
        title="foo"
        subheader="subheader"
        help="bar"
        helpLink="/bar"
        backLink="/foobar"
      />
    );
  });

  it('renders with main classes', () => {
    let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-heading');
    expect(div.className).toEqual('ui-heading custom ui-heading--has-subheader ui-heading--has-back');
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

  it('renders a subheader', () => {
    let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-heading__subheader');
    expect(div.textContent).toEqual('subheader');
  });

  describe('no subheader', () => {
    it('returns nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading />
      );
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-heading__subheader').length).toEqual(0);
    });
  });

  describe('no title', () => {
    it('returns nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading />
      );
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-heading__title').length).toEqual(0);
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

  describe('no help text but a help link', () => {
    it('still renders the help icon', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" helpLink="/bar" />
      );
      let help = TestUtils.findRenderedComponentWithType(instance, Help);
      expect(help.props.className).toEqual('ui-heading__help');
      expect(help.props.href).toEqual('/bar');
    });
  });

  describe('no back href', () => {
    it('returns no back link', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" />
      );
      expect(TestUtils.scryRenderedComponentsWithType(instance, Link).length).toEqual(0);
    });
  });
});
