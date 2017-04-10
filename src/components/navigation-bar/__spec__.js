import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import NavigationBar from './navigation-bar';
import AppWrapper from './../app-wrapper';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/test';


describe('NavigationBar', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <NavigationBar className='foobar'>
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
      <NavigationBar className='foobar' as='secondary'>
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

  describe('component tags', () => {
    let wrapper = shallow(
      <NavigationBar
        className='foobar'
        as='secondary'
        element='bar'
        role='baz'
      >
        foo
      </NavigationBar>
    );

    describe('on component', () => {
      it('includes correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'navigation-bar', 'bar', 'baz');
      });
    });
  });
});
