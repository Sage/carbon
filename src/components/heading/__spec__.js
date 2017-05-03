import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Heading from './heading';
import Help from './../help';
import Link from './../link';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

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
    let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-heading');
    expect(div.className).toEqual('carbon-heading custom carbon-heading--has-subheader carbon-heading--has-back carbon-heading--has-divider');
  });

  it('renders a h1 with the title', () => {
    let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-heading__title');
    expect(div.textContent).toEqual('foo');
  });

  it('renders a help component', () => {
    let help = TestUtils.findRenderedComponentWithType(instance, Help);
    expect(help.props.className).toEqual('carbon-heading__help');
    expect(help.props.href).toEqual('/bar');
  });

  it('renders a back link', () => {
    let link = TestUtils.findRenderedComponentWithType(instance, Link);
    expect(link.props.className).toEqual('carbon-heading__back');
    expect(link.props.href).toEqual('/foobar');
  });

  it('renders a subheader', () => {
    let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-heading__subheader');
    expect(div.textContent).toEqual('subheader');
  });

  describe('no subheader', () => {
    it('returns nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading />
      );
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-heading__subheader').length).toEqual(0);
    });
  });

  describe('no divider', () => {
    it('returns nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" divider={ false } />
      );
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-heading--has-divider').length).toEqual(0);
    });
  });

  describe('no title', () => {
    it('returns nothing', () => {
      instance = TestUtils.renderIntoDocument(
        <Heading />
      );
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-heading__title').length).toEqual(0);
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
      expect(help.props.className).toEqual('carbon-heading__help');
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

  describe('with separator', () => {
    it('renders a separator after the title', () => {
      instance = TestUtils.renderIntoDocument(<Heading title='foo' separator={ true }/>);
      let separator = TestUtils.findRenderedDOMComponentWithTag(instance, 'hr');
      expect(separator.className).toEqual('carbon-heading__separator');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Heading title='Test' data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'heading', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(
        <Heading
          backLink='test'
          help='Test'
          helpLink='test'
          subheader='Sub Title'
          title='Test'
        />);

      elementsTagTest(wrapper, [
        'back',
        'help',
        'subtitle',
        'title'
      ]);
    });
  });
});
