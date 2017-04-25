import React from 'react';
import TestUtils from 'react-dom/test-utils';
import NavigationBar from './navigation-bar';
import AppWrapper from './../app-wrapper';

describe('NavigationBar', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <NavigationBar className="foobar">
        foo
      </NavigationBar>
    );
  });

  it('renders with correct classes', () => {
    let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    expect(div.className).toEqual('carbon-navigation-bar foobar carbon-navigation-bar--primary');
  });

  it('renders with secondary class', () => {
    instance = TestUtils.renderIntoDocument(
      <NavigationBar className="foobar" as="secondary">
        foo
      </NavigationBar>
    );
    let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    expect(div.className).toEqual('carbon-navigation-bar foobar carbon-navigation-bar--secondary');
  });

  it('renders an AppWrapper', () => {
    let appWrapper = TestUtils.findRenderedComponentWithType(instance, AppWrapper);
    expect(appWrapper.props.children).toEqual('foo');
  });
});
